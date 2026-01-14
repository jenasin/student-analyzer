import OpenAI from 'openai';
import { Report } from '../types';

interface ChatMessage {
  role: 'user' | 'assistant' | 'system';
  content: string;
}

type ModuleId = 'M0' | 'M1' | 'M2' | 'M3' | 'M4' | 'REPORT';

interface QAItem {
  id: string;
  module: ModuleId;
  question: string;
  answer?: string;
  tsQuestion: number;
  tsAnswer?: number;
}

export interface SessionJson {
  sessionId: string;
  startedAt: number;
  student: {
    name?: string;
  };
  qa: QAItem[];
  rawMessagesCount: number;
}

const SYSTEM_INSTRUCTION = `
Jsi "AI ACADEMIC NAVIGATOR" – přátelský mentor pro studenty.
Cíl: za ~10 výměn zjistit (1) kdo student je, (2) jak se učí, (3) jak přemýšlí (abstraktně vs. konkrétně), (4) co mu jde a co zlepšit.
Neptej se na "rok volna a peníze". Žádné dlouhé řeči.

# TVRDÁ PRAVIDLA
- Každá tvoje zpráva končí PŘESNĚ 1 otázkou.
- Maximum 2–3 věty + 1 otázka.
- Ptej se snadno: nabídni volby A/B/C/D, když je to vhodné.
- Když je odpověď vágní, vyžádej 1 konkrétní příklad.

# START
1) Nejdřív si vyžádej jméno/přezdívku.
2) Pak pokračuj řízenými moduly (8–10 otázek celkem).

# MODULY (8–10 otázek)
M0 Identita (1 otázka): jméno/přezdívka (+ volitelně ročník/obor).
M1 Studium teď (2 otázky): co teď dává smysl, co je těžké.
M2 Myšlení (2 otázky): abstrakt vs. konkrétní (ideálně A/B/C/D).
M3 Učení (2–3 otázky): aktivní/reflektivní, vizuální/verbální, sekvenční/globální (A/B/C/D).
M4 Návyky (1–2 otázky): plánování, prokrastinace, práce se zaseknutím.

# VÝSTUP (při "VYHODNOTIT")
Vygeneruj POUZE validní JSON bez markdown bloků:
{
  "studentPassport": "Markdown text obsahující:\\n## Tvůj profil\\n## Jak přemýšlíš (abstraktní vs konkrétní)\\n## Jak se učíš\\n## Silné stránky\\n## Na čem můžeš zapracovat\\n## 3 konkrétní tipy",
  "researchBlock": "PROFILE_V3|name:X|interests:X|thinking:X|learning:X|strengths:X",
  "skills": [
    {"label":"Samostatnost","value":0-100},
    {"label":"Organizace","value":0-100},
    {"label":"Kreativita","value":0-100},
    {"label":"Vytrvalost","value":0-100},
    {"label":"Spolupráce","value":0-100}
  ],
  "studentType": "např. Vizuálně-praktický | Abstraktní systematik | Vyvážený multimodální",
  "interests": ["..."],
  "learningStyle": "..."
}
`;

const START_PROMPT =
  'Začni. Napiš krátké uvítání (max 1 věta) a zeptej se: "Jak ti mám říkat (jméno/přezdívka)?" Polož PŘESNĚ 1 otázku.';

const TURN_REMINDER =
  'Připomínka: max 2–3 věty. Na konci PŘESNĚ 1 otázka. Když je to vhodné, dej A/B/C/D volby.';

function enforceSingleQuestion(text: string): string {
  const t = (text || '').trim();
  const qs = t.match(/\?/g)?.length ?? 0;
  if (qs <= 1) return t;
  const last = t.lastIndexOf('?');
  const cut = t.slice(0, last + 1).trim();
  return cut.length >= 40 ? cut : t;
}

function uid(): string {
  return Math.random().toString(16).slice(2) + Date.now().toString(16);
}

export class NavigatorService {
  private messages: ChatMessage[] = [];
  private openai: OpenAI;

  private session: SessionJson = {
    sessionId: uid(),
    startedAt: Date.now(),
    student: {},
    qa: [],
    rawMessagesCount: 0
  };

  private questionCounter = 0;
  private lastQuestionId: string | null = null;

  constructor() {
    this.openai = new OpenAI({
      apiKey: import.meta.env.VITE_OPENAI_API_KEY || '',
      dangerouslyAllowBrowser: true
    });
  }

  getSessionJson(): SessionJson {
    this.session.rawMessagesCount = this.messages.length;
    return this.session;
  }

  getStudentName(): string | undefined {
    return this.session.student.name;
  }

  private logQuestion(module: ModuleId, questionText: string) {
    this.questionCounter += 1;
    const id = `Q${this.questionCounter}`;
    this.lastQuestionId = id;
    this.session.qa.push({
      id,
      module,
      question: questionText,
      tsQuestion: Date.now()
    });
  }

  private logAnswer(answerText: string) {
    if (!this.lastQuestionId) return;
    const item = this.session.qa.find(q => q.id === this.lastQuestionId);
    if (!item) return;
    item.answer = answerText;
    item.tsAnswer = Date.now();

    // První otázka je jméno
    if (item.module === 'M0' && !this.session.student.name) {
      const name = (answerText || '').trim();
      if (name.length > 0 && name.length <= 60) {
        this.session.student.name = name;
      }
    }
  }

  private guessModule(): ModuleId {
    const count = this.questionCounter;
    if (count <= 1) return 'M0';
    if (count <= 3) return 'M1';
    if (count <= 5) return 'M2';
    if (count <= 8) return 'M3';
    return 'M4';
  }

  async startChat(): Promise<string> {
    this.messages = [
      { role: 'system', content: SYSTEM_INSTRUCTION },
      { role: 'user', content: START_PROMPT }
    ];

    this.session = {
      sessionId: uid(),
      startedAt: Date.now(),
      student: {},
      qa: [],
      rawMessagesCount: 0
    };
    this.questionCounter = 0;
    this.lastQuestionId = null;

    const response = await this.openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: this.messages,
      temperature: 0.55,
      max_tokens: 220
    });

    const raw = response.choices[0]?.message?.content || '';
    const assistantMessage = enforceSingleQuestion(raw);

    this.messages.push({ role: 'assistant', content: assistantMessage });
    this.logQuestion('M0', assistantMessage);

    return assistantMessage;
  }

  async sendMessage(text: string): Promise<string> {
    if (!this.messages.length) throw new Error('Chat nebyl inicializován');

    this.logAnswer(text);
    this.messages.push({ role: 'user', content: text });

    const messagesWithReminder: ChatMessage[] = [
      ...this.messages,
      { role: 'system', content: TURN_REMINDER }
    ];

    const response = await this.openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: messagesWithReminder,
      temperature: 0.55,
      max_tokens: 260
    });

    const raw = response.choices[0]?.message?.content || '';
    const assistantMessage = enforceSingleQuestion(raw);

    this.messages.push({ role: 'assistant', content: assistantMessage });
    this.logQuestion(this.guessModule(), assistantMessage);

    return assistantMessage;
  }

  async generateReport(): Promise<Report> {
    if (!this.messages.length) throw new Error('Chat nebyl inicializován');

    this.messages.push({
      role: 'user',
      content: 'VYHODNOTIT. Vygeneruj kompletní JSON analýzu. Odpověz POUZE validním JSON bez markdown bloků.'
    });

    const response = await this.openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: this.messages,
      temperature: 0.3,
      max_tokens: 2000
    });

    const responseText = response.choices[0]?.message?.content || '';

    try {
      let cleanedJson = responseText
        .replace(/```json\s*/gi, '')
        .replace(/```\s*/g, '')
        .trim();

      const firstBrace = cleanedJson.indexOf('{');
      const lastBrace = cleanedJson.lastIndexOf('}');
      if (firstBrace !== -1 && lastBrace !== -1) {
        cleanedJson = cleanedJson.substring(firstBrace, lastBrace + 1);
      }

      const parsed = JSON.parse(cleanedJson);
      return {
        studentPassport: parsed.studentPassport || 'Nepodařilo se vygenerovat profil.',
        researchBlock: parsed.researchBlock || 'ERROR_NO_DATA',
        skills: parsed.skills || [
          { label: 'Samostatnost', value: 50 },
          { label: 'Organizace', value: 50 },
          { label: 'Kreativita', value: 50 },
          { label: 'Vytrvalost', value: 50 },
          { label: 'Spolupráce', value: 50 }
        ]
      };
    } catch (e) {
      console.error('Failed to parse report JSON:', e);
      return {
        studentPassport: responseText,
        researchBlock: 'ERROR_PARSING_JSON',
        skills: [
          { label: 'Samostatnost', value: 50 },
          { label: 'Organizace', value: 50 },
          { label: 'Kreativita', value: 50 },
          { label: 'Vytrvalost', value: 50 },
          { label: 'Spolupráce', value: 50 }
        ]
      };
    }
  }

  getHistory(): ChatMessage[] {
    return [...this.messages];
  }

  async generateSynthesis(profileData: {
    studentName: string;
    typology?: {
      dimensions: { leftLabel: string; rightLabel: string; leftScore: number; rightScore: number }[];
      overallProfile: string;
    };
    vak?: { visual: number; auditory: number; kinesthetic: number; label: string };
    habits?: { percent: number; label: string };
    motivation?: { percent: number; label: string };
    strengths?: { areas: { label: string; score: number }[]; topStrength: string };
  }): Promise<{ synthesis: string; studyTips: string[]; youtubeVideos: { videoId: string; title: string; description: string }[] }> {
    const prompt = `Jsi expert na vzdělávání a koučink studentů. Na základě kompletního profilu studenta vytvoř:

1. **KOMPLEXNÍ SYNTÉZU** (3-4 odstavce): Propoj všechny výsledky do uceleného obrazu studenta. Jaký je jeho celkový studijní profil? Jak spolu souvisí jeho myšlenkový styl, učební preference a silné stránky?

2. **10 KONKRÉTNÍCH TIPŮ** pro akademický úspěch: Jak může využít své silné stránky pro lepší výsledky v různých předmětech (matematika, jazyky, přírodní vědy, humanitní předměty). Každý tip musí být specifický a praktický.

3. **5-6 YOUTUBE VIDEÍ** s praktickými technikami učení, které odpovídají profilu studenta. Vyber skutečná, populární videa o studijních technikách, produktivitě, paměťových technikách, time managementu apod. Použij SKUTEČNÁ video ID z YouTube (např. "IlU-zDU6aQ0" pro Pomodoro techniku, "ukLnPbIffxE" pro active recall, "fBXnxlLR0PY" pro spaced repetition, "Z-zNHHpXoMM" pro Cornell notes, "mzCEJVtED0U" pro Feynman technique).

PROFIL STUDENTA "${profileData.studentName}":

${profileData.typology ? `MYŠLENKOVÝ STYL:
${profileData.typology.dimensions.map(d => `- ${d.leftLabel} ${d.leftScore}% / ${d.rightLabel} ${d.rightScore}%`).join('\n')}
Celkový profil: ${profileData.typology.overallProfile}` : ''}

${profileData.vak ? `UČEBNÍ STYL (VAK):
- Vizuální: ${profileData.vak.visual}%
- Auditivní: ${profileData.vak.auditory}%
- Kinestetický: ${profileData.vak.kinesthetic}%
Dominantní: ${profileData.vak.label}` : ''}

${profileData.habits ? `STUDIJNÍ NÁVYKY: ${profileData.habits.percent}% - ${profileData.habits.label}` : ''}

${profileData.motivation ? `MOTIVACE: ${profileData.motivation.percent}% - ${profileData.motivation.label}` : ''}

${profileData.strengths ? `SILNÉ STRÁNKY:
${profileData.strengths.areas.map(a => `- ${a.label}: ${a.score}%`).join('\n')}
Nejsilnější oblast: ${profileData.strengths.topStrength}` : ''}

Odpověz POUZE validním JSON:
{
  "synthesis": "Markdown text s komplexní syntézou profilu...",
  "studyTips": [
    "Tip 1: konkrétní rada pro předmět/situaci...",
    "Tip 2: ...",
    "...celkem 10 tipů"
  ],
  "youtubeVideos": [
    {"videoId": "IlU-zDU6aQ0", "title": "Pomodoro Technique", "description": "Krátký popis proč je tohle video užitečné pro studenta"},
    {"videoId": "ukLnPbIffxE", "title": "Active Recall", "description": "..."},
    "...celkem 5-6 videí"
  ]
}`;

    const response = await this.openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        { role: 'system', content: 'Jsi expert na vzdělávání. Odpovídej pouze validním JSON bez markdown bloků.' },
        { role: 'user', content: prompt }
      ],
      temperature: 0.7,
      max_tokens: 2500
    });

    const responseText = response.choices[0]?.message?.content || '';

    try {
      let cleanedJson = responseText
        .replace(/```json\s*/gi, '')
        .replace(/```\s*/g, '')
        .trim();

      const firstBrace = cleanedJson.indexOf('{');
      const lastBrace = cleanedJson.lastIndexOf('}');
      if (firstBrace !== -1 && lastBrace !== -1) {
        cleanedJson = cleanedJson.substring(firstBrace, lastBrace + 1);
      }

      const parsed = JSON.parse(cleanedJson);
      return {
        synthesis: parsed.synthesis || 'Nepodařilo se vygenerovat syntézu.',
        studyTips: parsed.studyTips || [],
        youtubeVideos: parsed.youtubeVideos || []
      };
    } catch (e) {
      console.error('Failed to parse synthesis JSON:', e);
      return {
        synthesis: responseText,
        studyTips: [],
        youtubeVideos: []
      };
    }
  }

  reset(): void {
    this.messages = [];
    this.session = {
      sessionId: uid(),
      startedAt: Date.now(),
      student: {},
      qa: [],
      rawMessagesCount: 0
    };
    this.questionCounter = 0;
    this.lastQuestionId = null;
  }

  // Generate AI feedback for a specific assessment module
  async generateAssessmentFeedback(assessmentType: string, result: {
    score: number;
    percent: number;
    label: string;
    description?: string;
  }, studentName?: string): Promise<{
    feedback: string;
    actionSteps: string[];
    resources: { title: string; description: string; videoId?: string }[];
  }> {
    const assessmentPrompts: Record<string, string> = {
      growthMindset: `Growth Mindset (Carol Dweck): Měří, zda má student fixní nebo růstové myšlení. Růstové myšlení věří, že schopnosti lze rozvíjet prací a učením.`,
      grit: `Grit Scale (Angela Duckworth): Měří vytrvalost a vášeň pro dlouhodobé cíle. Grit je kombinace vášně a vytrvalosti.`,
      selfEfficacy: `Self-Efficacy (Albert Bandura): Měří víru ve vlastní schopnosti. Self-efficacy ovlivňuje, jak se člověk cítí, myslí a motivuje.`,
      testAnxiety: `Testová úzkost: Měří úroveň stresu a úzkosti před zkouškami. Vysoká úzkost může negativně ovlivnit výkon.`,
      metacognition: `Metakognice: Měří schopnost "učit se učit" - jak dobře student rozumí svému vlastnímu myšlení a učení.`,
      riasec: `RIASEC/Holland: Měří kariérní zájmy podle 6 typů - Realistic, Investigative, Artistic, Social, Enterprising, Conventional.`,
      eq: `Emoční inteligence (EQ): Měří schopnost rozpoznávat, chápat a řídit vlastní emoce i emoce druhých.`
    };

    const prompt = `Jsi expert na vzdělávání a psychologii. Student "${studentName || 'Student'}" právě dokončil test.

TEST: ${assessmentPrompts[assessmentType] || assessmentType}

VÝSLEDEK:
- Skóre: ${result.percent}%
- Hodnocení: ${result.label}
${result.description ? `- Popis: ${result.description}` : ''}

Vytvoř personalizovanou zpětnou vazbu:

1. **FEEDBACK** (2-3 odstavce): Co výsledek znamená pro studenta? Jak to ovlivňuje jeho učení? Buď povzbuzující ale upřímný.

2. **3-5 KONKRÉTNÍCH KROKŮ**: Co může student DNES začít dělat jinak? Praktické, měřitelné akce.

3. **3 DOPORUČENÉ ZDROJE**: YouTube videa nebo techniky, které pomohou. Použij SKUTEČNÁ video ID.

Odpověz POUZE validním JSON:
{
  "feedback": "Markdown text s personalizovanou zpětnou vazbou...",
  "actionSteps": [
    "Krok 1: Konkrétní akce...",
    "Krok 2: ...",
    "..."
  ],
  "resources": [
    {"title": "Název videa/techniky", "description": "Proč je to užitečné", "videoId": "skutečné_video_id"},
    ...
  ]
}`;

    const response = await this.openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        { role: 'system', content: 'Jsi expert na vzdělávání. Odpovídej pouze validním JSON bez markdown bloků.' },
        { role: 'user', content: prompt }
      ],
      temperature: 0.7,
      max_tokens: 1500
    });

    const responseText = response.choices[0]?.message?.content || '';

    try {
      let cleanedJson = responseText.replace(/```json\s*/gi, '').replace(/```\s*/g, '').trim();
      const firstBrace = cleanedJson.indexOf('{');
      const lastBrace = cleanedJson.lastIndexOf('}');
      if (firstBrace !== -1 && lastBrace !== -1) {
        cleanedJson = cleanedJson.substring(firstBrace, lastBrace + 1);
      }
      const parsed = JSON.parse(cleanedJson);
      return {
        feedback: parsed.feedback || '',
        actionSteps: parsed.actionSteps || [],
        resources: parsed.resources || []
      };
    } catch (e) {
      console.error('Failed to parse assessment feedback:', e);
      return { feedback: responseText, actionSteps: [], resources: [] };
    }
  }

  // Generate comprehensive AI coaching based on all results
  async generateCoaching(allResults: {
    studentName: string;
    typology?: any;
    vak?: any;
    habits?: any;
    motivation?: any;
    strengths?: any;
    growthMindset?: any;
    grit?: any;
    selfEfficacy?: any;
    testAnxiety?: any;
    metacognition?: any;
    riasec?: any;
    eq?: any;
  }): Promise<{
    summary: string;
    keyInsights: string[];
    weeklyPlan: { day: string; focus: string; activities: string[] }[];
    habitTracker: { habit: string; why: string; howToTrack: string }[];
    motivationalMessage: string;
  }> {
    const prompt = `Jsi zkušený studijní kouč. Na základě KOMPLETNÍHO profilu studenta vytvoř personalizovaný koučovací plán.

STUDENT: ${allResults.studentName}

KOMPLETNÍ PROFIL:
${allResults.typology ? `• Myšlenkový styl: ${allResults.typology.overallProfile}` : ''}
${allResults.vak ? `• Učební styl: ${allResults.vak.label} (V:${allResults.vak.visual}% A:${allResults.vak.auditory}% K:${allResults.vak.kinesthetic}%)` : ''}
${allResults.habits ? `• Studijní návyky: ${allResults.habits.percent}% - ${allResults.habits.label}` : ''}
${allResults.motivation ? `• Motivace: ${allResults.motivation.percent}% - ${allResults.motivation.label}` : ''}
${allResults.strengths ? `• Nejsilnější oblast: ${allResults.strengths.topStrength}` : ''}
${allResults.growthMindset ? `• Growth Mindset: ${allResults.growthMindset.percent}% - ${allResults.growthMindset.label}` : ''}
${allResults.grit ? `• Vytrvalost (Grit): ${allResults.grit.percent}% - ${allResults.grit.label}` : ''}
${allResults.selfEfficacy ? `• Self-Efficacy: ${allResults.selfEfficacy.percent}% - ${allResults.selfEfficacy.label}` : ''}
${allResults.testAnxiety ? `• Testová úzkost: ${allResults.testAnxiety.percent}% - ${allResults.testAnxiety.label}` : ''}
${allResults.metacognition ? `• Metakognice: ${allResults.metacognition.percent}% - ${allResults.metacognition.label}` : ''}
${allResults.riasec ? `• Kariérní typ: ${allResults.riasec.code || 'N/A'}` : ''}
${allResults.eq ? `• Emoční inteligence: ${allResults.eq.percent}% - ${allResults.eq.label}` : ''}

Vytvoř KOUČOVACÍ PLÁN:

1. **SHRNUTÍ** (3-4 odstavce): Celkový obraz studenta, jeho silné stránky a oblasti pro rozvoj. Co je pro něj klíčové?

2. **5 KLÍČOVÝCH POZNATKŮ**: Nejdůležitější zjištění z celého profilu.

3. **TÝDENNÍ PLÁN**: Pro každý den (Po-Pá) urči fokus a 2-3 konkrétní aktivity.

4. **HABIT TRACKER**: 4-5 návyků, které by měl student sledovat. Pro každý: proč je důležitý a jak ho měřit.

5. **MOTIVAČNÍ ZPRÁVA**: Osobní povzbuzení pro studenta (2-3 věty).

Odpověz POUZE validním JSON:
{
  "summary": "Markdown shrnutí...",
  "keyInsights": ["Poznatek 1", "Poznatek 2", ...],
  "weeklyPlan": [
    {"day": "Pondělí", "focus": "Oblast zaměření", "activities": ["Aktivita 1", "Aktivita 2"]},
    ...
  ],
  "habitTracker": [
    {"habit": "Název návyku", "why": "Proč je důležitý", "howToTrack": "Jak měřit (např. checkbox, číslo)"},
    ...
  ],
  "motivationalMessage": "Osobní zpráva pro studenta..."
}`;

    const response = await this.openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        { role: 'system', content: 'Jsi profesionální studijní kouč. Odpovídej pouze validním JSON bez markdown bloků.' },
        { role: 'user', content: prompt }
      ],
      temperature: 0.7,
      max_tokens: 3000
    });

    const responseText = response.choices[0]?.message?.content || '';

    try {
      let cleanedJson = responseText.replace(/```json\s*/gi, '').replace(/```\s*/g, '').trim();
      const firstBrace = cleanedJson.indexOf('{');
      const lastBrace = cleanedJson.lastIndexOf('}');
      if (firstBrace !== -1 && lastBrace !== -1) {
        cleanedJson = cleanedJson.substring(firstBrace, lastBrace + 1);
      }
      const parsed = JSON.parse(cleanedJson);
      return {
        summary: parsed.summary || '',
        keyInsights: parsed.keyInsights || [],
        weeklyPlan: parsed.weeklyPlan || [],
        habitTracker: parsed.habitTracker || [],
        motivationalMessage: parsed.motivationalMessage || ''
      };
    } catch (e) {
      console.error('Failed to parse coaching:', e);
      return {
        summary: responseText,
        keyInsights: [],
        weeklyPlan: [],
        habitTracker: [],
        motivationalMessage: ''
      };
    }
  }
}

export const navigatorService = new NavigatorService();
