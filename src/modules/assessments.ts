// Evidence-based assessment modules with bilingual support
import { Language } from '../i18n/translations';

export interface AssessmentQuestion {
  id: string;
  text: { cs: string; en: string };
  options: { key: 'A' | 'B' | 'C' | 'D'; text: { cs: string; en: string }; score: number }[];
}

export interface AssessmentResult {
  score: number;
  maxScore: number;
  percent: number;
  label: { cs: string; en: string };
  description: { cs: string; en: string };
  tips: { cs: string[]; en: string[] };
}

// Helper to get question text
export function getAssessmentQuestionText(question: AssessmentQuestion, lang: Language): string {
  return question.text[lang];
}

// Helper to get option text
export function getAssessmentOptionText(option: { text: { cs: string; en: string } }, lang: Language): string {
  return option.text[lang];
}

// Helper to get result text
export function getResultLabel(result: AssessmentResult, lang: Language): string {
  return result.label[lang];
}

export function getResultDescription(result: AssessmentResult, lang: Language): string {
  return result.description[lang];
}

export function getResultTips(result: AssessmentResult, lang: Language): string[] {
  return result.tips[lang];
}

// ============================================
// 1. GROWTH MINDSET (Carol Dweck)
// ============================================
export const growthMindsetQuestions: AssessmentQuestion[] = [
  { id: 'GM1', text: { cs: 'Inteligence je něco, co se nedá moc změnit.', en: 'Intelligence is something that cannot be changed much.' }, options: [
    { key: 'A', text: { cs: 'Silně souhlasím', en: 'Strongly agree' }, score: 1 },
    { key: 'B', text: { cs: 'Spíše souhlasím', en: 'Somewhat agree' }, score: 2 },
    { key: 'C', text: { cs: 'Spíše nesouhlasím', en: 'Somewhat disagree' }, score: 3 },
    { key: 'D', text: { cs: 'Silně nesouhlasím', en: 'Strongly disagree' }, score: 4 }
  ]},
  { id: 'GM2', text: { cs: 'Můžeš se naučit nové věci, ale základní inteligenci nezměníš.', en: 'You can learn new things, but you cannot change your basic intelligence.' }, options: [
    { key: 'A', text: { cs: 'Silně souhlasím', en: 'Strongly agree' }, score: 1 },
    { key: 'B', text: { cs: 'Spíše souhlasím', en: 'Somewhat agree' }, score: 2 },
    { key: 'C', text: { cs: 'Spíše nesouhlasím', en: 'Somewhat disagree' }, score: 3 },
    { key: 'D', text: { cs: 'Silně nesouhlasím', en: 'Strongly disagree' }, score: 4 }
  ]},
  { id: 'GM3', text: { cs: 'Když něco nejde, je lepší to vzdát a zkusit něco jiného.', en: 'When something doesn\'t work, it\'s better to give up and try something else.' }, options: [
    { key: 'A', text: { cs: 'Silně souhlasím', en: 'Strongly agree' }, score: 1 },
    { key: 'B', text: { cs: 'Spíše souhlasím', en: 'Somewhat agree' }, score: 2 },
    { key: 'C', text: { cs: 'Spíše nesouhlasím', en: 'Somewhat disagree' }, score: 3 },
    { key: 'D', text: { cs: 'Silně nesouhlasím', en: 'Strongly disagree' }, score: 4 }
  ]},
  { id: 'GM4', text: { cs: 'Chyby jsou příležitostí k učení.', en: 'Mistakes are opportunities for learning.' }, options: [
    { key: 'A', text: { cs: 'Silně souhlasím', en: 'Strongly agree' }, score: 4 },
    { key: 'B', text: { cs: 'Spíše souhlasím', en: 'Somewhat agree' }, score: 3 },
    { key: 'C', text: { cs: 'Spíše nesouhlasím', en: 'Somewhat disagree' }, score: 2 },
    { key: 'D', text: { cs: 'Silně nesouhlasím', en: 'Strongly disagree' }, score: 1 }
  ]},
  { id: 'GM5', text: { cs: 'Úsilí a práce mohou změnit tvé schopnosti.', en: 'Effort and hard work can change your abilities.' }, options: [
    { key: 'A', text: { cs: 'Silně souhlasím', en: 'Strongly agree' }, score: 4 },
    { key: 'B', text: { cs: 'Spíše souhlasím', en: 'Somewhat agree' }, score: 3 },
    { key: 'C', text: { cs: 'Spíše nesouhlasím', en: 'Somewhat disagree' }, score: 2 },
    { key: 'D', text: { cs: 'Silně nesouhlasím', en: 'Strongly disagree' }, score: 1 }
  ]},
  { id: 'GM6', text: { cs: 'Kritika mi pomáhá se zlepšovat.', en: 'Criticism helps me improve.' }, options: [
    { key: 'A', text: { cs: 'Silně souhlasím', en: 'Strongly agree' }, score: 4 },
    { key: 'B', text: { cs: 'Spíše souhlasím', en: 'Somewhat agree' }, score: 3 },
    { key: 'C', text: { cs: 'Spíše nesouhlasím', en: 'Somewhat disagree' }, score: 2 },
    { key: 'D', text: { cs: 'Silně nesouhlasím', en: 'Strongly disagree' }, score: 1 }
  ]},
  { id: 'GM7', text: { cs: 'Talent je důležitější než tvrdá práce.', en: 'Talent is more important than hard work.' }, options: [
    { key: 'A', text: { cs: 'Silně souhlasím', en: 'Strongly agree' }, score: 1 },
    { key: 'B', text: { cs: 'Spíše souhlasím', en: 'Somewhat agree' }, score: 2 },
    { key: 'C', text: { cs: 'Spíše nesouhlasím', en: 'Somewhat disagree' }, score: 3 },
    { key: 'D', text: { cs: 'Silně nesouhlasím', en: 'Strongly disagree' }, score: 4 }
  ]},
  { id: 'GM8', text: { cs: 'Rád/a přijímám nové výzvy, i když jsou těžké.', en: 'I enjoy taking on new challenges, even when they are difficult.' }, options: [
    { key: 'A', text: { cs: 'Silně souhlasím', en: 'Strongly agree' }, score: 4 },
    { key: 'B', text: { cs: 'Spíše souhlasím', en: 'Somewhat agree' }, score: 3 },
    { key: 'C', text: { cs: 'Spíše nesouhlasím', en: 'Somewhat disagree' }, score: 2 },
    { key: 'D', text: { cs: 'Silně nesouhlasím', en: 'Strongly disagree' }, score: 1 }
  ]}
];

export function scoreGrowthMindset(answers: Record<string, 'A' | 'B' | 'C' | 'D'>): AssessmentResult {
  let total = 0;
  for (const q of growthMindsetQuestions) {
    const answer = answers[q.id];
    const opt = q.options.find(o => o.key === answer);
    if (opt) total += opt.score;
  }
  const maxScore = growthMindsetQuestions.length * 4;
  const percent = Math.round((total / maxScore) * 100);

  if (percent >= 75) {
    return { score: total, maxScore, percent,
      label: { cs: 'Silné růstové myšlení', en: 'Strong Growth Mindset' },
      description: { cs: 'Věříš, že schopnosti lze rozvíjet úsilím a učením.', en: 'You believe abilities can be developed through effort and learning.' },
      tips: { cs: ['Pokračuj v přijímání výzev', 'Pomáhej ostatním rozvíjet růstové myšlení', 'Sdílej své strategie učení'], en: ['Continue embracing challenges', 'Help others develop growth mindset', 'Share your learning strategies'] }
    };
  } else if (percent >= 50) {
    return { score: total, maxScore, percent,
      label: { cs: 'Převážně růstové myšlení', en: 'Mostly Growth Mindset' },
      description: { cs: 'Většinou věříš v možnost rozvoje, ale někdy pochybuješ.', en: 'You mostly believe in development potential, but sometimes doubt.' },
      tips: { cs: ['Všímej si svých fixních myšlenek', 'Přeformuluj "neumím to" na "zatím neumím"', 'Oceňuj proces, ne jen výsledek'], en: ['Notice your fixed mindset thoughts', 'Reframe "I can\'t" to "I can\'t yet"', 'Value the process, not just results'] }
    };
  } else if (percent >= 25) {
    return { score: total, maxScore, percent,
      label: { cs: 'Smíšené myšlení', en: 'Mixed Mindset' },
      description: { cs: 'Střídáš mezi fixním a růstovým pohledem.', en: 'You alternate between fixed and growth perspectives.' },
      tips: { cs: ['Zaměř se na učení z chyb', 'Hledej inspiraci v příbězích úspěšných lidí', 'Experimentuj s novými přístupy'], en: ['Focus on learning from mistakes', 'Find inspiration in success stories', 'Experiment with new approaches'] }
    };
  } else {
    return { score: total, maxScore, percent,
      label: { cs: 'Převážně fixní myšlení', en: 'Mostly Fixed Mindset' },
      description: { cs: 'Tendence věřit, že schopnosti jsou dané.', en: 'Tendency to believe abilities are fixed.' },
      tips: { cs: ['Začni s malými výzvami', 'Všímej si svého pokroku', 'Čti o neuroplasticitě mozku'], en: ['Start with small challenges', 'Notice your progress', 'Read about brain neuroplasticity'] }
    };
  }
}

// ============================================
// 2. GRIT SCALE (Angela Duckworth)
// ============================================
export const gritQuestions: AssessmentQuestion[] = [
  { id: 'GR1', text: { cs: 'Nové nápady a projekty mě někdy odvedou od předchozích.', en: 'New ideas and projects sometimes distract me from previous ones.' }, options: [
    { key: 'A', text: { cs: 'Velmi mě vystihuje', en: 'Very much like me' }, score: 1 },
    { key: 'B', text: { cs: 'Většinou mě vystihuje', en: 'Mostly like me' }, score: 2 },
    { key: 'C', text: { cs: 'Spíše mě nevystihuje', en: 'Not much like me' }, score: 3 },
    { key: 'D', text: { cs: 'Vůbec mě nevystihuje', en: 'Not like me at all' }, score: 4 }
  ]},
  { id: 'GR2', text: { cs: 'Překážky mě neodradí. Nevzdávám se snadno.', en: 'Setbacks don\'t discourage me. I don\'t give up easily.' }, options: [
    { key: 'A', text: { cs: 'Velmi mě vystihuje', en: 'Very much like me' }, score: 4 },
    { key: 'B', text: { cs: 'Většinou mě vystihuje', en: 'Mostly like me' }, score: 3 },
    { key: 'C', text: { cs: 'Spíše mě nevystihuje', en: 'Not much like me' }, score: 2 },
    { key: 'D', text: { cs: 'Vůbec mě nevystihuje', en: 'Not like me at all' }, score: 1 }
  ]},
  { id: 'GR3', text: { cs: 'Často si stanovím cíl, ale později ho vyměním za jiný.', en: 'I often set a goal but later choose to pursue a different one.' }, options: [
    { key: 'A', text: { cs: 'Velmi mě vystihuje', en: 'Very much like me' }, score: 1 },
    { key: 'B', text: { cs: 'Většinou mě vystihuje', en: 'Mostly like me' }, score: 2 },
    { key: 'C', text: { cs: 'Spíše mě nevystihuje', en: 'Not much like me' }, score: 3 },
    { key: 'D', text: { cs: 'Vůbec mě nevystihuje', en: 'Not like me at all' }, score: 4 }
  ]},
  { id: 'GR4', text: { cs: 'Jsem pracovitý/á a pilný/á.', en: 'I am a hard worker and diligent.' }, options: [
    { key: 'A', text: { cs: 'Velmi mě vystihuje', en: 'Very much like me' }, score: 4 },
    { key: 'B', text: { cs: 'Většinou mě vystihuje', en: 'Mostly like me' }, score: 3 },
    { key: 'C', text: { cs: 'Spíše mě nevystihuje', en: 'Not much like me' }, score: 2 },
    { key: 'D', text: { cs: 'Vůbec mě nevystihuje', en: 'Not like me at all' }, score: 1 }
  ]},
  { id: 'GR5', text: { cs: 'Mám potíže udržet pozornost na projektech, které trvají déle než pár měsíců.', en: 'I have difficulty maintaining focus on projects that take more than a few months.' }, options: [
    { key: 'A', text: { cs: 'Velmi mě vystihuje', en: 'Very much like me' }, score: 1 },
    { key: 'B', text: { cs: 'Většinou mě vystihuje', en: 'Mostly like me' }, score: 2 },
    { key: 'C', text: { cs: 'Spíše mě nevystihuje', en: 'Not much like me' }, score: 3 },
    { key: 'D', text: { cs: 'Vůbec mě nevystihuje', en: 'Not like me at all' }, score: 4 }
  ]},
  { id: 'GR6', text: { cs: 'Dokončuji vše, co začnu.', en: 'I finish whatever I begin.' }, options: [
    { key: 'A', text: { cs: 'Velmi mě vystihuje', en: 'Very much like me' }, score: 4 },
    { key: 'B', text: { cs: 'Většinou mě vystihuje', en: 'Mostly like me' }, score: 3 },
    { key: 'C', text: { cs: 'Spíše mě nevystihuje', en: 'Not much like me' }, score: 2 },
    { key: 'D', text: { cs: 'Vůbec mě nevystihuje', en: 'Not like me at all' }, score: 1 }
  ]},
  { id: 'GR7', text: { cs: 'Moje zájmy se mění rok od roku.', en: 'My interests change from year to year.' }, options: [
    { key: 'A', text: { cs: 'Velmi mě vystihuje', en: 'Very much like me' }, score: 1 },
    { key: 'B', text: { cs: 'Většinou mě vystihuje', en: 'Mostly like me' }, score: 2 },
    { key: 'C', text: { cs: 'Spíše mě nevystihuje', en: 'Not much like me' }, score: 3 },
    { key: 'D', text: { cs: 'Vůbec mě nevystihuje', en: 'Not like me at all' }, score: 4 }
  ]},
  { id: 'GR8', text: { cs: 'Jsem soustředěný/á a nenechám se snadno rozptýlit.', en: 'I am focused and don\'t get easily distracted.' }, options: [
    { key: 'A', text: { cs: 'Velmi mě vystihuje', en: 'Very much like me' }, score: 4 },
    { key: 'B', text: { cs: 'Většinou mě vystihuje', en: 'Mostly like me' }, score: 3 },
    { key: 'C', text: { cs: 'Spíše mě nevystihuje', en: 'Not much like me' }, score: 2 },
    { key: 'D', text: { cs: 'Vůbec mě nevystihuje', en: 'Not like me at all' }, score: 1 }
  ]}
];

export function scoreGrit(answers: Record<string, 'A' | 'B' | 'C' | 'D'>): AssessmentResult {
  let total = 0;
  for (const q of gritQuestions) {
    const answer = answers[q.id];
    const opt = q.options.find(o => o.key === answer);
    if (opt) total += opt.score;
  }
  const maxScore = gritQuestions.length * 4;
  const percent = Math.round((total / maxScore) * 100);

  if (percent >= 75) {
    return { score: total, maxScore, percent,
      label: { cs: 'Vysoká vytrvalost (Grit)', en: 'High Grit' },
      description: { cs: 'Máš silnou vytrvalost a schopnost dotahovat věci do konce.', en: 'You have strong perseverance and ability to see things through.' },
      tips: { cs: ['Využij svou vytrvalost pro náročné dlouhodobé cíle', 'Pomáhej ostatním s motivací', 'Hledej mentory pro další růst'], en: ['Use your grit for challenging long-term goals', 'Help others with motivation', 'Seek mentors for further growth'] }
    };
  } else if (percent >= 50) {
    return { score: total, maxScore, percent,
      label: { cs: 'Dobrá vytrvalost', en: 'Good Perseverance' },
      description: { cs: 'Většinou dokážeš vytrvat, ale někdy se necháš odvést.', en: 'You can usually persevere, but sometimes get sidetracked.' },
      tips: { cs: ['Rozděluj velké cíle na menší kroky', 'Najdi si accountability partnera', 'Slaví malé úspěchy'], en: ['Break big goals into smaller steps', 'Find an accountability partner', 'Celebrate small wins'] }
    };
  } else if (percent >= 25) {
    return { score: total, maxScore, percent,
      label: { cs: 'Rozvíjející se vytrvalost', en: 'Developing Perseverance' },
      description: { cs: 'Máš tendenci měnit směr, ale můžeš to zlepšit.', en: 'You tend to change direction, but you can improve.' },
      tips: { cs: ['Začni s kratšími projekty', 'Veď si deník pokroku', 'Najdi svou vášeň'], en: ['Start with shorter projects', 'Keep a progress journal', 'Find your passion'] }
    };
  } else {
    return { score: total, maxScore, percent,
      label: { cs: 'Nízká vytrvalost', en: 'Low Perseverance' },
      description: { cs: 'Často měníš cíle a zájmy.', en: 'You often change goals and interests.' },
      tips: { cs: ['Zaměř se na jeden cíl', 'Vytvoř si rutiny', 'Najdi důvod PROČ'], en: ['Focus on one goal', 'Create routines', 'Find your WHY'] }
    };
  }
}

// ============================================
// 3. SELF-EFFICACY (Albert Bandura)
// ============================================
export const selfEfficacyQuestions: AssessmentQuestion[] = [
  { id: 'SE1', text: { cs: 'Věřím, že zvládnu obtížné úkoly, když se budu snažit.', en: 'I believe I can handle difficult tasks if I try.' }, options: [
    { key: 'A', text: { cs: 'Rozhodně ano', en: 'Definitely yes' }, score: 4 },
    { key: 'B', text: { cs: 'Spíše ano', en: 'Mostly yes' }, score: 3 },
    { key: 'C', text: { cs: 'Spíše ne', en: 'Mostly no' }, score: 2 },
    { key: 'D', text: { cs: 'Rozhodně ne', en: 'Definitely no' }, score: 1 }
  ]},
  { id: 'SE2', text: { cs: 'Když čelím problému, obvykle najdu řešení.', en: 'When I face a problem, I usually find a solution.' }, options: [
    { key: 'A', text: { cs: 'Rozhodně ano', en: 'Definitely yes' }, score: 4 },
    { key: 'B', text: { cs: 'Spíše ano', en: 'Mostly yes' }, score: 3 },
    { key: 'C', text: { cs: 'Spíše ne', en: 'Mostly no' }, score: 2 },
    { key: 'D', text: { cs: 'Rozhodně ne', en: 'Definitely no' }, score: 1 }
  ]},
  { id: 'SE3', text: { cs: 'Dokážu zůstat klidný/á, když čelím obtížím.', en: 'I can stay calm when facing difficulties.' }, options: [
    { key: 'A', text: { cs: 'Rozhodně ano', en: 'Definitely yes' }, score: 4 },
    { key: 'B', text: { cs: 'Spíše ano', en: 'Mostly yes' }, score: 3 },
    { key: 'C', text: { cs: 'Spíše ne', en: 'Mostly no' }, score: 2 },
    { key: 'D', text: { cs: 'Rozhodně ne', en: 'Definitely no' }, score: 1 }
  ]},
  { id: 'SE4', text: { cs: 'Když se něco nedaří, pochybuji o svých schopnostech.', en: 'When things don\'t go well, I doubt my abilities.' }, options: [
    { key: 'A', text: { cs: 'Rozhodně ano', en: 'Definitely yes' }, score: 1 },
    { key: 'B', text: { cs: 'Spíše ano', en: 'Mostly yes' }, score: 2 },
    { key: 'C', text: { cs: 'Spíše ne', en: 'Mostly no' }, score: 3 },
    { key: 'D', text: { cs: 'Rozhodně ne', en: 'Definitely no' }, score: 4 }
  ]},
  { id: 'SE5', text: { cs: 'Věřím, že mohu dosáhnout většiny cílů, které si stanovím.', en: 'I believe I can achieve most goals I set for myself.' }, options: [
    { key: 'A', text: { cs: 'Rozhodně ano', en: 'Definitely yes' }, score: 4 },
    { key: 'B', text: { cs: 'Spíše ano', en: 'Mostly yes' }, score: 3 },
    { key: 'C', text: { cs: 'Spíše ne', en: 'Mostly no' }, score: 2 },
    { key: 'D', text: { cs: 'Rozhodně ne', en: 'Definitely no' }, score: 1 }
  ]},
  { id: 'SE6', text: { cs: 'Umím se vypořádat s nečekanými situacemi.', en: 'I can handle unexpected situations.' }, options: [
    { key: 'A', text: { cs: 'Rozhodně ano', en: 'Definitely yes' }, score: 4 },
    { key: 'B', text: { cs: 'Spíše ano', en: 'Mostly yes' }, score: 3 },
    { key: 'C', text: { cs: 'Spíše ne', en: 'Mostly no' }, score: 2 },
    { key: 'D', text: { cs: 'Rozhodně ne', en: 'Definitely no' }, score: 1 }
  ]},
  { id: 'SE7', text: { cs: 'Mám dovednosti potřebné k úspěchu ve škole.', en: 'I have the skills needed to succeed in school.' }, options: [
    { key: 'A', text: { cs: 'Rozhodně ano', en: 'Definitely yes' }, score: 4 },
    { key: 'B', text: { cs: 'Spíše ano', en: 'Mostly yes' }, score: 3 },
    { key: 'C', text: { cs: 'Spíše ne', en: 'Mostly no' }, score: 2 },
    { key: 'D', text: { cs: 'Rozhodně ne', en: 'Definitely no' }, score: 1 }
  ]},
  { id: 'SE8', text: { cs: 'Když selžu, cítím se neschopný/á.', en: 'When I fail, I feel incompetent.' }, options: [
    { key: 'A', text: { cs: 'Rozhodně ano', en: 'Definitely yes' }, score: 1 },
    { key: 'B', text: { cs: 'Spíše ano', en: 'Mostly yes' }, score: 2 },
    { key: 'C', text: { cs: 'Spíše ne', en: 'Mostly no' }, score: 3 },
    { key: 'D', text: { cs: 'Rozhodně ne', en: 'Definitely no' }, score: 4 }
  ]}
];

export function scoreSelfEfficacy(answers: Record<string, 'A' | 'B' | 'C' | 'D'>): AssessmentResult {
  let total = 0;
  for (const q of selfEfficacyQuestions) {
    const answer = answers[q.id];
    const opt = q.options.find(o => o.key === answer);
    if (opt) total += opt.score;
  }
  const maxScore = selfEfficacyQuestions.length * 4;
  const percent = Math.round((total / maxScore) * 100);

  if (percent >= 75) {
    return { score: total, maxScore, percent,
      label: { cs: 'Vysoká self-efficacy', en: 'High Self-Efficacy' },
      description: { cs: 'Silně věříš ve své schopnosti a zvládání výzev.', en: 'You strongly believe in your abilities and handling challenges.' },
      tips: { cs: ['Přijímej náročnější výzvy', 'Buď mentorem pro ostatní', 'Stanovuj si ambiciózní cíle'], en: ['Take on more challenging goals', 'Be a mentor to others', 'Set ambitious goals'] }
    };
  } else if (percent >= 50) {
    return { score: total, maxScore, percent,
      label: { cs: 'Dobrá self-efficacy', en: 'Good Self-Efficacy' },
      description: { cs: 'Věříš si ve většině situací.', en: 'You believe in yourself in most situations.' },
      tips: { cs: ['Zaznamenávej své úspěchy', 'Vizualizuj úspěšné zvládnutí úkolů', 'Hledej pozitivní zpětnou vazbu'], en: ['Record your successes', 'Visualize successful task completion', 'Seek positive feedback'] }
    };
  } else if (percent >= 25) {
    return { score: total, maxScore, percent,
      label: { cs: 'Střední self-efficacy', en: 'Moderate Self-Efficacy' },
      description: { cs: 'Občas pochybuješ o svých schopnostech.', en: 'You sometimes doubt your abilities.' },
      tips: { cs: ['Začni s menšími úkoly a postupně zvyšuj', 'Najdi vzory, které tě inspirují', 'Pracuj na pozitivním self-talku'], en: ['Start with smaller tasks and gradually increase', 'Find role models who inspire you', 'Work on positive self-talk'] }
    };
  } else {
    return { score: total, maxScore, percent,
      label: { cs: 'Nízká self-efficacy', en: 'Low Self-Efficacy' },
      description: { cs: 'Často pochybuješ o svých schopnostech.', en: 'You often doubt your abilities.' },
      tips: { cs: ['Začni velmi malými kroky', 'Veď si deník úspěchů', 'Vyhledej podporu od blízkých'], en: ['Start with very small steps', 'Keep a success journal', 'Seek support from loved ones'] }
    };
  }
}

// ============================================
// 4. TEST ANXIETY
// ============================================
export const testAnxietyQuestions: AssessmentQuestion[] = [
  { id: 'TA1', text: { cs: 'Před zkouškou cítím nervozitu v břiše.', en: 'Before an exam, I feel nervous in my stomach.' }, options: [
    { key: 'A', text: { cs: 'Skoro vždy', en: 'Almost always' }, score: 1 },
    { key: 'B', text: { cs: 'Často', en: 'Often' }, score: 2 },
    { key: 'C', text: { cs: 'Občas', en: 'Sometimes' }, score: 3 },
    { key: 'D', text: { cs: 'Téměř nikdy', en: 'Almost never' }, score: 4 }
  ]},
  { id: 'TA2', text: { cs: 'Během testu mi bušní srdce a mám zpocené ruce.', en: 'During a test, my heart pounds and my hands get sweaty.' }, options: [
    { key: 'A', text: { cs: 'Skoro vždy', en: 'Almost always' }, score: 1 },
    { key: 'B', text: { cs: 'Často', en: 'Often' }, score: 2 },
    { key: 'C', text: { cs: 'Občas', en: 'Sometimes' }, score: 3 },
    { key: 'D', text: { cs: 'Téměř nikdy', en: 'Almost never' }, score: 4 }
  ]},
  { id: 'TA3', text: { cs: 'Mám strach, že neuspěji, i když jsem se učil/a.', en: 'I\'m afraid I\'ll fail, even when I\'ve studied.' }, options: [
    { key: 'A', text: { cs: 'Skoro vždy', en: 'Almost always' }, score: 1 },
    { key: 'B', text: { cs: 'Často', en: 'Often' }, score: 2 },
    { key: 'C', text: { cs: 'Občas', en: 'Sometimes' }, score: 3 },
    { key: 'D', text: { cs: 'Téměř nikdy', en: 'Almost never' }, score: 4 }
  ]},
  { id: 'TA4', text: { cs: 'Při testu mi vypadávají věci z hlavy, které jsem znal/a.', en: 'During tests, I forget things I knew before.' }, options: [
    { key: 'A', text: { cs: 'Skoro vždy', en: 'Almost always' }, score: 1 },
    { key: 'B', text: { cs: 'Často', en: 'Often' }, score: 2 },
    { key: 'C', text: { cs: 'Občas', en: 'Sometimes' }, score: 3 },
    { key: 'D', text: { cs: 'Téměř nikdy', en: 'Almost never' }, score: 4 }
  ]},
  { id: 'TA5', text: { cs: 'Srovnávám se s ostatními a mám strach, že jsem horší.', en: 'I compare myself to others and fear I\'m worse.' }, options: [
    { key: 'A', text: { cs: 'Skoro vždy', en: 'Almost always' }, score: 1 },
    { key: 'B', text: { cs: 'Často', en: 'Often' }, score: 2 },
    { key: 'C', text: { cs: 'Občas', en: 'Sometimes' }, score: 3 },
    { key: 'D', text: { cs: 'Téměř nikdy', en: 'Almost never' }, score: 4 }
  ]},
  { id: 'TA6', text: { cs: 'Před důležitou zkouškou špatně spím.', en: 'Before an important exam, I sleep poorly.' }, options: [
    { key: 'A', text: { cs: 'Skoro vždy', en: 'Almost always' }, score: 1 },
    { key: 'B', text: { cs: 'Často', en: 'Often' }, score: 2 },
    { key: 'C', text: { cs: 'Občas', en: 'Sometimes' }, score: 3 },
    { key: 'D', text: { cs: 'Téměř nikdy', en: 'Almost never' }, score: 4 }
  ]},
  { id: 'TA7', text: { cs: 'Po testu se trápím, jestli jsem odpověděl/a správně.', en: 'After a test, I worry whether I answered correctly.' }, options: [
    { key: 'A', text: { cs: 'Skoro vždy', en: 'Almost always' }, score: 1 },
    { key: 'B', text: { cs: 'Často', en: 'Often' }, score: 2 },
    { key: 'C', text: { cs: 'Občas', en: 'Sometimes' }, score: 3 },
    { key: 'D', text: { cs: 'Téměř nikdy', en: 'Almost never' }, score: 4 }
  ]},
  { id: 'TA8', text: { cs: 'Myšlenky na testy mi kazí náladu i mimo školu.', en: 'Thoughts about tests affect my mood even outside school.' }, options: [
    { key: 'A', text: { cs: 'Skoro vždy', en: 'Almost always' }, score: 1 },
    { key: 'B', text: { cs: 'Často', en: 'Often' }, score: 2 },
    { key: 'C', text: { cs: 'Občas', en: 'Sometimes' }, score: 3 },
    { key: 'D', text: { cs: 'Téměř nikdy', en: 'Almost never' }, score: 4 }
  ]}
];

export function scoreTestAnxiety(answers: Record<string, 'A' | 'B' | 'C' | 'D'>): AssessmentResult {
  let total = 0;
  for (const q of testAnxietyQuestions) {
    const answer = answers[q.id];
    const opt = q.options.find(o => o.key === answer);
    if (opt) total += opt.score;
  }
  const maxScore = testAnxietyQuestions.length * 4;
  const percent = Math.round((total / maxScore) * 100);

  // Note: Higher score = LESS anxiety (better)
  if (percent >= 75) {
    return { score: total, maxScore, percent,
      label: { cs: 'Nízká testová úzkost', en: 'Low Test Anxiety' },
      description: { cs: 'Zkoušky tě příliš nestresují.', en: 'Exams don\'t stress you much.' },
      tips: { cs: ['Udržuj zdravé návyky', 'Pomáhej spolužákům se zvládáním stresu', 'Využij svůj klid pro náročnější výzvy'], en: ['Maintain healthy habits', 'Help classmates manage stress', 'Use your calm for bigger challenges'] }
    };
  } else if (percent >= 50) {
    return { score: total, maxScore, percent,
      label: { cs: 'Mírná testová úzkost', en: 'Mild Test Anxiety' },
      description: { cs: 'Občas cítíš stres před zkouškami.', en: 'You sometimes feel stressed before exams.' },
      tips: { cs: ['Nauč se dechová cvičení', 'Připravuj se s dostatečným předstihem', 'Vyzkoušej progresivní svalovou relaxaci'], en: ['Learn breathing exercises', 'Prepare well in advance', 'Try progressive muscle relaxation'] }
    };
  } else if (percent >= 25) {
    return { score: total, maxScore, percent,
      label: { cs: 'Vyšší testová úzkost', en: 'Moderate Test Anxiety' },
      description: { cs: 'Zkoušky ti působí značný stres.', en: 'Exams cause you significant stress.' },
      tips: { cs: ['Praktikuj mindfulness', 'Vytvoř si relaxační rutinu', 'Mluv o svých obavách s někým blízkým'], en: ['Practice mindfulness', 'Create a relaxation routine', 'Talk about your worries with someone close'] }
    };
  } else {
    return { score: total, maxScore, percent,
      label: { cs: 'Vysoká testová úzkost', en: 'High Test Anxiety' },
      description: { cs: 'Zkoušky ti způsobují silný stres.', en: 'Exams cause you strong stress.' },
      tips: { cs: ['Vyhledej podporu školního psychologa', 'Nauč se techniky zvládání úzkosti', 'Zaměř se na proces, ne na výsledek'], en: ['Seek support from school counselor', 'Learn anxiety management techniques', 'Focus on process, not results'] }
    };
  }
}

// ============================================
// 5. METACOGNITION
// ============================================
export const metacognitionQuestions: AssessmentQuestion[] = [
  { id: 'MC1', text: { cs: 'Před učením si plánuji, jak budu postupovat.', en: 'Before studying, I plan how I will proceed.' }, options: [
    { key: 'A', text: { cs: 'Vždy', en: 'Always' }, score: 4 },
    { key: 'B', text: { cs: 'Často', en: 'Often' }, score: 3 },
    { key: 'C', text: { cs: 'Občas', en: 'Sometimes' }, score: 2 },
    { key: 'D', text: { cs: 'Nikdy', en: 'Never' }, score: 1 }
  ]},
  { id: 'MC2', text: { cs: 'Během učení si kontroluji, jestli látce rozumím.', en: 'While studying, I check if I understand the material.' }, options: [
    { key: 'A', text: { cs: 'Vždy', en: 'Always' }, score: 4 },
    { key: 'B', text: { cs: 'Často', en: 'Often' }, score: 3 },
    { key: 'C', text: { cs: 'Občas', en: 'Sometimes' }, score: 2 },
    { key: 'D', text: { cs: 'Nikdy', en: 'Never' }, score: 1 }
  ]},
  { id: 'MC3', text: { cs: 'Když něčemu nerozumím, zkouším jiný přístup.', en: 'When I don\'t understand something, I try a different approach.' }, options: [
    { key: 'A', text: { cs: 'Vždy', en: 'Always' }, score: 4 },
    { key: 'B', text: { cs: 'Často', en: 'Often' }, score: 3 },
    { key: 'C', text: { cs: 'Občas', en: 'Sometimes' }, score: 2 },
    { key: 'D', text: { cs: 'Nikdy', en: 'Never' }, score: 1 }
  ]},
  { id: 'MC4', text: { cs: 'Po učení zhodnotím, co jsem se naučil/a.', en: 'After studying, I evaluate what I\'ve learned.' }, options: [
    { key: 'A', text: { cs: 'Vždy', en: 'Always' }, score: 4 },
    { key: 'B', text: { cs: 'Často', en: 'Often' }, score: 3 },
    { key: 'C', text: { cs: 'Občas', en: 'Sometimes' }, score: 2 },
    { key: 'D', text: { cs: 'Nikdy', en: 'Never' }, score: 1 }
  ]},
  { id: 'MC5', text: { cs: 'Vím, které učební strategie mi fungují nejlépe.', en: 'I know which learning strategies work best for me.' }, options: [
    { key: 'A', text: { cs: 'Rozhodně ano', en: 'Definitely yes' }, score: 4 },
    { key: 'B', text: { cs: 'Spíše ano', en: 'Mostly yes' }, score: 3 },
    { key: 'C', text: { cs: 'Spíše ne', en: 'Mostly no' }, score: 2 },
    { key: 'D', text: { cs: 'Rozhodně ne', en: 'Definitely no' }, score: 1 }
  ]},
  { id: 'MC6', text: { cs: 'Kladu si otázky o tom, co se učím.', en: 'I ask myself questions about what I\'m learning.' }, options: [
    { key: 'A', text: { cs: 'Vždy', en: 'Always' }, score: 4 },
    { key: 'B', text: { cs: 'Často', en: 'Often' }, score: 3 },
    { key: 'C', text: { cs: 'Občas', en: 'Sometimes' }, score: 2 },
    { key: 'D', text: { cs: 'Nikdy', en: 'Never' }, score: 1 }
  ]},
  { id: 'MC7', text: { cs: 'Dokážu odhadnout, jak mi půjde test.', en: 'I can estimate how well I\'ll do on a test.' }, options: [
    { key: 'A', text: { cs: 'Velmi přesně', en: 'Very accurately' }, score: 4 },
    { key: 'B', text: { cs: 'Celkem přesně', en: 'Fairly accurately' }, score: 3 },
    { key: 'C', text: { cs: 'Nepřesně', en: 'Inaccurately' }, score: 2 },
    { key: 'D', text: { cs: 'Vůbec ne', en: 'Not at all' }, score: 1 }
  ]},
  { id: 'MC8', text: { cs: 'Přemýšlím o tom, proč se něco učím.', en: 'I think about why I\'m learning something.' }, options: [
    { key: 'A', text: { cs: 'Vždy', en: 'Always' }, score: 4 },
    { key: 'B', text: { cs: 'Často', en: 'Often' }, score: 3 },
    { key: 'C', text: { cs: 'Občas', en: 'Sometimes' }, score: 2 },
    { key: 'D', text: { cs: 'Nikdy', en: 'Never' }, score: 1 }
  ]}
];

export function scoreMetacognition(answers: Record<string, 'A' | 'B' | 'C' | 'D'>): AssessmentResult {
  let total = 0;
  for (const q of metacognitionQuestions) {
    const answer = answers[q.id];
    const opt = q.options.find(o => o.key === answer);
    if (opt) total += opt.score;
  }
  const maxScore = metacognitionQuestions.length * 4;
  const percent = Math.round((total / maxScore) * 100);

  if (percent >= 75) {
    return { score: total, maxScore, percent,
      label: { cs: 'Vysoká metakognice', en: 'High Metacognition' },
      description: { cs: 'Dobře znáš své myšlení a umíš se efektivně učit.', en: 'You know your thinking well and learn effectively.' },
      tips: { cs: ['Sdílej své strategie s ostatními', 'Zkoušej pokročilé techniky učení', 'Pomáhej spolužákům'], en: ['Share your strategies with others', 'Try advanced learning techniques', 'Help classmates'] }
    };
  } else if (percent >= 50) {
    return { score: total, maxScore, percent,
      label: { cs: 'Dobrá metakognice', en: 'Good Metacognition' },
      description: { cs: 'Většinou si uvědomuješ své učení.', en: 'You\'re usually aware of your learning.' },
      tips: { cs: ['Veď si učební deník', 'Experimentuj s novými technikami', 'Ptej se sám sebe "proč?"'], en: ['Keep a learning journal', 'Experiment with new techniques', 'Ask yourself "why?"'] }
    };
  } else if (percent >= 25) {
    return { score: total, maxScore, percent,
      label: { cs: 'Rozvíjející se metakognice', en: 'Developing Metacognition' },
      description: { cs: 'Máš prostor pro lepší uvědomění svého učení.', en: 'There\'s room to improve your learning awareness.' },
      tips: { cs: ['Začni si klást otázky během učení', 'Zkus techniku "think aloud"', 'Plánuj si učení dopředu'], en: ['Start asking questions while studying', 'Try "think aloud" technique', 'Plan your learning ahead'] }
    };
  } else {
    return { score: total, maxScore, percent,
      label: { cs: 'Nízká metakognice', en: 'Low Metacognition' },
      description: { cs: 'Zatím se příliš nezamýšlíš nad svým učením.', en: 'You don\'t think much about your learning yet.' },
      tips: { cs: ['Začni jednoduchými otázkami: Co? Proč? Jak?', 'Po každém učení si řekni, co sis zapamatoval/a', 'Zkus Feynmanovu techniku'], en: ['Start with simple questions: What? Why? How?', 'After each study session, recall what you learned', 'Try the Feynman technique'] }
    };
  }
}

// ============================================
// 6. RIASEC / HOLLAND (Career Interests)
// ============================================
export interface RiasecQuestion {
  id: string;
  text: { cs: string; en: string };
  type: 'R' | 'I' | 'A' | 'S' | 'E' | 'C';
}

export const riasecQuestions: RiasecQuestion[] = [
  // Realistic
  { id: 'R1', text: { cs: 'Rád/a pracuji s nástroji a stroji.', en: 'I like working with tools and machines.' }, type: 'R' },
  { id: 'R2', text: { cs: 'Baví mě opravovat věci nebo stavět.', en: 'I enjoy fixing things or building.' }, type: 'R' },
  // Investigative
  { id: 'I1', text: { cs: 'Rád/a řeším složité problémy a hádanky.', en: 'I like solving complex problems and puzzles.' }, type: 'I' },
  { id: 'I2', text: { cs: 'Zajímají mě vědecké otázky a výzkum.', en: 'I\'m interested in scientific questions and research.' }, type: 'I' },
  // Artistic
  { id: 'A1', text: { cs: 'Rád/a tvořím - kreslím, píšu, hraji hudbu.', en: 'I like creating - drawing, writing, playing music.' }, type: 'A' },
  { id: 'A2', text: { cs: 'Oceňuji originalitu a kreativní vyjádření.', en: 'I value originality and creative expression.' }, type: 'A' },
  // Social
  { id: 'S1', text: { cs: 'Rád/a pomáhám druhým a učím je.', en: 'I like helping and teaching others.' }, type: 'S' },
  { id: 'S2', text: { cs: 'Baví mě práce v týmu a komunikace s lidmi.', en: 'I enjoy teamwork and communicating with people.' }, type: 'S' },
  // Enterprising
  { id: 'E1', text: { cs: 'Rád/a vedu projekty a přesvědčuji ostatní.', en: 'I like leading projects and persuading others.' }, type: 'E' },
  { id: 'E2', text: { cs: 'Láká mě podnikání a dosahování cílů.', en: 'I\'m attracted to business and achieving goals.' }, type: 'E' },
  // Conventional
  { id: 'C1', text: { cs: 'Rád/a pracuji s daty, čísly a detaily.', en: 'I like working with data, numbers, and details.' }, type: 'C' },
  { id: 'C2', text: { cs: 'Oceňuji strukturu, pořádek a jasná pravidla.', en: 'I value structure, order, and clear rules.' }, type: 'C' }
];

export interface RiasecResult {
  scores: { type: string; label: { cs: string; en: string }; score: number; percent: number; careers: { cs: string[]; en: string[] } }[];
  topTypes: string[];
  code: string;
  description: { cs: string; en: string };
}

const riasecLabels: Record<string, { label: { cs: string; en: string }; careers: { cs: string[]; en: string[] } }> = {
  R: { label: { cs: 'Praktický (Realistic)', en: 'Realistic (Practical)' }, careers: { cs: ['Inženýr', 'Technik', 'Mechanik', 'Architekt', 'IT specialista'], en: ['Engineer', 'Technician', 'Mechanic', 'Architect', 'IT Specialist'] } },
  I: { label: { cs: 'Zkoumající (Investigative)', en: 'Investigative (Analytical)' }, careers: { cs: ['Vědec', 'Lékař', 'Analytik', 'Programátor', 'Výzkumník'], en: ['Scientist', 'Doctor', 'Analyst', 'Programmer', 'Researcher'] } },
  A: { label: { cs: 'Umělecký (Artistic)', en: 'Artistic (Creative)' }, careers: { cs: ['Designér', 'Umělec', 'Spisovatel', 'Hudebník', 'Fotograf'], en: ['Designer', 'Artist', 'Writer', 'Musician', 'Photographer'] } },
  S: { label: { cs: 'Sociální (Social)', en: 'Social (Helper)' }, careers: { cs: ['Učitel', 'Psycholog', 'Sociální pracovník', 'Zdravotní sestra', 'Kouč'], en: ['Teacher', 'Psychologist', 'Social Worker', 'Nurse', 'Coach'] } },
  E: { label: { cs: 'Podnikavý (Enterprising)', en: 'Enterprising (Persuader)' }, careers: { cs: ['Manažer', 'Podnikatel', 'Obchodník', 'Právník', 'Politik'], en: ['Manager', 'Entrepreneur', 'Salesperson', 'Lawyer', 'Politician'] } },
  C: { label: { cs: 'Konvenční (Conventional)', en: 'Conventional (Organizer)' }, careers: { cs: ['Účetní', 'Administrativní pracovník', 'Bankéř', 'Auditor', 'Knihovník'], en: ['Accountant', 'Administrative Worker', 'Banker', 'Auditor', 'Librarian'] } }
};

// Helper to get RIASEC question text
export function getRiasecQuestionText(question: RiasecQuestion, lang: Language): string {
  return question.text[lang];
}

export function scoreRiasec(answers: Record<string, number>): RiasecResult {
  const scores: Record<string, number> = { R: 0, I: 0, A: 0, S: 0, E: 0, C: 0 };

  for (const q of riasecQuestions) {
    const answer = answers[q.id] || 0;
    scores[q.type] += answer;
  }

  const maxPerType = 2 * 4; // 2 questions * max 4 points

  const result = Object.entries(scores).map(([type, score]) => ({
    type,
    label: riasecLabels[type].label,
    score,
    percent: Math.round((score / maxPerType) * 100),
    careers: riasecLabels[type].careers
  })).sort((a, b) => b.score - a.score);

  const topTypes = result.slice(0, 3).map(r => r.type);
  const code = topTypes.join('');

  return {
    scores: result,
    topTypes,
    code,
    description: {
      cs: `Tvůj Holland kód je ${code}. Nejvíce ti sedí ${result[0].label.cs.split(' ')[0].toLowerCase()} a ${result[1].label.cs.split(' ')[0].toLowerCase()} zaměření.`,
      en: `Your Holland code is ${code}. You best fit ${result[0].label.en.split(' ')[0].toLowerCase()} and ${result[1].label.en.split(' ')[0].toLowerCase()} orientations.`
    }
  };
}

// ============================================
// 7. EMOTIONAL INTELLIGENCE (EQ)
// ============================================
export const eqQuestions: AssessmentQuestion[] = [
  // Self-awareness
  { id: 'EQ1', text: { cs: 'Dokážu rozpoznat své emoce, když je prožívám.', en: 'I can recognize my emotions when I experience them.' }, options: [
    { key: 'A', text: { cs: 'Vždy', en: 'Always' }, score: 4 },
    { key: 'B', text: { cs: 'Často', en: 'Often' }, score: 3 },
    { key: 'C', text: { cs: 'Občas', en: 'Sometimes' }, score: 2 },
    { key: 'D', text: { cs: 'Zřídka', en: 'Rarely' }, score: 1 }
  ]},
  { id: 'EQ2', text: { cs: 'Vím, co mě rozčílí nebo rozesmutní.', en: 'I know what makes me angry or sad.' }, options: [
    { key: 'A', text: { cs: 'Vždy', en: 'Always' }, score: 4 },
    { key: 'B', text: { cs: 'Často', en: 'Often' }, score: 3 },
    { key: 'C', text: { cs: 'Občas', en: 'Sometimes' }, score: 2 },
    { key: 'D', text: { cs: 'Zřídka', en: 'Rarely' }, score: 1 }
  ]},
  // Self-regulation
  { id: 'EQ3', text: { cs: 'Umím se uklidnit, když jsem naštvaný/á.', en: 'I can calm down when I\'m angry.' }, options: [
    { key: 'A', text: { cs: 'Vždy', en: 'Always' }, score: 4 },
    { key: 'B', text: { cs: 'Často', en: 'Often' }, score: 3 },
    { key: 'C', text: { cs: 'Občas', en: 'Sometimes' }, score: 2 },
    { key: 'D', text: { cs: 'Zřídka', en: 'Rarely' }, score: 1 }
  ]},
  { id: 'EQ4', text: { cs: 'Dokážu ovládat své impulzivní reakce.', en: 'I can control my impulsive reactions.' }, options: [
    { key: 'A', text: { cs: 'Vždy', en: 'Always' }, score: 4 },
    { key: 'B', text: { cs: 'Často', en: 'Often' }, score: 3 },
    { key: 'C', text: { cs: 'Občas', en: 'Sometimes' }, score: 2 },
    { key: 'D', text: { cs: 'Zřídka', en: 'Rarely' }, score: 1 }
  ]},
  // Empathy
  { id: 'EQ5', text: { cs: 'Cítím, jak se druzí cítí.', en: 'I can sense how others feel.' }, options: [
    { key: 'A', text: { cs: 'Vždy', en: 'Always' }, score: 4 },
    { key: 'B', text: { cs: 'Často', en: 'Often' }, score: 3 },
    { key: 'C', text: { cs: 'Občas', en: 'Sometimes' }, score: 2 },
    { key: 'D', text: { cs: 'Zřídka', en: 'Rarely' }, score: 1 }
  ]},
  { id: 'EQ6', text: { cs: 'Dokážu se vcítit do situace druhých.', en: 'I can put myself in others\' shoes.' }, options: [
    { key: 'A', text: { cs: 'Vždy', en: 'Always' }, score: 4 },
    { key: 'B', text: { cs: 'Často', en: 'Often' }, score: 3 },
    { key: 'C', text: { cs: 'Občas', en: 'Sometimes' }, score: 2 },
    { key: 'D', text: { cs: 'Zřídka', en: 'Rarely' }, score: 1 }
  ]},
  // Social skills
  { id: 'EQ7', text: { cs: 'Umím řešit konflikty klidně a konstruktivně.', en: 'I can resolve conflicts calmly and constructively.' }, options: [
    { key: 'A', text: { cs: 'Vždy', en: 'Always' }, score: 4 },
    { key: 'B', text: { cs: 'Často', en: 'Often' }, score: 3 },
    { key: 'C', text: { cs: 'Občas', en: 'Sometimes' }, score: 2 },
    { key: 'D', text: { cs: 'Zřídka', en: 'Rarely' }, score: 1 }
  ]},
  { id: 'EQ8', text: { cs: 'Snadno navazuji vztahy s novými lidmi.', en: 'I easily build relationships with new people.' }, options: [
    { key: 'A', text: { cs: 'Vždy', en: 'Always' }, score: 4 },
    { key: 'B', text: { cs: 'Často', en: 'Often' }, score: 3 },
    { key: 'C', text: { cs: 'Občas', en: 'Sometimes' }, score: 2 },
    { key: 'D', text: { cs: 'Zřídka', en: 'Rarely' }, score: 1 }
  ]}
];

export function scoreEQ(answers: Record<string, 'A' | 'B' | 'C' | 'D'>): AssessmentResult {
  let total = 0;
  for (const q of eqQuestions) {
    const answer = answers[q.id];
    const opt = q.options.find(o => o.key === answer);
    if (opt) total += opt.score;
  }
  const maxScore = eqQuestions.length * 4;
  const percent = Math.round((total / maxScore) * 100);

  if (percent >= 75) {
    return { score: total, maxScore, percent,
      label: { cs: 'Vysoká emoční inteligence', en: 'High Emotional Intelligence' },
      description: { cs: 'Dobře rozumíš emocím svým i ostatních.', en: 'You understand your emotions and others\' well.' },
      tips: { cs: ['Využij EQ pro leadership role', 'Pomáhej ostatním s emocemi', 'Rozvíjej pokročilé sociální dovednosti'], en: ['Use EQ for leadership roles', 'Help others with emotions', 'Develop advanced social skills'] }
    };
  } else if (percent >= 50) {
    return { score: total, maxScore, percent,
      label: { cs: 'Dobrá emoční inteligence', en: 'Good Emotional Intelligence' },
      description: { cs: 'Většinou se orientuješ v emocích.', en: 'You usually navigate emotions well.' },
      tips: { cs: ['Praktikuj aktivní naslouchání', 'Všímej si neverbální komunikace', 'Veď si emoční deník'], en: ['Practice active listening', 'Notice non-verbal communication', 'Keep an emotion journal'] }
    };
  } else if (percent >= 25) {
    return { score: total, maxScore, percent,
      label: { cs: 'Rozvíjející se EQ', en: 'Developing EQ' },
      description: { cs: 'Máš prostor pro rozvoj emoční inteligence.', en: 'There\'s room to develop your emotional intelligence.' },
      tips: { cs: ['Pojmenovávej své emoce', 'Ptej se ostatních, jak se cítí', 'Čti o emocích a empatii'], en: ['Name your emotions', 'Ask others how they feel', 'Read about emotions and empathy'] }
    };
  } else {
    return { score: total, maxScore, percent,
      label: { cs: 'Nižší emoční inteligence', en: 'Lower Emotional Intelligence' },
      description: { cs: 'Emoce ti někdy dělají potíže.', en: 'Emotions sometimes give you trouble.' },
      tips: { cs: ['Začni si všímat svých tělesných reakcí', 'Zpomal a přemýšlej před reakcí', 'Vyhledej knihy o EQ'], en: ['Start noticing your body reactions', 'Slow down and think before reacting', 'Find books about EQ'] }
    };
  }
}
