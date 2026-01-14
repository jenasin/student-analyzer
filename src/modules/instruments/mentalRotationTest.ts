// Mental Rotation Test Module
// Validated cognitive test measuring spatial visualization ability
// Based on Shepard & Metzler (1971) paradigm
// Predictive of success in STEM fields (engineering, architecture, sciences)

export type ShapeType = 'L' | 'T' | 'F' | 'P' | 'Z' | 'arrow' | 'complex';

export interface Shape2D {
  type: ShapeType;
  // Polygon points relative to center (normalized -1 to 1)
  points: { x: number; y: number }[];
}

export interface MentalRotationTrial {
  id: number;
  originalShape: Shape2D;
  originalRotation: number; // degrees
  options: {
    shape: Shape2D;
    rotation: number;
    isMirrored: boolean; // if mirrored, it's NOT a match
  }[];
  correctIndex: number;
  difficulty: 'easy' | 'medium' | 'hard';
}

export interface MentalRotationTrialResult {
  trial: MentalRotationTrial;
  selectedIndex: number;
  isCorrect: boolean;
  reactionTimeMs: number;
}

export interface MentalRotationResult {
  // Basic metrics
  totalTrials: number;
  correctAnswers: number;
  accuracy: number; // percentage

  // By difficulty
  easyAccuracy: number;
  mediumAccuracy: number;
  hardAccuracy: number;

  // Reaction times
  averageReactionTime: number;
  easyAvgRT: number;
  mediumAvgRT: number;
  hardAvgRT: number;

  // Interpretation
  label: string;
  description: string;
  spatialAbility: 'vysoká' | 'nadprůměrná' | 'průměrná' | 'podprůměrná';
  stemPotential: 'vynikající' | 'dobrý' | 'průměrný' | 'k rozvoji';
  tips: string[];

  // Raw data
  trials: MentalRotationTrialResult[];
}

// Base shapes - asymmetric to make rotation detection meaningful
export const BASE_SHAPES: Record<ShapeType, { x: number; y: number }[]> = {
  // L-shape (classic mental rotation shape)
  'L': [
    { x: -0.5, y: -0.7 },
    { x: -0.5, y: 0.7 },
    { x: -0.2, y: 0.7 },
    { x: -0.2, y: -0.4 },
    { x: 0.5, y: -0.4 },
    { x: 0.5, y: -0.7 }
  ],
  // T-shape
  'T': [
    { x: -0.6, y: -0.6 },
    { x: -0.6, y: -0.3 },
    { x: -0.15, y: -0.3 },
    { x: -0.15, y: 0.6 },
    { x: 0.15, y: 0.6 },
    { x: 0.15, y: -0.3 },
    { x: 0.6, y: -0.3 },
    { x: 0.6, y: -0.6 }
  ],
  // F-shape
  'F': [
    { x: -0.4, y: -0.7 },
    { x: -0.4, y: 0.7 },
    { x: -0.1, y: 0.7 },
    { x: -0.1, y: 0.1 },
    { x: 0.3, y: 0.1 },
    { x: 0.3, y: -0.15 },
    { x: -0.1, y: -0.15 },
    { x: -0.1, y: -0.45 },
    { x: 0.5, y: -0.45 },
    { x: 0.5, y: -0.7 }
  ],
  // P-shape
  'P': [
    { x: -0.4, y: -0.7 },
    { x: -0.4, y: 0.7 },
    { x: 0.3, y: 0.7 },
    { x: 0.5, y: 0.5 },
    { x: 0.5, y: 0.1 },
    { x: 0.3, y: -0.1 },
    { x: -0.1, y: -0.1 },
    { x: -0.1, y: -0.7 }
  ],
  // Z-shape
  'Z': [
    { x: -0.5, y: -0.6 },
    { x: 0.5, y: -0.6 },
    { x: 0.5, y: -0.35 },
    { x: -0.2, y: 0.35 },
    { x: 0.5, y: 0.35 },
    { x: 0.5, y: 0.6 },
    { x: -0.5, y: 0.6 },
    { x: -0.5, y: 0.35 },
    { x: 0.2, y: -0.35 },
    { x: -0.5, y: -0.35 }
  ],
  // Arrow-like shape
  'arrow': [
    { x: 0, y: -0.7 },
    { x: 0.5, y: 0 },
    { x: 0.2, y: 0 },
    { x: 0.2, y: 0.7 },
    { x: -0.2, y: 0.7 },
    { x: -0.2, y: 0 },
    { x: -0.5, y: 0 }
  ],
  // Complex asymmetric shape
  'complex': [
    { x: -0.5, y: -0.5 },
    { x: -0.5, y: 0.2 },
    { x: -0.2, y: 0.2 },
    { x: -0.2, y: 0.5 },
    { x: 0.1, y: 0.5 },
    { x: 0.1, y: 0.2 },
    { x: 0.3, y: 0.2 },
    { x: 0.3, y: -0.1 },
    { x: 0.5, y: -0.1 },
    { x: 0.5, y: -0.5 },
    { x: 0.2, y: -0.5 },
    { x: 0.2, y: -0.3 },
    { x: -0.2, y: -0.3 },
    { x: -0.2, y: -0.5 }
  ]
};

function rotatePoints(
  points: { x: number; y: number }[],
  angleDegrees: number
): { x: number; y: number }[] {
  const rad = (angleDegrees * Math.PI) / 180;
  const cos = Math.cos(rad);
  const sin = Math.sin(rad);

  return points.map(p => ({
    x: p.x * cos - p.y * sin,
    y: p.x * sin + p.y * cos
  }));
}

function mirrorPoints(
  points: { x: number; y: number }[]
): { x: number; y: number }[] {
  // Mirror horizontally (flip x)
  return points.map(p => ({ x: -p.x, y: p.y }));
}

function createShape(type: ShapeType): Shape2D {
  return {
    type,
    points: [...BASE_SHAPES[type]]
  };
}

function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

// Generate a single trial
function generateTrial(
  id: number,
  difficulty: 'easy' | 'medium' | 'hard'
): MentalRotationTrial {
  const shapeTypes: ShapeType[] = ['L', 'T', 'F', 'P', 'Z', 'arrow', 'complex'];

  // Select shape based on difficulty
  let availableShapes: ShapeType[];
  let rotationAngles: number[];
  let numOptions: number;

  switch (difficulty) {
    case 'easy':
      availableShapes = ['L', 'T', 'arrow'];
      rotationAngles = [0, 90, 180, 270]; // Only 90° increments
      numOptions = 3;
      break;
    case 'medium':
      availableShapes = ['L', 'T', 'F', 'P', 'arrow'];
      rotationAngles = [0, 45, 90, 135, 180, 225, 270, 315]; // 45° increments
      numOptions = 4;
      break;
    case 'hard':
      availableShapes = shapeTypes;
      rotationAngles = [0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330]; // 30° increments
      numOptions = 4;
      break;
  }

  const shapeType = availableShapes[Math.floor(Math.random() * availableShapes.length)];
  const originalShape = createShape(shapeType);
  const originalRotation = rotationAngles[Math.floor(Math.random() * rotationAngles.length)];

  // Generate options
  const options: MentalRotationTrial['options'] = [];
  const usedRotations = new Set<string>();

  // Add the correct answer (same shape, different rotation, not mirrored)
  let correctRotation: number;
  do {
    correctRotation = rotationAngles[Math.floor(Math.random() * rotationAngles.length)];
  } while (correctRotation === originalRotation && rotationAngles.length > 1);

  options.push({
    shape: createShape(shapeType),
    rotation: correctRotation,
    isMirrored: false
  });
  usedRotations.add(`${shapeType}-${correctRotation}-false`);

  // Add distractors (mirrored versions)
  while (options.length < numOptions) {
    const rotation = rotationAngles[Math.floor(Math.random() * rotationAngles.length)];
    const key = `${shapeType}-${rotation}-true`;

    if (!usedRotations.has(key)) {
      const mirroredShape = createShape(shapeType);
      mirroredShape.points = mirrorPoints(mirroredShape.points);

      options.push({
        shape: mirroredShape,
        rotation,
        isMirrored: true
      });
      usedRotations.add(key);
    }
  }

  // Shuffle options and find correct index
  const shuffledOptions = shuffleArray(options);
  const correctIndex = shuffledOptions.findIndex(opt => !opt.isMirrored);

  return {
    id,
    originalShape,
    originalRotation,
    options: shuffledOptions,
    correctIndex,
    difficulty
  };
}

// Generate full test
export function generateMentalRotationTrials(
  numEasy: number = 4,
  numMedium: number = 6,
  numHard: number = 6
): MentalRotationTrial[] {
  const trials: MentalRotationTrial[] = [];
  let id = 0;

  // Generate easy trials
  for (let i = 0; i < numEasy; i++) {
    trials.push(generateTrial(id++, 'easy'));
  }

  // Generate medium trials
  for (let i = 0; i < numMedium; i++) {
    trials.push(generateTrial(id++, 'medium'));
  }

  // Generate hard trials
  for (let i = 0; i < numHard; i++) {
    trials.push(generateTrial(id++, 'hard'));
  }

  return shuffleArray(trials);
}

// Practice trials
export function generatePracticeTrials(): MentalRotationTrial[] {
  return generateMentalRotationTrials(2, 2, 0);
}

// Score the test
export function scoreMentalRotationTest(
  trials: MentalRotationTrialResult[]
): MentalRotationResult {
  const totalTrials = trials.length;
  const correctTrials = trials.filter(t => t.isCorrect);
  const correctAnswers = correctTrials.length;
  const accuracy = Math.round((correctAnswers / totalTrials) * 100);

  // By difficulty
  const easyTrials = trials.filter(t => t.trial.difficulty === 'easy');
  const mediumTrials = trials.filter(t => t.trial.difficulty === 'medium');
  const hardTrials = trials.filter(t => t.trial.difficulty === 'hard');

  const easyCorrect = easyTrials.filter(t => t.isCorrect);
  const mediumCorrect = mediumTrials.filter(t => t.isCorrect);
  const hardCorrect = hardTrials.filter(t => t.isCorrect);

  const easyAccuracy = easyTrials.length > 0
    ? Math.round((easyCorrect.length / easyTrials.length) * 100)
    : 0;
  const mediumAccuracy = mediumTrials.length > 0
    ? Math.round((mediumCorrect.length / mediumTrials.length) * 100)
    : 0;
  const hardAccuracy = hardTrials.length > 0
    ? Math.round((hardCorrect.length / hardTrials.length) * 100)
    : 0;

  // Reaction times (correct answers only)
  const avgRT = (arr: MentalRotationTrialResult[]) => {
    const correct = arr.filter(t => t.isCorrect);
    return correct.length > 0
      ? Math.round(correct.reduce((sum, t) => sum + t.reactionTimeMs, 0) / correct.length)
      : 0;
  };

  const averageReactionTime = avgRT(trials);
  const easyAvgRT = avgRT(easyTrials);
  const mediumAvgRT = avgRT(mediumTrials);
  const hardAvgRT = avgRT(hardTrials);

  // Interpretation
  let label: string;
  let description: string;
  let spatialAbility: 'vysoká' | 'nadprůměrná' | 'průměrná' | 'podprůměrná';
  let stemPotential: 'vynikající' | 'dobrý' | 'průměrný' | 'k rozvoji';
  let tips: string[] = [];

  // Score based on accuracy weighted by difficulty
  const weightedScore = (easyAccuracy * 0.2) + (mediumAccuracy * 0.35) + (hardAccuracy * 0.45);

  if (weightedScore >= 85 && averageReactionTime < 4000) {
    label = 'Vynikající prostorová představivost';
    description = 'Máš výjimečnou schopnost mentálně manipulovat s objekty v prostoru. Tato dovednost je klíčová pro inženýrství, architekturu a přírodní vědy.';
    spatialAbility = 'vysoká';
    stemPotential = 'vynikající';
    tips = [
      'Tvá prostorová představivost je silná stránka - využij ji při výběru studia',
      'Zkus 3D modelování, CAD nebo architektonické programy',
      'Obory jako strojírenství, architektura nebo chirurgie by ti mohly sedět',
      'Rozvíjej tuto dovednost strategickými hrami nebo puzzles'
    ];
  } else if (weightedScore >= 70) {
    label = 'Nadprůměrná prostorová představivost';
    description = 'Tvá schopnost vizualizovat rotace objektů je nadprůměrná. To je užitečná dovednost pro mnoho technických oborů.';
    spatialAbility = 'nadprůměrná';
    stemPotential = 'dobrý';
    tips = [
      'Máš dobré předpoklady pro technické obory',
      'Trénuj prostorovou představivost pomocí puzzles a 3D her',
      'Zkus skicování objektů z různých úhlů',
      'Origami a stavebnice (LEGO Technic) mohou pomoci rozvoji'
    ];
  } else if (weightedScore >= 50) {
    label = 'Průměrná prostorová představivost';
    description = 'Tvá prostorová představivost je v normě. S tréninkem ji můžeš výrazně zlepšit.';
    spatialAbility = 'průměrná';
    stemPotential = 'průměrný';
    tips = [
      'Prostorová představivost se dá trénovat - není fixní',
      'Zkus tetris, puzzle nebo skládačky pravidelně',
      'Praktické činnosti jako řemesla nebo sport pomáhají',
      'Nauč se číst technické výkresy nebo mapy'
    ];
  } else {
    label = 'Prostor pro rozvoj';
    description = 'Prostorová představivost zatím není tvou nejsilnější stránkou, ale lze ji systematicky rozvíjet.';
    spatialAbility = 'podprůměrná';
    stemPotential = 'k rozvoji';
    tips = [
      'Prostorová představivost se dá výrazně zlepšit tréninkem',
      'Začni s jednoduchými puzzles a postupně zvyšuj obtížnost',
      'Zkus videohry s 3D prostředím (Minecraft, Portal)',
      'Fyzické skládačky a stavebnice jsou skvělý trénink',
      'Nevylučuje to STEM obory - jen vyžadují více praxe'
    ];
  }

  // Additional tips based on reaction time
  if (averageReactionTime > 6000 && accuracy >= 70) {
    tips.push('Tvá přesnost je dobrá, ale zkus pracovat rychleji - důvěřuj prvnímu instinktu');
  }
  if (averageReactionTime < 2000 && accuracy < 60) {
    tips.push('Zpomal a věnuj více času analýze - přesnost je důležitější než rychlost');
  }

  return {
    totalTrials,
    correctAnswers,
    accuracy,
    easyAccuracy,
    mediumAccuracy,
    hardAccuracy,
    averageReactionTime,
    easyAvgRT,
    mediumAvgRT,
    hardAvgRT,
    label,
    description,
    spatialAbility,
    stemPotential,
    tips,
    trials
  };
}

// Utility: Get SVG path from shape for rendering
export function getShapePath(shape: Shape2D, rotation: number, scale: number = 50): string {
  const rotatedPoints = rotatePoints(shape.points, rotation);
  if (rotatedPoints.length === 0) return '';

  const commands = rotatedPoints.map((p, i) => {
    const x = p.x * scale;
    const y = p.y * scale;
    return `${i === 0 ? 'M' : 'L'} ${x} ${y}`;
  });

  return commands.join(' ') + ' Z';
}

// Utility: Render shape as SVG element (for React component)
export function getShapeSvgData(
  shape: Shape2D,
  rotation: number,
  size: number = 100
): { path: string; viewBox: string } {
  const scale = size * 0.4;
  const path = getShapePath(shape, rotation, scale);
  const half = size / 2;

  return {
    path,
    viewBox: `${-half} ${-half} ${size} ${size}`
  };
}