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
You are "AI ACADEMIC NAVIGATOR" – a friendly mentor for students.
Goal: in ~10 exchanges discover (1) who the student is, (2) how they learn, (3) how they think (abstract vs. concrete), (4) their strengths and areas to improve.
Don't ask about "gap year and money". Keep it concise.

# HARD RULES
- Every message ends with EXACTLY 1 question.
- Maximum 2-3 sentences + 1 question.
- Ask easy questions: offer A/B/C/D choices when appropriate.
- If the answer is vague, ask for 1 specific example.

# START
1) First, ask for name/nickname.
2) Then continue with guided modules (8-10 questions total).

# MODULES (8-10 questions)
M0 Identity (1 question): name/nickname (+ optionally year/major).
M1 Current studies (2 questions): what makes sense now, what's difficult.
M2 Thinking (2 questions): abstract vs. concrete (ideally A/B/C/D).
M3 Learning (2-3 questions): active/reflective, visual/verbal, sequential/global (A/B/C/D).
M4 Habits (1-2 questions): planning, procrastination, dealing with being stuck.

# OUTPUT (when "EVALUATE")
Generate ONLY valid JSON without markdown blocks:
{
  "studentPassport": "Markdown text containing:\\n## Your Profile\\n## How You Think (abstract vs concrete)\\n## How You Learn\\n## Strengths\\n## Areas to Work On\\n## 3 Specific Tips",
  "researchBlock": "PROFILE_V3|name:X|interests:X|thinking:X|learning:X|strengths:X",
  "skills": [
    {"label":"Independence","value":0-100},
    {"label":"Organization","value":0-100},
    {"label":"Creativity","value":0-100},
    {"label":"Perseverance","value":0-100},
    {"label":"Collaboration","value":0-100}
  ],
  "studentType": "e.g. Visual-practical | Abstract systematic | Balanced multimodal",
  "interests": ["..."],
  "learningStyle": "..."
}
`;

const START_PROMPT =
  'Start. Write a short greeting (max 1 sentence) and ask: "What should I call you (name/nickname)?" Ask EXACTLY 1 question.';

const TURN_REMINDER =
  'Reminder: max 2-3 sentences. End with EXACTLY 1 question. When appropriate, offer A/B/C/D choices.';

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
    if (!this.messages.length) throw new Error('Chat was not initialized');

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
    if (!this.messages.length) throw new Error('Chat was not initialized');

    this.messages.push({
      role: 'user',
      content: 'EVALUATE. Generate complete JSON analysis. Reply with ONLY valid JSON without markdown blocks.'
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
        studentPassport: parsed.studentPassport || 'Failed to generate profile.',
        researchBlock: parsed.researchBlock || 'ERROR_NO_DATA',
        skills: parsed.skills || [
          { label: 'Independence', value: 50 },
          { label: 'Organization', value: 50 },
          { label: 'Creativity', value: 50 },
          { label: 'Perseverance', value: 50 },
          { label: 'Collaboration', value: 50 }
        ]
      };
    } catch (e) {
      console.error('Failed to parse report JSON:', e);
      return {
        studentPassport: responseText,
        researchBlock: 'ERROR_PARSING_JSON',
        skills: [
          { label: 'Independence', value: 50 },
          { label: 'Organization', value: 50 },
          { label: 'Creativity', value: 50 },
          { label: 'Perseverance', value: 50 },
          { label: 'Collaboration', value: 50 }
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
    const prompt = `You are an expert in education and student coaching. Based on the complete student profile, create:

1. **COMPREHENSIVE SYNTHESIS** (3-4 paragraphs): Connect all results into a complete picture of the student. What is their overall study profile? How do their thinking style, learning preferences, and strengths relate to each other?

2. **10 SPECIFIC TIPS** for academic success: How can they leverage their strengths for better results in various subjects (math, languages, natural sciences, humanities). Each tip must be specific and practical.

3. **5-6 YOUTUBE VIDEOS** with practical learning techniques that match the student's profile. Select real, popular videos about study techniques, productivity, memory techniques, time management, etc. Use REAL video IDs from YouTube (e.g., "IlU-zDU6aQ0" for Pomodoro technique, "ukLnPbIffxE" for active recall, "fBXnxlLR0PY" for spaced repetition, "Z-zNHHpXoMM" for Cornell notes, "mzCEJVtED0U" for Feynman technique).

STUDENT PROFILE "${profileData.studentName}":

${profileData.typology ? `THINKING STYLE:
${profileData.typology.dimensions.map(d => `- ${d.leftLabel} ${d.leftScore}% / ${d.rightLabel} ${d.rightScore}%`).join('\n')}
Overall profile: ${profileData.typology.overallProfile}` : ''}

${profileData.vak ? `LEARNING STYLE (VAK):
- Visual: ${profileData.vak.visual}%
- Auditory: ${profileData.vak.auditory}%
- Kinesthetic: ${profileData.vak.kinesthetic}%
Dominant: ${profileData.vak.label}` : ''}

${profileData.habits ? `STUDY HABITS: ${profileData.habits.percent}% - ${profileData.habits.label}` : ''}

${profileData.motivation ? `MOTIVATION: ${profileData.motivation.percent}% - ${profileData.motivation.label}` : ''}

${profileData.strengths ? `STRENGTHS:
${profileData.strengths.areas.map(a => `- ${a.label}: ${a.score}%`).join('\n')}
Top strength: ${profileData.strengths.topStrength}` : ''}

Reply with ONLY valid JSON:
{
  "synthesis": "Markdown text with comprehensive profile synthesis...",
  "studyTips": [
    "Tip 1: specific advice for subject/situation...",
    "Tip 2: ...",
    "...10 tips total"
  ],
  "youtubeVideos": [
    {"videoId": "IlU-zDU6aQ0", "title": "Pomodoro Technique", "description": "Short description of why this video is useful for the student"},
    {"videoId": "ukLnPbIffxE", "title": "Active Recall", "description": "..."},
    "...5-6 videos total"
  ]
}`;

    const response = await this.openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        { role: 'system', content: 'You are an education expert. Reply only with valid JSON without markdown blocks.' },
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
        synthesis: parsed.synthesis || 'Failed to generate synthesis.',
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
      growthMindset: `Growth Mindset (Carol Dweck): Measures whether the student has a fixed or growth mindset. Growth mindset believes that abilities can be developed through work and learning.`,
      grit: `Grit Scale (Angela Duckworth): Measures perseverance and passion for long-term goals. Grit is a combination of passion and persistence.`,
      selfEfficacy: `Self-Efficacy (Albert Bandura): Measures belief in one's own abilities. Self-efficacy affects how a person feels, thinks, and motivates themselves.`,
      testAnxiety: `Test Anxiety: Measures the level of stress and anxiety before exams. High anxiety can negatively affect performance.`,
      metacognition: `Metacognition: Measures the ability to "learn how to learn" - how well the student understands their own thinking and learning.`,
      riasec: `RIASEC/Holland: Measures career interests according to 6 types - Realistic, Investigative, Artistic, Social, Enterprising, Conventional.`,
      eq: `Emotional Intelligence (EQ): Measures the ability to recognize, understand, and manage one's own emotions and those of others.`
    };

    const prompt = `You are an expert in education and psychology. Student "${studentName || 'Student'}" just completed a test.

TEST: ${assessmentPrompts[assessmentType] || assessmentType}

RESULT:
- Score: ${result.percent}%
- Rating: ${result.label}
${result.description ? `- Description: ${result.description}` : ''}

Create personalized feedback:

1. **FEEDBACK** (2-3 paragraphs): What does the result mean for the student? How does it affect their learning? Be encouraging but honest.

2. **3-5 SPECIFIC STEPS**: What can the student start doing differently TODAY? Practical, measurable actions.

3. **3 RECOMMENDED RESOURCES**: YouTube videos or techniques that will help. Use REAL video IDs.

Reply with ONLY valid JSON:
{
  "feedback": "Markdown text with personalized feedback...",
  "actionSteps": [
    "Step 1: Specific action...",
    "Step 2: ...",
    "..."
  ],
  "resources": [
    {"title": "Video/technique name", "description": "Why it's useful", "videoId": "real_video_id"},
    ...
  ]
}`;

    const response = await this.openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        { role: 'system', content: 'You are an education expert. Reply only with valid JSON without markdown blocks.' },
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
    const prompt = `You are an experienced study coach. Based on the COMPLETE student profile, create a personalized coaching plan.

STUDENT: ${allResults.studentName}

COMPLETE PROFILE:
${allResults.typology ? `• Thinking style: ${allResults.typology.overallProfile}` : ''}
${allResults.vak ? `• Learning style: ${allResults.vak.label} (V:${allResults.vak.visual}% A:${allResults.vak.auditory}% K:${allResults.vak.kinesthetic}%)` : ''}
${allResults.habits ? `• Study habits: ${allResults.habits.percent}% - ${allResults.habits.label}` : ''}
${allResults.motivation ? `• Motivation: ${allResults.motivation.percent}% - ${allResults.motivation.label}` : ''}
${allResults.strengths ? `• Top strength: ${allResults.strengths.topStrength}` : ''}
${allResults.growthMindset ? `• Growth Mindset: ${allResults.growthMindset.percent}% - ${allResults.growthMindset.label}` : ''}
${allResults.grit ? `• Perseverance (Grit): ${allResults.grit.percent}% - ${allResults.grit.label}` : ''}
${allResults.selfEfficacy ? `• Self-Efficacy: ${allResults.selfEfficacy.percent}% - ${allResults.selfEfficacy.label}` : ''}
${allResults.testAnxiety ? `• Test Anxiety: ${allResults.testAnxiety.percent}% - ${allResults.testAnxiety.label}` : ''}
${allResults.metacognition ? `• Metacognition: ${allResults.metacognition.percent}% - ${allResults.metacognition.label}` : ''}
${allResults.riasec ? `• Career type: ${allResults.riasec.code || 'N/A'}` : ''}
${allResults.eq ? `• Emotional Intelligence: ${allResults.eq.percent}% - ${allResults.eq.label}` : ''}

Create a COACHING PLAN:

1. **SUMMARY** (3-4 paragraphs): Overall picture of the student, their strengths and areas for development. What's key for them?

2. **5 KEY INSIGHTS**: The most important findings from the complete profile.

3. **WEEKLY PLAN**: For each day (Mon-Fri) determine focus and 2-3 specific activities.

4. **HABIT TRACKER**: 4-5 habits the student should track. For each: why it's important and how to measure it.

5. **MOTIVATIONAL MESSAGE**: Personal encouragement for the student (2-3 sentences).

Reply with ONLY valid JSON:
{
  "summary": "Markdown summary...",
  "keyInsights": ["Insight 1", "Insight 2", ...],
  "weeklyPlan": [
    {"day": "Monday", "focus": "Focus area", "activities": ["Activity 1", "Activity 2"]},
    ...
  ],
  "habitTracker": [
    {"habit": "Habit name", "why": "Why it's important", "howToTrack": "How to measure (e.g., checkbox, number)"},
    ...
  ],
  "motivationalMessage": "Personal message for the student..."
}`;

    const response = await this.openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        { role: 'system', content: 'You are a professional study coach. Reply only with valid JSON without markdown blocks.' },
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
