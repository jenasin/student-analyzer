// Prompts
export { SYSTEM_INSTRUCTION } from './prompts/systemPrompt';
export { TURN_REMINDER, START_PROMPT, EVALUATE_PROMPT } from './prompts/reminders';

// VAK Instruments
export { vakQuestions, getVakQuestionText, getVakOptionText } from './instruments/vakQuestions';
export type { VakOption, VakQuestion } from './instruments/vakQuestions';

// TEX Test
export { exampleTexTest } from './instruments/texTestTemplate';
export type {
  QuestionType,
  BaseQ,
  McqQ,
  TfQ,
  ClozeQ,
  OrderQ,
  ShortQ,
  TexQuestion,
  TexTest
} from './instruments/texTestTemplate';

// VAK + TEX Scoring
export { scoreVak, scoreTexAuto, addTransferScore } from './instruments/scoring';
export type { VakResult, TexScore } from './instruments/scoring';

// Typology (30 questions - ILS/Kolb/VARK based)
export {
  typologyQuestions,
  dimensionsMeta,
  getQuestionsByDimension,
  getDimensionMeta,
  getTypologyQuestionText,
  getTypologyOptionText,
  getDimensionLabel,
  getDimensionDescription
} from './instruments/typologyQuestions';
export type {
  AnswerKey,
  DimensionId,
  DimensionSide,
  TypologyOption,
  TypologyQuestion,
  DimensionMeta
} from './instruments/typologyQuestions';

// Typology Scoring
export {
  scoreTypology,
  scoresToBars,
  exportAsMarkdown
} from './instruments/typologyScoring';
export type {
  DimensionScore,
  TypologyResult,
  AnswerDetail
} from './instruments/typologyScoring';

// Session Flow
export { sessionPlan, getModuleById, getTimeUpToModule } from './flows/sessionPlan';
export type { SessionModule, SessionModuleId } from './flows/sessionPlan';

// Evidence-based Assessments
export {
  // Growth Mindset
  growthMindsetQuestions,
  scoreGrowthMindset,
  // Grit
  gritQuestions,
  scoreGrit,
  // Self-Efficacy
  selfEfficacyQuestions,
  scoreSelfEfficacy,
  // Test Anxiety
  testAnxietyQuestions,
  scoreTestAnxiety,
  // Metacognition
  metacognitionQuestions,
  scoreMetacognition,
  // RIASEC
  riasecQuestions,
  scoreRiasec,
  // Emotional Intelligence
  eqQuestions,
  scoreEQ,
  // Procrastination
  procrastinationQuestions,
  scoreProcrastination,
  // Academic Motivation
  academicMotivationQuestions,
  scoreAcademicMotivation,
  // Time Management
  timeManagementQuestions,
  scoreTimeManagement,
  // Big Five
  bigFiveQuestions,
  scoreBigFive,
  // Locus of Control
  locusOfControlQuestions,
  scoreLocusOfControl,
  // Resilience
  resilienceQuestions,
  scoreResilience,
  // Gardner's Multiple Intelligences
  gardnerQuestions,
  scoreGardner,
  // Kolb's Learning Style
  kolbQuestions,
  scoreKolb,
  // Helper functions for i18n
  getAssessmentQuestionText,
  getAssessmentOptionText,
  getResultLabel,
  getResultDescription,
  getResultTips,
  getRiasecQuestionText
} from './assessments';
export type { AssessmentQuestion, AssessmentResult, RiasecQuestion, RiasecResult, BigFiveResult, GardnerResult, KolbResult } from './assessments';

// Cross-Assessment Synthesis
export { generateCrossSynthesis } from './crossSynthesis';
export type { SynthesisInsight, AssessmentScores } from './crossSynthesis';

// Stroop Test (cognitive attention test with camera)
export {
  generateStroopTrials,
  generatePracticeTrials,
  scoreStroopTest,
  COLORS,
  COLOR_NAMES
} from './stroopTest';
export type {
  StroopTrial,
  StroopTrialResult,
  StroopResult
} from './stroopTest';

// Mental Rotation Test (spatial visualization ability - Shepard & Metzler paradigm)
export {
  generateMentalRotationTrials,
  generatePracticeTrials as generateMRTPracticeTrials,
  scoreMentalRotationTest,
  getShapePath,
  getShapeSvgData,
  BASE_SHAPES
} from './instruments/mentalRotationTest';
export type {
  ShapeType,
  Shape2D,
  MentalRotationTrial,
  MentalRotationTrialResult,
  MentalRotationResult
} from './instruments/mentalRotationTest';
