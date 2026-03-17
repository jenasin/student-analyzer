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

// ============================================
// 8. ACADEMIC PROCRASTINATION (Solomon & Rothblum, 1984)
// ============================================
export const procrastinationQuestions: AssessmentQuestion[] = [
  { id: 'PR1', text: { cs: 'Odkládám zahájení studijních úkolů, i když vím, že jsou důležité.', en: 'I delay starting study tasks even when I know they are important.' }, options: [
    { key: 'A', text: { cs: 'Skoro vždy', en: 'Almost always' }, score: 1 },
    { key: 'B', text: { cs: 'Často', en: 'Often' }, score: 2 },
    { key: 'C', text: { cs: 'Občas', en: 'Sometimes' }, score: 3 },
    { key: 'D', text: { cs: 'Téměř nikdy', en: 'Almost never' }, score: 4 }
  ]},
  { id: 'PR2', text: { cs: 'Začínám se připravovat na zkoušky na poslední chvíli.', en: 'I start preparing for exams at the last minute.' }, options: [
    { key: 'A', text: { cs: 'Skoro vždy', en: 'Almost always' }, score: 1 },
    { key: 'B', text: { cs: 'Často', en: 'Often' }, score: 2 },
    { key: 'C', text: { cs: 'Občas', en: 'Sometimes' }, score: 3 },
    { key: 'D', text: { cs: 'Téměř nikdy', en: 'Almost never' }, score: 4 }
  ]},
  { id: 'PR3', text: { cs: 'Místo učení se věnuji sociálním sítím nebo jiným rozptýlením.', en: 'Instead of studying, I spend time on social media or other distractions.' }, options: [
    { key: 'A', text: { cs: 'Skoro vždy', en: 'Almost always' }, score: 1 },
    { key: 'B', text: { cs: 'Často', en: 'Often' }, score: 2 },
    { key: 'C', text: { cs: 'Občas', en: 'Sometimes' }, score: 3 },
    { key: 'D', text: { cs: 'Téměř nikdy', en: 'Almost never' }, score: 4 }
  ]},
  { id: 'PR4', text: { cs: 'Odevzdávám seminární práce a úkoly těsně před termínem.', en: 'I submit assignments and papers right before the deadline.' }, options: [
    { key: 'A', text: { cs: 'Skoro vždy', en: 'Almost always' }, score: 1 },
    { key: 'B', text: { cs: 'Často', en: 'Often' }, score: 2 },
    { key: 'C', text: { cs: 'Občas', en: 'Sometimes' }, score: 3 },
    { key: 'D', text: { cs: 'Téměř nikdy', en: 'Almost never' }, score: 4 }
  ]},
  { id: 'PR5', text: { cs: 'Cítím úzkost kvůli odloženým povinnostem.', en: 'I feel anxious because of postponed responsibilities.' }, options: [
    { key: 'A', text: { cs: 'Skoro vždy', en: 'Almost always' }, score: 1 },
    { key: 'B', text: { cs: 'Často', en: 'Often' }, score: 2 },
    { key: 'C', text: { cs: 'Občas', en: 'Sometimes' }, score: 3 },
    { key: 'D', text: { cs: 'Téměř nikdy', en: 'Almost never' }, score: 4 }
  ]},
  { id: 'PR6', text: { cs: 'Přestože si říkám, že začnu, nakonec to znovu odložím.', en: 'Even though I tell myself I\'ll start, I end up postponing again.' }, options: [
    { key: 'A', text: { cs: 'Skoro vždy', en: 'Almost always' }, score: 1 },
    { key: 'B', text: { cs: 'Často', en: 'Often' }, score: 2 },
    { key: 'C', text: { cs: 'Občas', en: 'Sometimes' }, score: 3 },
    { key: 'D', text: { cs: 'Téměř nikdy', en: 'Almost never' }, score: 4 }
  ]},
  { id: 'PR7', text: { cs: 'Odkládání negativně ovlivňuje mé studijní výsledky.', en: 'Procrastination negatively affects my academic performance.' }, options: [
    { key: 'A', text: { cs: 'Skoro vždy', en: 'Almost always' }, score: 1 },
    { key: 'B', text: { cs: 'Často', en: 'Often' }, score: 2 },
    { key: 'C', text: { cs: 'Občas', en: 'Sometimes' }, score: 3 },
    { key: 'D', text: { cs: 'Téměř nikdy', en: 'Almost never' }, score: 4 }
  ]},
  { id: 'PR8', text: { cs: 'Raději dělám příjemnější činnosti, než abych se učil/a.', en: 'I prefer doing more pleasant activities rather than studying.' }, options: [
    { key: 'A', text: { cs: 'Skoro vždy', en: 'Almost always' }, score: 1 },
    { key: 'B', text: { cs: 'Často', en: 'Often' }, score: 2 },
    { key: 'C', text: { cs: 'Občas', en: 'Sometimes' }, score: 3 },
    { key: 'D', text: { cs: 'Téměř nikdy', en: 'Almost never' }, score: 4 }
  ]}
];

export function scoreProcrastination(answers: Record<string, 'A' | 'B' | 'C' | 'D'>): AssessmentResult {
  let total = 0;
  for (const q of procrastinationQuestions) {
    const answer = answers[q.id];
    const opt = q.options.find(o => o.key === answer);
    if (opt) total += opt.score;
  }
  const maxScore = procrastinationQuestions.length * 4;
  const percent = Math.round((total / maxScore) * 100);

  // Higher score = LESS procrastination (better)
  if (percent >= 75) {
    return { score: total, maxScore, percent,
      label: { cs: 'Nízká prokrastinace', en: 'Low Procrastination' },
      description: { cs: 'Máš dobrou schopnost začít včas a plnit úkoly.', en: 'You have a good ability to start on time and complete tasks.' },
      tips: { cs: ['Sdílej své strategie se spolužáky', 'Udržuj osvědčené rutiny', 'Pomáhej ostatním s time managementem'], en: ['Share your strategies with classmates', 'Maintain proven routines', 'Help others with time management'] }
    };
  } else if (percent >= 50) {
    return { score: total, maxScore, percent,
      label: { cs: 'Mírná prokrastinace', en: 'Mild Procrastination' },
      description: { cs: 'Občas odkládáš, ale většinou zvládneš termíny.', en: 'You sometimes procrastinate but usually meet deadlines.' },
      tips: { cs: ['Použij techniku Pomodoro (25 min práce, 5 min pauza)', 'Začni s nejmenším krokem – „2minutové pravidlo"', 'Odstraň rozptýlení z pracovního prostředí'], en: ['Use the Pomodoro technique (25 min work, 5 min break)', 'Start with the smallest step – "2-minute rule"', 'Remove distractions from your workspace'] }
    };
  } else if (percent >= 25) {
    return { score: total, maxScore, percent,
      label: { cs: 'Vyšší prokrastinace', en: 'Moderate Procrastination' },
      description: { cs: 'Odkládání ti způsobuje problémy ve studiu.', en: 'Procrastination causes problems in your studies.' },
      tips: { cs: ['Rozděl velké úkoly na malé kroky (max 15 min)', 'Najdi si studijního partnera pro vzájemnou motivaci', 'Nastav si umělé deadline dříve než skutečné'], en: ['Break big tasks into small steps (max 15 min)', 'Find a study partner for mutual motivation', 'Set artificial deadlines earlier than real ones'] }
    };
  } else {
    return { score: total, maxScore, percent,
      label: { cs: 'Vysoká prokrastinace', en: 'High Procrastination' },
      description: { cs: 'Odkládání je pro tebe významný problém.', en: 'Procrastination is a significant problem for you.' },
      tips: { cs: ['Vyhledej pomoc studijního poradce', 'Začni s implementačními záměry: „Když..., pak..."', 'Zkoumej příčiny – strach z neúspěchu, perfekcionismus?'], en: ['Seek help from a study advisor', 'Start with implementation intentions: "When..., then..."', 'Explore root causes – fear of failure, perfectionism?'] }
    };
  }
}

// ============================================
// 9. ACADEMIC MOTIVATION (Vallerand et al., 1992 – SDT-based)
// ============================================
export const academicMotivationQuestions: AssessmentQuestion[] = [
  { id: 'AM1', text: { cs: 'Studuji, protože mě baví objevovat nové poznatky.', en: 'I study because I enjoy discovering new knowledge.' }, options: [
    { key: 'A', text: { cs: 'Silně souhlasím', en: 'Strongly agree' }, score: 4 },
    { key: 'B', text: { cs: 'Spíše souhlasím', en: 'Somewhat agree' }, score: 3 },
    { key: 'C', text: { cs: 'Spíše nesouhlasím', en: 'Somewhat disagree' }, score: 2 },
    { key: 'D', text: { cs: 'Silně nesouhlasím', en: 'Strongly disagree' }, score: 1 }
  ]},
  { id: 'AM2', text: { cs: 'Cítím uspokojení, když překonám obtížný studijní úkol.', en: 'I feel satisfaction when I overcome a difficult academic task.' }, options: [
    { key: 'A', text: { cs: 'Silně souhlasím', en: 'Strongly agree' }, score: 4 },
    { key: 'B', text: { cs: 'Spíše souhlasím', en: 'Somewhat agree' }, score: 3 },
    { key: 'C', text: { cs: 'Spíše nesouhlasím', en: 'Somewhat disagree' }, score: 2 },
    { key: 'D', text: { cs: 'Silně nesouhlasím', en: 'Strongly disagree' }, score: 1 }
  ]},
  { id: 'AM3', text: { cs: 'Studuji hlavně kvůli budoucí kariéře a lepšímu platu.', en: 'I study mainly for future career and better salary.' }, options: [
    { key: 'A', text: { cs: 'Silně souhlasím', en: 'Strongly agree' }, score: 2 },
    { key: 'B', text: { cs: 'Spíše souhlasím', en: 'Somewhat agree' }, score: 3 },
    { key: 'C', text: { cs: 'Spíše nesouhlasím', en: 'Somewhat disagree' }, score: 3 },
    { key: 'D', text: { cs: 'Silně nesouhlasím', en: 'Strongly disagree' }, score: 1 }
  ]},
  { id: 'AM4', text: { cs: 'Mám radost z hloubkového porozumění studované látce.', en: 'I enjoy deeply understanding the material I study.' }, options: [
    { key: 'A', text: { cs: 'Silně souhlasím', en: 'Strongly agree' }, score: 4 },
    { key: 'B', text: { cs: 'Spíše souhlasím', en: 'Somewhat agree' }, score: 3 },
    { key: 'C', text: { cs: 'Spíše nesouhlasím', en: 'Somewhat disagree' }, score: 2 },
    { key: 'D', text: { cs: 'Silně nesouhlasím', en: 'Strongly disagree' }, score: 1 }
  ]},
  { id: 'AM5', text: { cs: 'Studuji, protože to ode mě očekává rodina nebo okolí.', en: 'I study because my family or others expect it of me.' }, options: [
    { key: 'A', text: { cs: 'Silně souhlasím', en: 'Strongly agree' }, score: 1 },
    { key: 'B', text: { cs: 'Spíše souhlasím', en: 'Somewhat agree' }, score: 2 },
    { key: 'C', text: { cs: 'Spíše nesouhlasím', en: 'Somewhat disagree' }, score: 3 },
    { key: 'D', text: { cs: 'Silně nesouhlasím', en: 'Strongly disagree' }, score: 4 }
  ]},
  { id: 'AM6', text: { cs: 'Nedokážu si představit, proč bych měl/a studovat – nemá to smysl.', en: 'I can\'t imagine why I should study – it doesn\'t make sense.' }, options: [
    { key: 'A', text: { cs: 'Silně souhlasím', en: 'Strongly agree' }, score: 1 },
    { key: 'B', text: { cs: 'Spíše souhlasím', en: 'Somewhat agree' }, score: 2 },
    { key: 'C', text: { cs: 'Spíše nesouhlasím', en: 'Somewhat disagree' }, score: 3 },
    { key: 'D', text: { cs: 'Silně nesouhlasím', en: 'Strongly disagree' }, score: 4 }
  ]},
  { id: 'AM7', text: { cs: 'Rád/a se ponořím do studia tématu, které mě fascinuje.', en: 'I like to immerse myself in studying a topic that fascinates me.' }, options: [
    { key: 'A', text: { cs: 'Silně souhlasím', en: 'Strongly agree' }, score: 4 },
    { key: 'B', text: { cs: 'Spíše souhlasím', en: 'Somewhat agree' }, score: 3 },
    { key: 'C', text: { cs: 'Spíše nesouhlasím', en: 'Somewhat disagree' }, score: 2 },
    { key: 'D', text: { cs: 'Silně nesouhlasím', en: 'Strongly disagree' }, score: 1 }
  ]},
  { id: 'AM8', text: { cs: 'Studium vnímám jako cestu k osobnímu růstu a seberealizaci.', en: 'I see studying as a path to personal growth and self-fulfillment.' }, options: [
    { key: 'A', text: { cs: 'Silně souhlasím', en: 'Strongly agree' }, score: 4 },
    { key: 'B', text: { cs: 'Spíše souhlasím', en: 'Somewhat agree' }, score: 3 },
    { key: 'C', text: { cs: 'Spíše nesouhlasím', en: 'Somewhat disagree' }, score: 2 },
    { key: 'D', text: { cs: 'Silně nesouhlasím', en: 'Strongly disagree' }, score: 1 }
  ]}
];

export function scoreAcademicMotivation(answers: Record<string, 'A' | 'B' | 'C' | 'D'>): AssessmentResult {
  let total = 0;
  for (const q of academicMotivationQuestions) {
    const answer = answers[q.id];
    const opt = q.options.find(o => o.key === answer);
    if (opt) total += opt.score;
  }
  const maxScore = academicMotivationQuestions.length * 4;
  const percent = Math.round((total / maxScore) * 100);

  if (percent >= 75) {
    return { score: total, maxScore, percent,
      label: { cs: 'Silná vnitřní motivace', en: 'Strong Intrinsic Motivation' },
      description: { cs: 'Studuješ převážně z vlastního zájmu a radosti z učení.', en: 'You study mainly from personal interest and joy of learning.' },
      tips: { cs: ['Hledej výzkumné příležitosti v oboru, který tě baví', 'Propojuj studium s reálnými projekty', 'Zvažuj akademickou kariéru nebo doktorské studium'], en: ['Seek research opportunities in fields you enjoy', 'Connect studies with real projects', 'Consider academic career or doctoral studies'] }
    };
  } else if (percent >= 50) {
    return { score: total, maxScore, percent,
      label: { cs: 'Smíšená motivace', en: 'Mixed Motivation' },
      description: { cs: 'Kombinuješ vnitřní zájem s vnějšími důvody ke studiu.', en: 'You combine internal interest with external reasons to study.' },
      tips: { cs: ['Hledej propojení mezi tím, co tě baví, a studijním plánem', 'Vybírej si volitelné předměty podle zájmu', 'Najdi mentora v oboru, který tě přitahuje'], en: ['Find connections between what you enjoy and your study plan', 'Choose electives based on interest', 'Find a mentor in a field that attracts you'] }
    };
  } else if (percent >= 25) {
    return { score: total, maxScore, percent,
      label: { cs: 'Převážně vnější motivace', en: 'Mostly External Motivation' },
      description: { cs: 'Studuješ hlavně kvůli vnějším faktorům.', en: 'You study mainly due to external factors.' },
      tips: { cs: ['Zkus najít alespoň jeden aspekt studia, který tě zajímá', 'Propojuj studium se svými životními cíli', 'Diskutuj o smyslu studia se studijním poradcem'], en: ['Try to find at least one aspect of studies that interests you', 'Connect studies with your life goals', 'Discuss the meaning of studies with an advisor'] }
    };
  } else {
    return { score: total, maxScore, percent,
      label: { cs: 'Nízká motivace (amotivace)', en: 'Low Motivation (Amotivation)' },
      description: { cs: 'Nevidíš ve studiu příliš smysl.', en: 'You don\'t see much meaning in studying.' },
      tips: { cs: ['Zvaž, zda je tvůj obor ten správný', 'Vyhledej kariérní poradenství', 'Promluv si s někým o svých pochybnostech'], en: ['Consider whether your field is the right one', 'Seek career counseling', 'Talk to someone about your doubts'] }
    };
  }
}

// ============================================
// 10. TIME MANAGEMENT (Macan, 1994 – TMBS inspired)
// ============================================
export const timeManagementQuestions: AssessmentQuestion[] = [
  { id: 'TM1', text: { cs: 'Na začátku týdne si plánuji, co potřebuji udělat.', en: 'At the beginning of the week, I plan what I need to do.' }, options: [
    { key: 'A', text: { cs: 'Vždy', en: 'Always' }, score: 4 },
    { key: 'B', text: { cs: 'Často', en: 'Often' }, score: 3 },
    { key: 'C', text: { cs: 'Občas', en: 'Sometimes' }, score: 2 },
    { key: 'D', text: { cs: 'Nikdy', en: 'Never' }, score: 1 }
  ]},
  { id: 'TM2', text: { cs: 'Stanovuji si priority – vím, co je nejdůležitější.', en: 'I set priorities – I know what is most important.' }, options: [
    { key: 'A', text: { cs: 'Vždy', en: 'Always' }, score: 4 },
    { key: 'B', text: { cs: 'Často', en: 'Often' }, score: 3 },
    { key: 'C', text: { cs: 'Občas', en: 'Sometimes' }, score: 2 },
    { key: 'D', text: { cs: 'Nikdy', en: 'Never' }, score: 1 }
  ]},
  { id: 'TM3', text: { cs: 'Používám kalendář, plánovač nebo aplikaci na organizaci času.', en: 'I use a calendar, planner, or app to organize my time.' }, options: [
    { key: 'A', text: { cs: 'Pravidelně', en: 'Regularly' }, score: 4 },
    { key: 'B', text: { cs: 'Občas', en: 'Sometimes' }, score: 3 },
    { key: 'C', text: { cs: 'Zřídka', en: 'Rarely' }, score: 2 },
    { key: 'D', text: { cs: 'Nikdy', en: 'Never' }, score: 1 }
  ]},
  { id: 'TM4', text: { cs: 'Mám přehled o všech svých termínech a deadlinech.', en: 'I keep track of all my deadlines and due dates.' }, options: [
    { key: 'A', text: { cs: 'Vždy', en: 'Always' }, score: 4 },
    { key: 'B', text: { cs: 'Většinou', en: 'Usually' }, score: 3 },
    { key: 'C', text: { cs: 'Někdy zapomenu', en: 'Sometimes I forget' }, score: 2 },
    { key: 'D', text: { cs: 'Často zapomínám', en: 'I often forget' }, score: 1 }
  ]},
  { id: 'TM5', text: { cs: 'Dokážu odhadnout, kolik času mi úkol zabere.', en: 'I can estimate how long a task will take me.' }, options: [
    { key: 'A', text: { cs: 'Velmi přesně', en: 'Very accurately' }, score: 4 },
    { key: 'B', text: { cs: 'Celkem přesně', en: 'Fairly accurately' }, score: 3 },
    { key: 'C', text: { cs: 'Nepřesně', en: 'Inaccurately' }, score: 2 },
    { key: 'D', text: { cs: 'Vůbec ne', en: 'Not at all' }, score: 1 }
  ]},
  { id: 'TM6', text: { cs: 'Mám rovnováhu mezi studiem, prací a volným časem.', en: 'I have a balance between studies, work, and free time.' }, options: [
    { key: 'A', text: { cs: 'Rozhodně ano', en: 'Definitely yes' }, score: 4 },
    { key: 'B', text: { cs: 'Spíše ano', en: 'Mostly yes' }, score: 3 },
    { key: 'C', text: { cs: 'Spíše ne', en: 'Mostly no' }, score: 2 },
    { key: 'D', text: { cs: 'Rozhodně ne', en: 'Definitely no' }, score: 1 }
  ]},
  { id: 'TM7', text: { cs: 'Umím říct „ne" aktivitám, které mi berou čas od studia.', en: 'I can say "no" to activities that take time away from studying.' }, options: [
    { key: 'A', text: { cs: 'Vždy', en: 'Always' }, score: 4 },
    { key: 'B', text: { cs: 'Často', en: 'Often' }, score: 3 },
    { key: 'C', text: { cs: 'Občas', en: 'Sometimes' }, score: 2 },
    { key: 'D', text: { cs: 'Nikdy', en: 'Never' }, score: 1 }
  ]},
  { id: 'TM8', text: { cs: 'Na konci dne mám pocit, že jsem čas využil/a efektivně.', en: 'At the end of the day, I feel I used my time effectively.' }, options: [
    { key: 'A', text: { cs: 'Skoro vždy', en: 'Almost always' }, score: 4 },
    { key: 'B', text: { cs: 'Často', en: 'Often' }, score: 3 },
    { key: 'C', text: { cs: 'Občas', en: 'Sometimes' }, score: 2 },
    { key: 'D', text: { cs: 'Téměř nikdy', en: 'Almost never' }, score: 1 }
  ]}
];

export function scoreTimeManagement(answers: Record<string, 'A' | 'B' | 'C' | 'D'>): AssessmentResult {
  let total = 0;
  for (const q of timeManagementQuestions) {
    const answer = answers[q.id];
    const opt = q.options.find(o => o.key === answer);
    if (opt) total += opt.score;
  }
  const maxScore = timeManagementQuestions.length * 4;
  const percent = Math.round((total / maxScore) * 100);

  if (percent >= 75) {
    return { score: total, maxScore, percent,
      label: { cs: 'Výborný time management', en: 'Excellent Time Management' },
      description: { cs: 'Umíš efektivně plánovat a využívat svůj čas.', en: 'You can effectively plan and use your time.' },
      tips: { cs: ['Sdílej své plánovací metody s ostatními', 'Optimalizuj systém – hledej úzká místa', 'Učí se pokročilé produktivní techniky (GTD, time blocking)'], en: ['Share your planning methods with others', 'Optimize your system – find bottlenecks', 'Learn advanced productivity techniques (GTD, time blocking)'] }
    };
  } else if (percent >= 50) {
    return { score: total, maxScore, percent,
      label: { cs: 'Dobrý time management', en: 'Good Time Management' },
      description: { cs: 'Většinou si čas organizuješ, ale je prostor pro zlepšení.', en: 'You usually organize your time but there\'s room for improvement.' },
      tips: { cs: ['Vyzkoušej time blocking – blokuj si čas na konkrétní úkoly', 'Používej Eisenhowerovu matici (důležité vs. urgentní)', 'Zaváděj večerní review dne'], en: ['Try time blocking – block time for specific tasks', 'Use Eisenhower matrix (important vs. urgent)', 'Implement an evening daily review'] }
    };
  } else if (percent >= 25) {
    return { score: total, maxScore, percent,
      label: { cs: 'Slabší time management', en: 'Weak Time Management' },
      description: { cs: 'Organizace času ti dělá problémy.', en: 'Time organization causes you problems.' },
      tips: { cs: ['Začni s jednoduchým to-do listem na každý den', 'Nastav si připomínky v telefonu na důležité termíny', 'Vyhraď si každý den 1 hodinu na nejdůležitější úkol'], en: ['Start with a simple daily to-do list', 'Set phone reminders for important deadlines', 'Dedicate 1 hour daily to the most important task'] }
    };
  } else {
    return { score: total, maxScore, percent,
      label: { cs: 'Kritický time management', en: 'Critical Time Management' },
      description: { cs: 'Nemáš systém pro organizaci času.', en: 'You don\'t have a system for organizing time.' },
      tips: { cs: ['Začni tím, že si každé ráno napíšeš 3 úkoly na den', 'Poříď si plánovač (fyzický nebo digitální)', 'Vyhledej workshop time managementu na univerzitě'], en: ['Start by writing down 3 tasks each morning', 'Get a planner (physical or digital)', 'Attend a time management workshop at university'] }
    };
  }
}

// ============================================
// 11. BIG FIVE – TIPI (Gosling et al., 2003)
// ============================================
export interface BigFiveResult {
  dimensions: { name: { cs: string; en: string }; score: number; percent: number; description: { cs: string; en: string } }[];
  summary: { cs: string; en: string };
}

export const bigFiveQuestions: AssessmentQuestion[] = [
  // Extraversion
  { id: 'BF1', text: { cs: 'Jsem společenský/á a rád/a se bavím s lidmi.', en: 'I am sociable and enjoy talking to people.' }, options: [
    { key: 'A', text: { cs: 'Silně souhlasím', en: 'Strongly agree' }, score: 4 },
    { key: 'B', text: { cs: 'Spíše souhlasím', en: 'Somewhat agree' }, score: 3 },
    { key: 'C', text: { cs: 'Spíše nesouhlasím', en: 'Somewhat disagree' }, score: 2 },
    { key: 'D', text: { cs: 'Silně nesouhlasím', en: 'Strongly disagree' }, score: 1 }
  ]},
  { id: 'BF2', text: { cs: 'Jsem spíše tichý/á a uzavřený/á.', en: 'I am rather quiet and reserved.' }, options: [
    { key: 'A', text: { cs: 'Silně souhlasím', en: 'Strongly agree' }, score: 1 },
    { key: 'B', text: { cs: 'Spíše souhlasím', en: 'Somewhat agree' }, score: 2 },
    { key: 'C', text: { cs: 'Spíše nesouhlasím', en: 'Somewhat disagree' }, score: 3 },
    { key: 'D', text: { cs: 'Silně nesouhlasím', en: 'Strongly disagree' }, score: 4 }
  ]},
  // Agreeableness
  { id: 'BF3', text: { cs: 'Jsem vstřícný/á a ohleduplný/á k ostatním.', en: 'I am warm and considerate towards others.' }, options: [
    { key: 'A', text: { cs: 'Silně souhlasím', en: 'Strongly agree' }, score: 4 },
    { key: 'B', text: { cs: 'Spíše souhlasím', en: 'Somewhat agree' }, score: 3 },
    { key: 'C', text: { cs: 'Spíše nesouhlasím', en: 'Somewhat disagree' }, score: 2 },
    { key: 'D', text: { cs: 'Silně nesouhlasím', en: 'Strongly disagree' }, score: 1 }
  ]},
  { id: 'BF4', text: { cs: 'Mám tendenci být kritický/á vůči ostatním.', en: 'I tend to be critical of others.' }, options: [
    { key: 'A', text: { cs: 'Silně souhlasím', en: 'Strongly agree' }, score: 1 },
    { key: 'B', text: { cs: 'Spíše souhlasím', en: 'Somewhat agree' }, score: 2 },
    { key: 'C', text: { cs: 'Spíše nesouhlasím', en: 'Somewhat disagree' }, score: 3 },
    { key: 'D', text: { cs: 'Silně nesouhlasím', en: 'Strongly disagree' }, score: 4 }
  ]},
  // Conscientiousness
  { id: 'BF5', text: { cs: 'Jsem spolehlivý/á a disciplinovaný/á.', en: 'I am dependable and self-disciplined.' }, options: [
    { key: 'A', text: { cs: 'Silně souhlasím', en: 'Strongly agree' }, score: 4 },
    { key: 'B', text: { cs: 'Spíše souhlasím', en: 'Somewhat agree' }, score: 3 },
    { key: 'C', text: { cs: 'Spíše nesouhlasím', en: 'Somewhat disagree' }, score: 2 },
    { key: 'D', text: { cs: 'Silně nesouhlasím', en: 'Strongly disagree' }, score: 1 }
  ]},
  { id: 'BF6', text: { cs: 'Mám tendenci být neorganizovaný/á a nepořádný/á.', en: 'I tend to be disorganized and messy.' }, options: [
    { key: 'A', text: { cs: 'Silně souhlasím', en: 'Strongly agree' }, score: 1 },
    { key: 'B', text: { cs: 'Spíše souhlasím', en: 'Somewhat agree' }, score: 2 },
    { key: 'C', text: { cs: 'Spíše nesouhlasím', en: 'Somewhat disagree' }, score: 3 },
    { key: 'D', text: { cs: 'Silně nesouhlasím', en: 'Strongly disagree' }, score: 4 }
  ]},
  // Neuroticism
  { id: 'BF7', text: { cs: 'Jsem emocionálně stabilní a nevyvádí mě z míry maličkosti.', en: 'I am emotionally stable and not easily upset.' }, options: [
    { key: 'A', text: { cs: 'Silně souhlasím', en: 'Strongly agree' }, score: 4 },
    { key: 'B', text: { cs: 'Spíše souhlasím', en: 'Somewhat agree' }, score: 3 },
    { key: 'C', text: { cs: 'Spíše nesouhlasím', en: 'Somewhat disagree' }, score: 2 },
    { key: 'D', text: { cs: 'Silně nesouhlasím', en: 'Strongly disagree' }, score: 1 }
  ]},
  { id: 'BF8', text: { cs: 'Snadno se rozčílím nebo znervózním.', en: 'I get upset or nervous easily.' }, options: [
    { key: 'A', text: { cs: 'Silně souhlasím', en: 'Strongly agree' }, score: 1 },
    { key: 'B', text: { cs: 'Spíše souhlasím', en: 'Somewhat agree' }, score: 2 },
    { key: 'C', text: { cs: 'Spíše nesouhlasím', en: 'Somewhat disagree' }, score: 3 },
    { key: 'D', text: { cs: 'Silně nesouhlasím', en: 'Strongly disagree' }, score: 4 }
  ]},
  // Openness to Experience
  { id: 'BF9', text: { cs: 'Jsem otevřený/á novým zkušenostem a mám bohatou představivost.', en: 'I am open to new experiences and have a vivid imagination.' }, options: [
    { key: 'A', text: { cs: 'Silně souhlasím', en: 'Strongly agree' }, score: 4 },
    { key: 'B', text: { cs: 'Spíše souhlasím', en: 'Somewhat agree' }, score: 3 },
    { key: 'C', text: { cs: 'Spíše nesouhlasím', en: 'Somewhat disagree' }, score: 2 },
    { key: 'D', text: { cs: 'Silně nesouhlasím', en: 'Strongly disagree' }, score: 1 }
  ]},
  { id: 'BF10', text: { cs: 'Dávám přednost rutině a nemám rád/a změny.', en: 'I prefer routine and don\'t like changes.' }, options: [
    { key: 'A', text: { cs: 'Silně souhlasím', en: 'Strongly agree' }, score: 1 },
    { key: 'B', text: { cs: 'Spíše souhlasím', en: 'Somewhat agree' }, score: 2 },
    { key: 'C', text: { cs: 'Spíše nesouhlasím', en: 'Somewhat disagree' }, score: 3 },
    { key: 'D', text: { cs: 'Silně nesouhlasím', en: 'Strongly disagree' }, score: 4 }
  ]}
];

export function scoreBigFive(answers: Record<string, 'A' | 'B' | 'C' | 'D'>): BigFiveResult {
  const getScore = (id: string) => {
    const q = bigFiveQuestions.find(q => q.id === id)!;
    const opt = q.options.find(o => o.key === answers[id]);
    return opt ? opt.score : 0;
  };

  const dims = [
    { ids: ['BF1', 'BF2'], name: { cs: 'Extraverze', en: 'Extraversion' },
      high: { cs: 'Jsi společenský/á a energický/á v sociálních situacích.', en: 'You are sociable and energetic in social situations.' },
      low: { cs: 'Preferuješ klid a samostatnou práci.', en: 'You prefer quiet and independent work.' } },
    { ids: ['BF3', 'BF4'], name: { cs: 'Přívětivost', en: 'Agreeableness' },
      high: { cs: 'Jsi vstřícný/á, empatický/á a kooperativní.', en: 'You are warm, empathetic, and cooperative.' },
      low: { cs: 'Jsi analytický/á a zaměřený/á na fakta více než na pocity.', en: 'You are analytical and focused on facts rather than feelings.' } },
    { ids: ['BF5', 'BF6'], name: { cs: 'Svědomitost', en: 'Conscientiousness' },
      high: { cs: 'Jsi organizovaný/á, spolehlivý/á a cílevědomý/á.', en: 'You are organized, reliable, and goal-oriented.' },
      low: { cs: 'Jsi flexibilní a spontánní, ale možná méně organizovaný/á.', en: 'You are flexible and spontaneous, but perhaps less organized.' } },
    { ids: ['BF7', 'BF8'], name: { cs: 'Emoční stabilita', en: 'Emotional Stability' },
      high: { cs: 'Jsi klidný/á a odolný/á vůči stresu.', en: 'You are calm and resilient to stress.' },
      low: { cs: 'Jsi citlivý/á a emoce prožíváš intenzivně.', en: 'You are sensitive and experience emotions intensely.' } },
    { ids: ['BF9', 'BF10'], name: { cs: 'Otevřenost zkušenosti', en: 'Openness to Experience' },
      high: { cs: 'Jsi kreativní, zvídavý/á a otevřený/á novinkám.', en: 'You are creative, curious, and open to new things.' },
      low: { cs: 'Jsi praktický/á a preferuješ osvědčené postupy.', en: 'You are practical and prefer proven approaches.' } }
  ];

  const dimensions = dims.map(d => {
    const score = d.ids.reduce((sum, id) => sum + getScore(id), 0);
    const maxDim = d.ids.length * 4;
    const percent = Math.round((score / maxDim) * 100);
    return {
      name: d.name,
      score,
      percent,
      description: percent >= 50 ? d.high : d.low
    };
  });

  const topDim = dimensions.reduce((a, b) => a.percent > b.percent ? a : b);

  return {
    dimensions,
    summary: {
      cs: `Tvůj nejvýraznější rys je ${topDim.name.cs}. ${topDim.description.cs}`,
      en: `Your most prominent trait is ${topDim.name.en}. ${topDim.description.en}`
    }
  };
}

// ============================================
// 12. ACADEMIC LOCUS OF CONTROL (Rotter, 1966 – academic adaptation)
// ============================================
export const locusOfControlQuestions: AssessmentQuestion[] = [
  { id: 'LC1', text: { cs: 'Mé studijní výsledky závisí hlavně na mém úsilí.', en: 'My academic results depend mainly on my effort.' }, options: [
    { key: 'A', text: { cs: 'Silně souhlasím', en: 'Strongly agree' }, score: 4 },
    { key: 'B', text: { cs: 'Spíše souhlasím', en: 'Somewhat agree' }, score: 3 },
    { key: 'C', text: { cs: 'Spíše nesouhlasím', en: 'Somewhat disagree' }, score: 2 },
    { key: 'D', text: { cs: 'Silně nesouhlasím', en: 'Strongly disagree' }, score: 1 }
  ]},
  { id: 'LC2', text: { cs: 'Známky závisí hlavně na náhodě nebo náladě učitele.', en: 'Grades depend mainly on chance or the teacher\'s mood.' }, options: [
    { key: 'A', text: { cs: 'Silně souhlasím', en: 'Strongly agree' }, score: 1 },
    { key: 'B', text: { cs: 'Spíše souhlasím', en: 'Somewhat agree' }, score: 2 },
    { key: 'C', text: { cs: 'Spíše nesouhlasím', en: 'Somewhat disagree' }, score: 3 },
    { key: 'D', text: { cs: 'Silně nesouhlasím', en: 'Strongly disagree' }, score: 4 }
  ]},
  { id: 'LC3', text: { cs: 'Když se hodně naučím, vím, že dostanu dobrou známku.', en: 'When I study a lot, I know I\'ll get a good grade.' }, options: [
    { key: 'A', text: { cs: 'Silně souhlasím', en: 'Strongly agree' }, score: 4 },
    { key: 'B', text: { cs: 'Spíše souhlasím', en: 'Somewhat agree' }, score: 3 },
    { key: 'C', text: { cs: 'Spíše nesouhlasím', en: 'Somewhat disagree' }, score: 2 },
    { key: 'D', text: { cs: 'Silně nesouhlasím', en: 'Strongly disagree' }, score: 1 }
  ]},
  { id: 'LC4', text: { cs: 'Úspěch ve studiu je hlavně o štěstí.', en: 'Success in studies is mainly about luck.' }, options: [
    { key: 'A', text: { cs: 'Silně souhlasím', en: 'Strongly agree' }, score: 1 },
    { key: 'B', text: { cs: 'Spíše souhlasím', en: 'Somewhat agree' }, score: 2 },
    { key: 'C', text: { cs: 'Spíše nesouhlasím', en: 'Somewhat disagree' }, score: 3 },
    { key: 'D', text: { cs: 'Silně nesouhlasím', en: 'Strongly disagree' }, score: 4 }
  ]},
  { id: 'LC5', text: { cs: 'Mohu ovlivnit, jak dobře se mi ve studiu daří.', en: 'I can influence how well I do in my studies.' }, options: [
    { key: 'A', text: { cs: 'Silně souhlasím', en: 'Strongly agree' }, score: 4 },
    { key: 'B', text: { cs: 'Spíše souhlasím', en: 'Somewhat agree' }, score: 3 },
    { key: 'C', text: { cs: 'Spíše nesouhlasím', en: 'Somewhat disagree' }, score: 2 },
    { key: 'D', text: { cs: 'Silně nesouhlasím', en: 'Strongly disagree' }, score: 1 }
  ]},
  { id: 'LC6', text: { cs: 'Někteří učitelé prostě nespravedlivě hodnotí, nedá se s tím nic dělat.', en: 'Some teachers just grade unfairly, there\'s nothing you can do.' }, options: [
    { key: 'A', text: { cs: 'Silně souhlasím', en: 'Strongly agree' }, score: 1 },
    { key: 'B', text: { cs: 'Spíše souhlasím', en: 'Somewhat agree' }, score: 2 },
    { key: 'C', text: { cs: 'Spíše nesouhlasím', en: 'Somewhat disagree' }, score: 3 },
    { key: 'D', text: { cs: 'Silně nesouhlasím', en: 'Strongly disagree' }, score: 4 }
  ]},
  { id: 'LC7', text: { cs: 'Když neuspěji u zkoušky, analyzuji proč a příště se lépe připravím.', en: 'When I fail an exam, I analyze why and prepare better next time.' }, options: [
    { key: 'A', text: { cs: 'Silně souhlasím', en: 'Strongly agree' }, score: 4 },
    { key: 'B', text: { cs: 'Spíše souhlasím', en: 'Somewhat agree' }, score: 3 },
    { key: 'C', text: { cs: 'Spíše nesouhlasím', en: 'Somewhat disagree' }, score: 2 },
    { key: 'D', text: { cs: 'Silně nesouhlasím', en: 'Strongly disagree' }, score: 1 }
  ]},
  { id: 'LC8', text: { cs: 'To, co se mi ve studiu děje, je převážně v mých rukou.', en: 'What happens in my studies is mostly in my hands.' }, options: [
    { key: 'A', text: { cs: 'Silně souhlasím', en: 'Strongly agree' }, score: 4 },
    { key: 'B', text: { cs: 'Spíše souhlasím', en: 'Somewhat agree' }, score: 3 },
    { key: 'C', text: { cs: 'Spíše nesouhlasím', en: 'Somewhat disagree' }, score: 2 },
    { key: 'D', text: { cs: 'Silně nesouhlasím', en: 'Strongly disagree' }, score: 1 }
  ]}
];

export function scoreLocusOfControl(answers: Record<string, 'A' | 'B' | 'C' | 'D'>): AssessmentResult {
  let total = 0;
  for (const q of locusOfControlQuestions) {
    const answer = answers[q.id];
    const opt = q.options.find(o => o.key === answer);
    if (opt) total += opt.score;
  }
  const maxScore = locusOfControlQuestions.length * 4;
  const percent = Math.round((total / maxScore) * 100);

  if (percent >= 75) {
    return { score: total, maxScore, percent,
      label: { cs: 'Silný interní locus of control', en: 'Strong Internal Locus of Control' },
      description: { cs: 'Věříš, že tvé výsledky závisí na tvém úsilí a strategiích.', en: 'You believe your results depend on your effort and strategies.' },
      tips: { cs: ['Využij svou proaktivitu pro dlouhodobé studijní plány', 'Sdílej své přístupy s ostatními', 'Nastav si ambiciózní, ale realistické cíle'], en: ['Use your proactivity for long-term study plans', 'Share your approaches with others', 'Set ambitious but realistic goals'] }
    };
  } else if (percent >= 50) {
    return { score: total, maxScore, percent,
      label: { cs: 'Převážně interní locus', en: 'Mostly Internal Locus' },
      description: { cs: 'Většinou věříš ve vlastní vliv, ale někdy to přisuzuješ okolnostem.', en: 'You mostly believe in your own influence, but sometimes attribute it to circumstances.' },
      tips: { cs: ['Při neúspěchu hledej, co můžeš příště změnit TY', 'Veď si deník úspěchů, které jsi sám/sama ovlivnil/a', 'Zaměř se na to, co můžeš kontrolovat'], en: ['When you fail, look for what YOU can change next time', 'Keep a journal of successes you influenced', 'Focus on what you can control'] }
    };
  } else if (percent >= 25) {
    return { score: total, maxScore, percent,
      label: { cs: 'Smíšený locus of control', en: 'Mixed Locus of Control' },
      description: { cs: 'Často přičítáš výsledky vnějším okolnostem.', en: 'You often attribute results to external circumstances.' },
      tips: { cs: ['Zkus si před zkouškou říct: „Výsledek závisí na mé přípravě"', 'Analyzuj minulé úspěchy – co jsi pro ně udělal/a?', 'Vytvářej si kontrolované studijní plány'], en: ['Before an exam, tell yourself: "The result depends on my preparation"', 'Analyze past successes – what did you do for them?', 'Create controlled study plans'] }
    };
  } else {
    return { score: total, maxScore, percent,
      label: { cs: 'Převážně externí locus', en: 'Mostly External Locus' },
      description: { cs: 'Věříš, že tvé výsledky závisí hlavně na vnějších faktorech.', en: 'You believe your results depend mainly on external factors.' },
      tips: { cs: ['Začni s malými cíli, které můžeš splnit na 100 %', 'Najdi spojení mezi svým úsilím a výsledky', 'Vyhledej studijního poradce nebo kouče'], en: ['Start with small goals you can achieve 100%', 'Find connections between your effort and results', 'Seek a study advisor or coach'] }
    };
  }
}

// ============================================
// 13. RESILIENCE (Smith et al., 2008 – Brief Resilience Scale)
// ============================================
export const resilienceQuestions: AssessmentQuestion[] = [
  { id: 'RS1', text: { cs: 'Po těžkém období se dokážu rychle vzpamatovat.', en: 'I tend to bounce back quickly after hard times.' }, options: [
    { key: 'A', text: { cs: 'Silně souhlasím', en: 'Strongly agree' }, score: 4 },
    { key: 'B', text: { cs: 'Spíše souhlasím', en: 'Somewhat agree' }, score: 3 },
    { key: 'C', text: { cs: 'Spíše nesouhlasím', en: 'Somewhat disagree' }, score: 2 },
    { key: 'D', text: { cs: 'Silně nesouhlasím', en: 'Strongly disagree' }, score: 1 }
  ]},
  { id: 'RS2', text: { cs: 'Je pro mě těžké překonat stresující události.', en: 'I have a hard time making it through stressful events.' }, options: [
    { key: 'A', text: { cs: 'Silně souhlasím', en: 'Strongly agree' }, score: 1 },
    { key: 'B', text: { cs: 'Spíše souhlasím', en: 'Somewhat agree' }, score: 2 },
    { key: 'C', text: { cs: 'Spíše nesouhlasím', en: 'Somewhat disagree' }, score: 3 },
    { key: 'D', text: { cs: 'Silně nesouhlasím', en: 'Strongly disagree' }, score: 4 }
  ]},
  { id: 'RS3', text: { cs: 'Ze zklamání se vzpamatovávám poměrně snadno.', en: 'It does not take me long to recover from disappointment.' }, options: [
    { key: 'A', text: { cs: 'Silně souhlasím', en: 'Strongly agree' }, score: 4 },
    { key: 'B', text: { cs: 'Spíše souhlasím', en: 'Somewhat agree' }, score: 3 },
    { key: 'C', text: { cs: 'Spíše nesouhlasím', en: 'Somewhat disagree' }, score: 2 },
    { key: 'D', text: { cs: 'Silně nesouhlasím', en: 'Strongly disagree' }, score: 1 }
  ]},
  { id: 'RS4', text: { cs: 'Když se něco pokazí, trvá mi dlouho, než se z toho dostanu.', en: 'When things go wrong, it takes me a long time to get over it.' }, options: [
    { key: 'A', text: { cs: 'Silně souhlasím', en: 'Strongly agree' }, score: 1 },
    { key: 'B', text: { cs: 'Spíše souhlasím', en: 'Somewhat agree' }, score: 2 },
    { key: 'C', text: { cs: 'Spíše nesouhlasím', en: 'Somewhat disagree' }, score: 3 },
    { key: 'D', text: { cs: 'Silně nesouhlasím', en: 'Strongly disagree' }, score: 4 }
  ]},
  { id: 'RS5', text: { cs: 'Zvládám náročná období bez toho, abych se zhroutil/a.', en: 'I can get through difficult periods without falling apart.' }, options: [
    { key: 'A', text: { cs: 'Silně souhlasím', en: 'Strongly agree' }, score: 4 },
    { key: 'B', text: { cs: 'Spíše souhlasím', en: 'Somewhat agree' }, score: 3 },
    { key: 'C', text: { cs: 'Spíše nesouhlasím', en: 'Somewhat disagree' }, score: 2 },
    { key: 'D', text: { cs: 'Silně nesouhlasím', en: 'Strongly disagree' }, score: 1 }
  ]},
  { id: 'RS6', text: { cs: 'Stresové situace mě vykolejí na dlouhou dobu.', en: 'Stressful situations throw me off for a long time.' }, options: [
    { key: 'A', text: { cs: 'Silně souhlasím', en: 'Strongly agree' }, score: 1 },
    { key: 'B', text: { cs: 'Spíše souhlasím', en: 'Somewhat agree' }, score: 2 },
    { key: 'C', text: { cs: 'Spíše nesouhlasím', en: 'Somewhat disagree' }, score: 3 },
    { key: 'D', text: { cs: 'Silně nesouhlasím', en: 'Strongly disagree' }, score: 4 }
  ]},
  { id: 'RS7', text: { cs: 'I po neúspěchu u zkoušky najdu motivaci pokračovat.', en: 'Even after failing an exam, I find motivation to continue.' }, options: [
    { key: 'A', text: { cs: 'Silně souhlasím', en: 'Strongly agree' }, score: 4 },
    { key: 'B', text: { cs: 'Spíše souhlasím', en: 'Somewhat agree' }, score: 3 },
    { key: 'C', text: { cs: 'Spíše nesouhlasím', en: 'Somewhat disagree' }, score: 2 },
    { key: 'D', text: { cs: 'Silně nesouhlasím', en: 'Strongly disagree' }, score: 1 }
  ]},
  { id: 'RS8', text: { cs: 'Věřím, že obtíže mě v konečném důsledku posilují.', en: 'I believe that difficulties ultimately make me stronger.' }, options: [
    { key: 'A', text: { cs: 'Silně souhlasím', en: 'Strongly agree' }, score: 4 },
    { key: 'B', text: { cs: 'Spíše souhlasím', en: 'Somewhat agree' }, score: 3 },
    { key: 'C', text: { cs: 'Spíše nesouhlasím', en: 'Somewhat disagree' }, score: 2 },
    { key: 'D', text: { cs: 'Silně nesouhlasím', en: 'Strongly disagree' }, score: 1 }
  ]}
];

export function scoreResilience(answers: Record<string, 'A' | 'B' | 'C' | 'D'>): AssessmentResult {
  let total = 0;
  for (const q of resilienceQuestions) {
    const answer = answers[q.id];
    const opt = q.options.find(o => o.key === answer);
    if (opt) total += opt.score;
  }
  const maxScore = resilienceQuestions.length * 4;
  const percent = Math.round((total / maxScore) * 100);

  if (percent >= 75) {
    return { score: total, maxScore, percent,
      label: { cs: 'Vysoká resilience', en: 'High Resilience' },
      description: { cs: 'Dokážeš se rychle zotavit z obtíží a stresu.', en: 'You can quickly recover from difficulties and stress.' },
      tips: { cs: ['Využij svou odolnost pro náročné studijní výzvy', 'Buď oporou pro spolužáky v těžkých chvílích', 'Posiluj své strategie zvládání i preventivně'], en: ['Use your resilience for challenging academic tasks', 'Be a support for classmates in tough times', 'Strengthen your coping strategies preventively'] }
    };
  } else if (percent >= 50) {
    return { score: total, maxScore, percent,
      label: { cs: 'Dobrá resilience', en: 'Good Resilience' },
      description: { cs: 'Většinou se z obtíží dokážeš vzpamatovat.', en: 'You can usually recover from difficulties.' },
      tips: { cs: ['Buduj podpůrnou síť – přátelé, rodina, mentoři', 'Praktikuj pravidelný pohyb a spánek pro lepší zvládání stresu', 'Nauč se techniku kognitivního přerámování'], en: ['Build a support network – friends, family, mentors', 'Practice regular exercise and sleep for better stress management', 'Learn cognitive reframing technique'] }
    };
  } else if (percent >= 25) {
    return { score: total, maxScore, percent,
      label: { cs: 'Nižší resilience', en: 'Lower Resilience' },
      description: { cs: 'Stresové situace tě zasáhnou a déle trvá zotavení.', en: 'Stressful situations hit you hard and recovery takes longer.' },
      tips: { cs: ['Praktikuj mindfulness nebo meditaci denně 10 minut', 'Hledej sociální oporu – nemůžeš vše zvládnout sám/sama', 'Nastavuj si realistická očekávání'], en: ['Practice mindfulness or meditation 10 minutes daily', 'Seek social support – you can\'t handle everything alone', 'Set realistic expectations'] }
    };
  } else {
    return { score: total, maxScore, percent,
      label: { cs: 'Nízká resilience', en: 'Low Resilience' },
      description: { cs: 'Obtíže a neúspěchy tě výrazně zasahují.', en: 'Difficulties and failures significantly affect you.' },
      tips: { cs: ['Vyhledej psychologickou podporu na univerzitě', 'Začni s malými kroky ke zlepšení – dechová cvičení, spánek', 'Mluv o svých pocitech s někým, komu důvěřuješ'], en: ['Seek psychological support at the university', 'Start with small improvement steps – breathing exercises, sleep', 'Talk about your feelings with someone you trust'] }
    };
  }
}

// ============================================
// 14. GARDNER'S MULTIPLE INTELLIGENCES (Gardner, 1983)
// ============================================
export interface GardnerResult {
  intelligences: { name: { cs: string; en: string }; score: number; percent: number; description: { cs: string; en: string } }[];
  topIntelligences: { cs: string; en: string }[];
  summary: { cs: string; en: string };
}

export const gardnerQuestions: AssessmentQuestion[] = [
  // Linguistic
  { id: 'GD1', text: { cs: 'Rád/a čtu knihy, píšu texty a hraju si se slovy.', en: 'I enjoy reading books, writing texts, and playing with words.' }, options: [
    { key: 'A', text: { cs: 'Silně souhlasím', en: 'Strongly agree' }, score: 4 },
    { key: 'B', text: { cs: 'Spíše souhlasím', en: 'Somewhat agree' }, score: 3 },
    { key: 'C', text: { cs: 'Spíše nesouhlasím', en: 'Somewhat disagree' }, score: 2 },
    { key: 'D', text: { cs: 'Silně nesouhlasím', en: 'Strongly disagree' }, score: 1 }
  ]},
  { id: 'GD2', text: { cs: 'Snadno si zapamatuju texty, příběhy a citáty.', en: 'I easily remember texts, stories, and quotes.' }, options: [
    { key: 'A', text: { cs: 'Silně souhlasím', en: 'Strongly agree' }, score: 4 },
    { key: 'B', text: { cs: 'Spíše souhlasím', en: 'Somewhat agree' }, score: 3 },
    { key: 'C', text: { cs: 'Spíše nesouhlasím', en: 'Somewhat disagree' }, score: 2 },
    { key: 'D', text: { cs: 'Silně nesouhlasím', en: 'Strongly disagree' }, score: 1 }
  ]},
  // Logical-Mathematical
  { id: 'GD3', text: { cs: 'Baví mě řešit logické hádanky, hlavolamy a matematické úlohy.', en: 'I enjoy solving logic puzzles, brainteasers, and math problems.' }, options: [
    { key: 'A', text: { cs: 'Silně souhlasím', en: 'Strongly agree' }, score: 4 },
    { key: 'B', text: { cs: 'Spíše souhlasím', en: 'Somewhat agree' }, score: 3 },
    { key: 'C', text: { cs: 'Spíše nesouhlasím', en: 'Somewhat disagree' }, score: 2 },
    { key: 'D', text: { cs: 'Silně nesouhlasím', en: 'Strongly disagree' }, score: 1 }
  ]},
  { id: 'GD4', text: { cs: 'Přirozeně hledám vzorce, pravidla a logické souvislosti.', en: 'I naturally look for patterns, rules, and logical connections.' }, options: [
    { key: 'A', text: { cs: 'Silně souhlasím', en: 'Strongly agree' }, score: 4 },
    { key: 'B', text: { cs: 'Spíše souhlasím', en: 'Somewhat agree' }, score: 3 },
    { key: 'C', text: { cs: 'Spíše nesouhlasím', en: 'Somewhat disagree' }, score: 2 },
    { key: 'D', text: { cs: 'Silně nesouhlasím', en: 'Strongly disagree' }, score: 1 }
  ]},
  // Spatial
  { id: 'GD5', text: { cs: 'Dobře se orientuju v mapách a snadno si představím prostorové objekty.', en: 'I navigate maps well and can easily visualize spatial objects.' }, options: [
    { key: 'A', text: { cs: 'Silně souhlasím', en: 'Strongly agree' }, score: 4 },
    { key: 'B', text: { cs: 'Spíše souhlasím', en: 'Somewhat agree' }, score: 3 },
    { key: 'C', text: { cs: 'Spíše nesouhlasím', en: 'Somewhat disagree' }, score: 2 },
    { key: 'D', text: { cs: 'Silně nesouhlasím', en: 'Strongly disagree' }, score: 1 }
  ]},
  { id: 'GD6', text: { cs: 'Rád/a kreslím, maluji nebo vytvářím vizuální návrhy.', en: 'I enjoy drawing, painting, or creating visual designs.' }, options: [
    { key: 'A', text: { cs: 'Silně souhlasím', en: 'Strongly agree' }, score: 4 },
    { key: 'B', text: { cs: 'Spíše souhlasím', en: 'Somewhat agree' }, score: 3 },
    { key: 'C', text: { cs: 'Spíše nesouhlasím', en: 'Somewhat disagree' }, score: 2 },
    { key: 'D', text: { cs: 'Silně nesouhlasím', en: 'Strongly disagree' }, score: 1 }
  ]},
  // Musical
  { id: 'GD7', text: { cs: 'Snadno rozpoznám melodie, rytmy a tóny.', en: 'I easily recognize melodies, rhythms, and tones.' }, options: [
    { key: 'A', text: { cs: 'Silně souhlasím', en: 'Strongly agree' }, score: 4 },
    { key: 'B', text: { cs: 'Spíše souhlasím', en: 'Somewhat agree' }, score: 3 },
    { key: 'C', text: { cs: 'Spíše nesouhlasím', en: 'Somewhat disagree' }, score: 2 },
    { key: 'D', text: { cs: 'Silně nesouhlasím', en: 'Strongly disagree' }, score: 1 }
  ]},
  { id: 'GD8', text: { cs: 'Často si brouká, ťukám do rytmu nebo si pouštím hudbu při učení.', en: 'I often hum, tap rhythms, or listen to music while studying.' }, options: [
    { key: 'A', text: { cs: 'Silně souhlasím', en: 'Strongly agree' }, score: 4 },
    { key: 'B', text: { cs: 'Spíše souhlasím', en: 'Somewhat agree' }, score: 3 },
    { key: 'C', text: { cs: 'Spíše nesouhlasím', en: 'Somewhat disagree' }, score: 2 },
    { key: 'D', text: { cs: 'Silně nesouhlasím', en: 'Strongly disagree' }, score: 1 }
  ]},
  // Bodily-Kinesthetic
  { id: 'GD9', text: { cs: 'Učím se nejlépe, když si věci mohu vyzkoušet rukama nebo pohybem.', en: 'I learn best when I can try things with my hands or through movement.' }, options: [
    { key: 'A', text: { cs: 'Silně souhlasím', en: 'Strongly agree' }, score: 4 },
    { key: 'B', text: { cs: 'Spíše souhlasím', en: 'Somewhat agree' }, score: 3 },
    { key: 'C', text: { cs: 'Spíše nesouhlasím', en: 'Somewhat disagree' }, score: 2 },
    { key: 'D', text: { cs: 'Silně nesouhlasím', en: 'Strongly disagree' }, score: 1 }
  ]},
  { id: 'GD10', text: { cs: 'Jsem zručný/á ve sportu, tanci nebo manuálních činnostech.', en: 'I am skilled in sports, dance, or manual activities.' }, options: [
    { key: 'A', text: { cs: 'Silně souhlasím', en: 'Strongly agree' }, score: 4 },
    { key: 'B', text: { cs: 'Spíše souhlasím', en: 'Somewhat agree' }, score: 3 },
    { key: 'C', text: { cs: 'Spíše nesouhlasím', en: 'Somewhat disagree' }, score: 2 },
    { key: 'D', text: { cs: 'Silně nesouhlasím', en: 'Strongly disagree' }, score: 1 }
  ]},
  // Interpersonal
  { id: 'GD11', text: { cs: 'Snadno rozumím pocitům a motivacím ostatních lidí.', en: 'I easily understand the feelings and motivations of other people.' }, options: [
    { key: 'A', text: { cs: 'Silně souhlasím', en: 'Strongly agree' }, score: 4 },
    { key: 'B', text: { cs: 'Spíše souhlasím', en: 'Somewhat agree' }, score: 3 },
    { key: 'C', text: { cs: 'Spíše nesouhlasím', en: 'Somewhat disagree' }, score: 2 },
    { key: 'D', text: { cs: 'Silně nesouhlasím', en: 'Strongly disagree' }, score: 1 }
  ]},
  { id: 'GD12', text: { cs: 'Rád/a pracuji v týmu a pomáhám řešit konflikty.', en: 'I enjoy working in teams and helping resolve conflicts.' }, options: [
    { key: 'A', text: { cs: 'Silně souhlasím', en: 'Strongly agree' }, score: 4 },
    { key: 'B', text: { cs: 'Spíše souhlasím', en: 'Somewhat agree' }, score: 3 },
    { key: 'C', text: { cs: 'Spíše nesouhlasím', en: 'Somewhat disagree' }, score: 2 },
    { key: 'D', text: { cs: 'Silně nesouhlasím', en: 'Strongly disagree' }, score: 1 }
  ]},
  // Intrapersonal
  { id: 'GD13', text: { cs: 'Dobře znám své silné a slabé stránky a pravidelně o sobě přemýšlím.', en: 'I know my strengths and weaknesses well and regularly reflect on myself.' }, options: [
    { key: 'A', text: { cs: 'Silně souhlasím', en: 'Strongly agree' }, score: 4 },
    { key: 'B', text: { cs: 'Spíše souhlasím', en: 'Somewhat agree' }, score: 3 },
    { key: 'C', text: { cs: 'Spíše nesouhlasím', en: 'Somewhat disagree' }, score: 2 },
    { key: 'D', text: { cs: 'Silně nesouhlasím', en: 'Strongly disagree' }, score: 1 }
  ]},
  { id: 'GD14', text: { cs: 'Potřebuji čas o samotě na přemýšlení a plánování.', en: 'I need time alone for thinking and planning.' }, options: [
    { key: 'A', text: { cs: 'Silně souhlasím', en: 'Strongly agree' }, score: 4 },
    { key: 'B', text: { cs: 'Spíše souhlasím', en: 'Somewhat agree' }, score: 3 },
    { key: 'C', text: { cs: 'Spíše nesouhlasím', en: 'Somewhat disagree' }, score: 2 },
    { key: 'D', text: { cs: 'Silně nesouhlasím', en: 'Strongly disagree' }, score: 1 }
  ]},
  // Naturalistic
  { id: 'GD15', text: { cs: 'Zajímám se o přírodu, zvířata a přírodní jevy.', en: 'I am interested in nature, animals, and natural phenomena.' }, options: [
    { key: 'A', text: { cs: 'Silně souhlasím', en: 'Strongly agree' }, score: 4 },
    { key: 'B', text: { cs: 'Spíše souhlasím', en: 'Somewhat agree' }, score: 3 },
    { key: 'C', text: { cs: 'Spíše nesouhlasím', en: 'Somewhat disagree' }, score: 2 },
    { key: 'D', text: { cs: 'Silně nesouhlasím', en: 'Strongly disagree' }, score: 1 }
  ]},
  { id: 'GD16', text: { cs: 'Rád/a třídím, klasifikuji a pozoruji detaily v okolním světě.', en: 'I enjoy sorting, classifying, and observing details in the world around me.' }, options: [
    { key: 'A', text: { cs: 'Silně souhlasím', en: 'Strongly agree' }, score: 4 },
    { key: 'B', text: { cs: 'Spíše souhlasím', en: 'Somewhat agree' }, score: 3 },
    { key: 'C', text: { cs: 'Spíše nesouhlasím', en: 'Somewhat disagree' }, score: 2 },
    { key: 'D', text: { cs: 'Silně nesouhlasím', en: 'Strongly disagree' }, score: 1 }
  ]}
];

export function scoreGardner(answers: Record<string, 'A' | 'B' | 'C' | 'D'>): GardnerResult {
  const getScore = (id: string) => {
    const q = gardnerQuestions.find(q => q.id === id)!;
    const opt = q.options.find(o => o.key === answers[id]);
    return opt ? opt.score : 0;
  };

  const dims = [
    { ids: ['GD1', 'GD2'], name: { cs: 'Jazyková', en: 'Linguistic' },
      high: { cs: 'Máš silnou jazykovou inteligenci – slova, texty a komunikace jsou tvá doména.', en: 'You have strong linguistic intelligence – words, texts, and communication are your domain.' },
      low: { cs: 'Jazyková inteligence není tvou hlavní silnou stránkou.', en: 'Linguistic intelligence is not your primary strength.' } },
    { ids: ['GD3', 'GD4'], name: { cs: 'Logicko-matematická', en: 'Logical-Mathematical' },
      high: { cs: 'Vynikáš v logickém myšlení, vzorcích a číslech.', en: 'You excel in logical thinking, patterns, and numbers.' },
      low: { cs: 'Logicko-matematická inteligence není tvou dominantní oblastí.', en: 'Logical-mathematical intelligence is not your dominant area.' } },
    { ids: ['GD5', 'GD6'], name: { cs: 'Prostorová', en: 'Spatial' },
      high: { cs: 'Máš vynikající prostorovou představivost a vizuální myšlení.', en: 'You have excellent spatial imagination and visual thinking.' },
      low: { cs: 'Prostorová inteligence není tvou nejsilnější stránkou.', en: 'Spatial intelligence is not your strongest area.' } },
    { ids: ['GD7', 'GD8'], name: { cs: 'Hudební', en: 'Musical' },
      high: { cs: 'Jsi citlivý/á na rytmus, melodii a zvuky.', en: 'You are sensitive to rhythm, melody, and sounds.' },
      low: { cs: 'Hudební inteligence není tvou primární oblastí.', en: 'Musical intelligence is not your primary area.' } },
    { ids: ['GD9', 'GD10'], name: { cs: 'Tělesně-pohybová', en: 'Bodily-Kinesthetic' },
      high: { cs: 'Učíš se nejlépe pohybem a praxí – tělo je tvůj nástroj učení.', en: 'You learn best through movement and practice – your body is your learning tool.' },
      low: { cs: 'Tělesně-pohybová inteligence není tvou hlavní oblastí.', en: 'Bodily-kinesthetic intelligence is not your main area.' } },
    { ids: ['GD11', 'GD12'], name: { cs: 'Interpersonální', en: 'Interpersonal' },
      high: { cs: 'Rozumíš ostatním a vynikáš v týmové práci a komunikaci.', en: 'You understand others and excel in teamwork and communication.' },
      low: { cs: 'Interpersonální inteligence není tvou dominantní oblastí.', en: 'Interpersonal intelligence is not your dominant area.' } },
    { ids: ['GD13', 'GD14'], name: { cs: 'Intrapersonální', en: 'Intrapersonal' },
      high: { cs: 'Máš hluboké sebepoznání a schopnost sebereflexe.', en: 'You have deep self-knowledge and the ability for self-reflection.' },
      low: { cs: 'Intrapersonální inteligence není tvou nejsilnější stránkou.', en: 'Intrapersonal intelligence is not your strongest area.' } },
    { ids: ['GD15', 'GD16'], name: { cs: 'Přírodovědná', en: 'Naturalistic' },
      high: { cs: 'Máš přirozený cit pro přírodu, klasifikaci a pozorování.', en: 'You have a natural sense for nature, classification, and observation.' },
      low: { cs: 'Přírodovědná inteligence není tvou primární oblastí.', en: 'Naturalistic intelligence is not your primary area.' } }
  ];

  const intelligences = dims.map(d => {
    const score = d.ids.reduce((sum, id) => sum + getScore(id), 0);
    const maxDim = d.ids.length * 4;
    const percent = Math.round((score / maxDim) * 100);
    return {
      name: d.name,
      score,
      percent,
      description: percent >= 50 ? d.high : d.low
    };
  });

  const sorted = [...intelligences].sort((a, b) => b.percent - a.percent);
  const topIntelligences = sorted.slice(0, 3).map(i => i.name);

  const topNames = {
    cs: sorted.slice(0, 3).map(i => i.name.cs).join(', '),
    en: sorted.slice(0, 3).map(i => i.name.en).join(', ')
  };

  return {
    intelligences,
    topIntelligences,
    summary: {
      cs: `Tvé nejsilnější typy inteligence jsou: ${topNames.cs}.`,
      en: `Your strongest intelligence types are: ${topNames.en}.`
    }
  };
}

// ============================================
// 15. KOLB'S LEARNING STYLE INVENTORY (Kolb, 1984)
// ============================================
export interface KolbResult {
  dimensions: {
    ce: number; ro: number; ac: number; ae: number;
    cePercent: number; roPercent: number; acPercent: number; aePercent: number;
  };
  style: { cs: string; en: string };
  styleKey: 'diverging' | 'assimilating' | 'converging' | 'accommodating';
  description: { cs: string; en: string };
  tips: { cs: string[]; en: string[] };
}

export const kolbQuestions: AssessmentQuestion[] = [
  // CE questions
  { id: 'KL1', text: { cs: 'Nejlépe se učím z konkrétních zkušeností a příkladů.', en: 'I learn best from concrete experiences and examples.' }, options: [
    { key: 'A', text: { cs: 'Silně souhlasím', en: 'Strongly agree' }, score: 4 },
    { key: 'B', text: { cs: 'Spíše souhlasím', en: 'Somewhat agree' }, score: 3 },
    { key: 'C', text: { cs: 'Spíše nesouhlasím', en: 'Somewhat disagree' }, score: 2 },
    { key: 'D', text: { cs: 'Silně nesouhlasím', en: 'Strongly disagree' }, score: 1 }
  ]},
  { id: 'KL2', text: { cs: 'Dávám přednost učení prostřednictvím pocitů a osobních zážitků.', en: 'I prefer learning through feelings and personal experiences.' }, options: [
    { key: 'A', text: { cs: 'Silně souhlasím', en: 'Strongly agree' }, score: 4 },
    { key: 'B', text: { cs: 'Spíše souhlasím', en: 'Somewhat agree' }, score: 3 },
    { key: 'C', text: { cs: 'Spíše nesouhlasím', en: 'Somewhat disagree' }, score: 2 },
    { key: 'D', text: { cs: 'Silně nesouhlasím', en: 'Strongly disagree' }, score: 1 }
  ]},
  { id: 'KL3', text: { cs: 'Při učení se snažím propojit nové informace se svými prožitky.', en: 'When learning, I try to connect new information with my own experiences.' }, options: [
    { key: 'A', text: { cs: 'Silně souhlasím', en: 'Strongly agree' }, score: 4 },
    { key: 'B', text: { cs: 'Spíše souhlasím', en: 'Somewhat agree' }, score: 3 },
    { key: 'C', text: { cs: 'Spíše nesouhlasím', en: 'Somewhat disagree' }, score: 2 },
    { key: 'D', text: { cs: 'Silně nesouhlasím', en: 'Strongly disagree' }, score: 1 }
  ]},
  // RO questions
  { id: 'KL4', text: { cs: 'Raději nejdřív pozoruji a přemýšlím, než začnu jednat.', en: 'I prefer to observe and think before taking action.' }, options: [
    { key: 'A', text: { cs: 'Silně souhlasím', en: 'Strongly agree' }, score: 4 },
    { key: 'B', text: { cs: 'Spíše souhlasím', en: 'Somewhat agree' }, score: 3 },
    { key: 'C', text: { cs: 'Spíše nesouhlasím', en: 'Somewhat disagree' }, score: 2 },
    { key: 'D', text: { cs: 'Silně nesouhlasím', en: 'Strongly disagree' }, score: 1 }
  ]},
  { id: 'KL5', text: { cs: 'Rád/a se dívám na problém z různých úhlů pohledu.', en: 'I like to look at a problem from different perspectives.' }, options: [
    { key: 'A', text: { cs: 'Silně souhlasím', en: 'Strongly agree' }, score: 4 },
    { key: 'B', text: { cs: 'Spíše souhlasím', en: 'Somewhat agree' }, score: 3 },
    { key: 'C', text: { cs: 'Spíše nesouhlasím', en: 'Somewhat disagree' }, score: 2 },
    { key: 'D', text: { cs: 'Silně nesouhlasím', en: 'Strongly disagree' }, score: 1 }
  ]},
  { id: 'KL6', text: { cs: 'Při rozhodování si dávám čas na důkladné zvážení možností.', en: 'When making decisions, I take time to carefully consider options.' }, options: [
    { key: 'A', text: { cs: 'Silně souhlasím', en: 'Strongly agree' }, score: 4 },
    { key: 'B', text: { cs: 'Spíše souhlasím', en: 'Somewhat agree' }, score: 3 },
    { key: 'C', text: { cs: 'Spíše nesouhlasím', en: 'Somewhat disagree' }, score: 2 },
    { key: 'D', text: { cs: 'Silně nesouhlasím', en: 'Strongly disagree' }, score: 1 }
  ]},
  // AC questions
  { id: 'KL7', text: { cs: 'Dávám přednost logickému a systematickému přístupu k učení.', en: 'I prefer a logical and systematic approach to learning.' }, options: [
    { key: 'A', text: { cs: 'Silně souhlasím', en: 'Strongly agree' }, score: 4 },
    { key: 'B', text: { cs: 'Spíše souhlasím', en: 'Somewhat agree' }, score: 3 },
    { key: 'C', text: { cs: 'Spíše nesouhlasím', en: 'Somewhat disagree' }, score: 2 },
    { key: 'D', text: { cs: 'Silně nesouhlasím', en: 'Strongly disagree' }, score: 1 }
  ]},
  { id: 'KL8', text: { cs: 'Rád/a analyzuji teorie a koncepty předtím, než je aplikuji.', en: 'I like to analyze theories and concepts before applying them.' }, options: [
    { key: 'A', text: { cs: 'Silně souhlasím', en: 'Strongly agree' }, score: 4 },
    { key: 'B', text: { cs: 'Spíše souhlasím', en: 'Somewhat agree' }, score: 3 },
    { key: 'C', text: { cs: 'Spíše nesouhlasím', en: 'Somewhat disagree' }, score: 2 },
    { key: 'D', text: { cs: 'Silně nesouhlasím', en: 'Strongly disagree' }, score: 1 }
  ]},
  { id: 'KL9', text: { cs: 'Zajímají mě abstraktní myšlenky a hledání obecných principů.', en: 'I am interested in abstract ideas and finding general principles.' }, options: [
    { key: 'A', text: { cs: 'Silně souhlasím', en: 'Strongly agree' }, score: 4 },
    { key: 'B', text: { cs: 'Spíše souhlasím', en: 'Somewhat agree' }, score: 3 },
    { key: 'C', text: { cs: 'Spíše nesouhlasím', en: 'Somewhat disagree' }, score: 2 },
    { key: 'D', text: { cs: 'Silně nesouhlasím', en: 'Strongly disagree' }, score: 1 }
  ]},
  // AE questions
  { id: 'KL10', text: { cs: 'Nejraději se učím tím, že věci hned zkouším a experimentuji.', en: 'I learn best by trying things out and experimenting right away.' }, options: [
    { key: 'A', text: { cs: 'Silně souhlasím', en: 'Strongly agree' }, score: 4 },
    { key: 'B', text: { cs: 'Spíše souhlasím', en: 'Somewhat agree' }, score: 3 },
    { key: 'C', text: { cs: 'Spíše nesouhlasím', en: 'Somewhat disagree' }, score: 2 },
    { key: 'D', text: { cs: 'Silně nesouhlasím', en: 'Strongly disagree' }, score: 1 }
  ]},
  { id: 'KL11', text: { cs: 'Rád/a aplikuji naučené poznatky na praktické problémy.', en: 'I enjoy applying learned knowledge to practical problems.' }, options: [
    { key: 'A', text: { cs: 'Silně souhlasím', en: 'Strongly agree' }, score: 4 },
    { key: 'B', text: { cs: 'Spíše souhlasím', en: 'Somewhat agree' }, score: 3 },
    { key: 'C', text: { cs: 'Spíše nesouhlasím', en: 'Somewhat disagree' }, score: 2 },
    { key: 'D', text: { cs: 'Silně nesouhlasím', en: 'Strongly disagree' }, score: 1 }
  ]},
  { id: 'KL12', text: { cs: 'Dávám přednost aktivnímu zapojení a činnosti před pasivním posloucháním.', en: 'I prefer active involvement and doing things over passive listening.' }, options: [
    { key: 'A', text: { cs: 'Silně souhlasím', en: 'Strongly agree' }, score: 4 },
    { key: 'B', text: { cs: 'Spíše souhlasím', en: 'Somewhat agree' }, score: 3 },
    { key: 'C', text: { cs: 'Spíše nesouhlasím', en: 'Somewhat disagree' }, score: 2 },
    { key: 'D', text: { cs: 'Silně nesouhlasím', en: 'Strongly disagree' }, score: 1 }
  ]}
];

export function scoreKolb(answers: Record<string, 'A' | 'B' | 'C' | 'D'>): KolbResult {
  const getScore = (id: string) => {
    const q = kolbQuestions.find(q => q.id === id)!;
    const opt = q.options.find(o => o.key === answers[id]);
    return opt ? opt.score : 0;
  };

  const ce = getScore('KL1') + getScore('KL2') + getScore('KL3');
  const ro = getScore('KL4') + getScore('KL5') + getScore('KL6');
  const ac = getScore('KL7') + getScore('KL8') + getScore('KL9');
  const ae = getScore('KL10') + getScore('KL11') + getScore('KL12');

  const maxDim = 12; // 3 questions * 4 max score
  const cePercent = Math.round((ce / maxDim) * 100);
  const roPercent = Math.round((ro / maxDim) * 100);
  const acPercent = Math.round((ac / maxDim) * 100);
  const aePercent = Math.round((ae / maxDim) * 100);

  // Determine style: CE vs AC (vertical), AE vs RO (horizontal)
  const vertical = ce - ac; // positive = CE dominant, negative = AC dominant
  const horizontal = ae - ro; // positive = AE dominant, negative = RO dominant

  let styleKey: KolbResult['styleKey'];
  let style: { cs: string; en: string };
  let description: { cs: string; en: string };
  let tips: { cs: string[]; en: string[] };

  if (vertical >= 0 && horizontal < 0) {
    // CE + RO = Diverging
    styleKey = 'diverging';
    style = { cs: 'Divergující', en: 'Diverging' };
    description = {
      cs: 'Jsi imaginativní a dokážeš se dívat na věci z mnoha perspektiv. Silný v brainstormingu a generování nápadů.',
      en: 'You are imaginative and can look at things from many perspectives. Strong in brainstorming and idea generation.'
    };
    tips = {
      cs: ['Využívej brainstorming a mind mapy', 'Pracuj ve skupinách – inspiruješ se různými pohledy', 'Hledej propojení mezi obory a tématy'],
      en: ['Use brainstorming and mind maps', 'Work in groups – get inspired by different viewpoints', 'Look for connections between fields and topics']
    };
  } else if (vertical < 0 && horizontal < 0) {
    // AC + RO = Assimilating
    styleKey = 'assimilating';
    style = { cs: 'Asimilující', en: 'Assimilating' };
    description = {
      cs: 'Dáváš přednost logickému a stručnému přístupu. Vynikáš v pochopení teorií a vytváření modelů.',
      en: 'You prefer a logical and concise approach. You excel at understanding theories and creating models.'
    };
    tips = {
      cs: ['Čti odborné texty a vytvářej si strukturované poznámky', 'Hledej teoretické rámce pro pochopení témat', 'Zkus přednášky a logické diagramy'],
      en: ['Read academic texts and create structured notes', 'Look for theoretical frameworks to understand topics', 'Try lectures and logical diagrams']
    };
  } else if (vertical < 0 && horizontal >= 0) {
    // AC + AE = Converging
    styleKey = 'converging';
    style = { cs: 'Konvergující', en: 'Converging' };
    description = {
      cs: 'Jsi praktický/á a zaměřený/á na řešení problémů. Rád/a aplikuješ teorie na reálné situace.',
      en: 'You are practical and focused on problem-solving. You enjoy applying theories to real-world situations.'
    };
    tips = {
      cs: ['Řeš praktické případové studie a projekty', 'Využívej simulace a experimenty', 'Hledej reálné aplikace teoretických konceptů'],
      en: ['Solve practical case studies and projects', 'Use simulations and experiments', 'Look for real-world applications of theoretical concepts']
    };
  } else {
    // CE + AE = Accommodating
    styleKey = 'accommodating';
    style = { cs: 'Akomodující', en: 'Accommodating' };
    description = {
      cs: 'Jsi praktický/á a intuitivní. Učíš se nejlépe hands-on přístupem a rád/a zkoušíš nové věci.',
      en: 'You are practical and intuitive. You learn best with a hands-on approach and enjoy trying new things.'
    };
    tips = {
      cs: ['Zapoj se do projektů a stáží', 'Uč se metodou pokus-omyl', 'Spolupracuj s ostatními na praktických úkolech'],
      en: ['Get involved in projects and internships', 'Learn through trial and error', 'Collaborate with others on practical tasks']
    };
  }

  return {
    dimensions: { ce, ro, ac, ae, cePercent, roPercent, acPercent, aePercent },
    style,
    styleKey,
    description,
    tips
  };
}

// ============================================
// 16. STUDY STRESS (inspired by HuggingFace: 0xmarvel/student-stress-survey)
// ============================================
export const studyStressQuestions: AssessmentQuestion[] = [
  { id: 'SS1', text: { cs: 'Jak moc tě stresuje akademická zátěž během semestru?', en: 'How much does academic workload stress you during the semester?' }, options: [
    { key: 'A', text: { cs: 'Minimálně', en: 'Minimally' }, score: 4 },
    { key: 'B', text: { cs: 'Mírně', en: 'Mildly' }, score: 3 },
    { key: 'C', text: { cs: 'Značně', en: 'Significantly' }, score: 2 },
    { key: 'D', text: { cs: 'Extrémně', en: 'Extremely' }, score: 1 }
  ]},
  { id: 'SS2', text: { cs: 'Jak dobře spíš během zkouškového období?', en: 'How well do you sleep during exam periods?' }, options: [
    { key: 'A', text: { cs: 'Výborně, spím 7-8 hodin', en: 'Excellently, I sleep 7-8 hours' }, score: 4 },
    { key: 'B', text: { cs: 'Dobře, občas méně', en: 'Well, sometimes less' }, score: 3 },
    { key: 'C', text: { cs: 'Špatně, často pod 6 hodin', en: 'Poorly, often under 6 hours' }, score: 2 },
    { key: 'D', text: { cs: 'Velmi špatně, nespím', en: 'Very poorly, I don\'t sleep' }, score: 1 }
  ]},
  { id: 'SS3', text: { cs: 'Cítíš tlak, že musíš mít výborné výsledky u zkoušek?', en: 'Do you feel pressure to perform excellently in exams?' }, options: [
    { key: 'A', text: { cs: 'Téměř ne', en: 'Almost no' }, score: 4 },
    { key: 'B', text: { cs: 'Trochu', en: 'A little' }, score: 3 },
    { key: 'C', text: { cs: 'Hodně', en: 'A lot' }, score: 2 },
    { key: 'D', text: { cs: 'Enormně', en: 'Enormously' }, score: 1 }
  ]},
  { id: 'SS4', text: { cs: 'Mění se tvé stravovací návyky během zkoušek?', en: 'Do your eating habits change during exams?' }, options: [
    { key: 'A', text: { cs: 'Ne, jím normálně', en: 'No, I eat normally' }, score: 4 },
    { key: 'B', text: { cs: 'Trochu, občas vynechám jídlo', en: 'A little, I sometimes skip meals' }, score: 3 },
    { key: 'C', text: { cs: 'Ano, jím nepravidelně', en: 'Yes, I eat irregularly' }, score: 2 },
    { key: 'D', text: { cs: 'Hodně, zapomínám jíst nebo přejídám', en: 'A lot, I forget to eat or overeat' }, score: 1 }
  ]},
  { id: 'SS5', text: { cs: 'Máš během semestru fyzické potíže spojené se stresem (bolesti hlavy, žaludku)?', en: 'Do you have stress-related physical issues during the semester (headaches, stomach problems)?' }, options: [
    { key: 'A', text: { cs: 'Nikdy', en: 'Never' }, score: 4 },
    { key: 'B', text: { cs: 'Občas', en: 'Sometimes' }, score: 3 },
    { key: 'C', text: { cs: 'Často', en: 'Often' }, score: 2 },
    { key: 'D', text: { cs: 'Velmi často', en: 'Very often' }, score: 1 }
  ]},
  { id: 'SS6', text: { cs: 'Stíháš termíny a deadliny bez extrémního stresu?', en: 'Do you meet deadlines without extreme stress?' }, options: [
    { key: 'A', text: { cs: 'Ano, v pohodě', en: 'Yes, comfortably' }, score: 4 },
    { key: 'B', text: { cs: 'Většinou ano', en: 'Usually yes' }, score: 3 },
    { key: 'C', text: { cs: 'Často na poslední chvíli', en: 'Often at the last moment' }, score: 2 },
    { key: 'D', text: { cs: 'Nestíhám a stresuju se', en: 'I don\'t manage and stress out' }, score: 1 }
  ]},
  { id: 'SS7', text: { cs: 'Dokážeš si najít čas na odpočinek a koníčky během semestru?', en: 'Can you find time for rest and hobbies during the semester?' }, options: [
    { key: 'A', text: { cs: 'Ano, pravidelně', en: 'Yes, regularly' }, score: 4 },
    { key: 'B', text: { cs: 'Občas', en: 'Sometimes' }, score: 3 },
    { key: 'C', text: { cs: 'Zřídka', en: 'Rarely' }, score: 2 },
    { key: 'D', text: { cs: 'Vůbec ne', en: 'Not at all' }, score: 1 }
  ]},
  { id: 'SS8', text: { cs: 'Jak zvládáš stres ze studia?', en: 'How do you cope with study stress?' }, options: [
    { key: 'A', text: { cs: 'Mám osvědčené strategie (sport, meditace)', en: 'I have proven strategies (sports, meditation)' }, score: 4 },
    { key: 'B', text: { cs: 'Zvládám, ale nemám systém', en: 'I manage but don\'t have a system' }, score: 3 },
    { key: 'C', text: { cs: 'Těžko, často se cítím přetížený/á', en: 'With difficulty, I often feel overwhelmed' }, score: 2 },
    { key: 'D', text: { cs: 'Nezvládám, stres mě paralyzuje', en: 'I can\'t cope, stress paralyzes me' }, score: 1 }
  ]}
];

export function scoreStudyStress(answers: Record<string, 'A' | 'B' | 'C' | 'D'>): AssessmentResult {
  let total = 0;
  for (const q of studyStressQuestions) {
    const answer = answers[q.id];
    const opt = q.options.find(o => o.key === answer);
    if (opt) total += opt.score;
  }
  const maxScore = studyStressQuestions.length * 4;
  const percent = Math.round((total / maxScore) * 100);

  // Higher = less stress (better)
  if (percent >= 75) {
    return { score: total, maxScore, percent,
      label: { cs: 'Nízký studijní stres', en: 'Low Study Stress' },
      description: { cs: 'Studium tě příliš nestresuje a máš dobré copingové strategie.', en: 'Studies don\'t stress you much and you have good coping strategies.' },
      tips: { cs: ['Udržuj své zdravé návyky', 'Pomáhej spolužákům se zvládáním stresu', 'Využij svůj klid pro náročnější výzvy'], en: ['Maintain your healthy habits', 'Help classmates manage stress', 'Use your calm for bigger challenges'] }
    };
  } else if (percent >= 50) {
    return { score: total, maxScore, percent,
      label: { cs: 'Mírný studijní stres', en: 'Moderate Study Stress' },
      description: { cs: 'Občas cítíš stres, ale většinou ho zvládáš.', en: 'You sometimes feel stressed but usually manage it.' },
      tips: { cs: ['Zaveď pravidelný pohyb (i 20 min denně pomůže)', 'Plánuj studium s přestávkami', 'Nauč se říkat ne nepodstatným aktivitám'], en: ['Start regular exercise (even 20 min daily helps)', 'Plan study sessions with breaks', 'Learn to say no to non-essential activities'] }
    };
  } else if (percent >= 25) {
    return { score: total, maxScore, percent,
      label: { cs: 'Vyšší studijní stres', en: 'High Study Stress' },
      description: { cs: 'Studium ti působí značný stres, který ovlivňuje tvé zdraví.', en: 'Studies cause you significant stress affecting your health.' },
      tips: { cs: ['Vyhledej podporu (studijní poradce, psycholog)', 'Zkus techniku 4-7-8 dýchání před spaním', 'Rozděl zkoušky do menších bloků přípravy'], en: ['Seek support (study advisor, psychologist)', 'Try 4-7-8 breathing technique before sleep', 'Break exam prep into smaller blocks'] }
    };
  } else {
    return { score: total, maxScore, percent,
      label: { cs: 'Kritický studijní stres', en: 'Critical Study Stress' },
      description: { cs: 'Stres ze studia výrazně ovlivňuje tvé zdraví a výkon.', en: 'Study stress significantly affects your health and performance.' },
      tips: { cs: ['Okamžitě vyhledej pomoc (psychologická poradna na VŠ)', 'Zvažuj úpravu studijního plánu (méně předmětů)', 'Prioritizuj spánek a jídlo – bez nich se neučíš'], en: ['Seek help immediately (university counseling center)', 'Consider adjusting study plan (fewer courses)', 'Prioritize sleep and food – you can\'t study without them'] }
    };
  }
}

// ============================================
// 17. STUDY STRATEGIES (inspired by HuggingFace: 0xmarvel/student-stress-survey)
// ============================================
export const studyStrategiesQuestions: AssessmentQuestion[] = [
  { id: 'ST1', text: { cs: 'Jak si děláš poznámky při učení?', en: 'How do you take notes when studying?' }, options: [
    { key: 'A', text: { cs: 'Strukturované poznámky vlastními slovy', en: 'Structured notes in my own words' }, score: 4 },
    { key: 'B', text: { cs: 'Zvýrazňuji v textu klíčové body', en: 'I highlight key points in text' }, score: 3 },
    { key: 'C', text: { cs: 'Opisuji z přednášek', en: 'I copy from lectures' }, score: 2 },
    { key: 'D', text: { cs: 'Nedělám si poznámky', en: 'I don\'t take notes' }, score: 1 }
  ]},
  { id: 'ST2', text: { cs: 'Jakou techniku používáš k zapamatování látky?', en: 'What technique do you use to memorize material?' }, options: [
    { key: 'A', text: { cs: 'Active recall – testuju se sám/a', en: 'Active recall – I test myself' }, score: 4 },
    { key: 'B', text: { cs: 'Shrnování a přeformulovávání', en: 'Summarizing and paraphrasing' }, score: 3 },
    { key: 'C', text: { cs: 'Opakované čtení', en: 'Repeated reading' }, score: 2 },
    { key: 'D', text: { cs: 'Nemám žádnou techniku', en: 'I don\'t have any technique' }, score: 1 }
  ]},
  { id: 'ST3', text: { cs: 'Kde se nejčastěji učíš?', en: 'Where do you most often study?' }, options: [
    { key: 'A', text: { cs: 'Tiché místo bez rozptýlení (knihovna, pracovna)', en: 'Quiet place without distractions (library, study room)' }, score: 4 },
    { key: 'B', text: { cs: 'Doma u stolu', en: 'At home at a desk' }, score: 3 },
    { key: 'C', text: { cs: 'V kavárně nebo s lidmi kolem', en: 'In a café or with people around' }, score: 2 },
    { key: 'D', text: { cs: 'V posteli nebo na gauči', en: 'In bed or on the couch' }, score: 1 }
  ]},
  { id: 'ST4', text: { cs: 'Jak často si děláš přestávky při učení?', en: 'How often do you take breaks while studying?' }, options: [
    { key: 'A', text: { cs: 'Pravidelně (každých 25-50 min)', en: 'Regularly (every 25-50 min)' }, score: 4 },
    { key: 'B', text: { cs: 'Občas, když cítím únavu', en: 'Sometimes, when I feel tired' }, score: 3 },
    { key: 'C', text: { cs: 'Zřídka, snažím se vydržet', en: 'Rarely, I try to push through' }, score: 2 },
    { key: 'D', text: { cs: 'Buď žádné, nebo příliš dlouhé', en: 'Either none or too long' }, score: 1 }
  ]},
  { id: 'ST5', text: { cs: 'Jak ověřuješ, že látce rozumíš?', en: 'How do you verify that you understand the material?' }, options: [
    { key: 'A', text: { cs: 'Zkouším vysvětlit někomu jinému (Feynmanova technika)', en: 'I try to explain to someone else (Feynman technique)' }, score: 4 },
    { key: 'B', text: { cs: 'Dělám si testové otázky', en: 'I create test questions' }, score: 3 },
    { key: 'C', text: { cs: 'Přečtu si to znovu a doufám', en: 'I re-read and hope' }, score: 2 },
    { key: 'D', text: { cs: 'Neověřuji, jdu na zkoušku', en: 'I don\'t verify, I go to the exam' }, score: 1 }
  ]},
  { id: 'ST6', text: { cs: 'Používáš digitální nástroje pro učení (Anki, Notion, Quizlet)?', en: 'Do you use digital tools for studying (Anki, Notion, Quizlet)?' }, options: [
    { key: 'A', text: { cs: 'Ano, pravidelně a systematicky', en: 'Yes, regularly and systematically' }, score: 4 },
    { key: 'B', text: { cs: 'Občas, když se to hodí', en: 'Sometimes, when it\'s useful' }, score: 3 },
    { key: 'C', text: { cs: 'Zřídka', en: 'Rarely' }, score: 2 },
    { key: 'D', text: { cs: 'Ne, nepoužívám', en: 'No, I don\'t use any' }, score: 1 }
  ]},
  { id: 'ST7', text: { cs: 'Učíš se raději sám/a nebo ve skupině?', en: 'Do you prefer studying alone or in a group?' }, options: [
    { key: 'A', text: { cs: 'Kombinuji obojí podle potřeby', en: 'I combine both as needed' }, score: 4 },
    { key: 'B', text: { cs: 'Převážně sám/a, ale diskutuji s ostatními', en: 'Mostly alone but discuss with others' }, score: 3 },
    { key: 'C', text: { cs: 'Vždy sám/a', en: 'Always alone' }, score: 2 },
    { key: 'D', text: { cs: 'Ve skupině, ale spíš se bavíme', en: 'In a group, but we mostly chat' }, score: 1 }
  ]},
  { id: 'ST8', text: { cs: 'Používáš spaced repetition (rozložené opakování v čase)?', en: 'Do you use spaced repetition (distributed practice over time)?' }, options: [
    { key: 'A', text: { cs: 'Ano, systematicky', en: 'Yes, systematically' }, score: 4 },
    { key: 'B', text: { cs: 'Občas, když mám čas', en: 'Sometimes, when I have time' }, score: 3 },
    { key: 'C', text: { cs: 'Ne, učím se najednou před zkouškou', en: 'No, I cram before the exam' }, score: 2 },
    { key: 'D', text: { cs: 'Nevím, co to je', en: 'I don\'t know what that is' }, score: 1 }
  ]}
];

export function scoreStudyStrategies(answers: Record<string, 'A' | 'B' | 'C' | 'D'>): AssessmentResult {
  let total = 0;
  for (const q of studyStrategiesQuestions) {
    const answer = answers[q.id];
    const opt = q.options.find(o => o.key === answer);
    if (opt) total += opt.score;
  }
  const maxScore = studyStrategiesQuestions.length * 4;
  const percent = Math.round((total / maxScore) * 100);

  if (percent >= 75) {
    return { score: total, maxScore, percent,
      label: { cs: 'Pokročilé studijní strategie', en: 'Advanced Study Strategies' },
      description: { cs: 'Používáš evidence-based techniky učení. Tvůj přístup je vědecky efektivní.', en: 'You use evidence-based learning techniques. Your approach is scientifically effective.' },
      tips: { cs: ['Zkus interleaving – střídej témata při učení', 'Sdílej strategie se spolužáky', 'Experimentuj s elaborative interrogation'], en: ['Try interleaving – alternate topics while studying', 'Share strategies with classmates', 'Experiment with elaborative interrogation'] }
    };
  } else if (percent >= 50) {
    return { score: total, maxScore, percent,
      label: { cs: 'Dobré studijní strategie', en: 'Good Study Strategies' },
      description: { cs: 'Máš solidní základ, ale je prostor pro zlepšení.', en: 'You have a solid foundation but room for improvement.' },
      tips: { cs: ['Přidej active recall – testuj se místo opakovaného čtení', 'Zkus Pomodoro techniku (25 min práce, 5 min pauza)', 'Používej Anki nebo Quizlet pro spaced repetition'], en: ['Add active recall – test yourself instead of re-reading', 'Try Pomodoro technique (25 min work, 5 min break)', 'Use Anki or Quizlet for spaced repetition'] }
    };
  } else if (percent >= 25) {
    return { score: total, maxScore, percent,
      label: { cs: 'Základní studijní strategie', en: 'Basic Study Strategies' },
      description: { cs: 'Tvé učební strategie nejsou moc efektivní. Malé změny mohou přinést velký rozdíl.', en: 'Your learning strategies aren\'t very effective. Small changes can make a big difference.' },
      tips: { cs: ['Přestaň jen číst – začni se testovat (active recall)', 'Najdi si tiché místo na učení', 'Dělej si poznámky vlastními slovy, ne opisuj'], en: ['Stop just reading – start testing yourself (active recall)', 'Find a quiet study place', 'Take notes in your own words, don\'t just copy'] }
    };
  } else {
    return { score: total, maxScore, percent,
      label: { cs: 'Neefektivní studijní strategie', en: 'Ineffective Study Strategies' },
      description: { cs: 'Nemáš funkční systém učení. To je ale příležitost – správné techniky mohou zásadně změnit tvé výsledky.', en: 'You don\'t have a functional study system. But that\'s an opportunity – the right techniques can fundamentally change your results.' },
      tips: { cs: ['Začni s jednou technikou: po učení zavři knihu a řekni nahlas, co si pamatuješ', 'Stáhni si Anki a vytvoř si kartičky z přednášek', 'Sleduj „Learning How to Learn" kurz na Coursera (zdarma)'], en: ['Start with one technique: close the book and say aloud what you remember', 'Download Anki and create flashcards from lectures', 'Watch "Learning How to Learn" course on Coursera (free)'] }
    };
  }
}
