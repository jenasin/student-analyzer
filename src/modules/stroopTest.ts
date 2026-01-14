// Stroop Test Module
// Validated cognitive test measuring selective attention, cognitive flexibility, and processing speed

export interface StroopTrial {
  id: number;
  word: string;        // The word displayed (e.g., "ČERVENÁ")
  displayColor: string; // The color the word is displayed in
  correctAnswer: string; // The correct answer (always the display color)
  isCongruent: boolean; // Whether word matches color
}

export interface StroopTrialResult {
  trial: StroopTrial;
  userAnswer: string;
  isCorrect: boolean;
  reactionTimeMs: number;
}

export interface StroopResult {
  // Basic metrics
  totalTrials: number;
  correctAnswers: number;
  accuracy: number; // percentage

  // Reaction times
  averageReactionTime: number; // ms
  congruentAvgRT: number;
  incongruentAvgRT: number;

  // Stroop Effect (key metric)
  stroopEffect: number; // difference between incongruent and congruent RT
  stroopEffectPercent: number; // percentage increase

  // Interpretation
  label: string;
  description: string;
  cognitiveFlexibility: 'vysoká' | 'průměrná' | 'nižší';
  attentionControl: 'silná' | 'průměrná' | 'slabší';
  tips: string[];

  // Raw data
  trials: StroopTrialResult[];
}

// Czech color words and their hex values
export const COLORS = {
  'ČERVENÁ': '#ef4444',
  'MODRÁ': '#3b82f6',
  'ZELENÁ': '#22c55e',
  'ŽLUTÁ': '#eab308'
};

export const COLOR_NAMES = Object.keys(COLORS) as (keyof typeof COLORS)[];

// Generate trials for the test
export function generateStroopTrials(
  numCongruent: number = 12,
  numIncongruent: number = 12
): StroopTrial[] {
  const trials: StroopTrial[] = [];
  let id = 0;

  // Generate congruent trials (word matches color)
  for (let i = 0; i < numCongruent; i++) {
    const colorName = COLOR_NAMES[i % COLOR_NAMES.length];
    trials.push({
      id: id++,
      word: colorName,
      displayColor: COLORS[colorName],
      correctAnswer: colorName,
      isCongruent: true
    });
  }

  // Generate incongruent trials (word doesn't match color)
  for (let i = 0; i < numIncongruent; i++) {
    const wordIndex = i % COLOR_NAMES.length;
    const colorIndex = (i + 1 + Math.floor(i / COLOR_NAMES.length)) % COLOR_NAMES.length;

    const word = COLOR_NAMES[wordIndex];
    const displayColorName = COLOR_NAMES[colorIndex];

    // Make sure word and color are different
    const finalColorName = word === displayColorName
      ? COLOR_NAMES[(colorIndex + 1) % COLOR_NAMES.length]
      : displayColorName;

    trials.push({
      id: id++,
      word: word,
      displayColor: COLORS[finalColorName],
      correctAnswer: finalColorName,
      isCongruent: false
    });
  }

  // Shuffle trials
  return shuffleArray(trials);
}

function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

// Score the Stroop Test results
export function scoreStroopTest(trials: StroopTrialResult[]): StroopResult {
  const totalTrials = trials.length;
  const correctTrials = trials.filter(t => t.isCorrect);
  const correctAnswers = correctTrials.length;
  const accuracy = Math.round((correctAnswers / totalTrials) * 100);

  // Calculate average reaction times (only for correct answers)
  const correctCongruent = trials.filter(t => t.isCorrect && t.trial.isCongruent);
  const correctIncongruent = trials.filter(t => t.isCorrect && !t.trial.isCongruent);

  const congruentAvgRT = correctCongruent.length > 0
    ? Math.round(correctCongruent.reduce((sum, t) => sum + t.reactionTimeMs, 0) / correctCongruent.length)
    : 0;

  const incongruentAvgRT = correctIncongruent.length > 0
    ? Math.round(correctIncongruent.reduce((sum, t) => sum + t.reactionTimeMs, 0) / correctIncongruent.length)
    : 0;

  const averageReactionTime = correctTrials.length > 0
    ? Math.round(correctTrials.reduce((sum, t) => sum + t.reactionTimeMs, 0) / correctTrials.length)
    : 0;

  // Stroop Effect calculation
  const stroopEffect = incongruentAvgRT - congruentAvgRT;
  const stroopEffectPercent = congruentAvgRT > 0
    ? Math.round((stroopEffect / congruentAvgRT) * 100)
    : 0;

  // Interpretation based on norms
  // Normal Stroop effect is typically 100-200ms (20-40% increase)
  let label: string;
  let description: string;
  let cognitiveFlexibility: 'vysoká' | 'průměrná' | 'nižší';
  let attentionControl: 'silná' | 'průměrná' | 'slabší';
  let tips: string[] = [];

  // Evaluate based on accuracy and Stroop effect
  if (accuracy >= 90 && stroopEffectPercent <= 30) {
    label = 'Vynikající kognitivní kontrola';
    description = 'Tvá schopnost ignorovat rušivé informace a soustředit se na úkol je nadprůměrná.';
    cognitiveFlexibility = 'vysoká';
    attentionControl = 'silná';
    tips = [
      'Tvá pozornost je silná stránka - využij ji při studiu složitých témat',
      'Můžeš zvládat multitasking lépe než ostatní, ale i tak se snaž soustředit na jednu věc',
      'Vyzkoušej náročnější kognitivní úlohy jako šachy nebo programování'
    ];
  } else if (accuracy >= 80 && stroopEffectPercent <= 50) {
    label = 'Dobrá kognitivní kontrola';
    description = 'Máš průměrnou až nadprůměrnou schopnost selektivní pozornosti.';
    cognitiveFlexibility = 'průměrná';
    attentionControl = 'průměrná';
    tips = [
      'Při učení minimalizuj rozptýlení - mobil do jiné místnosti',
      'Používej techniku Pomodoro (25 min práce, 5 min pauza)',
      'Trénuj pozornost pravidelnými kognitivními cvičeními'
    ];
  } else if (accuracy >= 70) {
    label = 'Průměrná kognitivní kontrola';
    description = 'Tvá selektivní pozornost je v normě, ale existuje prostor pro zlepšení.';
    cognitiveFlexibility = 'průměrná';
    attentionControl = 'průměrná';
    tips = [
      'Začni s meditací nebo mindfulness - pomáhá zlepšit pozornost',
      'Pravidelný spánek (7-9 hodin) výrazně zlepšuje kognitivní funkce',
      'Cvičení a pohyb zvyšují mozkovou aktivitu a pozornost'
    ];
  } else {
    label = 'Prostor pro rozvoj pozornosti';
    description = 'Tvoje výsledky naznačují, že bys mohl/a profitovat z tréninku pozornosti.';
    cognitiveFlexibility = 'nižší';
    attentionControl = 'slabší';
    tips = [
      'Zkontroluj kvalitu spánku - únava velmi ovlivňuje pozornost',
      'Vyhni se multitaskingu - dělej jednu věc najednou',
      'Začni s krátkými úseky soustředění (10-15 min) a postupně prodlužuj',
      'Zvař možnost konzultace s odborníkem, pokud máš dlouhodobě problémy se soustředěním'
    ];
  }

  // Adjust based on reaction time (fast but accurate is best)
  if (averageReactionTime < 600 && accuracy >= 85) {
    tips.unshift('Tvá rychlost reakce je výborná při zachování přesnosti!');
  } else if (averageReactionTime > 1200) {
    tips.push('Zkus reagovat rychleji - důvěřuj svému prvnímu instinktu');
  }

  return {
    totalTrials,
    correctAnswers,
    accuracy,
    averageReactionTime,
    congruentAvgRT,
    incongruentAvgRT,
    stroopEffect,
    stroopEffectPercent,
    label,
    description,
    cognitiveFlexibility,
    attentionControl,
    tips,
    trials
  };
}

// Practice trials (fewer, easier)
export function generatePracticeTrials(): StroopTrial[] {
  return generateStroopTrials(4, 4);
}
