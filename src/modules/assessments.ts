// Evidence-based assessment modules

export interface AssessmentQuestion {
  id: string;
  text: string;
  options: { key: 'A' | 'B' | 'C' | 'D'; text: string; score: number }[];
}

export interface AssessmentResult {
  score: number;
  maxScore: number;
  percent: number;
  label: string;
  description: string;
  tips: string[];
}

// ============================================
// 1. GROWTH MINDSET (Carol Dweck)
// ============================================
export const growthMindsetQuestions: AssessmentQuestion[] = [
  { id: 'GM1', text: 'Inteligence je něco, co se nedá moc změnit.', options: [
    { key: 'A', text: 'Silně souhlasím', score: 1 },
    { key: 'B', text: 'Spíše souhlasím', score: 2 },
    { key: 'C', text: 'Spíše nesouhlasím', score: 3 },
    { key: 'D', text: 'Silně nesouhlasím', score: 4 }
  ]},
  { id: 'GM2', text: 'Můžeš se naučit nové věci, ale základní inteligenci nezměníš.', options: [
    { key: 'A', text: 'Silně souhlasím', score: 1 },
    { key: 'B', text: 'Spíše souhlasím', score: 2 },
    { key: 'C', text: 'Spíše nesouhlasím', score: 3 },
    { key: 'D', text: 'Silně nesouhlasím', score: 4 }
  ]},
  { id: 'GM3', text: 'Když něco nejde, je lepší to vzdát a zkusit něco jiného.', options: [
    { key: 'A', text: 'Silně souhlasím', score: 1 },
    { key: 'B', text: 'Spíše souhlasím', score: 2 },
    { key: 'C', text: 'Spíše nesouhlasím', score: 3 },
    { key: 'D', text: 'Silně nesouhlasím', score: 4 }
  ]},
  { id: 'GM4', text: 'Chyby jsou příležitostí k učení.', options: [
    { key: 'A', text: 'Silně souhlasím', score: 4 },
    { key: 'B', text: 'Spíše souhlasím', score: 3 },
    { key: 'C', text: 'Spíše nesouhlasím', score: 2 },
    { key: 'D', text: 'Silně nesouhlasím', score: 1 }
  ]},
  { id: 'GM5', text: 'Úsilí a práce mohou změnit tvé schopnosti.', options: [
    { key: 'A', text: 'Silně souhlasím', score: 4 },
    { key: 'B', text: 'Spíše souhlasím', score: 3 },
    { key: 'C', text: 'Spíše nesouhlasím', score: 2 },
    { key: 'D', text: 'Silně nesouhlasím', score: 1 }
  ]},
  { id: 'GM6', text: 'Kritika mi pomáhá se zlepšovat.', options: [
    { key: 'A', text: 'Silně souhlasím', score: 4 },
    { key: 'B', text: 'Spíše souhlasím', score: 3 },
    { key: 'C', text: 'Spíše nesouhlasím', score: 2 },
    { key: 'D', text: 'Silně nesouhlasím', score: 1 }
  ]},
  { id: 'GM7', text: 'Talent je důležitější než tvrdá práce.', options: [
    { key: 'A', text: 'Silně souhlasím', score: 1 },
    { key: 'B', text: 'Spíše souhlasím', score: 2 },
    { key: 'C', text: 'Spíše nesouhlasím', score: 3 },
    { key: 'D', text: 'Silně nesouhlasím', score: 4 }
  ]},
  { id: 'GM8', text: 'Rád/a přijímám nové výzvy, i když jsou těžké.', options: [
    { key: 'A', text: 'Silně souhlasím', score: 4 },
    { key: 'B', text: 'Spíše souhlasím', score: 3 },
    { key: 'C', text: 'Spíše nesouhlasím', score: 2 },
    { key: 'D', text: 'Silně nesouhlasím', score: 1 }
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

  let label = '';
  let description = '';
  let tips: string[] = [];

  if (percent >= 75) {
    label = 'Silné růstové myšlení';
    description = 'Věříš, že schopnosti lze rozvíjet úsilím a učením.';
    tips = ['Pokračuj v přijímání výzev', 'Pomáhej ostatním rozvíjet růstové myšlení', 'Sdílej své strategie učení'];
  } else if (percent >= 50) {
    label = 'Převážně růstové myšlení';
    description = 'Většinou věříš v možnost rozvoje, ale někdy pochybuješ.';
    tips = ['Všímej si svých fixních myšlenek', 'Přeformuluj "neumím to" na "zatím neumím"', 'Oceňuj proces, ne jen výsledek'];
  } else if (percent >= 25) {
    label = 'Smíšené myšlení';
    description = 'Střídáš mezi fixním a růstovým pohledem.';
    tips = ['Zaměř se na učení z chyb', 'Hledej inspiraci v příbězích úspěšných lidí', 'Experimentuj s novými přístupy'];
  } else {
    label = 'Převážně fixní myšlení';
    description = 'Tendence věřit, že schopnosti jsou dané.';
    tips = ['Začni s malými výzvami', 'Všímej si svého pokroku', 'Čti o neuroplasticitě mozku'];
  }

  return { score: total, maxScore, percent, label, description, tips };
}

// ============================================
// 2. GRIT SCALE (Angela Duckworth)
// ============================================
export const gritQuestions: AssessmentQuestion[] = [
  { id: 'GR1', text: 'Nové nápady a projekty mě někdy odvedou od předchozích.', options: [
    { key: 'A', text: 'Velmi mě vystihuje', score: 1 },
    { key: 'B', text: 'Většinou mě vystihuje', score: 2 },
    { key: 'C', text: 'Spíše mě nevystihuje', score: 3 },
    { key: 'D', text: 'Vůbec mě nevystihuje', score: 4 }
  ]},
  { id: 'GR2', text: 'Překážky mě neodradí. Nevzdávám se snadno.', options: [
    { key: 'A', text: 'Velmi mě vystihuje', score: 4 },
    { key: 'B', text: 'Většinou mě vystihuje', score: 3 },
    { key: 'C', text: 'Spíše mě nevystihuje', score: 2 },
    { key: 'D', text: 'Vůbec mě nevystihuje', score: 1 }
  ]},
  { id: 'GR3', text: 'Často si stanovím cíl, ale později ho vyměním za jiný.', options: [
    { key: 'A', text: 'Velmi mě vystihuje', score: 1 },
    { key: 'B', text: 'Většinou mě vystihuje', score: 2 },
    { key: 'C', text: 'Spíše mě nevystihuje', score: 3 },
    { key: 'D', text: 'Vůbec mě nevystihuje', score: 4 }
  ]},
  { id: 'GR4', text: 'Jsem pracovitý/á a pilný/á.', options: [
    { key: 'A', text: 'Velmi mě vystihuje', score: 4 },
    { key: 'B', text: 'Většinou mě vystihuje', score: 3 },
    { key: 'C', text: 'Spíše mě nevystihuje', score: 2 },
    { key: 'D', text: 'Vůbec mě nevystihuje', score: 1 }
  ]},
  { id: 'GR5', text: 'Mám potíže udržet pozornost na projektech, které trvají déle než pár měsíců.', options: [
    { key: 'A', text: 'Velmi mě vystihuje', score: 1 },
    { key: 'B', text: 'Většinou mě vystihuje', score: 2 },
    { key: 'C', text: 'Spíše mě nevystihuje', score: 3 },
    { key: 'D', text: 'Vůbec mě nevystihuje', score: 4 }
  ]},
  { id: 'GR6', text: 'Dokončuji vše, co začnu.', options: [
    { key: 'A', text: 'Velmi mě vystihuje', score: 4 },
    { key: 'B', text: 'Většinou mě vystihuje', score: 3 },
    { key: 'C', text: 'Spíše mě nevystihuje', score: 2 },
    { key: 'D', text: 'Vůbec mě nevystihuje', score: 1 }
  ]},
  { id: 'GR7', text: 'Moje zájmy se mění rok od roku.', options: [
    { key: 'A', text: 'Velmi mě vystihuje', score: 1 },
    { key: 'B', text: 'Většinou mě vystihuje', score: 2 },
    { key: 'C', text: 'Spíše mě nevystihuje', score: 3 },
    { key: 'D', text: 'Vůbec mě nevystihuje', score: 4 }
  ]},
  { id: 'GR8', text: 'Jsem soustředěný/á a nenechám se snadno rozptýlit.', options: [
    { key: 'A', text: 'Velmi mě vystihuje', score: 4 },
    { key: 'B', text: 'Většinou mě vystihuje', score: 3 },
    { key: 'C', text: 'Spíše mě nevystihuje', score: 2 },
    { key: 'D', text: 'Vůbec mě nevystihuje', score: 1 }
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

  let label = '';
  let description = '';
  let tips: string[] = [];

  if (percent >= 75) {
    label = 'Vysoká vytrvalost (Grit)';
    description = 'Máš silnou vytrvalost a schopnost dotahovat věci do konce.';
    tips = ['Využij svou vytrvalost pro náročné dlouhodobé cíle', 'Pomáhej ostatním s motivací', 'Hledej mentory pro další růst'];
  } else if (percent >= 50) {
    label = 'Dobrá vytrvalost';
    description = 'Většinou dokážeš vytrvat, ale někdy se necháš odvést.';
    tips = ['Rozděluj velké cíle na menší kroky', 'Najdi si accountability partnera', 'Slaví malé úspěchy'];
  } else if (percent >= 25) {
    label = 'Rozvíjející se vytrvalost';
    description = 'Máš tendenci měnit směr, ale můžeš to zlepšit.';
    tips = ['Začni s kratšími projekty', 'Veď si deník pokroku', 'Najdi svou vášeň'];
  } else {
    label = 'Nízká vytrvalost';
    description = 'Často měníš cíle a zájmy.';
    tips = ['Zaměř se na jeden cíl', 'Vytvoř si rutiny', 'Najdi důvod PROČ'];
  }

  return { score: total, maxScore, percent, label, description, tips };
}

// ============================================
// 3. SELF-EFFICACY (Albert Bandura)
// ============================================
export const selfEfficacyQuestions: AssessmentQuestion[] = [
  { id: 'SE1', text: 'Věřím, že zvládnu obtížné úkoly, když se budu snažit.', options: [
    { key: 'A', text: 'Rozhodně ano', score: 4 },
    { key: 'B', text: 'Spíše ano', score: 3 },
    { key: 'C', text: 'Spíše ne', score: 2 },
    { key: 'D', text: 'Rozhodně ne', score: 1 }
  ]},
  { id: 'SE2', text: 'Když čelím problému, obvykle najdu řešení.', options: [
    { key: 'A', text: 'Rozhodně ano', score: 4 },
    { key: 'B', text: 'Spíše ano', score: 3 },
    { key: 'C', text: 'Spíše ne', score: 2 },
    { key: 'D', text: 'Rozhodně ne', score: 1 }
  ]},
  { id: 'SE3', text: 'Dokážu zůstat klidný/á, když čelím obtížím.', options: [
    { key: 'A', text: 'Rozhodně ano', score: 4 },
    { key: 'B', text: 'Spíše ano', score: 3 },
    { key: 'C', text: 'Spíše ne', score: 2 },
    { key: 'D', text: 'Rozhodně ne', score: 1 }
  ]},
  { id: 'SE4', text: 'Když se něco nedaří, pochybuji o svých schopnostech.', options: [
    { key: 'A', text: 'Rozhodně ano', score: 1 },
    { key: 'B', text: 'Spíše ano', score: 2 },
    { key: 'C', text: 'Spíše ne', score: 3 },
    { key: 'D', text: 'Rozhodně ne', score: 4 }
  ]},
  { id: 'SE5', text: 'Věřím, že mohu dosáhnout většiny cílů, které si stanovím.', options: [
    { key: 'A', text: 'Rozhodně ano', score: 4 },
    { key: 'B', text: 'Spíše ano', score: 3 },
    { key: 'C', text: 'Spíše ne', score: 2 },
    { key: 'D', text: 'Rozhodně ne', score: 1 }
  ]},
  { id: 'SE6', text: 'Umím se vypořádat s nečekanými situacemi.', options: [
    { key: 'A', text: 'Rozhodně ano', score: 4 },
    { key: 'B', text: 'Spíše ano', score: 3 },
    { key: 'C', text: 'Spíše ne', score: 2 },
    { key: 'D', text: 'Rozhodně ne', score: 1 }
  ]},
  { id: 'SE7', text: 'Mám dovednosti potřebné k úspěchu ve škole.', options: [
    { key: 'A', text: 'Rozhodně ano', score: 4 },
    { key: 'B', text: 'Spíše ano', score: 3 },
    { key: 'C', text: 'Spíše ne', score: 2 },
    { key: 'D', text: 'Rozhodně ne', score: 1 }
  ]},
  { id: 'SE8', text: 'Když selžu, cítím se neschopný/á.', options: [
    { key: 'A', text: 'Rozhodně ano', score: 1 },
    { key: 'B', text: 'Spíše ano', score: 2 },
    { key: 'C', text: 'Spíše ne', score: 3 },
    { key: 'D', text: 'Rozhodně ne', score: 4 }
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

  let label = '';
  let description = '';
  let tips: string[] = [];

  if (percent >= 75) {
    label = 'Vysoká self-efficacy';
    description = 'Silně věříš ve své schopnosti a zvládání výzev.';
    tips = ['Přijímej náročnější výzvy', 'Buď mentorem pro ostatní', 'Stanovuj si ambiciózní cíle'];
  } else if (percent >= 50) {
    label = 'Dobrá self-efficacy';
    description = 'Věříš si ve většině situací.';
    tips = ['Zaznamenávej své úspěchy', 'Vizualizuj úspěšné zvládnutí úkolů', 'Hledej pozitivní zpětnou vazbu'];
  } else if (percent >= 25) {
    label = 'Střední self-efficacy';
    description = 'Občas pochybuješ o svých schopnostech.';
    tips = ['Začni s menšími úkoly a postupně zvyšuj', 'Najdi vzory, které tě inspirují', 'Pracuj na pozitivním self-talku'];
  } else {
    label = 'Nízká self-efficacy';
    description = 'Často pochybuješ o svých schopnostech.';
    tips = ['Začni velmi malými kroky', 'Veď si deník úspěchů', 'Vyhledej podporu od blízkých'];
  }

  return { score: total, maxScore, percent, label, description, tips };
}

// ============================================
// 4. TEST ANXIETY (Testová úzkost)
// ============================================
export const testAnxietyQuestions: AssessmentQuestion[] = [
  { id: 'TA1', text: 'Před zkouškou cítím nervozitu v břiše.', options: [
    { key: 'A', text: 'Skoro vždy', score: 1 },
    { key: 'B', text: 'Často', score: 2 },
    { key: 'C', text: 'Občas', score: 3 },
    { key: 'D', text: 'Téměř nikdy', score: 4 }
  ]},
  { id: 'TA2', text: 'Během testu mi bušní srdce a mám zpocené ruce.', options: [
    { key: 'A', text: 'Skoro vždy', score: 1 },
    { key: 'B', text: 'Často', score: 2 },
    { key: 'C', text: 'Občas', score: 3 },
    { key: 'D', text: 'Téměř nikdy', score: 4 }
  ]},
  { id: 'TA3', text: 'Mám strach, že neuspěji, i když jsem se učil/a.', options: [
    { key: 'A', text: 'Skoro vždy', score: 1 },
    { key: 'B', text: 'Často', score: 2 },
    { key: 'C', text: 'Občas', score: 3 },
    { key: 'D', text: 'Téměř nikdy', score: 4 }
  ]},
  { id: 'TA4', text: 'Při testu mi vypadávají věci z hlavy, které jsem znal/a.', options: [
    { key: 'A', text: 'Skoro vždy', score: 1 },
    { key: 'B', text: 'Často', score: 2 },
    { key: 'C', text: 'Občas', score: 3 },
    { key: 'D', text: 'Téměř nikdy', score: 4 }
  ]},
  { id: 'TA5', text: 'Srovnávám se s ostatními a mám strach, že jsem horší.', options: [
    { key: 'A', text: 'Skoro vždy', score: 1 },
    { key: 'B', text: 'Často', score: 2 },
    { key: 'C', text: 'Občas', score: 3 },
    { key: 'D', text: 'Téměř nikdy', score: 4 }
  ]},
  { id: 'TA6', text: 'Před důležitou zkouškou špatně spím.', options: [
    { key: 'A', text: 'Skoro vždy', score: 1 },
    { key: 'B', text: 'Často', score: 2 },
    { key: 'C', text: 'Občas', score: 3 },
    { key: 'D', text: 'Téměř nikdy', score: 4 }
  ]},
  { id: 'TA7', text: 'Po testu se trápím, jestli jsem odpověděl/a správně.', options: [
    { key: 'A', text: 'Skoro vždy', score: 1 },
    { key: 'B', text: 'Často', score: 2 },
    { key: 'C', text: 'Občas', score: 3 },
    { key: 'D', text: 'Téměř nikdy', score: 4 }
  ]},
  { id: 'TA8', text: 'Myšlenky na testy mi kazí náladu i mimo školu.', options: [
    { key: 'A', text: 'Skoro vždy', score: 1 },
    { key: 'B', text: 'Často', score: 2 },
    { key: 'C', text: 'Občas', score: 3 },
    { key: 'D', text: 'Téměř nikdy', score: 4 }
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
  let label = '';
  let description = '';
  let tips: string[] = [];

  if (percent >= 75) {
    label = 'Nízká testová úzkost';
    description = 'Zkoušky tě příliš nestresují.';
    tips = ['Udržuj zdravé návyky', 'Pomáhej spolužákům se zvládáním stresu', 'Využij svůj klid pro náročnější výzvy'];
  } else if (percent >= 50) {
    label = 'Mírná testová úzkost';
    description = 'Občas cítíš stres před zkouškami.';
    tips = ['Nauč se dechová cvičení', 'Připravuj se s dostatečným předstihem', 'Vyzkoušej progresivní svalovou relaxaci'];
  } else if (percent >= 25) {
    label = 'Vyšší testová úzkost';
    description = 'Zkoušky ti působí značný stres.';
    tips = ['Praktikuj mindfulness', 'Vytvoř si relaxační rutinu', 'Mluv o svých obavách s někým blízkým'];
  } else {
    label = 'Vysoká testová úzkost';
    description = 'Zkoušky ti způsobují silný stres.';
    tips = ['Vyhledej podporu školního psychologa', 'Nauč se techniky zvládání úzkosti', 'Zaměř se na proces, ne na výsledek'];
  }

  return { score: total, maxScore, percent, label, description, tips };
}

// ============================================
// 5. METACOGNITION (Metakognice)
// ============================================
export const metacognitionQuestions: AssessmentQuestion[] = [
  { id: 'MC1', text: 'Před učením si plánuji, jak budu postupovat.', options: [
    { key: 'A', text: 'Vždy', score: 4 },
    { key: 'B', text: 'Často', score: 3 },
    { key: 'C', text: 'Občas', score: 2 },
    { key: 'D', text: 'Nikdy', score: 1 }
  ]},
  { id: 'MC2', text: 'Během učení si kontroluji, jestli látce rozumím.', options: [
    { key: 'A', text: 'Vždy', score: 4 },
    { key: 'B', text: 'Často', score: 3 },
    { key: 'C', text: 'Občas', score: 2 },
    { key: 'D', text: 'Nikdy', score: 1 }
  ]},
  { id: 'MC3', text: 'Když něčemu nerozumím, zkouším jiný přístup.', options: [
    { key: 'A', text: 'Vždy', score: 4 },
    { key: 'B', text: 'Často', score: 3 },
    { key: 'C', text: 'Občas', score: 2 },
    { key: 'D', text: 'Nikdy', score: 1 }
  ]},
  { id: 'MC4', text: 'Po učení zhodnotím, co jsem se naučil/a.', options: [
    { key: 'A', text: 'Vždy', score: 4 },
    { key: 'B', text: 'Často', score: 3 },
    { key: 'C', text: 'Občas', score: 2 },
    { key: 'D', text: 'Nikdy', score: 1 }
  ]},
  { id: 'MC5', text: 'Vím, které učební strategie mi fungují nejlépe.', options: [
    { key: 'A', text: 'Rozhodně ano', score: 4 },
    { key: 'B', text: 'Spíše ano', score: 3 },
    { key: 'C', text: 'Spíše ne', score: 2 },
    { key: 'D', text: 'Rozhodně ne', score: 1 }
  ]},
  { id: 'MC6', text: 'Kladu si otázky o tom, co se učím.', options: [
    { key: 'A', text: 'Vždy', score: 4 },
    { key: 'B', text: 'Často', score: 3 },
    { key: 'C', text: 'Občas', score: 2 },
    { key: 'D', text: 'Nikdy', score: 1 }
  ]},
  { id: 'MC7', text: 'Dokážu odhadnout, jak mi půjde test.', options: [
    { key: 'A', text: 'Velmi přesně', score: 4 },
    { key: 'B', text: 'Celkem přesně', score: 3 },
    { key: 'C', text: 'Nepřesně', score: 2 },
    { key: 'D', text: 'Vůbec ne', score: 1 }
  ]},
  { id: 'MC8', text: 'Přemýšlím o tom, proč se něco učím.', options: [
    { key: 'A', text: 'Vždy', score: 4 },
    { key: 'B', text: 'Často', score: 3 },
    { key: 'C', text: 'Občas', score: 2 },
    { key: 'D', text: 'Nikdy', score: 1 }
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

  let label = '';
  let description = '';
  let tips: string[] = [];

  if (percent >= 75) {
    label = 'Vysoká metakognice';
    description = 'Dobře znáš své myšlení a umíš se efektivně učit.';
    tips = ['Sdílej své strategie s ostatními', 'Zkoušej pokročilé techniky učení', 'Pomáhej spolužákům'];
  } else if (percent >= 50) {
    label = 'Dobrá metakognice';
    description = 'Většinou si uvědomuješ své učení.';
    tips = ['Veď si učební deník', 'Experimentuj s novými technikami', 'Ptej se sám sebe "proč?"'];
  } else if (percent >= 25) {
    label = 'Rozvíjející se metakognice';
    description = 'Máš prostor pro lepší uvědomění svého učení.';
    tips = ['Začni si klást otázky během učení', 'Zkus techniku "think aloud"', 'Plánuj si učení dopředu'];
  } else {
    label = 'Nízká metakognice';
    description = 'Zatím se příliš nezamýšlíš nad svým učením.';
    tips = ['Začni jednoduchými otázkami: Co? Proč? Jak?', 'Po každém učení si řekni, co sis zapamatoval/a', 'Zkus Feynmanovu techniku'];
  }

  return { score: total, maxScore, percent, label, description, tips };
}

// ============================================
// 6. RIASEC / HOLLAND (Kariérní zájmy)
// ============================================
export interface RiasecQuestion {
  id: string;
  text: string;
  type: 'R' | 'I' | 'A' | 'S' | 'E' | 'C';
}

export const riasecQuestions: RiasecQuestion[] = [
  // Realistic (praktický)
  { id: 'R1', text: 'Rád/a pracuji s nástroji a stroji.', type: 'R' },
  { id: 'R2', text: 'Baví mě opravovat věci nebo stavět.', type: 'R' },
  // Investigative (zkoumající)
  { id: 'I1', text: 'Rád/a řeším složité problémy a hádanky.', type: 'I' },
  { id: 'I2', text: 'Zajímají mě vědecké otázky a výzkum.', type: 'I' },
  // Artistic (umělecký)
  { id: 'A1', text: 'Rád/a tvořím - kreslím, píšu, hraji hudbu.', type: 'A' },
  { id: 'A2', text: 'Oceňuji originalitu a kreativní vyjádření.', type: 'A' },
  // Social (sociální)
  { id: 'S1', text: 'Rád/a pomáhám druhým a učím je.', type: 'S' },
  { id: 'S2', text: 'Baví mě práce v týmu a komunikace s lidmi.', type: 'S' },
  // Enterprising (podnikavý)
  { id: 'E1', text: 'Rád/a vedu projekty a přesvědčuji ostatní.', type: 'E' },
  { id: 'E2', text: 'Láká mě podnikání a dosahování cílů.', type: 'E' },
  // Conventional (konvenční)
  { id: 'C1', text: 'Rád/a pracuji s daty, čísly a detaily.', type: 'C' },
  { id: 'C2', text: 'Oceňuji strukturu, pořádek a jasná pravidla.', type: 'C' }
];

export interface RiasecResult {
  scores: { type: string; label: string; score: number; percent: number; careers: string[] }[];
  topTypes: string[];
  code: string;
  description: string;
}

const riasecLabels: Record<string, { label: string; careers: string[] }> = {
  R: { label: 'Praktický (Realistic)', careers: ['Inženýr', 'Technik', 'Mechanik', 'Architekt', 'IT specialista'] },
  I: { label: 'Zkoumající (Investigative)', careers: ['Vědec', 'Lékař', 'Analytik', 'Programátor', 'Výzkumník'] },
  A: { label: 'Umělecký (Artistic)', careers: ['Designér', 'Umělec', 'Spisovatel', 'Hudebník', 'Fotograf'] },
  S: { label: 'Sociální (Social)', careers: ['Učitel', 'Psycholog', 'Sociální pracovník', 'Zdravotní sestra', 'Kouč'] },
  E: { label: 'Podnikavý (Enterprising)', careers: ['Manažer', 'Podnikatel', 'Obchodník', 'Právník', 'Politik'] },
  C: { label: 'Konvenční (Conventional)', careers: ['Účetní', 'Administrativní pracovník', 'Bankéř', 'Auditor', 'Knihovník'] }
};

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
    description: `Tvůj Holland kód je ${code}. Nejvíce ti sedí ${result[0].label.split(' ')[0].toLowerCase()} a ${result[1].label.split(' ')[0].toLowerCase()} zaměření.`
  };
}

// ============================================
// 7. EMOTIONAL INTELLIGENCE (EQ)
// ============================================
export const eqQuestions: AssessmentQuestion[] = [
  // Self-awareness
  { id: 'EQ1', text: 'Dokážu rozpoznat své emoce, když je prožívám.', options: [
    { key: 'A', text: 'Vždy', score: 4 },
    { key: 'B', text: 'Často', score: 3 },
    { key: 'C', text: 'Občas', score: 2 },
    { key: 'D', text: 'Zřídka', score: 1 }
  ]},
  { id: 'EQ2', text: 'Vím, co mě rozčílí nebo rozesmutní.', options: [
    { key: 'A', text: 'Vždy', score: 4 },
    { key: 'B', text: 'Často', score: 3 },
    { key: 'C', text: 'Občas', score: 2 },
    { key: 'D', text: 'Zřídka', score: 1 }
  ]},
  // Self-regulation
  { id: 'EQ3', text: 'Umím se uklidnit, když jsem naštvaný/á.', options: [
    { key: 'A', text: 'Vždy', score: 4 },
    { key: 'B', text: 'Často', score: 3 },
    { key: 'C', text: 'Občas', score: 2 },
    { key: 'D', text: 'Zřídka', score: 1 }
  ]},
  { id: 'EQ4', text: 'Dokážu ovládat své impulzivní reakce.', options: [
    { key: 'A', text: 'Vždy', score: 4 },
    { key: 'B', text: 'Často', score: 3 },
    { key: 'C', text: 'Občas', score: 2 },
    { key: 'D', text: 'Zřídka', score: 1 }
  ]},
  // Empathy
  { id: 'EQ5', text: 'Cítím, jak se druzí cítí.', options: [
    { key: 'A', text: 'Vždy', score: 4 },
    { key: 'B', text: 'Často', score: 3 },
    { key: 'C', text: 'Občas', score: 2 },
    { key: 'D', text: 'Zřídka', score: 1 }
  ]},
  { id: 'EQ6', text: 'Dokážu se vcítit do situace druhých.', options: [
    { key: 'A', text: 'Vždy', score: 4 },
    { key: 'B', text: 'Často', score: 3 },
    { key: 'C', text: 'Občas', score: 2 },
    { key: 'D', text: 'Zřídka', score: 1 }
  ]},
  // Social skills
  { id: 'EQ7', text: 'Umím řešit konflikty klidně a konstruktivně.', options: [
    { key: 'A', text: 'Vždy', score: 4 },
    { key: 'B', text: 'Často', score: 3 },
    { key: 'C', text: 'Občas', score: 2 },
    { key: 'D', text: 'Zřídka', score: 1 }
  ]},
  { id: 'EQ8', text: 'Snadno navazuji vztahy s novými lidmi.', options: [
    { key: 'A', text: 'Vždy', score: 4 },
    { key: 'B', text: 'Často', score: 3 },
    { key: 'C', text: 'Občas', score: 2 },
    { key: 'D', text: 'Zřídka', score: 1 }
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

  let label = '';
  let description = '';
  let tips: string[] = [];

  if (percent >= 75) {
    label = 'Vysoká emoční inteligence';
    description = 'Dobře rozumíš emocím svým i ostatních.';
    tips = ['Využij EQ pro leadership role', 'Pomáhej ostatním s emocemi', 'Rozvíjej pokročilé sociální dovednosti'];
  } else if (percent >= 50) {
    label = 'Dobrá emoční inteligence';
    description = 'Většinou se orientuješ v emocích.';
    tips = ['Praktikuj aktivní naslouchání', 'Všímej si neverbální komunikace', 'Veď si emoční deník'];
  } else if (percent >= 25) {
    label = 'Rozvíjející se EQ';
    description = 'Máš prostor pro rozvoj emoční inteligence.';
    tips = ['Pojmenovávej své emoce', 'Ptej se ostatních, jak se cítí', 'Čti o emocích a empatii'];
  } else {
    label = 'Nižší emoční inteligence';
    description = 'Emoce ti někdy dělají potíže.';
    tips = ['Začni si všímat svých tělesných reakcí', 'Zpomal a přemýšlej před reakcí', 'Vyhledej knihy o EQ'];
  }

  return { score: total, maxScore, percent, label, description, tips };
}
