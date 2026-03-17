
import React, { useState, useEffect, useRef } from 'react';
import ReactMarkdown from 'react-markdown';
import { Brain, Eye, MessageCircle, CalendarDays, Sparkles, Medal, ArrowRight, Check, ChevronLeft, ExternalLink, Zap, Users, Trash2, User, Mic, Smile, Calculator, Heart, Square, Play, StopCircle, Upload, Video, Pencil, Eraser, RotateCcw, Circle, TreeDeciduous, BookOpen, ChevronDown, ChevronUp, GraduationCap, Target, Link, Settings } from 'lucide-react';
import { Message, AppStatus, Report, Skill } from './types';
import { navigatorService } from './services/openaiService';
import { getStudents, saveStudent, deleteStudent, getStudentByName, updateStudentResults, StudentProfile } from './services/studentStorage';
import { Language, t, tModule } from './src/i18n/translations';
import { voiceService, VoiceInterviewResult, InterviewExchange } from './src/services/VoiceService';
import { interviewQuestions, getInterviewQuestionText, generateStudentPassportPrompt } from './src/modules/voiceInterview';
import { visionAnalysisService, MathReasoningResult } from './src/services/VisionAnalysisService';
import { emotionService, EmotionData, EmotionResult } from './src/services/EmotionService';
import {
  typologyQuestions,
  dimensionsMeta,
  scoreTypology,
  TypologyResult,
  AnswerKey,
  vakQuestions,
  scoreVak,
  VakResult,
  VakOption,
  getVakQuestionText,
  getVakOptionText,
  getTypologyQuestionText,
  getTypologyOptionText,
  getDimensionLabel,
  getAssessmentQuestionText,
  getAssessmentOptionText,
  getResultLabel,
  getResultDescription,
  getResultTips,
  getRiasecQuestionText,
  // New assessments
  growthMindsetQuestions,
  scoreGrowthMindset,
  gritQuestions,
  scoreGrit,
  selfEfficacyQuestions,
  scoreSelfEfficacy,
  testAnxietyQuestions,
  scoreTestAnxiety,
  metacognitionQuestions,
  scoreMetacognition,
  riasecQuestions,
  scoreRiasec,
  eqQuestions,
  scoreEQ,
  // New assessments (batch 2)
  procrastinationQuestions,
  scoreProcrastination,
  academicMotivationQuestions,
  scoreAcademicMotivation,
  timeManagementQuestions,
  scoreTimeManagement,
  bigFiveQuestions,
  scoreBigFive,
  locusOfControlQuestions,
  scoreLocusOfControl,
  resilienceQuestions,
  scoreResilience,
  // Gardner's Multiple Intelligences
  gardnerQuestions,
  scoreGardner,
  GardnerResult,
  // Kolb's Learning Style
  kolbQuestions,
  scoreKolb,
  KolbResult,
  // Study Stress & Strategies (HuggingFace inspired)
  studyStressQuestions,
  scoreStudyStress,
  studyStrategiesQuestions,
  scoreStudyStrategies,
  // Cross-Synthesis
  generateCrossSynthesis,
  SynthesisInsight,
  AssessmentScores,
  AssessmentResult,
  RiasecResult,
  BigFiveResult,
  // Stroop Test
  generateStroopTrials,
  generatePracticeTrials,
  scoreStroopTest,
  COLORS,
  COLOR_NAMES,
  StroopTrial,
  StroopTrialResult,
  StroopResult,
  // Mental Rotation Test
  generateMentalRotationTrials,
  generateMRTPracticeTrials,
  scoreMentalRotationTest,
  getShapeSvgData,
  MentalRotationTrial,
  MentalRotationTrialResult,
  MentalRotationResult
} from './src/modules';

type View = 'welcome' | 'dashboard' | 'chat' | 'typology' | 'vak' | 'habits' | 'motivation' | 'strengths' | 'results' | 'gemini' | 'growthMindset' | 'grit' | 'selfEfficacy' | 'testAnxiety' | 'metacognition' | 'riasec' | 'eq' | 'stroop' | 'mentalRotation' | 'voiceInterview' | 'emotionRecognition' | 'mathReasoning' | 'garminHealth' | 'baumTest' | 'procrastination' | 'academicMotivation' | 'timeManagement' | 'bigFive' | 'locusOfControl' | 'resilience' | 'gardner' | 'kolb' | 'studyStress' | 'studyStrategies';

interface ModuleProgress {
  chat: boolean;
  typology: boolean;
  vak: boolean;
  habits: boolean;
  motivation: boolean;
  strengths: boolean;
  gemini: boolean;
  growthMindset: boolean;
  grit: boolean;
  selfEfficacy: boolean;
  testAnxiety: boolean;
  metacognition: boolean;
  riasec: boolean;
  eq: boolean;
  stroop: boolean;
  mentalRotation: boolean;
  voiceInterview: boolean;
  emotionRecognition: boolean;
  mathReasoning: boolean;
  garminHealth: boolean;
  baumTest: boolean;
  procrastination: boolean;
  academicMotivation: boolean;
  timeManagement: boolean;
  bigFive: boolean;
  locusOfControl: boolean;
  resilience: boolean;
  gardner: boolean;
  kolb: boolean;
  studyStress: boolean;
  studyStrategies: boolean;
}

interface ModuleCard {
  id: string;
  title: string;
  description: string;
  time: string;
  icon: string;
  color: string;
  view: View;
  tags: string[];
  previewBg: string;
  previewIcon?: string;
  external?: boolean;
  externalUrl?: string;
  hfInspired?: boolean;
}

const modules: ModuleCard[] = [
  { id: 'typology', title: '', description: '', time: '~14 min', icon: 'brain', color: 'amber', view: 'typology', tags: [], previewBg: 'from-amber-600 via-yellow-600 to-amber-700', previewIcon: 'brain' },
  { id: 'vak', title: '', description: '', time: '~5 min', icon: 'eye', color: 'stone', view: 'vak', tags: [], previewBg: 'from-stone-500 via-stone-600 to-stone-700', previewIcon: 'eye' },
  { id: 'chat', title: '', description: '', time: '~12 min', icon: 'chat', color: 'amber', view: 'chat', tags: [], previewBg: 'from-amber-500 via-amber-600 to-yellow-700', previewIcon: 'chat' },
  { id: 'habits', title: '', description: '', time: '~6 min', icon: 'clock', color: 'orange', view: 'habits', tags: [], previewBg: 'from-orange-500 via-amber-500 to-yellow-600', previewIcon: 'clock' },
  { id: 'motivation', title: '', description: '', time: '~5 min', icon: 'fire', color: 'red', view: 'motivation', tags: [], previewBg: 'from-red-600 via-orange-600 to-amber-600', previewIcon: 'fire' },
  { id: 'strengths', title: '', description: '', time: '~4 min', icon: 'star', color: 'yellow', view: 'strengths', tags: [], previewBg: 'from-yellow-500 via-amber-500 to-orange-500', previewIcon: 'star' },
  { id: 'gemini', title: '', description: '', time: 'Web app', icon: 'sparkles', color: 'stone', view: 'gemini', tags: [], previewBg: 'from-stone-600 via-stone-700 to-neutral-800', previewIcon: 'sparkles', external: true, externalUrl: 'https://aistudio.google.com' },
  { id: 'growthMindset', title: '', description: '', time: '~3 min', icon: 'brain', color: 'emerald', view: 'growthMindset', tags: [], previewBg: 'from-emerald-600 via-green-600 to-teal-700', previewIcon: 'brain' },
  { id: 'grit', title: '', description: '', time: '~3 min', icon: 'fire', color: 'orange', view: 'grit', tags: [], previewBg: 'from-orange-600 via-red-600 to-rose-700', previewIcon: 'fire' },
  { id: 'selfEfficacy', title: '', description: '', time: '~3 min', icon: 'star', color: 'yellow', view: 'selfEfficacy', tags: [], previewBg: 'from-yellow-600 via-amber-600 to-orange-600', previewIcon: 'star' },
  { id: 'testAnxiety', title: '', description: '', time: '~3 min', icon: 'clock', color: 'rose', view: 'testAnxiety', tags: [], previewBg: 'from-rose-600 via-red-600 to-orange-700', previewIcon: 'clock' },
  { id: 'metacognition', title: '', description: '', time: '~3 min', icon: 'brain', color: 'amber', view: 'metacognition', tags: [], previewBg: 'from-amber-700 via-yellow-700 to-orange-700', previewIcon: 'brain' },
  { id: 'riasec', title: '', description: '', time: '~4 min', icon: 'star', color: 'stone', view: 'riasec', tags: [], previewBg: 'from-stone-600 via-amber-700 to-stone-700', previewIcon: 'star' },
  { id: 'eq', title: '', description: '', time: '~3 min', icon: 'chat', color: 'rose', view: 'eq', tags: [], previewBg: 'from-rose-500 via-pink-600 to-red-600', previewIcon: 'chat' },
  { id: 'stroop', title: '', description: '', time: '~4 min', icon: 'eye', color: 'cyan', view: 'stroop', tags: [], previewBg: 'from-cyan-500 via-blue-500 to-indigo-600', previewIcon: 'eye' },
  { id: 'mentalRotation', title: '', description: '', time: '~5 min', icon: 'shapes', color: 'violet', view: 'mentalRotation', tags: [], previewBg: 'from-violet-500 via-purple-600 to-fuchsia-600', previewIcon: 'shapes' },
  { id: 'voiceInterview', title: '', description: '', time: '~8 min', icon: 'mic', color: 'violet', view: 'voiceInterview', tags: [], previewBg: 'from-violet-500 via-purple-500 to-fuchsia-500', previewIcon: 'mic' },
  { id: 'emotionRecognition', title: '', description: '', time: '~3 min', icon: 'smile', color: 'pink', view: 'emotionRecognition', tags: [], previewBg: 'from-pink-500 via-rose-500 to-red-500', previewIcon: 'smile' },
  { id: 'mathReasoning', title: '', description: '', time: '~5 min', icon: 'calculator', color: 'blue', view: 'mathReasoning', tags: [], previewBg: 'from-blue-500 via-indigo-500 to-purple-500', previewIcon: 'calculator' },
  { id: 'garminHealth', title: '', description: '', time: '~2 min', icon: 'heart', color: 'green', view: 'garminHealth', tags: [], previewBg: 'from-green-500 via-emerald-500 to-teal-500', previewIcon: 'heart' },
  { id: 'baumTest', title: '', description: '', time: '~5 min', icon: 'tree', color: 'amber', view: 'baumTest', tags: [], previewBg: 'from-amber-500 via-orange-500 to-yellow-500', previewIcon: 'tree' },
  { id: 'procrastination', title: '', description: '', time: '~3 min', icon: 'clock', color: 'red', view: 'procrastination', tags: [], previewBg: 'from-red-500 via-rose-600 to-pink-700', previewIcon: 'clock' },
  { id: 'academicMotivation', title: '', description: '', time: '~3 min', icon: 'fire', color: 'amber', view: 'academicMotivation', tags: [], previewBg: 'from-amber-500 via-orange-500 to-red-500', previewIcon: 'fire' },
  { id: 'timeManagement', title: '', description: '', time: '~3 min', icon: 'clock', color: 'blue', view: 'timeManagement', tags: [], previewBg: 'from-blue-500 via-cyan-500 to-teal-500', previewIcon: 'clock' },
  { id: 'bigFive', title: '', description: '', time: '~4 min', icon: 'brain', color: 'violet', view: 'bigFive', tags: [], previewBg: 'from-violet-500 via-indigo-500 to-blue-600', previewIcon: 'brain' },
  { id: 'locusOfControl', title: '', description: '', time: '~3 min', icon: 'star', color: 'teal', view: 'locusOfControl', tags: [], previewBg: 'from-teal-500 via-emerald-500 to-green-600', previewIcon: 'star' },
  { id: 'resilience', title: '', description: '', time: '~3 min', icon: 'heart', color: 'rose', view: 'resilience', tags: [], previewBg: 'from-rose-500 via-pink-500 to-fuchsia-500', previewIcon: 'heart' },
  { id: 'gardner', title: '', description: '', time: '~5 min', icon: 'brain', color: 'indigo', view: 'gardner', tags: [], previewBg: 'from-indigo-500 via-purple-500 to-violet-600', previewIcon: 'brain' },
  { id: 'kolb', title: '', description: '', time: '~4 min', icon: 'eye', color: 'cyan', view: 'kolb', tags: [], previewBg: 'from-cyan-500 via-blue-500 to-indigo-500', previewIcon: 'eye' },
  { id: 'studyStress', title: '', description: '', time: '~3 min', icon: 'heart', color: 'red', view: 'studyStress', tags: [], previewBg: 'from-red-500 via-orange-500 to-amber-500', previewIcon: 'heart', hfInspired: true },
  { id: 'studyStrategies', title: '', description: '', time: '~3 min', icon: 'brain', color: 'emerald', view: 'studyStrategies', tags: [], previewBg: 'from-emerald-500 via-teal-500 to-cyan-500', previewIcon: 'brain', hfInspired: true }
];

// Habits questions (8 questions)
interface SimpleQuestion {
  id: string;
  text: string;
  options: { key: 'A' | 'B' | 'C' | 'D'; text: string; score: number }[];
}

const habitsQuestions: SimpleQuestion[] = [
  { id: 'H1', text: 'Jak si plánuješ učení?', options: [
    { key: 'A', text: 'Mám detailní plán na každý den', score: 4 },
    { key: 'B', text: 'Plánuju týden dopředu, volně', score: 3 },
    { key: 'C', text: 'Učím se, když mám deadline', score: 2 },
    { key: 'D', text: 'Neplánuju, učím se náhodně', score: 1 }
  ]},
  { id: 'H2', text: 'Když máš velký úkol, co uděláš?', options: [
    { key: 'A', text: 'Rozložím na menší kroky hned', score: 4 },
    { key: 'B', text: 'Začnu a uvidím, jak to půjde', score: 3 },
    { key: 'C', text: 'Odkládám, pak udělám najednou', score: 2 },
    { key: 'D', text: 'Panikařím na poslední chvíli', score: 1 }
  ]},
  { id: 'H3', text: 'Jak často odkládáš učení?', options: [
    { key: 'A', text: 'Skoro nikdy', score: 4 },
    { key: 'B', text: 'Občas, ale zvládnu to', score: 3 },
    { key: 'C', text: 'Dost často, ale deadline splním', score: 2 },
    { key: 'D', text: 'Pořád, je to problém', score: 1 }
  ]},
  { id: 'H4', text: 'Když se zasekneš na úkolu:', options: [
    { key: 'A', text: 'Zeptám se spolužáka/učitele hned', score: 4 },
    { key: 'B', text: 'Googluji a hledám řešení', score: 3 },
    { key: 'C', text: 'Nechám to a vrátím se později', score: 2 },
    { key: 'D', text: 'Vzdám to a dělám něco jiného', score: 1 }
  ]},
  { id: 'H5', text: 'Kde se nejlíp učíš?', options: [
    { key: 'A', text: 'V tichu, bez rozptýlení', score: 4 },
    { key: 'B', text: 'S hudbou na pozadí', score: 3 },
    { key: 'C', text: 'V kavárně nebo s lidmi', score: 2 },
    { key: 'D', text: 'V posteli nebo na gauči', score: 1 }
  ]},
  { id: 'H6', text: 'Jak dlouho vydržíš soustředěně pracovat?', options: [
    { key: 'A', text: '60+ minut bez přestávky', score: 4 },
    { key: 'B', text: '30-45 minut, pak pauza', score: 3 },
    { key: 'C', text: '15-25 minut max', score: 2 },
    { key: 'D', text: 'Pár minut, pak koukám na mobil', score: 1 }
  ]},
  { id: 'H7', text: 'Co děláš večer před testem?', options: [
    { key: 'A', text: 'Nic, už mám naučeno', score: 4 },
    { key: 'B', text: 'Rychle projedu poznámky', score: 3 },
    { key: 'C', text: 'Učím se do noci', score: 2 },
    { key: 'D', text: 'Panikařím a nespím', score: 1 }
  ]},
  { id: 'H8', text: 'Děláš si pravidelně poznámky?', options: [
    { key: 'A', text: 'Ano, vlastní strukturované', score: 4 },
    { key: 'B', text: 'Ano, ale chaoticky', score: 3 },
    { key: 'C', text: 'Občas, když je to důležité', score: 2 },
    { key: 'D', text: 'Ne, spoléhám na paměť', score: 1 }
  ]}
];

// Motivation questions (8 questions)
const motivationQuestions: SimpleQuestion[] = [
  { id: 'M1', text: 'Proč chodíš do školy?', options: [
    { key: 'A', text: 'Baví mě učit se nové věci', score: 4 },
    { key: 'B', text: 'Chci mít dobrý základ pro budoucnost', score: 3 },
    { key: 'C', text: 'Kvůli rodičům a známkám', score: 2 },
    { key: 'D', text: 'Musím, jinak bych nešel/la', score: 1 }
  ]},
  { id: 'M2', text: 'Když dostaneš špatnou známku:', options: [
    { key: 'A', text: 'Motivuje mě to více pracovat', score: 4 },
    { key: 'B', text: 'Zamyslím se, co zlepšit', score: 3 },
    { key: 'C', text: 'Je mi to jedno', score: 2 },
    { key: 'D', text: 'Vzdám to, nejde mi to', score: 1 }
  ]},
  { id: 'M3', text: 'Máš jasné cíle, čeho chceš dosáhnout?', options: [
    { key: 'A', text: 'Ano, vím přesně co a kdy', score: 4 },
    { key: 'B', text: 'Mám obecnou představu', score: 3 },
    { key: 'C', text: 'Nad tím moc nepřemýšlím', score: 2 },
    { key: 'D', text: 'Ne, žiju přítomností', score: 1 }
  ]},
  { id: 'M4', text: 'Co tě nejvíc motivuje?', options: [
    { key: 'A', text: 'Pocit, že jsem něco zvládl/a', score: 4 },
    { key: 'B', text: 'Pochvala od ostatních', score: 3 },
    { key: 'C', text: 'Odměna (peníze, dárky)', score: 2 },
    { key: 'D', text: 'Strach z trestu/neúspěchu', score: 1 }
  ]},
  { id: 'M5', text: 'Když se ti něco nedaří:', options: [
    { key: 'A', text: 'Nevzdávám se, zkouším dál', score: 4 },
    { key: 'B', text: 'Udělám pauzu a zkusím znovu', score: 3 },
    { key: 'C', text: 'Požádám o pomoc a nechám to na jiných', score: 2 },
    { key: 'D', text: 'Vzdám to rychle', score: 1 }
  ]},
  { id: 'M6', text: 'Učíš se i věci mimo školu?', options: [
    { key: 'A', text: 'Ano, pořád se učím něco nového', score: 4 },
    { key: 'B', text: 'Občas, když mě něco zaujme', score: 3 },
    { key: 'C', text: 'Jen když to potřebuju', score: 2 },
    { key: 'D', text: 'Ne, stačí mi škola', score: 1 }
  ]},
  { id: 'M7', text: 'Jak se cítíš ráno před školou?', options: [
    { key: 'A', text: 'Těším se, co nového se naučím', score: 4 },
    { key: 'B', text: 'Neutrálně, je to rutina', score: 3 },
    { key: 'C', text: 'Radši bych zůstal/a doma', score: 2 },
    { key: 'D', text: 'Stresuju se a nechce se mi', score: 1 }
  ]},
  { id: 'M8', text: 'Srovnáváš se s ostatními?', options: [
    { key: 'A', text: 'Soutěžím hlavně sám/sama se sebou', score: 4 },
    { key: 'B', text: 'Inspiruju se, ale netlačím se', score: 3 },
    { key: 'C', text: 'Ano a demotivuje mě to', score: 2 },
    { key: 'D', text: 'Ano, často se cítím horší', score: 1 }
  ]}
];

// Strengths questions (6 questions)
const strengthsQuestions: SimpleQuestion[] = [
  { id: 'S1', text: 'Ve které oblasti se cítíš nejjistější?', options: [
    { key: 'A', text: 'Matematika a logika', score: 1 },
    { key: 'B', text: 'Jazyky a komunikace', score: 2 },
    { key: 'C', text: 'Kreativita a umění', score: 3 },
    { key: 'D', text: 'Praktické a manuální práce', score: 4 }
  ]},
  { id: 'S2', text: 'Když pracuješ ve skupině:', options: [
    { key: 'A', text: 'Přirozeně vedu ostatní', score: 4 },
    { key: 'B', text: 'Přicházím s nápady', score: 3 },
    { key: 'C', text: 'Pomáhám realizovat plán', score: 2 },
    { key: 'D', text: 'Spíš se držím zpátky', score: 1 }
  ]},
  { id: 'S3', text: 'Co ti jde nejlépe?', options: [
    { key: 'A', text: 'Analyzovat a řešit problémy', score: 4 },
    { key: 'B', text: 'Komunikovat a přesvědčovat', score: 3 },
    { key: 'C', text: 'Tvořit a vymýšlet', score: 2 },
    { key: 'D', text: 'Organizovat a plánovat', score: 1 }
  ]},
  { id: 'S4', text: 'Když se učíš něco nového:', options: [
    { key: 'A', text: 'Rychle pochopím princip', score: 4 },
    { key: 'B', text: 'Potřebuju příklady a praxi', score: 3 },
    { key: 'C', text: 'Trvá mi to, ale pak to sedne', score: 2 },
    { key: 'D', text: 'Je to pro mě většinou těžké', score: 1 }
  ]},
  { id: 'S5', text: 'Za co tě ostatní chválí?', options: [
    { key: 'A', text: 'Chytrost a znalosti', score: 4 },
    { key: 'B', text: 'Kreativitu a originalitu', score: 3 },
    { key: 'C', text: 'Spolehlivost a pečlivost', score: 2 },
    { key: 'D', text: 'Ochotu pomáhat', score: 1 }
  ]},
  { id: 'S6', text: 'V čem chceš být v budoucnu lepší?', options: [
    { key: 'A', text: 'V odborných znalostech', score: 4 },
    { key: 'B', text: 'V komunikaci a prezentaci', score: 3 },
    { key: 'C', text: 'V time managementu', score: 2 },
    { key: 'D', text: 'V sebevědomí', score: 1 }
  ]}
];

interface SimpleResult {
  score: number;
  maxScore: number;
  percent: number;
  label: string;
  tips: string[];
}

function scoreHabits(answers: Record<string, 'A' | 'B' | 'C' | 'D'>): SimpleResult {
  let total = 0;
  for (const q of habitsQuestions) {
    const answer = answers[q.id];
    const opt = q.options.find(o => o.key === answer);
    if (opt) total += opt.score;
  }
  const maxScore = habitsQuestions.length * 4;
  const percent = Math.round((total / maxScore) * 100);
  let label = '';
  let tips: string[] = [];
  if (percent >= 75) {
    label = 'Skvělé studijní návyky';
    tips = ['Pokračuj v tom, co děláš!', 'Zkus mentorovat spolužáky'];
  } else if (percent >= 50) {
    label = 'Dobré návyky s prostorem pro zlepšení';
    tips = ['Zkus Pomodoro techniku (25 min práce, 5 min pauza)', 'Plánuj si učení den dopředu'];
  } else if (percent >= 25) {
    label = 'Návyky potřebují práci';
    tips = ['Začni s malými cíli každý den', 'Odstraň rozptýlení (mobil do šuplíku)', 'Najdi si study buddy'];
  } else {
    label = 'Čas na změnu přístupu';
    tips = ['Začni úplně od základů - 15 min denně', 'Najdi si místo jen pro učení', 'Odmění se za splněné úkoly'];
  }
  return { score: total, maxScore, percent, label, tips };
}

function scoreMotivation(answers: Record<string, 'A' | 'B' | 'C' | 'D'>): SimpleResult {
  let total = 0;
  for (const q of motivationQuestions) {
    const answer = answers[q.id];
    const opt = q.options.find(o => o.key === answer);
    if (opt) total += opt.score;
  }
  const maxScore = motivationQuestions.length * 4;
  const percent = Math.round((total / maxScore) * 100);
  let label = '';
  let tips: string[] = [];
  if (percent >= 75) {
    label = 'Vysoká vnitřní motivace';
    tips = ['Tvá motivace je tvá superschopnost!', 'Postav si větší cíle'];
  } else if (percent >= 50) {
    label = 'Dobrá motivace, lze posílit';
    tips = ['Najdi si proč - co tě na předmětu baví?', 'Propoj učivo s reálným životem'];
  } else if (percent >= 25) {
    label = 'Motivace potřebuje podporu';
    tips = ['Najdi si smysl v tom, co děláš', 'Postav si malé, dosažitelné cíle', 'Odmění se za úspěchy'];
  } else {
    label = 'Čas najít novou jiskru';
    tips = ['Promluvte si s někým o svých cílech', 'Zkus něco nového mimo školu', 'Malé kroky vedou k velkým změnám'];
  }
  return { score: total, maxScore, percent, label, tips };
}

function scoreStrengths(answers: Record<string, 'A' | 'B' | 'C' | 'D'>): { areas: { label: string; score: number }[]; topStrength: string; tips: string[] } {
  const areas = [
    { label: 'Analytické myšlení', score: 0 },
    { label: 'Komunikace', score: 0 },
    { label: 'Kreativita', score: 0 },
    { label: 'Leadership', score: 0 }
  ];

  // Score based on patterns in answers
  for (const q of strengthsQuestions) {
    const answer = answers[q.id];
    if (answer === 'A') areas[0].score += 25;
    if (answer === 'B') areas[1].score += 25;
    if (answer === 'C') areas[2].score += 25;
    if (answer === 'D') areas[3].score += 25;
  }

  // Normalize to percentage
  areas.forEach(a => a.score = Math.min(100, Math.round(a.score / strengthsQuestions.length * 4)));

  const sorted = [...areas].sort((a, b) => b.score - a.score);
  const topStrength = sorted[0].label;

  const tips: string[] = [];
  if (topStrength === 'Analytické myšlení') {
    tips.push('Tvá silná stránka je logika - využij ji v matice a vědách');
    tips.push('Zkus programování nebo šachy');
  } else if (topStrength === 'Komunikace') {
    tips.push('Umíš dobře vyjádřit myšlenky - rozvíjej jazyky');
    tips.push('Zkus debatní klub nebo psaní');
  } else if (topStrength === 'Kreativita') {
    tips.push('Máš kreativní myšlení - nech ho projevit');
    tips.push('Zkus design, hudbu nebo umění');
  } else {
    tips.push('Máš vůdčí schopnosti - neboj se vést projekty');
    tips.push('Organizuj skupinové aktivity');
  }

  return { areas, topStrength, tips };
}

const SkillBar: React.FC<{ skill: Skill; index: number }> = ({ skill, index }) => {
  const [width, setWidth] = useState(0);
  useEffect(() => {
    const timer = setTimeout(() => setWidth(skill.value), 100 * index);
    return () => clearTimeout(timer);
  }, [skill.value, index]);

  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center text-sm font-semibold">
        <span className="text-slate-600 text-xs uppercase tracking-wider">{skill.label}</span>
        <span className="text-indigo-600">{skill.value}%</span>
      </div>
      <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
        <div className="h-full bg-indigo-600 transition-all duration-1000 ease-out rounded-full" style={{ width: `${width}%` }} />
      </div>
    </div>
  );
};

const DimensionBar: React.FC<{ leftLabel: string; rightLabel: string; leftScore: number; rightScore: number; index: number }> = ({ leftLabel, rightLabel, leftScore, rightScore, index }) => {
  const [animatedRight, setAnimatedRight] = useState(50);
  useEffect(() => {
    const timer = setTimeout(() => setAnimatedRight(rightScore), 100 * index);
    return () => clearTimeout(timer);
  }, [rightScore, index]);

  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center text-xs font-semibold">
        <span className="text-slate-500">{leftLabel} {leftScore}%</span>
        <span className="text-purple-600">{rightLabel} {rightScore}%</span>
      </div>
      <div className="h-3 w-full bg-slate-100 rounded-full overflow-hidden relative">
        <div className="absolute left-0 h-full bg-slate-300 transition-all duration-1000 ease-out rounded-l-full" style={{ width: `${100 - animatedRight}%` }} />
        <div className="absolute right-0 h-full bg-purple-500 transition-all duration-1000 ease-out rounded-r-full" style={{ width: `${animatedRight}%` }} />
      </div>
    </div>
  );
};

const VakBar: React.FC<{ label: string; value: number; color: string; index: number }> = ({ label, value, color, index }) => {
  const [width, setWidth] = useState(0);
  useEffect(() => {
    const timer = setTimeout(() => setWidth(value), 100 * index);
    return () => clearTimeout(timer);
  }, [value, index]);

  const colors: Record<string, string> = {
    visual: 'bg-blue-500',
    auditory: 'bg-green-500',
    kinesthetic: 'bg-orange-500'
  };

  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center text-sm font-semibold">
        <span className="text-slate-600">{label}</span>
        <span className="text-slate-900">{value}%</span>
      </div>
      <div className="h-3 w-full bg-slate-100 rounded-full overflow-hidden">
        <div className={`h-full ${colors[color] || 'bg-blue-500'} transition-all duration-1000 ease-out rounded-full`} style={{ width: `${width}%` }} />
      </div>
    </div>
  );
};

const IconComponent: React.FC<{ name: string; className?: string }> = ({ name, className = "w-7 h-7" }) => {
  const icons: Record<string, React.ReactElement> = {
    brain: <Brain className={className} />,
    eye: <Eye className={className} />,
    chat: <MessageCircle className={className} />,
    check: <Check className={className} />,
    clock: <CalendarDays className={className} />,
    fire: <Sparkles className={className} />,
    star: <Medal className={className} />,
    sparkles: <Zap className={className} />,
    external: <ExternalLink className={className} />,
    shapes: <Square className={className} />,
    mic: <Mic className={className} />,
    smile: <Smile className={className} />,
    calculator: <Calculator className={className} />,
    heart: <Heart className={className} />,
    tree: <TreeDeciduous className={className} />
  };
  return icons[name] || null;
};

// Demo data - pre-filled typology result for demonstration
const demoTypologyResult: TypologyResult = {
  dimensions: [
    { dimension: 'D1', leftLabel: 'Abstract', rightLabel: 'Concrete', leftScore: 35, rightScore: 65, label: 'more concrete', answeredCount: 6, totalQuestions: 6 },
    { dimension: 'D2', leftLabel: 'Active', rightLabel: 'Reflective', leftScore: 60, rightScore: 40, label: 'more active', answeredCount: 6, totalQuestions: 6 },
    { dimension: 'D3', leftLabel: 'Visual', rightLabel: 'Verbal', leftScore: 70, rightScore: 30, label: 'visual', answeredCount: 6, totalQuestions: 6 },
    { dimension: 'D4', leftLabel: 'Sequential', rightLabel: 'Global', leftScore: 45, rightScore: 55, label: 'balanced', answeredCount: 6, totalQuestions: 6 },
    { dimension: 'D5', leftLabel: 'Structure', rightLabel: 'Flexibility', leftScore: 50, rightScore: 50, label: 'balanced', answeredCount: 6, totalQuestions: 6 }
  ],
  answersDetail: [],
  overallProfile: 'Visual-practical type with an active approach',
  tips: [
    'Use diagrams and visual aids when learning',
    'Try to actively explain the material out loud',
    'Alternate between theoretical and practical tasks'
  ]
};

// Demo VAK result
const demoVakResult: VakResult = {
  visual: 60,
  auditory: 25,
  kinesthetic: 15,
  dominant: 'V',
  label: { cs: 'Vizuální typ', en: 'Visual Learner' },
  description: { cs: 'Nejlépe se učíš pomocí obrazových materiálů, diagramů a vizuálních pomůcek.', en: 'You learn best through visual materials, diagrams, and visual aids.' },
  tips: {
    cs: ['Používej barevné zvýrazňovače', 'Kresli si myšlenkové mapy', 'Sleduj videa a animace'],
    en: ['Use colored highlighters', 'Draw mind maps', 'Watch videos and animations']
  }
};

// Demo Growth Mindset result
const demoGmResult: AssessmentResult = {
  score: 26,
  maxScore: 32,
  percent: 81,
  label: { cs: 'Silné růstové myšlení', en: 'Strong Growth Mindset' },
  description: { cs: 'Věříš, že schopnosti lze rozvíjet úsilím a učením.', en: 'You believe abilities can be developed through effort and learning.' },
  tips: {
    cs: ['Pokračuj v přijímání výzev', 'Pomáhej ostatním rozvíjet růstové myšlení', 'Sdílej své strategie učení'],
    en: ['Continue embracing challenges', 'Help others develop growth mindset', 'Share your learning strategies']
  }
};

// Demo Synthesis
const demoSynthesis = {
  synthesis: `## Your Learning Profile Summary

Based on your completed assessments, here's a comprehensive view of your learning style and cognitive profile:

### Thinking Style
You show a **concrete-practical** orientation combined with an **active learning** approach. This means you prefer hands-on experiences and real-world examples over abstract theories. You learn best by doing rather than just reading or listening.

### Learning Modality
Your **visual learning preference** (60%) indicates you process information most effectively through images, diagrams, charts, and visual representations. Consider using mind maps, infographics, and color-coded notes to enhance your study sessions.

### Mindset & Motivation
With a **strong growth mindset** (81%), you believe in the power of effort and practice to develop your abilities. This is a significant strength that will help you persevere through challenges and continue learning throughout life.

### Key Strengths
- Visual information processing
- Active, hands-on learning approach
- Strong belief in personal development
- Balanced approach to structure and flexibility

### Areas for Development
- Consider developing verbal/auditory learning strategies as backup
- Practice more reflective learning techniques for complex topics`,
  studyTips: [
    'Use visual study aids like diagrams, flowcharts, and mind maps',
    'Apply new concepts immediately through practice problems or projects',
    'Color-code your notes by topic or importance level',
    'Watch educational videos and tutorials for complex topics',
    'Teach concepts to others to reinforce your understanding'
  ],
  youtubeVideos: [
    { videoId: 'ukLnPbIffxE', title: 'How to Study Effectively', description: 'Evidence-based study techniques for visual learners' },
    { videoId: 'IlU-zDU6aQ0', title: 'Growth Mindset by Carol Dweck', description: 'Understanding and developing a growth mindset' }
  ]
};

const App: React.FC = () => {
  const [lang, setLang] = useState<Language>('en');
  const [view, setView] = useState<View>('welcome');
  const [progress, setProgress] = useState<ModuleProgress>({
    chat: false, typology: true, vak: true, habits: false, motivation: false, strengths: false, gemini: false,
    growthMindset: true, grit: false, selfEfficacy: false, testAnxiety: false, metacognition: false, riasec: false, eq: false, stroop: false, mentalRotation: false,
    voiceInterview: false, emotionRecognition: false, mathReasoning: false, garminHealth: false, baumTest: false,
    procrastination: false, academicMotivation: false, timeManagement: false, bigFive: false, locusOfControl: false, resilience: false,
    gardner: false, kolb: false,
    studyStress: false, studyStrategies: false
  });
  const [studentName, setStudentName] = useState<string>('');
  const [nameInput, setNameInput] = useState<string>('');

  // Students list
  const [students, setStudents] = useState<StudentProfile[]>([]);
  const [showStudentsList, setShowStudentsList] = useState(false);

  // Chat state
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [chatReport, setChatReport] = useState<Report | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Typology state
  const [currentDimension, setCurrentDimension] = useState<number>(0);
  const [typologyAnswers, setTypologyAnswers] = useState<Record<string, AnswerKey>>({});
  const [typologyResult, setTypologyResult] = useState<TypologyResult | null>(demoTypologyResult);

  // VAK state
  const [currentVakQuestion, setCurrentVakQuestion] = useState<number>(0);
  const [vakAnswers, setVakAnswers] = useState<VakOption[]>([]);
  const [vakResult, setVakResult] = useState<VakResult | null>(demoVakResult);

  // Habits state
  const [currentHabitsQuestion, setCurrentHabitsQuestion] = useState<number>(0);
  const [habitsAnswers, setHabitsAnswers] = useState<Record<string, 'A' | 'B' | 'C' | 'D'>>({});
  const [habitsResult, setHabitsResult] = useState<SimpleResult | null>(null);

  // Motivation state
  const [currentMotivationQuestion, setCurrentMotivationQuestion] = useState<number>(0);
  const [motivationAnswers, setMotivationAnswers] = useState<Record<string, 'A' | 'B' | 'C' | 'D'>>({});
  const [motivationResult, setMotivationResult] = useState<SimpleResult | null>(null);

  // Strengths state
  const [currentStrengthsQuestion, setCurrentStrengthsQuestion] = useState<number>(0);
  const [strengthsAnswers, setStrengthsAnswers] = useState<Record<string, 'A' | 'B' | 'C' | 'D'>>({});
  const [strengthsResult, setStrengthsResult] = useState<{ areas: { label: string; score: number }[]; topStrength: string; tips: string[] } | null>(null);

  // New assessments state
  const [currentGMQuestion, setCurrentGMQuestion] = useState(0);
  const [gmAnswers, setGmAnswers] = useState<Record<string, 'A' | 'B' | 'C' | 'D'>>({});
  const [gmResult, setGmResult] = useState<AssessmentResult | null>(demoGmResult);

  const [currentGritQuestion, setCurrentGritQuestion] = useState(0);
  const [gritAnswers, setGritAnswers] = useState<Record<string, 'A' | 'B' | 'C' | 'D'>>({});
  const [gritResult, setGritResult] = useState<AssessmentResult | null>(null);

  const [currentSEQuestion, setCurrentSEQuestion] = useState(0);
  const [seAnswers, setSeAnswers] = useState<Record<string, 'A' | 'B' | 'C' | 'D'>>({});
  const [seResult, setSeResult] = useState<AssessmentResult | null>(null);

  const [currentTAQuestion, setCurrentTAQuestion] = useState(0);
  const [taAnswers, setTaAnswers] = useState<Record<string, 'A' | 'B' | 'C' | 'D'>>({});
  const [taResult, setTaResult] = useState<AssessmentResult | null>(null);

  const [currentMCQuestion, setCurrentMCQuestion] = useState(0);
  const [mcAnswers, setMcAnswers] = useState<Record<string, 'A' | 'B' | 'C' | 'D'>>({});
  const [mcResult, setMcResult] = useState<AssessmentResult | null>(null);

  const [currentRiasecQuestion, setCurrentRiasecQuestion] = useState(0);
  const [riasecAnswers, setRiasecAnswers] = useState<Record<string, number>>({});
  const [riasecResult, setRiasecResult] = useState<RiasecResult | null>(null);

  const [currentEQQuestion, setCurrentEQQuestion] = useState(0);
  const [eqAnswers, setEqAnswers] = useState<Record<string, 'A' | 'B' | 'C' | 'D'>>({});
  const [eqResult, setEqResult] = useState<AssessmentResult | null>(null);

  const [currentPRQuestion, setCurrentPRQuestion] = useState(0);
  const [prAnswers, setPrAnswers] = useState<Record<string, 'A' | 'B' | 'C' | 'D'>>({});
  const [prResult, setPrResult] = useState<AssessmentResult | null>(null);

  const [currentAMQuestion, setCurrentAMQuestion] = useState(0);
  const [amAnswers, setAmAnswers] = useState<Record<string, 'A' | 'B' | 'C' | 'D'>>({});
  const [amResult, setAmResult] = useState<AssessmentResult | null>(null);

  const [currentTMQuestion, setCurrentTMQuestion] = useState(0);
  const [tmAnswers, setTmAnswers] = useState<Record<string, 'A' | 'B' | 'C' | 'D'>>({});
  const [tmResult, setTmResult] = useState<AssessmentResult | null>(null);

  const [currentBFQuestion, setCurrentBFQuestion] = useState(0);
  const [bfAnswers, setBfAnswers] = useState<Record<string, 'A' | 'B' | 'C' | 'D'>>({});
  const [bfResult, setBfResult] = useState<BigFiveResult | null>(null);

  const [currentLCQuestion, setCurrentLCQuestion] = useState(0);
  const [lcAnswers, setLcAnswers] = useState<Record<string, 'A' | 'B' | 'C' | 'D'>>({});
  const [lcResult, setLcResult] = useState<AssessmentResult | null>(null);

  const [currentRSQuestion, setCurrentRSQuestion] = useState(0);
  const [rsAnswers, setRsAnswers] = useState<Record<string, 'A' | 'B' | 'C' | 'D'>>({});
  const [rsResult, setRsResult] = useState<AssessmentResult | null>(null);

  const [currentGDQuestion, setCurrentGDQuestion] = useState(0);
  const [gdAnswers, setGdAnswers] = useState<Record<string, 'A' | 'B' | 'C' | 'D'>>({});
  const [gdResult, setGdResult] = useState<GardnerResult | null>(null);

  const [currentKLQuestion, setCurrentKLQuestion] = useState(0);
  const [klAnswers, setKlAnswers] = useState<Record<string, 'A' | 'B' | 'C' | 'D'>>({});
  const [klResult, setKlResult] = useState<KolbResult | null>(null);

  const [currentSSQuestion, setCurrentSSQuestion] = useState(0);
  const [ssAnswers, setSsAnswers] = useState<Record<string, 'A' | 'B' | 'C' | 'D'>>({});
  const [ssResult, setSsResult] = useState<AssessmentResult | null>(null);

  const [currentSTQuestion, setCurrentSTQuestion] = useState(0);
  const [stAnswers, setStAnswers] = useState<Record<string, 'A' | 'B' | 'C' | 'D'>>({});
  const [stResult, setStResult] = useState<AssessmentResult | null>(null);

  // Stroop Test state
  const [stroopPhase, setStroopPhase] = useState<'intro' | 'practice' | 'test' | 'done'>('intro');
  const [stroopTrials, setStroopTrials] = useState<StroopTrial[]>([]);
  const [stroopCurrentTrial, setStroopCurrentTrial] = useState(0);
  const [stroopResults, setStroopResults] = useState<StroopTrialResult[]>([]);
  const [stroopTrialStart, setStroopTrialStart] = useState<number>(0);
  const [stroopResult, setStroopResult] = useState<StroopResult | null>(null);
  const [stroopShowStimulus, setStroopShowStimulus] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Mental Rotation Test state
  const [mrtPhase, setMrtPhase] = useState<'intro' | 'practice' | 'test' | 'done'>('intro');
  const [mrtTrials, setMrtTrials] = useState<MentalRotationTrial[]>([]);
  const [mrtCurrentTrial, setMrtCurrentTrial] = useState(0);
  const [mrtResults, setMrtResults] = useState<MentalRotationTrialResult[]>([]);
  const [mrtTrialStart, setMrtTrialStart] = useState<number>(0);
  const [mrtResult, setMrtResult] = useState<MentalRotationResult | null>(null);
  const [cameraActive, setCameraActive] = useState(false);

  // Results page state
  const [resultsTab, setResultsTab] = useState<'overview' | 'synthesis' | 'coaching'>('overview');
  const [synthesis, setSynthesis] = useState<{ synthesis: string; studyTips: string[]; youtubeVideos: { videoId: string; title: string; description: string }[] } | null>(demoSynthesis);
  const [isSynthesisLoading, setIsSynthesisLoading] = useState(false);

  // API Key settings
  const [showApiKeyModal, setShowApiKeyModal] = useState(false);
  const [apiKeyInput, setApiKeyInput] = useState(navigatorService.getApiKey());

  // AI Feedback modal state (after each test)
  const [showFeedbackModal, setShowFeedbackModal] = useState(false);
  const [currentFeedback, setCurrentFeedback] = useState<{
    title: string;
    feedback: string;
    actionSteps: string[];
    resources: { title: string; description: string; videoId?: string }[];
  } | null>(null);
  const [isFeedbackLoading, setIsFeedbackLoading] = useState(false);

  // AI Coaching state
  const [coaching, setCoaching] = useState<{
    summary: string;
    keyInsights: string[];
    weeklyPlan: { day: string; focus: string; activities: string[] }[];
    habitTracker: { habit: string; why: string; howToTrack: string }[];
    motivationalMessage: string;
  } | null>(null);
  const [isCoachingLoading, setIsCoachingLoading] = useState(false);

  // Voice Interview state
  const [voiceInterviewPhase, setVoiceInterviewPhase] = useState<'intro' | 'interview' | 'processing' | 'done'>('intro');
  const [currentVoiceQuestion, setCurrentVoiceQuestion] = useState(0);
  const [voiceExchanges, setVoiceExchanges] = useState<InterviewExchange[]>([]);
  const [voiceInterviewResult, setVoiceInterviewResult] = useState<VoiceInterviewResult | null>(null);
  const [isListening, setIsListening] = useState(false);
  const [currentTranscript, setCurrentTranscript] = useState('');
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [voiceSupported, setVoiceSupported] = useState(true);

  // Check voice support on mount
  useEffect(() => {
    setVoiceSupported(voiceService.isSupported());
  }, []);

  // Math Reasoning state
  const [mathVideo, setMathVideo] = useState<File | null>(null);
  const [mathVideoUrl, setMathVideoUrl] = useState<string | null>(null);
  const [mathAnalyzing, setMathAnalyzing] = useState(false);
  const [mathResult, setMathResult] = useState<MathReasoningResult | null>(null);
  const [mathPhase, setMathPhase] = useState<'choose' | 'upload' | 'canvas' | 'recording' | 'preview' | 'analyzing' | 'done'>('choose');
  const mathVideoInputRef = useRef<HTMLInputElement>(null);

  // Canvas recording state
  const mathCanvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [penColor, setPenColor] = useState('#000000');
  const [penSize, setPenSize] = useState(3);
  const [isEraser, setIsEraser] = useState(false);
  const [canvasRecorder, setCanvasRecorder] = useState<MediaRecorder | null>(null);
  const [recordedChunks, setRecordedChunks] = useState<Blob[]>([]);
  const canvasContextRef = useRef<CanvasRenderingContext2D | null>(null);
  const lastPointRef = useRef<{x: number; y: number} | null>(null);

  // Emotion Recognition state
  const [emotionPhase, setEmotionPhase] = useState<'intro' | 'calibrating' | 'recording' | 'done'>('intro');
  const [emotionTimeline, setEmotionTimeline] = useState<EmotionData[]>([]);
  const [currentEmotion, setCurrentEmotion] = useState<EmotionData | null>(null);
  const [emotionResult, setEmotionResult] = useState<EmotionResult | null>(null);
  const [emotionModelsLoaded, setEmotionModelsLoaded] = useState(false);
  const [emotionModelsLoading, setEmotionModelsLoading] = useState(false);
  const emotionVideoRef = useRef<HTMLVideoElement>(null);

  // Baum Test (Tree Drawing) state
  const [baumPhase, setBaumPhase] = useState<'intro' | 'drawing' | 'analyzing' | 'done'>('intro');
  const baumCanvasRef = useRef<HTMLCanvasElement>(null);
  const baumContextRef = useRef<CanvasRenderingContext2D | null>(null);
  const [baumDrawing, setBaumDrawing] = useState(false);
  const [baumPenColor, setBaumPenColor] = useState('#2d1b0e');
  const [baumPenSize, setBaumPenSize] = useState(3);
  const [baumLastPoint, setBaumLastPoint] = useState<{x: number; y: number} | null>(null);
  const [baumResult, setBaumResult] = useState<{
    creativity: number;
    detail: number;
    stability: number;
    interpretation: string;
    traits: string[];
    recommendations: string[];
  } | null>(null);
  const [baumAnalyzing, setBaumAnalyzing] = useState(false);

  // Researcher info panels (collapsible)
  const [showMathInfo, setShowMathInfo] = useState(false);
  const [showBaumInfo, setShowBaumInfo] = useState(false);

  const scrollToBottom = () => messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  useEffect(() => { scrollToBottom(); }, [messages]);

  // Load students on mount
  useEffect(() => {
    setStudents(getStudents());
  }, []);

  // Auto-save student results when they change
  useEffect(() => {
    if (!studentName) return;
    const hasAnyResult = typologyResult || vakResult || habitsResult || motivationResult || strengthsResult || chatReport;
    if (!hasAnyResult) return;

    updateStudentResults(studentName, {
      typology: typologyResult || undefined,
      vak: vakResult || undefined,
      habits: habitsResult || undefined,
      motivation: motivationResult || undefined,
      strengths: strengthsResult || undefined,
      chatReport: chatReport || undefined,
      synthesis: synthesis || undefined
    });
    setStudents(getStudents());
  }, [studentName, typologyResult, vakResult, habitsResult, motivationResult, strengthsResult, chatReport, synthesis]);

  // Load student profile
  const loadStudent = (profile: StudentProfile) => {
    setStudentName(profile.name);
    if (profile.results.typology) {
      setTypologyResult(profile.results.typology as any);
      setProgress(p => ({ ...p, typology: true }));
    }
    if (profile.results.vak) {
      setVakResult(profile.results.vak as any);
      setProgress(p => ({ ...p, vak: true }));
    }
    if (profile.results.habits) {
      setHabitsResult(profile.results.habits);
      setProgress(p => ({ ...p, habits: true }));
    }
    if (profile.results.motivation) {
      setMotivationResult(profile.results.motivation);
      setProgress(p => ({ ...p, motivation: true }));
    }
    if (profile.results.strengths) {
      setStrengthsResult(profile.results.strengths);
      setProgress(p => ({ ...p, strengths: true }));
    }
    if (profile.results.chatReport) {
      setChatReport(profile.results.chatReport);
      setProgress(p => ({ ...p, chat: true }));
    }
    if (profile.results.synthesis) {
      setSynthesis(profile.results.synthesis);
    }
    setShowStudentsList(false);
    setView('dashboard');
  };

  // Delete student
  const handleDeleteStudent = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (confirm('Opravdu chceš smazat tohoto studenta?')) {
      deleteStudent(id);
      setStudents(getStudents());
    }
  };

  const completedCount = Object.values(progress).filter(Boolean).length;

  // Generate AI synthesis
  const handleGenerateSynthesis = async () => {
    if (synthesis || isSynthesisLoading) return;

    setIsSynthesisLoading(true);
    try {
      const profileData = {
        studentName: studentName || 'Student',
        typology: typologyResult ? {
          dimensions: typologyResult.dimensions.map(d => ({
            leftLabel: d.leftLabel,
            rightLabel: d.rightLabel,
            leftScore: d.leftScore,
            rightScore: d.rightScore
          })),
          overallProfile: typologyResult.overallProfile
        } : undefined,
        vak: vakResult ? {
          visual: vakResult.visual,
          auditory: vakResult.auditory,
          kinesthetic: vakResult.kinesthetic,
          label: vakResult.label
        } : undefined,
        habits: habitsResult ? {
          percent: habitsResult.percent,
          label: habitsResult.label
        } : undefined,
        motivation: motivationResult ? {
          percent: motivationResult.percent,
          label: motivationResult.label
        } : undefined,
        strengths: strengthsResult ? {
          areas: strengthsResult.areas,
          topStrength: strengthsResult.topStrength
        } : undefined
      };

      const result = await navigatorService.generateSynthesis(profileData);
      setSynthesis(result);
    } catch (error) {
      console.error('Failed to generate synthesis:', error);
    } finally {
      setIsSynthesisLoading(false);
    }
  };

  // Generate AI feedback for a specific assessment
  const handleGenerateFeedback = async (assessmentType: string, title: string, result: { score: number; percent: number; label: string; description?: string }) => {
    setShowFeedbackModal(true);
    setIsFeedbackLoading(true);
    setCurrentFeedback(null);

    try {
      const feedback = await navigatorService.generateAssessmentFeedback(assessmentType, result, studentName);
      setCurrentFeedback({ title, ...feedback });
    } catch (error) {
      console.error('Failed to generate feedback:', error);
      setCurrentFeedback({
        title,
        feedback: 'Nepodařilo se vygenerovat zpětnou vazbu. Zkus to prosím znovu.',
        actionSteps: [],
        resources: []
      });
    } finally {
      setIsFeedbackLoading(false);
    }
  };

  // Generate comprehensive AI coaching
  const handleGenerateCoaching = async () => {
    if (coaching || isCoachingLoading) return;

    setIsCoachingLoading(true);
    try {
      const allResults = {
        studentName: studentName || 'Student',
        typology: typologyResult,
        vak: vakResult,
        habits: habitsResult,
        motivation: motivationResult,
        strengths: strengthsResult,
        growthMindset: gmResult,
        grit: gritResult,
        selfEfficacy: seResult,
        testAnxiety: taResult,
        metacognition: mcResult,
        riasec: riasecResult,
        eq: eqResult
      };

      const result = await navigatorService.generateCoaching(allResults);
      setCoaching(result);
    } catch (error) {
      console.error('Failed to generate coaching:', error);
    } finally {
      setIsCoachingLoading(false);
    }
  };

  // Handle name submission
  const handleNameSubmit = (e?: React.FormEvent) => {
    e?.preventDefault();
    if (nameInput.trim().length >= 2) {
      setStudentName(nameInput.trim());
      setView('dashboard');
    }
  };

  // Welcome/Home screen
  const renderWelcome = () => (
    <div className="flex-1 px-6 py-10" style={{ backgroundColor: 'var(--color-bg)' }}>
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="flex justify-center">
            <div className="w-16 h-16 bg-gradient-to-br from-[#C5A059] to-[#8B7355] rounded-2xl flex items-center justify-center shadow-lg">
              <svg viewBox="0 0 24 24" className="w-8 h-8 text-white" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
              </svg>
            </div>
          </div>
          <div>
            <h1 className="text-h1 font-serif" style={{ color: 'var(--color-text)' }}>
              AI Academic <span style={{ color: 'var(--color-primary)' }}>Navigator</span>
            </h1>
            <p className="mt-2" style={{ color: 'var(--color-text-secondary)' }}>
              Poznej studijní profil a zjisti, jak se učíš nejlépe.
            </p>
          </div>
        </div>

        {/* Create new student card */}
        <div className="card p-6" style={{ borderStyle: 'dashed', borderWidth: '2px' }}>
          <h2 className="font-serif text-lg font-semibold mb-4 flex items-center gap-2" style={{ color: 'var(--color-text)' }}>
            <div className="w-8 h-8 flex items-center justify-center rounded-full" style={{ backgroundColor: 'var(--color-primary)', color: '#fff' }}>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
            </div>
            New Student
          </h2>
          <form onSubmit={handleNameSubmit} className="flex gap-3">
            <input
              type="text"
              value={nameInput}
              onChange={(e) => setNameInput(e.target.value)}
              placeholder="Name or nickname..."
              className="flex-1 px-4 py-3 outline-none transition-all"
              style={{
                border: '1px solid var(--color-border)',
                borderRadius: 'var(--radius-md)',
                fontFamily: 'var(--font-sans)'
              }}
            />
            <button
              type="submit"
              disabled={nameInput.trim().length < 2}
              className="px-6 py-3 text-white font-medium disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center gap-2"
              style={{
                backgroundColor: 'var(--color-primary)',
                borderRadius: 'var(--radius-md)'
              }}
            >
              Vytvořit
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        </div>

        {/* Existing students */}
        {students.length > 0 && (
          <div className="space-y-4">
            <h2 className="font-serif text-lg font-semibold flex items-center gap-2" style={{ color: 'var(--color-text)' }}>
              <Users className="w-5 h-5" style={{ color: 'var(--color-primary)' }} />
              Uložení studenti ({students.length})
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {students.map(student => {
                const testsCount = Object.values(student.results).filter(Boolean).length;
                const hasSynthesis = !!student.results.synthesis;
                return (
                  <button
                    key={student.id}
                    onClick={() => loadStudent(student)}
                    className="card p-4 text-left flex items-start gap-4 transition-all hover:-translate-y-1 hover:shadow-lg group"
                  >
                    <div className="w-12 h-12 flex-shrink-0 flex items-center justify-center text-xl font-bold" style={{ backgroundColor: 'var(--color-primary)', borderRadius: 'var(--radius-full)', color: '#fff' }}>
                      {student.name.charAt(0).toUpperCase()}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium truncate group-hover:text-[var(--color-primary)] transition-colors" style={{ color: 'var(--color-text)' }}>
                        {student.name}
                      </p>
                      <p className="text-xs mt-1" style={{ color: 'var(--color-text-muted)' }}>
                        {new Date(student.updatedAt).toLocaleDateString('cs-CZ', { day: 'numeric', month: 'short', year: 'numeric' })}
                      </p>
                      <div className="flex items-center gap-2 mt-2">
                        <span className="text-xs px-2 py-0.5 rounded-full" style={{ backgroundColor: 'var(--color-bg)', color: 'var(--color-text-secondary)' }}>
                          {testsCount} {testsCount === 1 ? 'test' : testsCount >= 2 && testsCount <= 4 ? 'testy' : 'testů'}
                        </span>
                        {hasSynthesis && (
                          <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700">
                            AI syntéza
                          </span>
                        )}
                      </div>
                    </div>
                    <button
                      onClick={(e) => handleDeleteStudent(student.id, e)}
                      className="p-2 opacity-0 group-hover:opacity-100 hover:bg-red-50 transition-all"
                      style={{ borderRadius: 'var(--radius-md)', color: 'var(--color-text-muted)' }}
                      title="Smazat studenta"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Empty state */}
        {students.length === 0 && (
          <div className="text-center py-12" style={{ color: 'var(--color-text-muted)' }}>
            <Users className="w-12 h-12 mx-auto mb-4 opacity-30" />
            <p>{lang === 'cs' ? 'Zatím nemáš žádné uložené studenty.' : 'You have no saved students yet.'}</p>
            <p className="text-sm mt-1">{lang === 'cs' ? 'Vytvoř nového studenta výše a začni s testy.' : 'Create a new student above and start testing.'}</p>
          </div>
        )}
      </div>
    </div>
  );

  // Students list modal
  const renderStudentsModal = () => showStudentsList && (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50" onClick={() => setShowStudentsList(false)}>
      <div className="bg-white w-full max-w-md mx-4 max-h-[70vh] overflow-hidden flex flex-col" style={{ borderRadius: 'var(--radius-lg)', boxShadow: 'var(--shadow-lg)' }} onClick={e => e.stopPropagation()}>
        <div className="px-6 py-4 flex items-center justify-between" style={{ borderBottom: '1px solid var(--color-border)' }}>
          <h2 className="font-serif text-lg font-semibold" style={{ color: 'var(--color-text)' }}>{lang === 'cs' ? 'Uložení studenti' : 'Saved Students'}</h2>
          <button onClick={() => setShowStudentsList(false)} style={{ color: 'var(--color-text-muted)' }} className="hover:opacity-70">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
        </div>
        <div className="flex-1 overflow-y-auto p-4 space-y-2">
          {students.map(student => (
            <button
              key={student.id}
              onClick={() => loadStudent(student)}
              className="w-full p-4 text-left flex items-center gap-4 transition-all hover:bg-slate-50"
              style={{ borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)' }}
            >
              <div className="w-10 h-10 flex items-center justify-center" style={{ backgroundColor: 'var(--color-primary)', borderRadius: 'var(--radius-full)' }}>
                <User className="w-5 h-5 text-white" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-medium truncate" style={{ color: 'var(--color-text)' }}>{student.name}</p>
                <p className="text-xs" style={{ color: 'var(--color-text-muted)' }}>
                  {new Date(student.updatedAt).toLocaleDateString('cs-CZ')} • {Object.values(student.results).filter(Boolean).length} testů
                </p>
              </div>
              <button
                onClick={(e) => handleDeleteStudent(student.id, e)}
                className="p-2 hover:bg-red-50 transition-colors"
                style={{ borderRadius: 'var(--radius-md)', color: 'var(--color-text-muted)' }}
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </button>
          ))}
        </div>
      </div>
    </div>
  );

  // Generic Assessment Renderer
  const renderAssessment = (
    title: string,
    questions: { id: string; text: { cs: string; en: string }; options: { key: 'A' | 'B' | 'C' | 'D'; text: { cs: string; en: string }; score: number }[] }[],
    currentQuestion: number,
    setCurrentQuestion: (n: number) => void,
    answers: Record<string, 'A' | 'B' | 'C' | 'D'>,
    setAnswers: (a: Record<string, 'A' | 'B' | 'C' | 'D'>) => void,
    onComplete: () => void
  ) => {
    const q = questions[currentQuestion];
    const progressPercent = Math.round((currentQuestion / questions.length) * 100);

    const handleAnswer = (answer: 'A' | 'B' | 'C' | 'D') => {
      const newAnswers = { ...answers, [q.id]: answer };
      setAnswers(newAnswers);
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
      } else {
        onComplete();
      }
    };

    return (
      <div className="flex-1 flex flex-col max-w-2xl mx-auto w-full px-4 py-8" style={{ backgroundColor: 'var(--color-bg)' }}>
        <div className="flex items-center justify-between mb-6">
          <button onClick={() => setView('dashboard')} className="flex items-center gap-2 text-label" style={{ color: 'var(--color-text-muted)' }}>
            <ChevronLeft className="w-5 h-5" />
            {t('back', lang)}
          </button>
          <span className="text-sm" style={{ color: 'var(--color-text-muted)' }}>{currentQuestion + 1} / {questions.length}</span>
        </div>
        <div className="h-2 overflow-hidden mb-4" style={{ backgroundColor: 'var(--color-border)', borderRadius: 'var(--radius-full)' }}>
          <div className="h-full transition-all duration-500" style={{ width: `${progressPercent}%`, backgroundColor: 'var(--color-primary)' }} />
        </div>
        <h2 className="text-lg font-serif font-semibold mb-6 text-center" style={{ color: 'var(--color-text)' }}>{title}</h2>
        <div className="flex-1 flex flex-col justify-center">
          <div className="card p-8" style={{ boxShadow: 'var(--shadow-lg)' }}>
            <p className="text-h3 font-serif mb-8 text-center" style={{ color: 'var(--color-text)' }}>{getAssessmentQuestionText(q, lang)}</p>
            <div className="space-y-3">
              {q.options.map((opt) => (
                <button
                  key={opt.key}
                  onClick={() => handleAnswer(opt.key)}
                  className={`option-button flex items-center gap-4 w-full ${answers[q.id] === opt.key ? 'selected' : ''}`}
                  style={{
                    borderColor: answers[q.id] === opt.key ? 'var(--color-primary)' : 'var(--color-border)',
                    backgroundColor: answers[q.id] === opt.key ? 'rgba(74, 95, 168, 0.08)' : 'var(--color-bg-card)'
                  }}
                >
                  <span className="w-8 h-8 flex items-center justify-center font-semibold text-sm" style={{ borderRadius: 'var(--radius-full)', backgroundColor: 'var(--color-bg)', color: 'var(--color-text-muted)' }}>
                    {opt.key}
                  </span>
                  <span style={{ color: 'var(--color-text-secondary)' }}>{getAssessmentOptionText(opt, lang)}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  };

  // RIASEC Assessment Renderer (uses 1-4 scale)
  const renderRiasecAssessment = () => {
    const q = riasecQuestions[currentRiasecQuestion];
    const progressPercent = Math.round((currentRiasecQuestion / riasecQuestions.length) * 100);

    const handleAnswer = (score: number) => {
      const newAnswers = { ...riasecAnswers, [q.id]: score };
      setRiasecAnswers(newAnswers);
      if (currentRiasecQuestion < riasecQuestions.length - 1) {
        setCurrentRiasecQuestion(currentRiasecQuestion + 1);
      } else {
        const result = scoreRiasec(newAnswers);
        setRiasecResult(result);
        setProgress(p => ({ ...p, riasec: true }));
        // RIASEC has different structure, create a simplified result for feedback
        const topScore = result.scores[0];
        handleGenerateFeedback('riasec', 'RIASEC Kariérní zájmy', {
          score: topScore.score,
          percent: topScore.percent,
          label: `${result.code} - ${topScore.label}`
        });
        setView('results');
      }
    };

    const riasecLabels = {
      1: { cs: 'Ne', en: 'No' },
      2: { cs: 'Spíše ne', en: 'Not really' },
      3: { cs: 'Spíše ano', en: 'Somewhat' },
      4: { cs: 'Ano', en: 'Yes' }
    };

    return (
      <div className="flex-1 flex flex-col max-w-2xl mx-auto w-full px-4 py-8" style={{ backgroundColor: 'var(--color-bg)' }}>
        <div className="flex items-center justify-between mb-6">
          <button onClick={() => setView('dashboard')} className="flex items-center gap-2 text-label" style={{ color: 'var(--color-text-muted)' }}>
            <ChevronLeft className="w-5 h-5" />
            {t('back', lang)}
          </button>
          <span className="text-sm" style={{ color: 'var(--color-text-muted)' }}>{currentRiasecQuestion + 1} / {riasecQuestions.length}</span>
        </div>
        <div className="h-2 overflow-hidden mb-4" style={{ backgroundColor: 'var(--color-border)', borderRadius: 'var(--radius-full)' }}>
          <div className="h-full transition-all duration-500" style={{ width: `${progressPercent}%`, backgroundColor: 'var(--color-primary)' }} />
        </div>
        <h2 className="text-lg font-serif font-semibold mb-6 text-center" style={{ color: 'var(--color-text)' }}>{lang === 'cs' ? 'RIASEC - Kariérní zájmy' : 'RIASEC - Career Interests'}</h2>
        <div className="flex-1 flex flex-col justify-center">
          <div className="card p-8" style={{ boxShadow: 'var(--shadow-lg)' }}>
            <p className="text-h3 font-serif mb-8 text-center" style={{ color: 'var(--color-text)' }}>{getRiasecQuestionText(q, lang)}</p>
            <div className="flex justify-center gap-3">
              {[1, 2, 3, 4].map((score) => (
                <button
                  key={score}
                  onClick={() => handleAnswer(score)}
                  className={`w-16 h-16 flex flex-col items-center justify-center font-semibold transition-all hover:scale-105 ${riasecAnswers[q.id] === score ? 'ring-2 ring-offset-2' : ''}`}
                  style={{
                    borderRadius: 'var(--radius-lg)',
                    backgroundColor: score === 1 ? '#fee2e2' : score === 2 ? '#fef3c7' : score === 3 ? '#d1fae5' : '#bbf7d0',
                    color: 'var(--color-text)',
                    ringColor: 'var(--color-primary)'
                  }}
                >
                  <span className="text-lg">{score}</span>
                  <span className="text-[10px]">{riasecLabels[score as 1|2|3|4][lang]}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Dashboard
  const renderDashboard = () => (
    <div className="flex-1 px-6 py-10 pb-20" style={{ backgroundColor: 'var(--color-bg)' }}>
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-h1 font-serif" style={{ color: 'var(--color-text)' }}>
            {studentName ? `${t('greeting', lang)}, ${studentName}!` : (lang === 'cs' ? 'Poznej svůj' : 'Discover your')} <span style={{ color: 'var(--color-primary)' }}>{t('studyProfile', lang)}</span>
          </h1>
          <p className="mx-auto mt-3 max-w-xl" style={{ color: 'var(--color-text-secondary)', lineHeight: 'var(--leading-relaxed)' }}>
            {t('selectTest', lang)}
          </p>
          {completedCount > 0 && (
            <div className="mt-4 inline-flex items-center gap-2 bg-emerald-50 text-emerald-700 px-4 py-2 text-sm font-medium" style={{ borderRadius: 'var(--radius-full)' }}>
              <Check className="w-4 h-4" />
              {completedCount} {lang === 'cs' ? 'z' : 'of'} {modules.length - 1} {t('ofDone', lang)}
            </div>
          )}
        </div>

        {/* Module Cards Grid - Gallery Style */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {modules.map((mod) => {
            const isDone = !mod.external && progress[mod.id as keyof ModuleProgress];

            return (
              <button
                key={mod.id}
                onClick={() => handleModuleClick(mod)}
                className="card group relative text-left transition-all hover:-translate-y-1 hover:shadow-xl focus:outline-none overflow-hidden"
                style={{
                  borderColor: isDone ? 'rgb(167, 243, 208)' : 'var(--color-border)',
                  borderRadius: 'var(--radius-lg)'
                }}
              >
                {/* Preview Image/Gradient Area */}
                <div className={`relative h-40 bg-gradient-to-br ${mod.previewBg} flex items-center justify-center overflow-hidden`}>
                  {/* Background Pattern */}
                  <div className="absolute inset-0 opacity-20">
                    <div className="absolute top-4 left-4 w-16 h-16 border-2 border-white/30 rounded-full" />
                    <div className="absolute bottom-4 right-4 w-24 h-24 border-2 border-white/20 rounded-full" />
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 border border-white/10 rounded-full" />
                  </div>

                  {/* Central Icon */}
                  <div className="relative z-10 w-20 h-20 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center text-white shadow-lg">
                    {isDone ? (
                      <Check className="w-10 h-10" strokeWidth={2.5} />
                    ) : (
                      <IconComponent name={mod.previewIcon || mod.icon} className="w-10 h-10" />
                    )}
                  </div>

                  {/* External Link Badge */}
                  {mod.external && (
                    <div className="absolute top-3 right-3 bg-white/20 backdrop-blur-sm px-2 py-1 rounded-full flex items-center gap-1.5 text-white text-xs font-medium">
                      <ExternalLink className="w-3 h-3" />
                      {t('external', lang)}
                    </div>
                  )}

                  {/* Done Badge */}
                  {isDone && (
                    <div className="absolute top-3 left-3 bg-emerald-500 px-2 py-1 rounded-full flex items-center gap-1.5 text-white text-xs font-medium">
                      <Check className="w-3 h-3" />
                      {t('done', lang)}
                    </div>
                  )}

                  {mod.hfInspired && (
                    <div className="absolute top-3 right-3 bg-yellow-400 px-2 py-1 rounded-full flex items-center gap-1 text-xs font-bold text-yellow-900">
                      ★ HF
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="p-5">
                  {/* Title & Time */}
                  <div className="flex items-start justify-between gap-3 mb-2">
                    <h3 className="card-title group-hover:text-[var(--color-primary)] transition-colors">{tModule(mod.id, 'title', lang) as string}</h3>
                    <span className="text-xs whitespace-nowrap px-2 py-0.5 rounded-full" style={{ backgroundColor: 'var(--color-bg)', color: 'var(--color-text-muted)' }}>
                      {mod.time}
                    </span>
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1.5 mb-3">
                    {(tModule(mod.id, 'tags', lang) as string[]).map((tag, idx) => (
                      <span
                        key={idx}
                        className="text-xs px-2 py-0.5 rounded-md font-medium"
                        style={{
                          backgroundColor: 'var(--color-border)',
                          color: 'var(--color-text-secondary)'
                        }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Description */}
                  <p className="card-description line-clamp-2 mb-4">{tModule(mod.id, 'description', lang) as string}</p>

                  {/* Footer */}
                  <div className="flex items-center gap-2 text-sm font-medium" style={{ color: 'var(--color-primary)' }}>
                    {mod.external ? (
                      <>
                        {t('openApp', lang)}
                        <ExternalLink className="h-4 w-4 transition group-hover:translate-x-0.5" />
                      </>
                    ) : isDone ? (
                      <>
                        {t('showResults', lang)}
                        <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
                      </>
                    ) : (
                      <>
                        {t('startTest', lang)}
                        <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
                      </>
                    )}
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        {/* Results Button */}
        {completedCount > 0 && (
          <div className="text-center pt-4">
            <button
              onClick={() => setView('results')}
              className="text-white px-8 py-4 font-semibold transition-all shadow-lg hover:shadow-xl inline-flex items-center gap-3"
              style={{ backgroundColor: 'var(--color-text)', borderRadius: 'var(--radius-full)' }}
            >
              {t('showCompleteProfile', lang)}
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        )}
      </div>
    </div>
  );

  const handleModuleClick = (mod: ModuleCard) => {
    // Handle external links
    if (mod.external && mod.externalUrl) {
      window.open(mod.externalUrl, '_blank', 'noopener,noreferrer');
      return;
    }

    if (mod.id === 'chat' && progress.chat && chatReport) {
      setView('results');
    } else if (mod.id === 'typology' && progress.typology) {
      setView('results');
    } else if (mod.id === 'vak' && progress.vak) {
      setView('results');
    } else if (mod.id === 'habits' && progress.habits) {
      setView('results');
    } else if (mod.id === 'motivation' && progress.motivation) {
      setView('results');
    } else if (mod.id === 'strengths' && progress.strengths) {
      setView('results');
    } else if (mod.id === 'growthMindset' && progress.growthMindset) {
      setView('results');
    } else if (mod.id === 'grit' && progress.grit) {
      setView('results');
    } else if (mod.id === 'selfEfficacy' && progress.selfEfficacy) {
      setView('results');
    } else if (mod.id === 'testAnxiety' && progress.testAnxiety) {
      setView('results');
    } else if (mod.id === 'metacognition' && progress.metacognition) {
      setView('results');
    } else if (mod.id === 'riasec' && progress.riasec) {
      setView('results');
    } else if (mod.id === 'eq' && progress.eq) {
      setView('results');
    } else if (mod.id === 'procrastination' && progress.procrastination) {
      setView('results');
    } else if (mod.id === 'academicMotivation' && progress.academicMotivation) {
      setView('results');
    } else if (mod.id === 'timeManagement' && progress.timeManagement) {
      setView('results');
    } else if (mod.id === 'bigFive' && progress.bigFive) {
      setView('results');
    } else if (mod.id === 'locusOfControl' && progress.locusOfControl) {
      setView('results');
    } else if (mod.id === 'resilience' && progress.resilience) {
      setView('results');
    } else if (mod.id === 'gardner' && progress.gardner) {
      setView('results');
    } else if (mod.id === 'kolb' && progress.kolb) {
      setView('results');
    } else if (mod.id === 'studyStress' && progress.studyStress) {
      setView('results');
    } else if (mod.id === 'studyStrategies' && progress.studyStrategies) {
      setView('results');
    } else if (mod.id === 'stroop' && progress.stroop) {
      setView('results');
    } else if (mod.id === 'chat') {
      handleStartChat();
    } else if (mod.id === 'stroop') {
      // Reset Stroop state when starting
      setStroopPhase('intro');
      setStroopTrials([]);
      setStroopCurrentTrial(0);
      setStroopResults([]);
      setStroopResult(null);
      setView('stroop');
    } else {
      setView(mod.view);
    }
  };

  // Chat handlers
  const handleStartChat = async () => {
    setView('chat');
    if (messages.length > 0) return;
    setIsLoading(true);
    try {
      const welcomeText = await navigatorService.startChat();
      setMessages([{ role: 'model', text: welcomeText, timestamp: new Date() }]);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSendMessage = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!inputText.trim() || isLoading) return;
    const userMessage: Message = { role: 'user', text: inputText, timestamp: new Date() };
    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setIsLoading(true);
    try {
      const reply = await navigatorService.sendMessage(inputText);
      setMessages(prev => [...prev, { role: 'model', text: reply, timestamp: new Date() }]);
      const name = navigatorService.getStudentName();
      if (name && !studentName) setStudentName(name);
    } catch (error) {
      setMessages(prev => [...prev, { role: 'model', text: "Chyba.", timestamp: new Date() }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleFinishChat = async () => {
    setIsLoading(true);
    try {
      const result = await navigatorService.generateReport();
      setChatReport(result);
      setProgress(p => ({ ...p, chat: true }));
      setView('results');
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  // Chat View
  const renderChat = () => (
    <div className="flex-1 flex flex-col card overflow-hidden mx-4 my-4 max-w-3xl self-center w-full" style={{ boxShadow: 'var(--shadow-lg)' }}>
      <div className="px-6 py-4 flex items-center justify-between" style={{ borderBottom: '1px solid var(--color-border)' }}>
        <h2 className="font-serif text-lg font-semibold" style={{ color: 'var(--color-text)' }}>Rozhovor s AI</h2>
        <button onClick={() => setView('dashboard')} style={{ color: 'var(--color-text-muted)' }} className="hover:opacity-70 transition-opacity">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
        </button>
      </div>
      <div className="flex-1 overflow-y-auto p-6 space-y-4" style={{ backgroundColor: 'var(--color-bg)' }}>
        {messages.map((m, i) => (
          <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[85%] px-5 py-4 ${m.role === 'user' ? 'text-white' : ''}`} style={{
              backgroundColor: m.role === 'user' ? 'var(--color-primary)' : 'var(--color-bg-card)',
              border: m.role === 'user' ? 'none' : '1px solid var(--color-border)',
              borderRadius: 'var(--radius-lg)',
              color: m.role === 'user' ? '#fff' : 'var(--color-text)'
            }}>
              <ReactMarkdown className={`prose-sm max-w-none ${m.role === 'user' ? 'text-white' : ''}`}>{m.text}</ReactMarkdown>
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="px-5 py-4 flex gap-1.5" style={{ backgroundColor: 'var(--color-bg-card)', borderRadius: 'var(--radius-lg)', border: '1px solid var(--color-border)' }}>
              <div className="w-2 h-2 rounded-full animate-bounce" style={{ backgroundColor: 'var(--color-primary)' }}></div>
              <div className="w-2 h-2 rounded-full animate-bounce [animation-delay:0.2s]" style={{ backgroundColor: 'var(--color-primary)' }}></div>
              <div className="w-2 h-2 rounded-full animate-bounce [animation-delay:0.4s]" style={{ backgroundColor: 'var(--color-primary)' }}></div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>
      <div className="p-4" style={{ borderTop: '1px solid var(--color-border)', backgroundColor: 'var(--color-bg-card)' }}>
        <form onSubmit={handleSendMessage} className="flex gap-3">
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Napiš odpověď..."
            disabled={isLoading}
            className="flex-1 px-5 py-3 outline-none transition-all"
            style={{
              backgroundColor: 'var(--color-bg)',
              border: '1px solid var(--color-border)',
              borderRadius: 'var(--radius-md)',
              fontFamily: 'var(--font-sans)'
            }}
          />
          <button
            type="submit"
            disabled={!inputText.trim() || isLoading}
            className="px-5 py-3 text-white font-medium disabled:opacity-50 transition-all"
            style={{ backgroundColor: 'var(--color-primary)', borderRadius: 'var(--radius-md)' }}
          >
            Odeslat
          </button>
        </form>
        {messages.length >= 6 && (
          <button
            onClick={handleFinishChat}
            disabled={isLoading}
            className="w-full mt-3 py-3 text-white font-medium disabled:opacity-50 transition-all"
            style={{ backgroundColor: 'var(--color-text)', borderRadius: 'var(--radius-md)' }}
          >
            Dokončit a zobrazit profil
          </button>
        )}
      </div>
    </div>
  );

  // Typology
  const currentDimensionQuestions = typologyQuestions.filter(q => q.dimension === dimensionsMeta[currentDimension]?.id);
  const allTypologyAnswered = currentDimensionQuestions.every(q => typologyAnswers[q.id]);

  const handleNextDimension = () => {
    if (currentDimension < dimensionsMeta.length - 1) {
      setCurrentDimension(d => d + 1);
    } else {
      const result = scoreTypology(typologyAnswers);
      setTypologyResult(result);
      setProgress(p => ({ ...p, typology: true }));
      setView('results');
    }
  };

  const renderTypology = () => {
    const dim = dimensionsMeta[currentDimension];
    const progressPercent = Math.round(((currentDimension) / dimensionsMeta.length) * 100);
    return (
      <div className="flex-1 flex flex-col max-w-3xl mx-auto w-full px-4 py-8" style={{ backgroundColor: 'var(--color-bg)' }}>
        <div className="flex items-center justify-between mb-6">
          <button onClick={() => setView('dashboard')} className="flex items-center gap-2 text-label" style={{ color: 'var(--color-text-muted)' }}>
            <ChevronLeft className="w-5 h-5" />
            {t('back', lang)}
          </button>
          <span className="text-sm" style={{ color: 'var(--color-text-muted)' }}>{currentDimension + 1} / {dimensionsMeta.length}</span>
        </div>
        <div className="h-2 overflow-hidden mb-8" style={{ backgroundColor: 'var(--color-border)', borderRadius: 'var(--radius-full)' }}>
          <div className="h-full transition-all duration-500" style={{ width: `${progressPercent}%`, backgroundColor: 'var(--color-primary)' }} />
        </div>
        <div className="text-center mb-8">
          <h2 className="text-h2 font-serif mb-2" style={{ color: 'var(--color-text)' }}>{getDimensionLabel(dim, 'left', lang)} vs {getDimensionLabel(dim, 'right', lang)}</h2>
          <p className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>{lang === 'cs' ? 'Vyber odpověď, která tě nejlépe vystihuje' : 'Choose the answer that best describes you'}</p>
        </div>
        <div className="space-y-6 flex-1 overflow-y-auto">
          {currentDimensionQuestions.map((q, idx) => (
            <div key={q.id} className="card p-6">
              <p className="font-medium mb-4" style={{ color: 'var(--color-text)' }}>{idx + 1}. {getTypologyQuestionText(q, lang)}</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {q.options.map(opt => (
                  <button
                    key={opt.key}
                    onClick={() => setTypologyAnswers(prev => ({ ...prev, [q.id]: opt.key }))}
                    className={`option-button ${typologyAnswers[q.id] === opt.key ? 'selected' : ''}`}
                    style={{
                      borderColor: typologyAnswers[q.id] === opt.key ? 'var(--color-primary)' : 'var(--color-border)',
                      backgroundColor: typologyAnswers[q.id] === opt.key ? 'rgba(74, 95, 168, 0.08)' : 'var(--color-bg-card)'
                    }}
                  >
                    <span className="option-key mr-2">{opt.key})</span>{getTypologyOptionText(opt, lang)}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
        <div className="flex gap-4 mt-8">
          {currentDimension > 0 && <button onClick={() => setCurrentDimension(d => d - 1)} className="flex-1 py-4 font-medium transition-all" style={{ border: '2px solid var(--color-border)', borderRadius: 'var(--radius-md)', backgroundColor: 'var(--color-bg-card)' }}>{t('back', lang)}</button>}
          <button onClick={handleNextDimension} disabled={!allTypologyAnswered} className="flex-1 py-4 text-white font-medium disabled:opacity-50 transition-all" style={{ backgroundColor: 'var(--color-primary)', borderRadius: 'var(--radius-md)' }}>
            {currentDimension === dimensionsMeta.length - 1 ? t('finish', lang) : t('next', lang)}
          </button>
        </div>
      </div>
    );
  };

  // VAK Test
  const handleVakAnswer = (answer: VakOption) => {
    const newAnswers = [...vakAnswers, answer];
    setVakAnswers(newAnswers);
    if (currentVakQuestion < vakQuestions.length - 1) {
      setCurrentVakQuestion(q => q + 1);
    } else {
      const result = scoreVak(newAnswers);
      setVakResult(result);
      setProgress(p => ({ ...p, vak: true }));
      setView('results');
    }
  };

  const renderVak = () => {
    const q = vakQuestions[currentVakQuestion];
    const progressPercent = Math.round((currentVakQuestion / vakQuestions.length) * 100);
    return (
      <div className="flex-1 flex flex-col max-w-2xl mx-auto w-full px-4 py-8" style={{ backgroundColor: 'var(--color-bg)' }}>
        <div className="flex items-center justify-between mb-6">
          <button onClick={() => setView('dashboard')} className="flex items-center gap-2 text-label" style={{ color: 'var(--color-text-muted)' }}>
            <ChevronLeft className="w-5 h-5" />
            {t('back', lang)}
          </button>
          <span className="text-sm" style={{ color: 'var(--color-text-muted)' }}>{currentVakQuestion + 1} / {vakQuestions.length}</span>
        </div>
        <div className="h-2 overflow-hidden mb-8" style={{ backgroundColor: 'var(--color-border)', borderRadius: 'var(--radius-full)' }}>
          <div className="h-full transition-all duration-500" style={{ width: `${progressPercent}%`, backgroundColor: 'var(--color-primary)' }} />
        </div>
        <div className="flex-1 flex flex-col justify-center">
          <div className="card p-8" style={{ boxShadow: 'var(--shadow-lg)' }}>
            <p className="text-h3 font-serif mb-8 text-center" style={{ color: 'var(--color-text)' }}>{getVakQuestionText(q, lang)}</p>
            <div className="space-y-4">
              {q.options.map((opt, idx) => (
                <button key={opt.key} onClick={() => handleVakAnswer(opt.key)} className="option-button flex items-center gap-4">
                  <span className="w-10 h-10 flex items-center justify-center font-semibold" style={{ borderRadius: 'var(--radius-full)', backgroundColor: 'var(--color-bg)', color: 'var(--color-text-muted)' }}>
                    {String.fromCharCode(65 + idx)}
                  </span>
                  <span style={{ color: 'var(--color-text-secondary)' }}>{getVakOptionText(opt, lang)}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Habits Test
  const handleHabitsAnswer = (questionId: string, answer: 'A' | 'B' | 'C' | 'D') => {
    const newAnswers = { ...habitsAnswers, [questionId]: answer };
    setHabitsAnswers(newAnswers);
    if (currentHabitsQuestion < habitsQuestions.length - 1) {
      setCurrentHabitsQuestion(q => q + 1);
    } else {
      const result = scoreHabits(newAnswers);
      setHabitsResult(result);
      setProgress(p => ({ ...p, habits: true }));
      setView('results');
    }
  };

  const renderHabits = () => {
    const q = habitsQuestions[currentHabitsQuestion];
    const progressPercent = Math.round((currentHabitsQuestion / habitsQuestions.length) * 100);
    return (
      <div className="flex-1 flex flex-col max-w-2xl mx-auto w-full px-4 py-8" style={{ backgroundColor: 'var(--color-bg)' }}>
        <div className="flex items-center justify-between mb-6">
          <button onClick={() => setView('dashboard')} className="flex items-center gap-2 text-label" style={{ color: 'var(--color-text-muted)' }}>
            <ChevronLeft className="w-5 h-5" />
            Zpět
          </button>
          <span className="text-sm" style={{ color: 'var(--color-text-muted)' }}>{currentHabitsQuestion + 1} / {habitsQuestions.length}</span>
        </div>
        <div className="h-2 overflow-hidden mb-8" style={{ backgroundColor: 'var(--color-border)', borderRadius: 'var(--radius-full)' }}>
          <div className="h-full transition-all duration-500" style={{ width: `${progressPercent}%`, backgroundColor: 'var(--color-primary)' }} />
        </div>
        <div className="flex-1 flex flex-col justify-center">
          <div className="card p-8" style={{ boxShadow: 'var(--shadow-lg)' }}>
            <p className="text-h3 font-serif mb-8 text-center" style={{ color: 'var(--color-text)' }}>{q.text}</p>
            <div className="space-y-4">
              {q.options.map((opt, idx) => (
                <button key={opt.key} onClick={() => handleHabitsAnswer(q.id, opt.key)} className="option-button flex items-center gap-4">
                  <span className="w-10 h-10 flex items-center justify-center font-semibold" style={{ borderRadius: 'var(--radius-full)', backgroundColor: 'var(--color-bg)', color: 'var(--color-text-muted)' }}>
                    {opt.key}
                  </span>
                  <span style={{ color: 'var(--color-text-secondary)' }}>{opt.text}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Motivation Test
  const handleMotivationAnswer = (questionId: string, answer: 'A' | 'B' | 'C' | 'D') => {
    const newAnswers = { ...motivationAnswers, [questionId]: answer };
    setMotivationAnswers(newAnswers);
    if (currentMotivationQuestion < motivationQuestions.length - 1) {
      setCurrentMotivationQuestion(q => q + 1);
    } else {
      const result = scoreMotivation(newAnswers);
      setMotivationResult(result);
      setProgress(p => ({ ...p, motivation: true }));
      setView('results');
    }
  };

  const renderMotivation = () => {
    const q = motivationQuestions[currentMotivationQuestion];
    const progressPercent = Math.round((currentMotivationQuestion / motivationQuestions.length) * 100);
    return (
      <div className="flex-1 flex flex-col max-w-2xl mx-auto w-full px-4 py-8" style={{ backgroundColor: 'var(--color-bg)' }}>
        <div className="flex items-center justify-between mb-6">
          <button onClick={() => setView('dashboard')} className="flex items-center gap-2 text-label" style={{ color: 'var(--color-text-muted)' }}>
            <ChevronLeft className="w-5 h-5" />
            Zpět
          </button>
          <span className="text-sm" style={{ color: 'var(--color-text-muted)' }}>{currentMotivationQuestion + 1} / {motivationQuestions.length}</span>
        </div>
        <div className="h-2 overflow-hidden mb-8" style={{ backgroundColor: 'var(--color-border)', borderRadius: 'var(--radius-full)' }}>
          <div className="h-full transition-all duration-500" style={{ width: `${progressPercent}%`, backgroundColor: 'var(--color-primary)' }} />
        </div>
        <div className="flex-1 flex flex-col justify-center">
          <div className="card p-8" style={{ boxShadow: 'var(--shadow-lg)' }}>
            <p className="text-h3 font-serif mb-8 text-center" style={{ color: 'var(--color-text)' }}>{q.text}</p>
            <div className="space-y-4">
              {q.options.map((opt, idx) => (
                <button key={opt.key} onClick={() => handleMotivationAnswer(q.id, opt.key)} className="option-button flex items-center gap-4">
                  <span className="w-10 h-10 flex items-center justify-center font-semibold" style={{ borderRadius: 'var(--radius-full)', backgroundColor: 'var(--color-bg)', color: 'var(--color-text-muted)' }}>
                    {opt.key}
                  </span>
                  <span style={{ color: 'var(--color-text-secondary)' }}>{opt.text}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Strengths Test
  const handleStrengthsAnswer = (questionId: string, answer: 'A' | 'B' | 'C' | 'D') => {
    const newAnswers = { ...strengthsAnswers, [questionId]: answer };
    setStrengthsAnswers(newAnswers);
    if (currentStrengthsQuestion < strengthsQuestions.length - 1) {
      setCurrentStrengthsQuestion(q => q + 1);
    } else {
      const result = scoreStrengths(newAnswers);
      setStrengthsResult(result);
      setProgress(p => ({ ...p, strengths: true }));
      setView('results');
    }
  };

  const renderStrengths = () => {
    const q = strengthsQuestions[currentStrengthsQuestion];
    const progressPercent = Math.round((currentStrengthsQuestion / strengthsQuestions.length) * 100);
    return (
      <div className="flex-1 flex flex-col max-w-2xl mx-auto w-full px-4 py-8" style={{ backgroundColor: 'var(--color-bg)' }}>
        <div className="flex items-center justify-between mb-6">
          <button onClick={() => setView('dashboard')} className="flex items-center gap-2 text-label" style={{ color: 'var(--color-text-muted)' }}>
            <ChevronLeft className="w-5 h-5" />
            Zpět
          </button>
          <span className="text-sm" style={{ color: 'var(--color-text-muted)' }}>{currentStrengthsQuestion + 1} / {strengthsQuestions.length}</span>
        </div>
        <div className="h-2 overflow-hidden mb-8" style={{ backgroundColor: 'var(--color-border)', borderRadius: 'var(--radius-full)' }}>
          <div className="h-full transition-all duration-500" style={{ width: `${progressPercent}%`, backgroundColor: 'var(--color-primary)' }} />
        </div>
        <div className="flex-1 flex flex-col justify-center">
          <div className="card p-8" style={{ boxShadow: 'var(--shadow-lg)' }}>
            <p className="text-h3 font-serif mb-8 text-center" style={{ color: 'var(--color-text)' }}>{q.text}</p>
            <div className="space-y-4">
              {q.options.map((opt, idx) => (
                <button key={opt.key} onClick={() => handleStrengthsAnswer(q.id, opt.key)} className="option-button flex items-center gap-4">
                  <span className="w-10 h-10 flex items-center justify-center font-semibold" style={{ borderRadius: 'var(--radius-full)', backgroundColor: 'var(--color-bg)', color: 'var(--color-text-muted)' }}>
                    {opt.key}
                  </span>
                  <span style={{ color: 'var(--color-text-secondary)' }}>{opt.text}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Stroop Test with Camera
  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        setCameraActive(true);
      }
    } catch (err) {
      console.error('Camera error:', err);
    }
  };

  const stopCamera = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const tracks = (videoRef.current.srcObject as MediaStream).getTracks();
      tracks.forEach(track => track.stop());
      setCameraActive(false);
    }
  };

  const startStroopPractice = () => {
    setStroopPhase('practice');
    setStroopTrials(generatePracticeTrials());
    setStroopCurrentTrial(0);
    setStroopResults([]);
    setTimeout(() => {
      setStroopShowStimulus(true);
      setStroopTrialStart(Date.now());
    }, 1000);
  };

  const startStroopTest = () => {
    setStroopPhase('test');
    setStroopTrials(generateStroopTrials(12, 12));
    setStroopCurrentTrial(0);
    setStroopResults([]);
    setTimeout(() => {
      setStroopShowStimulus(true);
      setStroopTrialStart(Date.now());
    }, 1000);
  };

  const handleStroopAnswer = (colorName: string) => {
    if (!stroopShowStimulus) return;

    const reactionTime = Date.now() - stroopTrialStart;
    const currentTrialData = stroopTrials[stroopCurrentTrial];
    const isCorrect = colorName === currentTrialData.correctAnswer;

    const result: StroopTrialResult = {
      trial: currentTrialData,
      userAnswer: colorName,
      isCorrect,
      reactionTimeMs: reactionTime
    };

    const newResults = [...stroopResults, result];
    setStroopResults(newResults);
    setStroopShowStimulus(false);

    if (stroopCurrentTrial < stroopTrials.length - 1) {
      // Next trial after brief pause
      setTimeout(() => {
        setStroopCurrentTrial(stroopCurrentTrial + 1);
        setStroopShowStimulus(true);
        setStroopTrialStart(Date.now());
      }, 500);
    } else {
      // Test complete
      if (stroopPhase === 'practice') {
        // After practice, prompt to start real test
        setStroopPhase('test');
        setTimeout(startStroopTest, 500);
      } else {
        // Score and finish
        const finalResult = scoreStroopTest(newResults);
        setStroopResult(finalResult);
        setProgress(p => ({ ...p, stroop: true }));
        stopCamera();
        handleGenerateFeedback('stroop', 'Stroop Test', {
          score: finalResult.accuracy,
          percent: finalResult.accuracy,
          label: finalResult.label,
          description: `Stroop efekt: ${finalResult.stroopEffect}ms (${finalResult.stroopEffectPercent}%)`
        });
        setView('results');
      }
    }
  };

  const renderStroopTest = () => (
    <div className="flex-1 flex flex-col" style={{ backgroundColor: 'var(--color-bg)' }}>
      {/* Header */}
      <div className="px-6 py-4 flex items-center justify-between" style={{ borderBottom: '1px solid var(--color-border)' }}>
        <button onClick={() => { stopCamera(); setView('dashboard'); }} className="flex items-center gap-2" style={{ color: 'var(--color-text-muted)' }}>
          <ChevronLeft className="w-5 h-5" /> Zpět
        </button>
        <div className="text-center">
          <h2 className="font-serif font-semibold" style={{ color: 'var(--color-text)' }}>Stroop Test</h2>
          {stroopPhase !== 'intro' && (
            <p className="text-xs" style={{ color: 'var(--color-text-muted)' }}>
              {stroopPhase === 'practice' ? 'Cvičení' : `${stroopCurrentTrial + 1} / ${stroopTrials.length}`}
            </p>
          )}
        </div>
        <div className="w-20" />
      </div>

      <div className="flex-1 flex">
        {/* Main Test Area */}
        <div className="flex-1 flex flex-col items-center justify-center p-8">
          {stroopPhase === 'intro' && (
            <div className="max-w-xl text-center space-y-6">
              <div className="w-20 h-20 mx-auto bg-gradient-to-br from-cyan-500 to-blue-600 rounded-2xl flex items-center justify-center">
                <Eye className="w-10 h-10 text-white" />
              </div>
              <h2 className="text-2xl font-serif font-semibold" style={{ color: 'var(--color-text)' }}>
                Stroop Test - Měření pozornosti
              </h2>
              <div className="text-left space-y-4 p-6 rounded-xl" style={{ backgroundColor: 'var(--color-bg-card)', border: '1px solid var(--color-border)' }}>
                <p style={{ color: 'var(--color-text-secondary)' }}>
                  <strong>Jak to funguje:</strong> Uvidíš slova barev (např. "ČERVENÁ"), ale zobrazené v různých barvách.
                </p>
                <p style={{ color: 'var(--color-text-secondary)' }}>
                  <strong>Tvůj úkol:</strong> Klikni na BARVU, kterou je slovo NAPSANÉ (ne na to, co slovo říká)!
                </p>
                <div className="p-4 rounded-lg" style={{ backgroundColor: 'var(--color-bg)' }}>
                  <p className="text-sm mb-2" style={{ color: 'var(--color-text-muted)' }}>Příklad:</p>
                  <p className="text-2xl font-bold text-center" style={{ color: '#3b82f6' }}>ČERVENÁ</p>
                  <p className="text-sm text-center mt-2" style={{ color: 'var(--color-text-muted)' }}>
                    Správná odpověď: MODRÁ (barva textu)
                  </p>
                </div>
                <p style={{ color: 'var(--color-text-secondary)' }}>
                  Kamera bude sledovat tvou pozornost během testu.
                </p>
              </div>
              <button
                onClick={() => { startCamera(); startStroopPractice(); }}
                className="px-8 py-4 text-white font-semibold text-lg transition-all hover:scale-105"
                style={{ backgroundColor: '#0891b2', borderRadius: 'var(--radius-lg)' }}
              >
                Zapnout kameru a začít cvičení
              </button>
            </div>
          )}

          {(stroopPhase === 'practice' || stroopPhase === 'test') && (
            <div className="w-full max-w-lg space-y-8">
              {/* Stimulus Display */}
              <div
                className="h-48 flex items-center justify-center rounded-2xl"
                style={{ backgroundColor: '#1f2937' }}
              >
                {stroopShowStimulus && stroopTrials[stroopCurrentTrial] ? (
                  <span
                    className="text-5xl font-bold tracking-wider"
                    style={{ color: stroopTrials[stroopCurrentTrial].displayColor }}
                  >
                    {stroopTrials[stroopCurrentTrial].word}
                  </span>
                ) : (
                  <span className="text-4xl text-white/20">+</span>
                )}
              </div>

              {/* Answer Buttons */}
              <div className="grid grid-cols-2 gap-4">
                {COLOR_NAMES.map((colorName) => (
                  <button
                    key={colorName}
                    onClick={() => handleStroopAnswer(colorName)}
                    disabled={!stroopShowStimulus}
                    className="py-6 text-white font-bold text-xl rounded-xl transition-all hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                    style={{ backgroundColor: COLORS[colorName] }}
                  >
                    {colorName}
                  </button>
                ))}
              </div>

              {/* Progress */}
              <div className="h-2 rounded-full overflow-hidden" style={{ backgroundColor: 'var(--color-border)' }}>
                <div
                  className="h-full transition-all duration-300"
                  style={{
                    width: `${((stroopCurrentTrial + 1) / stroopTrials.length) * 100}%`,
                    backgroundColor: '#0891b2'
                  }}
                />
              </div>
            </div>
          )}
        </div>

        {/* Camera Panel */}
        {cameraActive && (
          <div className="w-64 p-4 flex flex-col gap-4" style={{ borderLeft: '1px solid var(--color-border)', backgroundColor: 'var(--color-bg-card)' }}>
            <div className="relative rounded-lg overflow-hidden" style={{ aspectRatio: '4/3' }}>
              <video
                ref={videoRef}
                autoPlay
                playsInline
                muted
                className="w-full h-full object-cover"
              />
              <div className="absolute top-2 right-2 w-3 h-3 bg-red-500 rounded-full animate-pulse" />
            </div>
            <div className="text-center">
              <p className="text-xs font-medium" style={{ color: 'var(--color-text)' }}>Kamera aktivní</p>
              <p className="text-xs" style={{ color: 'var(--color-text-muted)' }}>Sledujeme tvou pozornost</p>
            </div>
            {stroopResults.length > 0 && (
              <div className="p-3 rounded-lg" style={{ backgroundColor: 'var(--color-bg)' }}>
                <p className="text-xs font-medium mb-2" style={{ color: 'var(--color-text)' }}>Průběžné výsledky:</p>
                <div className="flex justify-between text-xs">
                  <span style={{ color: 'var(--color-text-muted)' }}>Správně:</span>
                  <span style={{ color: '#22c55e' }}>{stroopResults.filter(r => r.isCorrect).length}</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span style={{ color: 'var(--color-text-muted)' }}>Špatně:</span>
                  <span style={{ color: '#ef4444' }}>{stroopResults.filter(r => !r.isCorrect).length}</span>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );

  // Mental Rotation Test functions
  const startMrtPractice = () => {
    setMrtPhase('practice');
    setMrtTrials(generateMRTPracticeTrials());
    setMrtCurrentTrial(0);
    setMrtResults([]);
    setTimeout(() => {
      setMrtTrialStart(Date.now());
    }, 300);
  };

  const startMrtTest = () => {
    setMrtPhase('test');
    setMrtTrials(generateMentalRotationTrials(4, 6, 6));
    setMrtCurrentTrial(0);
    setMrtResults([]);
    setTimeout(() => {
      setMrtTrialStart(Date.now());
    }, 300);
  };

  const handleMrtAnswer = (selectedIndex: number) => {
    const currentTrial = mrtTrials[mrtCurrentTrial];
    if (!currentTrial) return;

    const reactionTimeMs = Date.now() - mrtTrialStart;
    const isCorrect = selectedIndex === currentTrial.correctIndex;

    const result: MentalRotationTrialResult = {
      trial: currentTrial,
      selectedIndex,
      isCorrect,
      reactionTimeMs
    };

    const newResults = [...mrtResults, result];
    setMrtResults(newResults);

    if (mrtCurrentTrial < mrtTrials.length - 1) {
      setTimeout(() => {
        setMrtCurrentTrial(mrtCurrentTrial + 1);
        setMrtTrialStart(Date.now());
      }, 400);
    } else {
      if (mrtPhase === 'practice') {
        setMrtPhase('test');
        setTimeout(startMrtTest, 500);
      } else {
        const finalResult = scoreMentalRotationTest(newResults);
        setMrtResult(finalResult);
        setProgress(p => ({ ...p, mentalRotation: true }));
        handleGenerateFeedback('mentalRotation', 'Mental Rotation Test', {
          score: finalResult.accuracy,
          percent: finalResult.accuracy,
          label: finalResult.label,
          description: `Prostorová schopnost: ${finalResult.spatialAbility}, STEM potenciál: ${finalResult.stemPotential}`
        });
        setView('results');
      }
    }
  };

  // SVG Shape component
  const ShapeDisplay: React.FC<{ shape: { points: { x: number; y: number }[] }, rotation: number, size?: number, color?: string }> =
    ({ shape, rotation, size = 100, color = '#8b5cf6' }) => {
      const { path, viewBox } = getShapeSvgData({ type: 'L', points: shape.points }, rotation, size);
      return (
        <svg width={size} height={size} viewBox={viewBox} className="transition-all">
          <path d={path} fill={color} stroke="#1f2937" strokeWidth="2" />
        </svg>
      );
    };

  const renderMentalRotationTest = () => (
    <div className="flex-1 flex flex-col" style={{ backgroundColor: 'var(--color-bg)' }}>
      {/* Header */}
      <div className="px-6 py-4 flex items-center justify-between" style={{ borderBottom: '1px solid var(--color-border)' }}>
        <button onClick={() => { setMrtPhase('intro'); setView('dashboard'); }} className="flex items-center gap-2" style={{ color: 'var(--color-text-muted)' }}>
          <ChevronLeft className="w-5 h-5" /> Zpět
        </button>
        <div className="text-center">
          <h2 className="font-serif font-semibold" style={{ color: 'var(--color-text)' }}>Prostorová představivost</h2>
          {mrtPhase !== 'intro' && (
            <p className="text-xs" style={{ color: 'var(--color-text-muted)' }}>
              {mrtPhase === 'practice' ? 'Cvičení' : `${mrtCurrentTrial + 1} / ${mrtTrials.length}`}
            </p>
          )}
        </div>
        <div className="w-20" />
      </div>

      <div className="flex-1 flex flex-col items-center justify-center p-8">
        {mrtPhase === 'intro' && (
          <div className="max-w-xl text-center space-y-6">
            <div className="w-20 h-20 mx-auto bg-gradient-to-br from-violet-500 to-purple-600 rounded-2xl flex items-center justify-center">
              <Brain className="w-10 h-10 text-white" />
            </div>
            <h2 className="text-2xl font-serif font-semibold" style={{ color: 'var(--color-text)' }}>
              Test mentální rotace (Shepard & Metzler)
            </h2>
            <div className="text-left space-y-4 p-6 rounded-xl" style={{ backgroundColor: 'var(--color-bg-card)', border: '1px solid var(--color-border)' }}>
              <p style={{ color: 'var(--color-text-secondary)' }}>
                <strong>Co měříme:</strong> Prostorovou představivost - schopnost mentálně otáčet objekty. Klíčová dovednost pro STEM obory (inženýrství, architektura, věda).
              </p>
              <p style={{ color: 'var(--color-text-secondary)' }}>
                <strong>Jak to funguje:</strong> Uvidíš vzorový tvar a několik možností. Vyber tu, která je STEJNÁ jako vzor (jen otočená, ne zrcadlená).
              </p>
              <div className="p-4 rounded-lg flex justify-center gap-8" style={{ backgroundColor: 'var(--color-bg)' }}>
                <div className="text-center">
                  <p className="text-xs mb-2" style={{ color: 'var(--color-text-muted)' }}>Vzor:</p>
                  <div className="w-16 h-16 bg-violet-500 flex items-center justify-center rounded" style={{ clipPath: 'polygon(0 0, 50% 0, 50% 50%, 100% 50%, 100% 100%, 0 100%)' }} />
                </div>
                <div className="text-center">
                  <p className="text-xs mb-2" style={{ color: '#22c55e' }}>Správně (otočený):</p>
                  <div className="w-16 h-16 bg-green-500 flex items-center justify-center rounded" style={{ clipPath: 'polygon(0 0, 100% 0, 100% 50%, 50% 50%, 50% 100%, 0 100%)', transform: 'rotate(90deg)' }} />
                </div>
                <div className="text-center">
                  <p className="text-xs mb-2" style={{ color: '#ef4444' }}>Špatně (zrcadlený):</p>
                  <div className="w-16 h-16 bg-red-500 flex items-center justify-center rounded" style={{ clipPath: 'polygon(50% 0, 100% 0, 100% 100%, 0 100%, 0 50%, 50% 50%)', transform: 'rotate(0deg)' }} />
                </div>
              </div>
              <p style={{ color: 'var(--color-text-secondary)' }}>
                <strong>Tip:</strong> Zrcadlené tvary vypadají podobně, ale jsou převrácené - dej si pozor!
              </p>
            </div>
            <button
              onClick={startMrtPractice}
              className="px-8 py-4 text-white font-semibold text-lg transition-all hover:scale-105"
              style={{ backgroundColor: '#8b5cf6', borderRadius: 'var(--radius-lg)' }}
            >
              Začít cvičení
            </button>
          </div>
        )}

        {(mrtPhase === 'practice' || mrtPhase === 'test') && mrtTrials[mrtCurrentTrial] && (
          <div className="w-full max-w-3xl space-y-8">
            {/* Original Shape */}
            <div className="text-center">
              <p className="text-sm mb-4" style={{ color: 'var(--color-text-muted)' }}>
                {mrtPhase === 'practice' ? '🎯 Cvičení: ' : ''}Najdi tvar, který je STEJNÝ jako vzor (jen otočený):
              </p>
              <div className="inline-block p-6 rounded-2xl" style={{ backgroundColor: 'var(--color-bg-card)', border: '2px solid #8b5cf6' }}>
                <p className="text-xs mb-2 font-medium" style={{ color: '#8b5cf6' }}>VZOR</p>
                <ShapeDisplay
                  shape={{ points: mrtTrials[mrtCurrentTrial].originalShape.points }}
                  rotation={mrtTrials[mrtCurrentTrial].originalRotation}
                  size={120}
                  color="#8b5cf6"
                />
              </div>
            </div>

            {/* Options */}
            <div className="flex justify-center gap-4 flex-wrap">
              {mrtTrials[mrtCurrentTrial].options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleMrtAnswer(index)}
                  className="p-4 rounded-xl transition-all hover:scale-105 hover:shadow-lg"
                  style={{
                    backgroundColor: 'var(--color-bg-card)',
                    border: '2px solid var(--color-border)'
                  }}
                >
                  <p className="text-xs mb-2 font-medium" style={{ color: 'var(--color-text-muted)' }}>
                    Možnost {String.fromCharCode(65 + index)}
                  </p>
                  <ShapeDisplay
                    shape={{ points: option.shape.points }}
                    rotation={option.rotation}
                    size={100}
                    color="#64748b"
                  />
                </button>
              ))}
            </div>

            {/* Progress */}
            <div className="h-2 rounded-full overflow-hidden" style={{ backgroundColor: 'var(--color-border)' }}>
              <div
                className="h-full transition-all duration-300"
                style={{
                  width: `${((mrtCurrentTrial + 1) / mrtTrials.length) * 100}%`,
                  backgroundColor: '#8b5cf6'
                }}
              />
            </div>

            {/* Stats */}
            {mrtResults.length > 0 && (
              <div className="flex justify-center gap-8 text-sm">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-green-500" />
                  <span style={{ color: 'var(--color-text-muted)' }}>Správně: {mrtResults.filter(r => r.isCorrect).length}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-red-500" />
                  <span style={{ color: 'var(--color-text-muted)' }}>Špatně: {mrtResults.filter(r => !r.isCorrect).length}</span>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );

  // Voice Interview
  const renderVoiceInterview = () => {
    const currentQuestion = interviewQuestions[currentVoiceQuestion];
    const questionText = currentQuestion ? getInterviewQuestionText(currentQuestion.id, lang) : '';

    const handleStartInterview = async () => {
      setVoiceInterviewPhase('interview');
      voiceService.setLanguage(lang);
      // Speak the first question
      setIsSpeaking(true);
      await voiceService.speak(questionText, lang);
      setIsSpeaking(false);
    };

    const handleStartListening = () => {
      setIsListening(true);
      setCurrentTranscript('');
      voiceService.startListening((text) => {
        setCurrentTranscript(text);
      });
    };

    const handleStopListening = async () => {
      const transcript = voiceService.stopListening();
      setIsListening(false);

      // Save the exchange
      const exchange: InterviewExchange = {
        questionId: currentQuestion.id,
        question: questionText,
        transcript: transcript || currentTranscript,
        timestamp: Date.now()
      };
      setVoiceExchanges(prev => [...prev, exchange]);
      setCurrentTranscript('');

      // Move to next question or finish
      if (currentVoiceQuestion < interviewQuestions.length - 1) {
        setCurrentVoiceQuestion(prev => prev + 1);
        // Speak next question
        const nextQuestion = interviewQuestions[currentVoiceQuestion + 1];
        const nextText = getInterviewQuestionText(nextQuestion.id, lang);
        setIsSpeaking(true);
        await voiceService.speak(nextText, lang);
        setIsSpeaking(false);
      } else {
        // Finish interview - generate passport
        setVoiceInterviewPhase('processing');
        try {
          const prompt = generateStudentPassportPrompt([...voiceExchanges, exchange], lang);
          const response = await navigatorService.sendMessage(prompt);

          // Parse the JSON response
          const jsonMatch = response.match(/\{[\s\S]*\}/);
          if (jsonMatch) {
            const passport = JSON.parse(jsonMatch[0]);
            setVoiceInterviewResult({
              sessionId: `vi-${Date.now()}`,
              startedAt: voiceExchanges[0]?.timestamp || Date.now(),
              completedAt: Date.now(),
              exchanges: [...voiceExchanges, exchange],
              studentPassport: passport,
              rawTranscript: [...voiceExchanges, exchange].map(e => `Q: ${e.question}\nA: ${e.transcript}`).join('\n\n')
            });
          }
        } catch (error) {
          console.error('Error generating passport:', error);
        }
        setVoiceInterviewPhase('done');
        setProgress(p => ({ ...p, voiceInterview: true }));
      }
    };

    return (
      <div className="flex-1 overflow-y-auto px-4 py-8" style={{ backgroundColor: 'var(--color-bg)' }}>
        <div className="max-w-2xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #8b5cf6 0%, #a855f7 100%)' }}>
              <Mic className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-h1 font-serif mb-2" style={{ color: 'var(--color-text)' }}>
              {lang === 'cs' ? 'Hlasový rozhovor' : 'Voice Interview'}
            </h1>
            <p style={{ color: 'var(--color-text-secondary)' }}>
              {lang === 'cs' ? 'AI ti položí otázky a ty odpovídáš hlasem' : 'AI will ask you questions and you respond by voice'}
            </p>
          </div>

          {/* Content based on phase */}
          {voiceInterviewPhase === 'intro' && (
            <div className="text-center space-y-6">
              {!voiceSupported ? (
                <div className="p-6 rounded-lg" style={{ backgroundColor: 'rgba(239, 68, 68, 0.1)', border: '1px solid rgba(239, 68, 68, 0.3)' }}>
                  <p className="text-red-600 font-medium">
                    {lang === 'cs' ? 'Tvůj prohlížeč nepodporuje rozpoznávání hlasu. Zkus Chrome nebo Safari.' : 'Your browser does not support voice recognition. Try Chrome or Safari.'}
                  </p>
                </div>
              ) : (
                <>
                  <div className="p-6 rounded-lg" style={{ backgroundColor: 'var(--color-bg-card)', border: '1px solid var(--color-border)' }}>
                    <h3 className="font-semibold mb-3" style={{ color: 'var(--color-text)' }}>
                      {lang === 'cs' ? 'Jak to funguje:' : 'How it works:'}
                    </h3>
                    <ul className="text-left space-y-2" style={{ color: 'var(--color-text-secondary)' }}>
                      <li className="flex items-center gap-2">
                        <span className="w-6 h-6 rounded-full bg-violet-100 text-violet-600 flex items-center justify-center text-sm">1</span>
                        {lang === 'cs' ? 'AI ti nahlas položí otázku' : 'AI will ask you a question out loud'}
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="w-6 h-6 rounded-full bg-violet-100 text-violet-600 flex items-center justify-center text-sm">2</span>
                        {lang === 'cs' ? 'Klikni na mikrofon a odpověz' : 'Click the microphone and respond'}
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="w-6 h-6 rounded-full bg-violet-100 text-violet-600 flex items-center justify-center text-sm">3</span>
                        {lang === 'cs' ? 'Po 5 otázkách dostaneš "Studentský pas"' : 'After 5 questions you get your "Student Passport"'}
                      </li>
                    </ul>
                  </div>
                  <button
                    onClick={handleStartInterview}
                    className="px-8 py-4 text-white font-semibold rounded-full transition-all hover:scale-105"
                    style={{ background: 'linear-gradient(135deg, #8b5cf6 0%, #a855f7 100%)' }}
                  >
                    <span className="flex items-center gap-2">
                      <Play className="w-5 h-5" />
                      {lang === 'cs' ? 'Začít rozhovor' : 'Start Interview'}
                    </span>
                  </button>
                </>
              )}
            </div>
          )}

          {voiceInterviewPhase === 'interview' && (
            <div className="space-y-6">
              {/* Progress */}
              <div className="flex justify-center gap-2">
                {interviewQuestions.map((_, idx) => (
                  <div
                    key={idx}
                    className="w-3 h-3 rounded-full transition-all"
                    style={{
                      backgroundColor: idx < currentVoiceQuestion ? '#8b5cf6' : idx === currentVoiceQuestion ? '#a855f7' : 'var(--color-border)'
                    }}
                  />
                ))}
              </div>

              {/* Current Question */}
              <div className="p-6 rounded-lg text-center" style={{ backgroundColor: 'var(--color-bg-card)', border: '1px solid var(--color-border)' }}>
                <p className="text-sm mb-2" style={{ color: 'var(--color-text-muted)' }}>
                  {lang === 'cs' ? `Otázka ${currentVoiceQuestion + 1} z ${interviewQuestions.length}` : `Question ${currentVoiceQuestion + 1} of ${interviewQuestions.length}`}
                </p>
                <p className="text-lg font-medium" style={{ color: 'var(--color-text)' }}>
                  {questionText}
                </p>
                {isSpeaking && (
                  <div className="mt-4 flex items-center justify-center gap-2 text-violet-600">
                    <div className="w-2 h-2 rounded-full bg-violet-600 animate-pulse" />
                    <span className="text-sm">{lang === 'cs' ? 'AI mluví...' : 'AI is speaking...'}</span>
                  </div>
                )}
              </div>

              {/* Microphone Button */}
              <div className="flex flex-col items-center gap-4">
                <button
                  onClick={isListening ? handleStopListening : handleStartListening}
                  disabled={isSpeaking}
                  className={`w-20 h-20 rounded-full flex items-center justify-center transition-all ${isListening ? 'animate-pulse' : ''}`}
                  style={{
                    background: isListening ? 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)' : 'linear-gradient(135deg, #8b5cf6 0%, #a855f7 100%)',
                    opacity: isSpeaking ? 0.5 : 1
                  }}
                >
                  {isListening ? <StopCircle className="w-10 h-10 text-white" /> : <Mic className="w-10 h-10 text-white" />}
                </button>
                <p className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>
                  {isListening ? (lang === 'cs' ? 'Klikni pro ukončení' : 'Click to stop') : (lang === 'cs' ? 'Klikni a mluv' : 'Click and speak')}
                </p>
              </div>

              {/* Live Transcript */}
              {currentTranscript && (
                <div className="p-4 rounded-lg" style={{ backgroundColor: 'rgba(139, 92, 246, 0.1)', border: '1px solid rgba(139, 92, 246, 0.3)' }}>
                  <p className="text-sm font-medium mb-1" style={{ color: '#8b5cf6' }}>
                    {lang === 'cs' ? 'Tvoje odpověď:' : 'Your answer:'}
                  </p>
                  <p style={{ color: 'var(--color-text)' }}>{currentTranscript}</p>
                </div>
              )}
            </div>
          )}

          {voiceInterviewPhase === 'processing' && (
            <div className="text-center py-12">
              <div className="w-16 h-16 border-4 border-t-transparent rounded-full animate-spin mx-auto mb-4" style={{ borderColor: '#8b5cf6', borderTopColor: 'transparent' }} />
              <p className="text-lg font-medium" style={{ color: 'var(--color-text)' }}>
                {lang === 'cs' ? 'Generuji tvůj Studentský pas...' : 'Generating your Student Passport...'}
              </p>
            </div>
          )}

          {voiceInterviewPhase === 'done' && voiceInterviewResult && (
            <div className="space-y-6">
              <div className="p-6 rounded-lg" style={{ backgroundColor: 'var(--color-bg-card)', border: '1px solid var(--color-border)' }}>
                <h3 className="text-lg font-serif font-semibold mb-4 flex items-center gap-2" style={{ color: 'var(--color-text)' }}>
                  <Check className="w-5 h-5 text-green-500" />
                  {lang === 'cs' ? 'Studentský pas' : 'Student Passport'}
                </h3>

                <div className="space-y-4">
                  <div>
                    <p className="text-sm font-medium mb-1" style={{ color: 'var(--color-text-muted)' }}>
                      {lang === 'cs' ? 'Shrnutí' : 'Summary'}
                    </p>
                    <p style={{ color: 'var(--color-text)' }}>{voiceInterviewResult.studentPassport.summary}</p>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm font-medium mb-1" style={{ color: 'var(--color-text-muted)' }}>
                        {lang === 'cs' ? 'Studijní návyky' : 'Study Habits'}
                      </p>
                      <p className="text-sm" style={{ color: 'var(--color-text)' }}>{voiceInterviewResult.studentPassport.studyHabits}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium mb-1" style={{ color: 'var(--color-text-muted)' }}>
                        {lang === 'cs' ? 'Cíle' : 'Goals'}
                      </p>
                      <p className="text-sm" style={{ color: 'var(--color-text)' }}>{voiceInterviewResult.studentPassport.goals}</p>
                    </div>
                  </div>

                  <div>
                    <p className="text-sm font-medium mb-2" style={{ color: 'var(--color-text-muted)' }}>
                      {lang === 'cs' ? 'Silné stránky' : 'Strengths'}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {voiceInterviewResult.studentPassport.strengths.map((s, i) => (
                        <span key={i} className="px-3 py-1 rounded-full text-sm bg-green-100 text-green-700">{s}</span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <p className="text-sm font-medium mb-2" style={{ color: 'var(--color-text-muted)' }}>
                      {lang === 'cs' ? 'Doporučení' : 'Recommendations'}
                    </p>
                    <ul className="space-y-1">
                      {voiceInterviewResult.studentPassport.recommendations.map((r, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm" style={{ color: 'var(--color-text)' }}>
                          <ArrowRight className="w-4 h-4 mt-0.5 text-violet-500 flex-shrink-0" />
                          {r}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              <button
                onClick={() => setView('results')}
                className="w-full py-3 text-white font-semibold rounded-lg transition-all"
                style={{ background: 'linear-gradient(135deg, #8b5cf6 0%, #a855f7 100%)' }}
              >
                {lang === 'cs' ? 'Zobrazit všechny výsledky' : 'View All Results'}
              </button>
            </div>
          )}

          {/* Back button */}
          <button
            onClick={() => {
              setView('dashboard');
              setVoiceInterviewPhase('intro');
              setCurrentVoiceQuestion(0);
              setVoiceExchanges([]);
              setCurrentTranscript('');
              voiceService.stopListening();
              voiceService.stopSpeaking();
            }}
            className="mt-6 flex items-center gap-2 text-sm"
            style={{ color: 'var(--color-text-secondary)' }}
          >
            <ChevronLeft className="w-4 h-4" />
            {lang === 'cs' ? 'Zpět na dashboard' : 'Back to dashboard'}
          </button>
        </div>
      </div>
    );
  };

  // Emotion Recognition
  const startEmotionCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      if (emotionVideoRef.current) {
        emotionVideoRef.current.srcObject = stream;
      }
    } catch (err) {
      console.error('Camera error:', err);
    }
  };

  const stopEmotionCamera = () => {
    if (emotionVideoRef.current && emotionVideoRef.current.srcObject) {
      const tracks = (emotionVideoRef.current.srcObject as MediaStream).getTracks();
      tracks.forEach(track => track.stop());
    }
  };

  const handleLoadEmotionModels = async () => {
    setEmotionModelsLoading(true);
    try {
      await emotionService.initialize();
      setEmotionModelsLoaded(true);
    } catch (error) {
      console.error('Error loading models:', error);
      alert(lang === 'cs' ? 'Chyba při načítání modelů' : 'Error loading models');
    } finally {
      setEmotionModelsLoading(false);
    }
  };

  const handleStartEmotionCalibration = async () => {
    await startEmotionCamera();
    setEmotionPhase('calibrating');
    // Wait for camera to be ready
    setTimeout(() => {
      if (emotionVideoRef.current) {
        emotionService.startContinuousDetection(
          emotionVideoRef.current,
          (data) => {
            setCurrentEmotion(data);
          },
          500
        );
        // After 3 seconds of calibration, start recording
        setTimeout(() => {
          setEmotionPhase('recording');
        }, 3000);
      }
    }, 1000);
  };

  const handleStopEmotionRecording = () => {
    const timeline = emotionService.stopContinuousDetection();
    setEmotionTimeline(timeline);
    const result = emotionService.generateResult();
    setEmotionResult(result);
    stopEmotionCamera();
    setEmotionPhase('done');
    setProgress(p => ({ ...p, emotionRecognition: true }));
  };

  const EMOTION_COLORS: Record<string, string> = {
    happy: '#22c55e',
    sad: '#3b82f6',
    angry: '#ef4444',
    surprised: '#f59e0b',
    neutral: '#6b7280',
    fearful: '#8b5cf6'
  };

  const EMOTION_LABELS: Record<string, { cs: string; en: string }> = {
    happy: { cs: 'Radost', en: 'Happy' },
    sad: { cs: 'Smutek', en: 'Sad' },
    angry: { cs: 'Zlost', en: 'Angry' },
    surprised: { cs: 'Překvapení', en: 'Surprised' },
    neutral: { cs: 'Neutrální', en: 'Neutral' },
    fearful: { cs: 'Strach', en: 'Fearful' }
  };

  const renderEmotionRecognition = () => (
    <div className="flex-1 flex flex-col" style={{ backgroundColor: 'var(--color-bg)' }}>
      {/* Header */}
      <div className="px-6 py-4 flex items-center justify-between" style={{ borderBottom: '1px solid var(--color-border)' }}>
        <button
          onClick={() => {
            stopEmotionCamera();
            emotionService.reset();
            setEmotionPhase('intro');
            setCurrentEmotion(null);
            setEmotionTimeline([]);
            setView('dashboard');
          }}
          className="flex items-center gap-2"
          style={{ color: 'var(--color-text-muted)' }}
        >
          <ChevronLeft className="w-5 h-5" /> {lang === 'cs' ? 'Zpět' : 'Back'}
        </button>
        <div className="text-center">
          <h2 className="font-serif font-semibold" style={{ color: 'var(--color-text)' }}>
            {lang === 'cs' ? 'Rozpoznávání emocí' : 'Emotion Recognition'}
          </h2>
          {emotionPhase === 'recording' && (
            <p className="text-xs" style={{ color: 'var(--color-text-muted)' }}>
              {lang === 'cs' ? 'Nahrávám...' : 'Recording...'}
            </p>
          )}
        </div>
        <div className="w-20" />
      </div>

      <div className="flex-1 flex overflow-hidden">
        {/* Main Content Area */}
        <div className="flex-1 flex flex-col items-center justify-center p-8 overflow-y-auto">
          {/* Intro Phase */}
          {emotionPhase === 'intro' && (
            <div className="max-w-xl text-center space-y-6">
              <div className="w-20 h-20 mx-auto rounded-2xl flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #ec4899 0%, #f43f5e 100%)' }}>
                <Smile className="w-10 h-10 text-white" />
              </div>
              <h2 className="text-2xl font-serif font-semibold" style={{ color: 'var(--color-text)' }}>
                {lang === 'cs' ? 'Sledování emocí v reálném čase' : 'Real-time Emotion Tracking'}
              </h2>
              <div className="text-left space-y-4 p-6 rounded-xl" style={{ backgroundColor: 'var(--color-bg-card)', border: '1px solid var(--color-border)' }}>
                <p style={{ color: 'var(--color-text-secondary)' }}>
                  <strong>{lang === 'cs' ? 'Jak to funguje:' : 'How it works:'}</strong> {lang === 'cs' ? 'Kamera sleduje tvůj obličej a AI rozpoznává emoce v reálném čase pomocí face-api.js.' : 'The camera tracks your face and AI recognizes emotions in real-time using face-api.js.'}
                </p>
                <p style={{ color: 'var(--color-text-secondary)' }}>
                  <strong>{lang === 'cs' ? 'Co zjistíš:' : 'What you\'ll learn:'}</strong> {lang === 'cs' ? 'Dominantní emoce, emoční stabilitu a jak se tvé emoce mění v čase.' : 'Dominant emotion, emotional stability, and how your emotions change over time.'}
                </p>
                <div className="flex flex-wrap gap-2 justify-center">
                  {Object.entries(EMOTION_LABELS).map(([key, labels]) => (
                    <span
                      key={key}
                      className="px-3 py-1 rounded-full text-sm text-white"
                      style={{ backgroundColor: EMOTION_COLORS[key] }}
                    >
                      {labels[lang]}
                    </span>
                  ))}
                </div>
              </div>

              {!emotionModelsLoaded ? (
                <button
                  onClick={handleLoadEmotionModels}
                  disabled={emotionModelsLoading}
                  className="px-8 py-4 text-white font-semibold text-lg transition-all hover:scale-105 disabled:opacity-50"
                  style={{ backgroundColor: '#ec4899', borderRadius: 'var(--radius-lg)' }}
                >
                  {emotionModelsLoading ? (
                    <span className="flex items-center gap-2">
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      {lang === 'cs' ? 'Načítám modely...' : 'Loading models...'}
                    </span>
                  ) : (
                    lang === 'cs' ? 'Načíst AI modely' : 'Load AI Models'
                  )}
                </button>
              ) : (
                <button
                  onClick={handleStartEmotionCalibration}
                  className="px-8 py-4 text-white font-semibold text-lg transition-all hover:scale-105"
                  style={{ backgroundColor: '#ec4899', borderRadius: 'var(--radius-lg)' }}
                >
                  {lang === 'cs' ? 'Zapnout kameru a začít' : 'Enable camera and start'}
                </button>
              )}
            </div>
          )}

          {/* Calibrating Phase */}
          {emotionPhase === 'calibrating' && (
            <div className="max-w-xl text-center space-y-6">
              <div className="relative rounded-2xl overflow-hidden" style={{ width: '400px', height: '300px', backgroundColor: '#1f2937' }}>
                <video
                  ref={emotionVideoRef}
                  autoPlay
                  playsInline
                  muted
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-32 h-32 border-4 border-pink-500 rounded-full animate-pulse opacity-50" />
                </div>
                <div className="absolute top-4 left-4 px-3 py-1 rounded-full text-white text-sm font-medium" style={{ backgroundColor: 'rgba(236, 72, 153, 0.8)' }}>
                  {lang === 'cs' ? 'Kalibrace...' : 'Calibrating...'}
                </div>
              </div>
              <p style={{ color: 'var(--color-text-secondary)' }}>
                {lang === 'cs' ? 'Dívej se do kamery, nastavujeme rozpoznávání...' : 'Look at the camera, setting up recognition...'}
              </p>
              <div className="w-48 h-2 rounded-full overflow-hidden mx-auto" style={{ backgroundColor: 'var(--color-border)' }}>
                <div className="h-full bg-pink-500 animate-pulse" style={{ width: '60%' }} />
              </div>
            </div>
          )}

          {/* Recording Phase */}
          {emotionPhase === 'recording' && (
            <div className="w-full max-w-4xl space-y-6">
              <div className="flex gap-6">
                {/* Camera feed */}
                <div className="flex-1">
                  <div className="relative rounded-2xl overflow-hidden" style={{ aspectRatio: '4/3', backgroundColor: '#1f2937' }}>
                    <video
                      ref={emotionVideoRef}
                      autoPlay
                      playsInline
                      muted
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-4 right-4 w-3 h-3 bg-red-500 rounded-full animate-pulse" />
                    {currentEmotion && (
                      <div className="absolute bottom-4 left-4 right-4 px-4 py-2 rounded-lg" style={{ backgroundColor: 'rgba(0,0,0,0.7)' }}>
                        <p className="text-white text-sm font-medium">
                          {lang === 'cs' ? 'Dominantní emoce: ' : 'Dominant emotion: '}
                          <span style={{ color: EMOTION_COLORS[currentEmotion.dominantEmotion] || '#fff' }}>
                            {EMOTION_LABELS[currentEmotion.dominantEmotion]?.[lang] || currentEmotion.dominantEmotion}
                          </span>
                        </p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Real-time emotion bars */}
                <div className="w-64 p-4 rounded-xl space-y-4" style={{ backgroundColor: 'var(--color-bg-card)', border: '1px solid var(--color-border)' }}>
                  <h3 className="font-semibold text-sm" style={{ color: 'var(--color-text)' }}>
                    {lang === 'cs' ? 'Emoce v reálném čase' : 'Real-time Emotions'}
                  </h3>
                  {Object.entries(EMOTION_LABELS).map(([emotion, labels]) => {
                    const value = currentEmotion?.emotions?.[emotion as keyof typeof currentEmotion.emotions] || 0;
                    return (
                      <div key={emotion} className="space-y-1">
                        <div className="flex justify-between text-xs">
                          <span style={{ color: 'var(--color-text-muted)' }}>{labels[lang]}</span>
                          <span style={{ color: EMOTION_COLORS[emotion] }}>{value}%</span>
                        </div>
                        <div className="h-2 rounded-full overflow-hidden" style={{ backgroundColor: 'var(--color-border)' }}>
                          <div
                            className="h-full transition-all duration-300"
                            style={{
                              width: `${value}%`,
                              backgroundColor: EMOTION_COLORS[emotion]
                            }}
                          />
                        </div>
                      </div>
                    );
                  })}

                  <div className="pt-4 border-t" style={{ borderColor: 'var(--color-border)' }}>
                    <p className="text-xs" style={{ color: 'var(--color-text-muted)' }}>
                      {lang === 'cs' ? 'Nahrávek: ' : 'Readings: '}{emotionTimeline.length}
                    </p>
                  </div>
                </div>
              </div>

              {/* Timeline preview */}
              {emotionTimeline.length > 5 && (
                <div className="p-4 rounded-xl" style={{ backgroundColor: 'var(--color-bg-card)', border: '1px solid var(--color-border)' }}>
                  <h3 className="font-semibold text-sm mb-3" style={{ color: 'var(--color-text)' }}>
                    {lang === 'cs' ? 'Časová osa emocí' : 'Emotion Timeline'}
                  </h3>
                  <div className="flex items-end gap-1 h-24">
                    {emotionTimeline.slice(-50).map((data, i) => {
                      const maxEmotion = Object.entries(data.emotions)
                        .filter(([k]) => k !== 'disgusted')
                        .reduce((max, [k, v]) => v > max[1] ? [k, v] : max, ['neutral', 0]);
                      return (
                        <div
                          key={i}
                          className="flex-1 min-w-1 rounded-t transition-all"
                          style={{
                            height: `${Math.max(10, maxEmotion[1])}%`,
                            backgroundColor: EMOTION_COLORS[maxEmotion[0]] || '#6b7280'
                          }}
                        />
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Stop button */}
              <div className="text-center">
                <button
                  onClick={handleStopEmotionRecording}
                  className="px-8 py-4 text-white font-semibold text-lg rounded-full transition-all hover:scale-105 flex items-center gap-2 mx-auto"
                  style={{ backgroundColor: '#ef4444' }}
                >
                  <StopCircle className="w-6 h-6" />
                  {lang === 'cs' ? 'Ukončit nahrávání' : 'Stop Recording'}
                </button>
                <p className="mt-2 text-sm" style={{ color: 'var(--color-text-muted)' }}>
                  {lang === 'cs' ? 'Doporučeno: 30-60 sekund' : 'Recommended: 30-60 seconds'}
                </p>
              </div>
            </div>
          )}

          {/* Done Phase - Results */}
          {emotionPhase === 'done' && emotionResult && (
            <div className="w-full max-w-2xl space-y-6">
              {/* Summary Card */}
              <div className="p-6 rounded-xl text-center" style={{ backgroundColor: 'var(--color-bg-card)', border: '1px solid var(--color-border)' }}>
                <div className="w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center" style={{ backgroundColor: EMOTION_COLORS[emotionResult.summary.dominantEmotion] || '#6b7280' }}>
                  <Smile className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-serif font-semibold mb-2" style={{ color: 'var(--color-text)' }}>
                  {lang === 'cs' ? 'Tvá dominantní emoce' : 'Your Dominant Emotion'}
                </h3>
                <p className="text-3xl font-bold mb-4" style={{ color: EMOTION_COLORS[emotionResult.summary.dominantEmotion] || '#6b7280' }}>
                  {EMOTION_LABELS[emotionResult.summary.dominantEmotion]?.[lang] || emotionResult.summary.dominantEmotion}
                </p>
                <div className="flex justify-center gap-8 text-center">
                  <div>
                    <p className="text-2xl font-bold" style={{ color: 'var(--color-text)' }}>
                      {emotionResult.summary.emotionalStability}%
                    </p>
                    <p className="text-sm" style={{ color: 'var(--color-text-muted)' }}>
                      {lang === 'cs' ? 'Emoční stabilita' : 'Emotional Stability'}
                    </p>
                  </div>
                  <div>
                    <p className="text-2xl font-bold" style={{ color: 'var(--color-text)' }}>
                      {emotionResult.summary.totalReadings}
                    </p>
                    <p className="text-sm" style={{ color: 'var(--color-text-muted)' }}>
                      {lang === 'cs' ? 'Nahrávek' : 'Readings'}
                    </p>
                  </div>
                  <div>
                    <p className="text-2xl font-bold" style={{ color: 'var(--color-text)' }}>
                      {Math.round(emotionResult.summary.durationMs / 1000)}s
                    </p>
                    <p className="text-sm" style={{ color: 'var(--color-text-muted)' }}>
                      {lang === 'cs' ? 'Trvání' : 'Duration'}
                    </p>
                  </div>
                </div>
              </div>

              {/* Average Emotions */}
              <div className="p-6 rounded-xl" style={{ backgroundColor: 'var(--color-bg-card)', border: '1px solid var(--color-border)' }}>
                <h3 className="font-semibold mb-4" style={{ color: 'var(--color-text)' }}>
                  {lang === 'cs' ? 'Průměrné hodnoty emocí' : 'Average Emotion Values'}
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  {Object.entries(emotionResult.summary.averageEmotions).map(([emotion, value]) => (
                    <div key={emotion} className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span style={{ color: 'var(--color-text-muted)' }}>
                          {EMOTION_LABELS[emotion]?.[lang] || emotion}
                        </span>
                        <span style={{ color: EMOTION_COLORS[emotion] }}>{value}%</span>
                      </div>
                      <div className="h-3 rounded-full overflow-hidden" style={{ backgroundColor: 'var(--color-border)' }}>
                        <div
                          className="h-full rounded-full"
                          style={{
                            width: `${value}%`,
                            backgroundColor: EMOTION_COLORS[emotion]
                          }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Emotional Journey */}
              <div className="p-6 rounded-xl" style={{ backgroundColor: 'var(--color-bg-card)', border: '1px solid var(--color-border)' }}>
                <h3 className="font-semibold mb-2" style={{ color: 'var(--color-text)' }}>
                  {lang === 'cs' ? 'Emoční cesta' : 'Emotional Journey'}
                </h3>
                <p style={{ color: 'var(--color-text-secondary)' }}>
                  {emotionResult.summary.emotionalJourney}
                </p>
              </div>

              {/* Timeline Chart */}
              {emotionResult.timeline.length > 5 && (
                <div className="p-6 rounded-xl" style={{ backgroundColor: 'var(--color-bg-card)', border: '1px solid var(--color-border)' }}>
                  <h3 className="font-semibold mb-4" style={{ color: 'var(--color-text)' }}>
                    {lang === 'cs' ? 'Časová osa emocí' : 'Emotion Timeline'}
                  </h3>
                  <div className="flex items-end gap-1 h-32">
                    {emotionResult.timeline.map((data, i) => {
                      const maxEmotion = Object.entries(data.emotions)
                        .filter(([k]) => k !== 'disgusted')
                        .reduce((max, [k, v]) => v > max[1] ? [k, v] : max, ['neutral', 0]);
                      return (
                        <div
                          key={i}
                          className="flex-1 min-w-1 rounded-t"
                          style={{
                            height: `${Math.max(10, maxEmotion[1])}%`,
                            backgroundColor: EMOTION_COLORS[maxEmotion[0]] || '#6b7280'
                          }}
                          title={`${EMOTION_LABELS[maxEmotion[0]]?.[lang] || maxEmotion[0]}: ${maxEmotion[1]}%`}
                        />
                      );
                    })}
                  </div>
                  <div className="flex justify-between mt-2 text-xs" style={{ color: 'var(--color-text-muted)' }}>
                    <span>{lang === 'cs' ? 'Začátek' : 'Start'}</span>
                    <span>{lang === 'cs' ? 'Konec' : 'End'}</span>
                  </div>
                </div>
              )}

              {/* Peak Emotions */}
              {emotionResult.summary.peakEmotions.length > 0 && (
                <div className="p-6 rounded-xl" style={{ backgroundColor: 'var(--color-bg-card)', border: '1px solid var(--color-border)' }}>
                  <h3 className="font-semibold mb-3" style={{ color: 'var(--color-text)' }}>
                    {lang === 'cs' ? 'Vrcholy emocí' : 'Emotion Peaks'}
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {emotionResult.summary.peakEmotions.map((peak, i) => (
                      <span
                        key={i}
                        className="px-4 py-2 rounded-full text-white font-medium"
                        style={{ backgroundColor: EMOTION_COLORS[peak.emotion] || '#6b7280' }}
                      >
                        {EMOTION_LABELS[peak.emotion]?.[lang] || peak.emotion}: {peak.value}%
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Action buttons */}
              <div className="flex gap-4">
                <button
                  onClick={() => {
                    setEmotionPhase('intro');
                    setEmotionTimeline([]);
                    setCurrentEmotion(null);
                    setEmotionResult(null);
                    emotionService.reset();
                  }}
                  className="flex-1 py-3 font-medium rounded-lg transition-all"
                  style={{ backgroundColor: 'var(--color-bg-card)', border: '1px solid var(--color-border)', color: 'var(--color-text)' }}
                >
                  {lang === 'cs' ? 'Zkusit znovu' : 'Try Again'}
                </button>
                <button
                  onClick={() => setView('results')}
                  className="flex-1 py-3 text-white font-semibold rounded-lg transition-all"
                  style={{ background: 'linear-gradient(135deg, #ec4899 0%, #f43f5e 100%)' }}
                >
                  {lang === 'cs' ? 'Zobrazit všechny výsledky' : 'View All Results'}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );

  // Results
  const renderResults = () => (
    <div className="flex-1 overflow-y-auto px-4 py-8 pb-20" style={{ backgroundColor: 'var(--color-bg)' }}>
      <div className="max-w-5xl mx-auto space-y-8">
        <div className="text-center">
          <h1 className="text-h1 font-serif mb-2" style={{ color: 'var(--color-text)' }}>
            {studentName ? `${studentName}, ${lang === 'cs' ? 'tvůj profil' : 'your profile'}` : (lang === 'cs' ? 'Tvůj profil' : 'Your Profile')}
          </h1>
          <p style={{ color: 'var(--color-text-secondary)' }}>{lang === 'cs' ? 'Kompletní přehled všech výsledků' : 'Complete overview of all results'}</p>
        </div>

        {/* Tabs */}
        <div className="flex justify-center gap-2 flex-wrap">
          <button
            onClick={() => setResultsTab('overview')}
            className={`px-6 py-3 font-medium transition-all ${resultsTab === 'overview' ? 'text-white' : ''}`}
            style={{
              backgroundColor: resultsTab === 'overview' ? 'var(--color-primary)' : 'var(--color-bg-card)',
              border: resultsTab === 'overview' ? 'none' : '1px solid var(--color-border)',
              borderRadius: 'var(--radius-md)',
              color: resultsTab === 'overview' ? '#fff' : 'var(--color-text-secondary)'
            }}
          >
            {lang === 'cs' ? 'Přehled výsledků' : 'Results Overview'}
          </button>
          <button
            onClick={() => {
              setResultsTab('synthesis');
              handleGenerateSynthesis();
            }}
            className={`px-6 py-3 font-medium transition-all ${resultsTab === 'synthesis' ? 'text-white' : ''}`}
            style={{
              backgroundColor: resultsTab === 'synthesis' ? 'var(--color-primary)' : 'var(--color-bg-card)',
              border: resultsTab === 'synthesis' ? 'none' : '1px solid var(--color-border)',
              borderRadius: 'var(--radius-md)',
              color: resultsTab === 'synthesis' ? '#fff' : 'var(--color-text-secondary)'
            }}
          >
            {lang === 'cs' ? 'AI Syntéza & Tipy' : 'AI Synthesis & Tips'}
          </button>
          <button
            onClick={() => {
              setResultsTab('coaching');
              handleGenerateCoaching();
            }}
            className={`px-6 py-3 font-medium transition-all flex items-center gap-2 ${resultsTab === 'coaching' ? 'text-white' : ''}`}
            style={{
              backgroundColor: resultsTab === 'coaching' ? '#10b981' : 'var(--color-bg-card)',
              border: resultsTab === 'coaching' ? 'none' : '1px solid var(--color-border)',
              borderRadius: 'var(--radius-md)',
              color: resultsTab === 'coaching' ? '#fff' : 'var(--color-text-secondary)'
            }}
          >
            <Sparkles className="w-4 h-4" />
            {lang === 'cs' ? 'AI Kouč & Plán' : 'AI Coach & Plan'}
          </button>
        </div>

        {resultsTab === 'synthesis' ? (
          /* Synthesis Tab */
          <div className="space-y-8">
            {isSynthesisLoading ? (
              <div className="card p-12 text-center">
                <div className="flex justify-center mb-4">
                  <div className="w-12 h-12 border-4 border-t-transparent rounded-full animate-spin" style={{ borderColor: 'var(--color-primary)', borderTopColor: 'transparent' }}></div>
                </div>
                <p className="text-lg font-medium" style={{ color: 'var(--color-text)' }}>{lang === 'cs' ? 'Generuji AI syntézu...' : 'Generating AI synthesis...'}</p>
                <p className="text-sm mt-2" style={{ color: 'var(--color-text-secondary)' }}>{lang === 'cs' ? 'Analyzuji tvůj kompletní profil a připravuji personalizované tipy' : 'Analyzing your complete profile and preparing personalized tips'}</p>
              </div>
            ) : synthesis ? (
              <>
                {/* AI Synthesis */}
                <div className="card p-8">
                  <h3 className="text-xs font-semibold uppercase tracking-wider mb-4 flex items-center gap-2" style={{ color: 'var(--color-primary)' }}>
                    <Sparkles className="w-4 h-4" /> {lang === 'cs' ? 'Komplexní syntéza tvého profilu' : 'Comprehensive Profile Synthesis'}
                  </h3>
                  <div className="prose max-w-none" style={{ color: 'var(--color-text)' }}>
                    <ReactMarkdown>{synthesis.synthesis}</ReactMarkdown>
                  </div>
                </div>

                {/* Study Tips */}
                <div className="card p-8">
                  <h3 className="text-xs font-semibold uppercase tracking-wider mb-6 flex items-center gap-2" style={{ color: 'var(--color-primary)' }}>
                    <Medal className="w-4 h-4" /> {lang === 'cs' ? 'Jak využít své silné stránky pro úspěch' : 'How to Leverage Your Strengths for Success'}
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {synthesis.studyTips.map((tip, i) => (
                      <div key={i} className="flex gap-4 p-4" style={{ backgroundColor: 'var(--color-bg)', borderRadius: 'var(--radius-md)' }}>
                        <div className="flex-shrink-0 w-8 h-8 flex items-center justify-center font-bold text-sm" style={{ backgroundColor: 'var(--color-primary)', color: '#fff', borderRadius: 'var(--radius-full)' }}>
                          {i + 1}
                        </div>
                        <p className="text-sm" style={{ color: 'var(--color-text-secondary)', lineHeight: '1.6' }}>{tip}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* YouTube Videos */}
                {synthesis.youtubeVideos && synthesis.youtubeVideos.length > 0 && (
                  <div className="card p-8">
                    <h3 className="text-xs font-semibold uppercase tracking-wider mb-6 flex items-center gap-2" style={{ color: 'var(--color-primary)' }}>
                      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                      </svg>
                      {lang === 'cs' ? 'Doporučená videa pro tebe' : 'Recommended Videos for You'}
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                      {synthesis.youtubeVideos.map((video, i) => (
                        <a
                          key={i}
                          href={`https://www.youtube.com/watch?v=${video.videoId}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="group block overflow-hidden transition-all hover:-translate-y-1 hover:shadow-lg"
                          style={{ borderRadius: 'var(--radius-lg)', border: '1px solid var(--color-border)', backgroundColor: 'var(--color-bg-card)' }}
                        >
                          {/* Thumbnail */}
                          <div className="relative aspect-video bg-slate-200 overflow-hidden">
                            <img
                              src={`https://img.youtube.com/vi/${video.videoId}/mqdefault.jpg`}
                              alt={video.title}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                            />
                            {/* Play button overlay */}
                            <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/30 transition-colors">
                              <div className="w-12 h-12 flex items-center justify-center bg-red-600 rounded-full shadow-lg">
                                <svg className="w-5 h-5 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                                  <path d="M8 5v14l11-7z"/>
                                </svg>
                              </div>
                            </div>
                          </div>
                          {/* Content */}
                          <div className="p-4">
                            <h4 className="font-medium text-sm mb-1 line-clamp-2 group-hover:text-[var(--color-primary)] transition-colors" style={{ color: 'var(--color-text)' }}>
                              {video.title}
                            </h4>
                            <p className="text-xs line-clamp-2" style={{ color: 'var(--color-text-muted)' }}>
                              {video.description}
                            </p>
                          </div>
                        </a>
                      ))}
                    </div>
                  </div>
                )}
              </>
            ) : (
              <div className="card p-12 text-center">
                <p style={{ color: 'var(--color-text-secondary)' }}>Klikni na tlačítko výše pro vygenerování AI syntézy</p>
              </div>
            )}
          </div>
        ) : resultsTab === 'coaching' ? (
          /* Coaching Tab */
          <div className="space-y-8">
            {isCoachingLoading ? (
              <div className="card p-12 text-center">
                <div className="flex justify-center mb-4">
                  <div className="w-12 h-12 border-4 border-t-transparent rounded-full animate-spin" style={{ borderColor: '#10b981', borderTopColor: 'transparent' }}></div>
                </div>
                <p className="text-lg font-medium" style={{ color: 'var(--color-text)' }}>{lang === 'cs' ? 'Připravuji tvůj koučovací plán...' : 'Preparing your coaching plan...'}</p>
                <p className="text-sm mt-2" style={{ color: 'var(--color-text-secondary)' }}>{lang === 'cs' ? 'Analyzuji všechny výsledky a vytvářím personalizované doporučení' : 'Analyzing all results and creating personalized recommendations'}</p>
              </div>
            ) : coaching ? (
              <>
                {/* Motivational Message */}
                <div className="card p-6" style={{ background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)' }}>
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                      <Sparkles className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-white font-semibold mb-2">{lang === 'cs' ? 'Osobní zpráva pro tebe' : 'Personal Message for You'}</h3>
                      <p className="text-white/90">{coaching.motivationalMessage}</p>
                    </div>
                  </div>
                </div>

                {/* Summary */}
                <div className="card p-8">
                  <h3 className="text-xs font-semibold uppercase tracking-wider mb-4 flex items-center gap-2" style={{ color: '#10b981' }}>
                    <Brain className="w-4 h-4" /> {lang === 'cs' ? 'Celkové shrnutí' : 'Overall Summary'}
                  </h3>
                  <div className="prose max-w-none" style={{ color: 'var(--color-text)' }}>
                    <ReactMarkdown>{coaching.summary}</ReactMarkdown>
                  </div>
                </div>

                {/* Key Insights */}
                <div className="card p-8">
                  <h3 className="text-xs font-semibold uppercase tracking-wider mb-4 flex items-center gap-2" style={{ color: '#10b981' }}>
                    <Sparkles className="w-4 h-4" /> {lang === 'cs' ? 'Klíčové poznatky' : 'Key Insights'}
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {coaching.keyInsights.map((insight, i) => (
                      <div key={i} className="flex gap-3 p-4" style={{ backgroundColor: 'var(--color-bg)', borderRadius: 'var(--radius-md)' }}>
                        <div className="flex-shrink-0 w-8 h-8 flex items-center justify-center font-bold text-sm" style={{ backgroundColor: '#10b981', color: '#fff', borderRadius: 'var(--radius-full)' }}>
                          {i + 1}
                        </div>
                        <p className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>{insight}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Weekly Plan */}
                <div className="card p-8">
                  <h3 className="text-xs font-semibold uppercase tracking-wider mb-4 flex items-center gap-2" style={{ color: '#10b981' }}>
                    <CalendarDays className="w-4 h-4" /> {lang === 'cs' ? 'Týdenní plán' : 'Weekly Plan'}
                  </h3>
                  <div className="space-y-4">
                    {coaching.weeklyPlan.map((day, i) => (
                      <div key={i} className="p-4" style={{ backgroundColor: 'var(--color-bg)', borderRadius: 'var(--radius-md)', borderLeft: '4px solid #10b981' }}>
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-semibold" style={{ color: 'var(--color-text)' }}>{day.day}</span>
                          <span className="text-xs px-2 py-1 rounded-full" style={{ backgroundColor: '#d1fae5', color: '#059669' }}>{day.focus}</span>
                        </div>
                        <ul className="space-y-1">
                          {day.activities.map((activity, j) => (
                            <li key={j} className="text-sm flex items-start gap-2" style={{ color: 'var(--color-text-secondary)' }}>
                              <Check className="w-4 h-4 mt-0.5 text-emerald-500 flex-shrink-0" />
                              {activity}
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Habit Tracker */}
                <div className="card p-8">
                  <h3 className="text-xs font-semibold uppercase tracking-wider mb-4 flex items-center gap-2" style={{ color: '#10b981' }}>
                    <Medal className="w-4 h-4" /> {lang === 'cs' ? 'Návyky k sledování' : 'Habits to Track'}
                  </h3>
                  <p className="text-sm mb-4" style={{ color: 'var(--color-text-secondary)' }}>
                    {lang === 'cs' ? 'Sleduj tyto návyky každý den. Vytiskni si nebo si je napiš - jsou klíčem k úspěchu!' : 'Track these habits every day. Print them out or write them down - they are the key to success!'}
                  </p>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr style={{ borderBottom: '2px solid var(--color-border)' }}>
                          <th className="text-left py-3 px-4" style={{ color: 'var(--color-text)' }}>{lang === 'cs' ? 'Návyk' : 'Habit'}</th>
                          <th className="text-left py-3 px-4" style={{ color: 'var(--color-text)' }}>{lang === 'cs' ? 'Proč?' : 'Why?'}</th>
                          <th className="text-left py-3 px-4" style={{ color: 'var(--color-text)' }}>{lang === 'cs' ? 'Jak měřit' : 'How to Measure'}</th>
                        </tr>
                      </thead>
                      <tbody>
                        {coaching.habitTracker.map((habit, i) => (
                          <tr key={i} style={{ borderBottom: '1px solid var(--color-border)' }}>
                            <td className="py-3 px-4 font-medium" style={{ color: 'var(--color-text)' }}>
                              <div className="flex items-center gap-2">
                                <div className="w-5 h-5 border-2 rounded" style={{ borderColor: '#10b981' }} />
                                {habit.habit}
                              </div>
                            </td>
                            <td className="py-3 px-4" style={{ color: 'var(--color-text-secondary)' }}>{habit.why}</td>
                            <td className="py-3 px-4" style={{ color: 'var(--color-text-muted)' }}>{habit.howToTrack}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Print/Export hint */}
                <div className="text-center p-4" style={{ backgroundColor: 'var(--color-bg)', borderRadius: 'var(--radius-md)' }}>
                  <p className="text-sm" style={{ color: 'var(--color-text-muted)' }}>
                    💡 Tip: Vytiskni si tento plán (Ctrl+P) nebo si ho vyfotit a dej na viditelné místo!
                  </p>
                </div>
              </>
            ) : (
              <div className="card p-12 text-center">
                <Brain className="w-16 h-16 mx-auto mb-4" style={{ color: 'var(--color-text-muted)', opacity: 0.3 }} />
                <p className="text-lg font-medium mb-2" style={{ color: 'var(--color-text)' }}>Připrav si svůj koučovací plán</p>
                <p style={{ color: 'var(--color-text-secondary)' }}>Klikni na tlačítko výše pro vygenerování personalizovaného plánu</p>
              </div>
            )}
          </div>
        ) : (
          /* Overview Tab */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Typology */}
          {typologyResult && (
            <div className="card p-6 md:col-span-2">
              <h3 className="text-xs font-semibold uppercase tracking-wider mb-4 flex items-center gap-2" style={{ color: 'var(--color-primary)' }}>
                <IconComponent name="brain" className="w-4 h-4" /> {lang === 'cs' ? 'Jak přemýšlíš' : 'How You Think'}
              </h3>
              <div className="space-y-4 mb-4">
                {typologyResult.dimensions.map((d, i) => (
                  <DimensionBar key={d.dimension} leftLabel={d.leftLabel} rightLabel={d.rightLabel} leftScore={d.leftScore} rightScore={d.rightScore} index={i} />
                ))}
              </div>
              <div className="p-4" style={{ backgroundColor: 'var(--color-bg)', borderRadius: 'var(--radius-md)' }}>
                <p className="font-medium text-sm mb-2" style={{ color: 'var(--color-text)' }}>{typologyResult.overallProfile}</p>
                <ul className="space-y-1">
                  {typologyResult.tips.slice(0, 2).map((tip, i) => (
                    <li key={i} className="text-xs" style={{ color: 'var(--color-text-secondary)' }}>• {tip}</li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          {/* VAK */}
          {vakResult && (
            <div className="card p-6">
              <h3 className="text-xs font-semibold uppercase tracking-wider mb-4 flex items-center gap-2" style={{ color: 'var(--color-primary)' }}>
                <IconComponent name="eye" className="w-4 h-4" /> {lang === 'cs' ? 'Jak se učíš (VAK)' : 'How You Learn (VAK)'}
              </h3>
              <div className="space-y-4 mb-4">
                <VakBar label={lang === 'cs' ? 'Vizuální' : 'Visual'} value={vakResult.visual} color="visual" index={0} />
                <VakBar label={lang === 'cs' ? 'Auditivní' : 'Auditory'} value={vakResult.auditory} color="auditory" index={1} />
                <VakBar label={lang === 'cs' ? 'Kinestetický' : 'Kinesthetic'} value={vakResult.kinesthetic} color="kinesthetic" index={2} />
              </div>
              <div className="p-4" style={{ backgroundColor: 'var(--color-bg)', borderRadius: 'var(--radius-md)' }}>
                <p className="font-semibold text-sm" style={{ color: 'var(--color-text)' }}>{vakResult.label[lang]}</p>
              </div>
            </div>
          )}

          {/* Chat */}
          {chatReport && (
            <div className="card p-6 md:col-span-2 lg:col-span-3">
              <h3 className="text-xs font-semibold uppercase tracking-wider mb-4 flex items-center gap-2" style={{ color: 'var(--color-primary)' }}>
                <IconComponent name="chat" className="w-4 h-4" /> {lang === 'cs' ? 'Z rozhovoru' : 'From Conversation'}
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  {chatReport.skills.map((skill, i) => (
                    <SkillBar key={i} skill={skill} index={i} />
                  ))}
                </div>
                <div className="prose-sm max-w-none" style={{ color: 'var(--color-text-secondary)' }}>
                  <ReactMarkdown>{chatReport.studentPassport}</ReactMarkdown>
                </div>
              </div>
            </div>
          )}

          {/* Habits */}
          {habitsResult && (
            <div className="card p-6">
              <h3 className="text-xs font-semibold uppercase tracking-wider mb-4 flex items-center gap-2" style={{ color: 'var(--color-primary)' }}>
                <IconComponent name="clock" className="w-4 h-4" /> Studijní návyky
              </h3>
              <div className="space-y-4 mb-4">
                <div className="space-y-2">
                  <div className="flex justify-between items-center text-sm font-semibold">
                    <span style={{ color: 'var(--color-text-secondary)' }}>Celkové skóre</span>
                    <span style={{ color: 'var(--color-primary)' }}>{habitsResult.percent}%</span>
                  </div>
                  <div className="h-3 w-full overflow-hidden" style={{ backgroundColor: 'var(--color-border)', borderRadius: 'var(--radius-full)' }}>
                    <div className="h-full transition-all duration-1000 ease-out" style={{ width: `${habitsResult.percent}%`, backgroundColor: 'var(--color-primary)', borderRadius: 'var(--radius-full)' }} />
                  </div>
                </div>
              </div>
              <div className="p-4" style={{ backgroundColor: 'var(--color-bg)', borderRadius: 'var(--radius-md)' }}>
                <p className="font-semibold text-sm mb-2" style={{ color: 'var(--color-text)' }}>{habitsResult.label}</p>
                <ul className="space-y-1">
                  {habitsResult.tips.map((tip, i) => (
                    <li key={i} className="text-xs" style={{ color: 'var(--color-text-secondary)' }}>• {tip}</li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          {/* Motivation */}
          {motivationResult && (
            <div className="card p-6">
              <h3 className="text-xs font-semibold uppercase tracking-wider mb-4 flex items-center gap-2" style={{ color: 'var(--color-primary)' }}>
                <IconComponent name="fire" className="w-4 h-4" /> Motivace
              </h3>
              <div className="space-y-4 mb-4">
                <div className="space-y-2">
                  <div className="flex justify-between items-center text-sm font-semibold">
                    <span style={{ color: 'var(--color-text-secondary)' }}>Úroveň motivace</span>
                    <span style={{ color: 'var(--color-primary)' }}>{motivationResult.percent}%</span>
                  </div>
                  <div className="h-3 w-full overflow-hidden" style={{ backgroundColor: 'var(--color-border)', borderRadius: 'var(--radius-full)' }}>
                    <div className="h-full transition-all duration-1000 ease-out" style={{ width: `${motivationResult.percent}%`, backgroundColor: 'var(--color-primary)', borderRadius: 'var(--radius-full)' }} />
                  </div>
                </div>
              </div>
              <div className="p-4" style={{ backgroundColor: 'var(--color-bg)', borderRadius: 'var(--radius-md)' }}>
                <p className="font-semibold text-sm mb-2" style={{ color: 'var(--color-text)' }}>{motivationResult.label}</p>
                <ul className="space-y-1">
                  {motivationResult.tips.map((tip, i) => (
                    <li key={i} className="text-xs" style={{ color: 'var(--color-text-secondary)' }}>• {tip}</li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          {/* Strengths */}
          {strengthsResult && (
            <div className="card p-6">
              <h3 className="text-xs font-semibold uppercase tracking-wider mb-4 flex items-center gap-2" style={{ color: 'var(--color-primary)' }}>
                <IconComponent name="star" className="w-4 h-4" /> Silné stránky
              </h3>
              <div className="space-y-3 mb-4">
                {strengthsResult.areas.map((area, i) => (
                  <div key={area.label} className="space-y-2">
                    <div className="flex justify-between items-center text-xs font-semibold">
                      <span style={{ color: 'var(--color-text-secondary)' }}>{area.label}</span>
                      <span style={{ color: 'var(--color-primary)' }}>{area.score}%</span>
                    </div>
                    <div className="h-2 w-full overflow-hidden" style={{ backgroundColor: 'var(--color-border)', borderRadius: 'var(--radius-full)' }}>
                      <div className="h-full transition-all duration-1000 ease-out" style={{ width: `${area.score}%`, backgroundColor: 'var(--color-primary)', borderRadius: 'var(--radius-full)' }} />
                    </div>
                  </div>
                ))}
              </div>
              <div className="p-4" style={{ backgroundColor: 'var(--color-bg)', borderRadius: 'var(--radius-md)' }}>
                <p className="font-semibold text-sm mb-2" style={{ color: 'var(--color-text)' }}>Nejsilnější: {strengthsResult.topStrength}</p>
                <ul className="space-y-1">
                  {strengthsResult.tips.map((tip, i) => (
                    <li key={i} className="text-xs" style={{ color: 'var(--color-text-secondary)' }}>• {tip}</li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          {/* Growth Mindset */}
          {gmResult && (
            <div className="card p-6">
              <h3 className="text-xs font-semibold uppercase tracking-wider mb-4 flex items-center gap-2" style={{ color: 'var(--color-primary)' }}>
                <IconComponent name="brain" className="w-4 h-4" /> Growth Mindset
              </h3>
              <div className="space-y-4 mb-4">
                <div className="space-y-2">
                  <div className="flex justify-between items-center text-sm font-semibold">
                    <span style={{ color: 'var(--color-text-secondary)' }}>{lang === 'cs' ? 'Růstové myšlení' : 'Growth Mindset Score'}</span>
                    <span style={{ color: 'var(--color-primary)' }}>{gmResult.percent}%</span>
                  </div>
                  <div className="h-3 w-full overflow-hidden" style={{ backgroundColor: 'var(--color-border)', borderRadius: 'var(--radius-full)' }}>
                    <div className="h-full transition-all duration-1000 ease-out" style={{ width: `${gmResult.percent}%`, backgroundColor: '#10b981', borderRadius: 'var(--radius-full)' }} />
                  </div>
                </div>
              </div>
              <div className="p-4" style={{ backgroundColor: 'var(--color-bg)', borderRadius: 'var(--radius-md)' }}>
                <p className="font-semibold text-sm mb-2" style={{ color: 'var(--color-text)' }}>{getResultLabel(gmResult, lang)}</p>
                <ul className="space-y-1">
                  {getResultTips(gmResult, lang).slice(0, 2).map((tip, i) => (
                    <li key={i} className="text-xs" style={{ color: 'var(--color-text-secondary)' }}>• {tip}</li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          {/* Grit */}
          {gritResult && (
            <div className="card p-6">
              <h3 className="text-xs font-semibold uppercase tracking-wider mb-4 flex items-center gap-2" style={{ color: 'var(--color-primary)' }}>
                <IconComponent name="fire" className="w-4 h-4" /> {lang === 'cs' ? 'Vytrvalost (Grit)' : 'Perseverance (Grit)'}
              </h3>
              <div className="space-y-4 mb-4">
                <div className="space-y-2">
                  <div className="flex justify-between items-center text-sm font-semibold">
                    <span style={{ color: 'var(--color-text-secondary)' }}>{lang === 'cs' ? 'Grit skóre' : 'Grit Score'}</span>
                    <span style={{ color: 'var(--color-primary)' }}>{gritResult.percent}%</span>
                  </div>
                  <div className="h-3 w-full overflow-hidden" style={{ backgroundColor: 'var(--color-border)', borderRadius: 'var(--radius-full)' }}>
                    <div className="h-full transition-all duration-1000 ease-out" style={{ width: `${gritResult.percent}%`, backgroundColor: '#f97316', borderRadius: 'var(--radius-full)' }} />
                  </div>
                </div>
              </div>
              <div className="p-4" style={{ backgroundColor: 'var(--color-bg)', borderRadius: 'var(--radius-md)' }}>
                <p className="font-semibold text-sm mb-2" style={{ color: 'var(--color-text)' }}>{getResultLabel(gritResult, lang)}</p>
                <ul className="space-y-1">
                  {getResultTips(gritResult, lang).slice(0, 2).map((tip, i) => (
                    <li key={i} className="text-xs" style={{ color: 'var(--color-text-secondary)' }}>• {tip}</li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          {/* Self-Efficacy */}
          {seResult && (
            <div className="card p-6">
              <h3 className="text-xs font-semibold uppercase tracking-wider mb-4 flex items-center gap-2" style={{ color: 'var(--color-primary)' }}>
                <IconComponent name="star" className="w-4 h-4" /> Self-Efficacy
              </h3>
              <div className="space-y-4 mb-4">
                <div className="space-y-2">
                  <div className="flex justify-between items-center text-sm font-semibold">
                    <span style={{ color: 'var(--color-text-secondary)' }}>{lang === 'cs' ? 'Víra ve schopnosti' : 'Self-Belief'}</span>
                    <span style={{ color: 'var(--color-primary)' }}>{seResult.percent}%</span>
                  </div>
                  <div className="h-3 w-full overflow-hidden" style={{ backgroundColor: 'var(--color-border)', borderRadius: 'var(--radius-full)' }}>
                    <div className="h-full transition-all duration-1000 ease-out" style={{ width: `${seResult.percent}%`, backgroundColor: '#eab308', borderRadius: 'var(--radius-full)' }} />
                  </div>
                </div>
              </div>
              <div className="p-4" style={{ backgroundColor: 'var(--color-bg)', borderRadius: 'var(--radius-md)' }}>
                <p className="font-semibold text-sm mb-2" style={{ color: 'var(--color-text)' }}>{getResultLabel(seResult, lang)}</p>
                <ul className="space-y-1">
                  {getResultTips(seResult, lang).slice(0, 2).map((tip, i) => (
                    <li key={i} className="text-xs" style={{ color: 'var(--color-text-secondary)' }}>• {tip}</li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          {/* Test Anxiety */}
          {taResult && (
            <div className="card p-6">
              <h3 className="text-xs font-semibold uppercase tracking-wider mb-4 flex items-center gap-2" style={{ color: 'var(--color-primary)' }}>
                <IconComponent name="clock" className="w-4 h-4" /> {lang === 'cs' ? 'Testová úzkost' : 'Test Anxiety'}
              </h3>
              <div className="space-y-4 mb-4">
                <div className="space-y-2">
                  <div className="flex justify-between items-center text-sm font-semibold">
                    <span style={{ color: 'var(--color-text-secondary)' }}>{lang === 'cs' ? 'Úroveň úzkosti' : 'Anxiety Level'}</span>
                    <span style={{ color: 'var(--color-primary)' }}>{taResult.percent}%</span>
                  </div>
                  <div className="h-3 w-full overflow-hidden" style={{ backgroundColor: 'var(--color-border)', borderRadius: 'var(--radius-full)' }}>
                    <div className="h-full transition-all duration-1000 ease-out" style={{ width: `${taResult.percent}%`, backgroundColor: '#ef4444', borderRadius: 'var(--radius-full)' }} />
                  </div>
                </div>
              </div>
              <div className="p-4" style={{ backgroundColor: 'var(--color-bg)', borderRadius: 'var(--radius-md)' }}>
                <p className="font-semibold text-sm mb-2" style={{ color: 'var(--color-text)' }}>{getResultLabel(taResult, lang)}</p>
                <ul className="space-y-1">
                  {getResultTips(taResult, lang).slice(0, 2).map((tip, i) => (
                    <li key={i} className="text-xs" style={{ color: 'var(--color-text-secondary)' }}>• {tip}</li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          {/* Metacognition */}
          {mcResult && (
            <div className="card p-6">
              <h3 className="text-xs font-semibold uppercase tracking-wider mb-4 flex items-center gap-2" style={{ color: 'var(--color-primary)' }}>
                <IconComponent name="brain" className="w-4 h-4" /> {lang === 'cs' ? 'Metakognice' : 'Metacognition'}
              </h3>
              <div className="space-y-4 mb-4">
                <div className="space-y-2">
                  <div className="flex justify-between items-center text-sm font-semibold">
                    <span style={{ color: 'var(--color-text-secondary)' }}>{lang === 'cs' ? 'Metakognitivní dovednosti' : 'Metacognitive Skills'}</span>
                    <span style={{ color: 'var(--color-primary)' }}>{mcResult.percent}%</span>
                  </div>
                  <div className="h-3 w-full overflow-hidden" style={{ backgroundColor: 'var(--color-border)', borderRadius: 'var(--radius-full)' }}>
                    <div className="h-full transition-all duration-1000 ease-out" style={{ width: `${mcResult.percent}%`, backgroundColor: '#8b5cf6', borderRadius: 'var(--radius-full)' }} />
                  </div>
                </div>
              </div>
              <div className="p-4" style={{ backgroundColor: 'var(--color-bg)', borderRadius: 'var(--radius-md)' }}>
                <p className="font-semibold text-sm mb-2" style={{ color: 'var(--color-text)' }}>{getResultLabel(mcResult, lang)}</p>
                <ul className="space-y-1">
                  {getResultTips(mcResult, lang).slice(0, 2).map((tip, i) => (
                    <li key={i} className="text-xs" style={{ color: 'var(--color-text-secondary)' }}>• {tip}</li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          {/* RIASEC */}
          {riasecResult && (
            <div className="card p-6 md:col-span-2">
              <h3 className="text-xs font-semibold uppercase tracking-wider mb-4 flex items-center gap-2" style={{ color: 'var(--color-primary)' }}>
                <IconComponent name="star" className="w-4 h-4" /> {lang === 'cs' ? 'Kariérní zájmy (RIASEC)' : 'Career Interests (RIASEC)'}
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-4">
                {riasecResult.scores.map((s) => (
                  <div key={s.type} className="p-3" style={{ backgroundColor: 'var(--color-bg)', borderRadius: 'var(--radius-md)' }}>
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-semibold text-sm" style={{ color: 'var(--color-text)' }}>{s.type}</span>
                      <span className="text-xs font-medium" style={{ color: 'var(--color-primary)' }}>{s.score}%</span>
                    </div>
                    <div className="h-2 w-full overflow-hidden" style={{ backgroundColor: 'var(--color-border)', borderRadius: 'var(--radius-full)' }}>
                      <div className="h-full" style={{ width: `${s.score}%`, backgroundColor: 'var(--color-primary)', borderRadius: 'var(--radius-full)' }} />
                    </div>
                    <p className="text-xs mt-1" style={{ color: 'var(--color-text-muted)' }}>{s.label}</p>
                  </div>
                ))}
              </div>
              <div className="p-4" style={{ backgroundColor: 'var(--color-bg)', borderRadius: 'var(--radius-md)' }}>
                <p className="font-semibold text-sm mb-2" style={{ color: 'var(--color-text)' }}>
                  {lang === 'cs' ? 'Tvůj kód' : 'Your code'}: {riasecResult.code} - {riasecResult.scores[0]?.label}
                </p>
                <p className="text-xs mb-2" style={{ color: 'var(--color-text-secondary)' }}>{riasecResult.description}</p>
                <p className="text-xs font-medium mb-1" style={{ color: 'var(--color-text-muted)' }}>{lang === 'cs' ? 'Doporučené kariéry' : 'Recommended careers'}:</p>
                <ul className="space-y-1">
                  {riasecResult.scores[0]?.careers.slice(0, 3).map((career, i) => (
                    <li key={i} className="text-xs" style={{ color: 'var(--color-text-secondary)' }}>• {career}</li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          {/* EQ */}
          {eqResult && (
            <div className="card p-6">
              <h3 className="text-xs font-semibold uppercase tracking-wider mb-4 flex items-center gap-2" style={{ color: 'var(--color-primary)' }}>
                <IconComponent name="chat" className="w-4 h-4" /> {lang === 'cs' ? 'Emoční inteligence' : 'Emotional Intelligence'}
              </h3>
              <div className="space-y-4 mb-4">
                <div className="space-y-2">
                  <div className="flex justify-between items-center text-sm font-semibold">
                    <span style={{ color: 'var(--color-text-secondary)' }}>{lang === 'cs' ? 'EQ skóre' : 'EQ Score'}</span>
                    <span style={{ color: 'var(--color-primary)' }}>{eqResult.percent}%</span>
                  </div>
                  <div className="h-3 w-full overflow-hidden" style={{ backgroundColor: 'var(--color-border)', borderRadius: 'var(--radius-full)' }}>
                    <div className="h-full transition-all duration-1000 ease-out" style={{ width: `${eqResult.percent}%`, backgroundColor: '#ec4899', borderRadius: 'var(--radius-full)' }} />
                  </div>
                </div>
              </div>
              <div className="p-4" style={{ backgroundColor: 'var(--color-bg)', borderRadius: 'var(--radius-md)' }}>
                <p className="font-semibold text-sm mb-2" style={{ color: 'var(--color-text)' }}>{getResultLabel(eqResult, lang)}</p>
                <ul className="space-y-1">
                  {getResultTips(eqResult, lang).slice(0, 2).map((tip, i) => (
                    <li key={i} className="text-xs" style={{ color: 'var(--color-text-secondary)' }}>• {tip}</li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          {/* Procrastination */}
          {prResult && (
            <div className="card p-6">
              <h3 className="text-xs font-semibold uppercase tracking-wider mb-4 flex items-center gap-2" style={{ color: 'var(--color-primary)' }}>
                <IconComponent name="clock" className="w-4 h-4" /> {lang === 'cs' ? 'Akademická prokrastinace' : 'Academic Procrastination'}
              </h3>
              <div className="space-y-4 mb-4">
                <div className="space-y-2">
                  <div className="flex justify-between items-center text-sm font-semibold">
                    <span style={{ color: 'var(--color-text-secondary)' }}>{lang === 'cs' ? 'Prokrastinace' : 'Procrastination'}</span>
                    <span style={{ color: 'var(--color-primary)' }}>{prResult.percent}%</span>
                  </div>
                  <div className="h-3 w-full overflow-hidden" style={{ backgroundColor: 'var(--color-border)', borderRadius: 'var(--radius-full)' }}>
                    <div className="h-full transition-all duration-1000 ease-out" style={{ width: `${prResult.percent}%`, backgroundColor: '#f43f5e', borderRadius: 'var(--radius-full)' }} />
                  </div>
                </div>
              </div>
              <div className="p-4" style={{ backgroundColor: 'var(--color-bg)', borderRadius: 'var(--radius-md)' }}>
                <p className="font-semibold text-sm mb-2" style={{ color: 'var(--color-text)' }}>{getResultLabel(prResult, lang)}</p>
                <ul className="space-y-1">
                  {getResultTips(prResult, lang).slice(0, 2).map((tip, i) => (
                    <li key={i} className="text-xs" style={{ color: 'var(--color-text-secondary)' }}>• {tip}</li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          {/* Academic Motivation */}
          {amResult && (
            <div className="card p-6">
              <h3 className="text-xs font-semibold uppercase tracking-wider mb-4 flex items-center gap-2" style={{ color: 'var(--color-primary)' }}>
                <IconComponent name="fire" className="w-4 h-4" /> {lang === 'cs' ? 'Akademická motivace' : 'Academic Motivation'}
              </h3>
              <div className="space-y-4 mb-4">
                <div className="space-y-2">
                  <div className="flex justify-between items-center text-sm font-semibold">
                    <span style={{ color: 'var(--color-text-secondary)' }}>{lang === 'cs' ? 'Motivace' : 'Motivation'}</span>
                    <span style={{ color: 'var(--color-primary)' }}>{amResult.percent}%</span>
                  </div>
                  <div className="h-3 w-full overflow-hidden" style={{ backgroundColor: 'var(--color-border)', borderRadius: 'var(--radius-full)' }}>
                    <div className="h-full transition-all duration-1000 ease-out" style={{ width: `${amResult.percent}%`, backgroundColor: '#f59e0b', borderRadius: 'var(--radius-full)' }} />
                  </div>
                </div>
              </div>
              <div className="p-4" style={{ backgroundColor: 'var(--color-bg)', borderRadius: 'var(--radius-md)' }}>
                <p className="font-semibold text-sm mb-2" style={{ color: 'var(--color-text)' }}>{getResultLabel(amResult, lang)}</p>
                <ul className="space-y-1">
                  {getResultTips(amResult, lang).slice(0, 2).map((tip, i) => (
                    <li key={i} className="text-xs" style={{ color: 'var(--color-text-secondary)' }}>• {tip}</li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          {/* Time Management */}
          {tmResult && (
            <div className="card p-6">
              <h3 className="text-xs font-semibold uppercase tracking-wider mb-4 flex items-center gap-2" style={{ color: 'var(--color-primary)' }}>
                <IconComponent name="clock" className="w-4 h-4" /> Time Management
              </h3>
              <div className="space-y-4 mb-4">
                <div className="space-y-2">
                  <div className="flex justify-between items-center text-sm font-semibold">
                    <span style={{ color: 'var(--color-text-secondary)' }}>{lang === 'cs' ? 'Organizace času' : 'Time Organization'}</span>
                    <span style={{ color: 'var(--color-primary)' }}>{tmResult.percent}%</span>
                  </div>
                  <div className="h-3 w-full overflow-hidden" style={{ backgroundColor: 'var(--color-border)', borderRadius: 'var(--radius-full)' }}>
                    <div className="h-full transition-all duration-1000 ease-out" style={{ width: `${tmResult.percent}%`, backgroundColor: '#3b82f6', borderRadius: 'var(--radius-full)' }} />
                  </div>
                </div>
              </div>
              <div className="p-4" style={{ backgroundColor: 'var(--color-bg)', borderRadius: 'var(--radius-md)' }}>
                <p className="font-semibold text-sm mb-2" style={{ color: 'var(--color-text)' }}>{getResultLabel(tmResult, lang)}</p>
                <ul className="space-y-1">
                  {getResultTips(tmResult, lang).slice(0, 2).map((tip, i) => (
                    <li key={i} className="text-xs" style={{ color: 'var(--color-text-secondary)' }}>• {tip}</li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          {/* Big Five */}
          {bfResult && (
            <div className="card p-6">
              <h3 className="text-xs font-semibold uppercase tracking-wider mb-4 flex items-center gap-2" style={{ color: 'var(--color-primary)' }}>
                <IconComponent name="brain" className="w-4 h-4" /> Big Five (TIPI)
              </h3>
              <div className="space-y-3 mb-4">
                {bfResult.dimensions.map((dim, i) => (
                  <div key={i} className="space-y-1">
                    <div className="flex justify-between items-center text-xs font-semibold">
                      <span style={{ color: 'var(--color-text-secondary)' }}>{dim.name[lang]}</span>
                      <span style={{ color: 'var(--color-primary)' }}>{dim.percent}%</span>
                    </div>
                    <div className="h-2 w-full overflow-hidden" style={{ backgroundColor: 'var(--color-border)', borderRadius: 'var(--radius-full)' }}>
                      <div className="h-full transition-all duration-1000 ease-out" style={{ width: `${dim.percent}%`, backgroundColor: ['#8b5cf6', '#f59e0b', '#3b82f6', '#10b981', '#ec4899'][i], borderRadius: 'var(--radius-full)' }} />
                    </div>
                  </div>
                ))}
              </div>
              <div className="p-4" style={{ backgroundColor: 'var(--color-bg)', borderRadius: 'var(--radius-md)' }}>
                <p className="font-semibold text-sm mb-1" style={{ color: 'var(--color-text)' }}>{bfResult.summary[lang]}</p>
              </div>
            </div>
          )}

          {/* Locus of Control */}
          {lcResult && (
            <div className="card p-6">
              <h3 className="text-xs font-semibold uppercase tracking-wider mb-4 flex items-center gap-2" style={{ color: 'var(--color-primary)' }}>
                <IconComponent name="star" className="w-4 h-4" /> Locus of Control
              </h3>
              <div className="space-y-4 mb-4">
                <div className="space-y-2">
                  <div className="flex justify-between items-center text-sm font-semibold">
                    <span style={{ color: 'var(--color-text-secondary)' }}>{lang === 'cs' ? 'Interní kontrola' : 'Internal Control'}</span>
                    <span style={{ color: 'var(--color-primary)' }}>{lcResult.percent}%</span>
                  </div>
                  <div className="h-3 w-full overflow-hidden" style={{ backgroundColor: 'var(--color-border)', borderRadius: 'var(--radius-full)' }}>
                    <div className="h-full transition-all duration-1000 ease-out" style={{ width: `${lcResult.percent}%`, backgroundColor: '#14b8a6', borderRadius: 'var(--radius-full)' }} />
                  </div>
                </div>
              </div>
              <div className="p-4" style={{ backgroundColor: 'var(--color-bg)', borderRadius: 'var(--radius-md)' }}>
                <p className="font-semibold text-sm mb-2" style={{ color: 'var(--color-text)' }}>{getResultLabel(lcResult, lang)}</p>
                <ul className="space-y-1">
                  {getResultTips(lcResult, lang).slice(0, 2).map((tip, i) => (
                    <li key={i} className="text-xs" style={{ color: 'var(--color-text-secondary)' }}>• {tip}</li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          {/* Resilience */}
          {rsResult && (
            <div className="card p-6">
              <h3 className="text-xs font-semibold uppercase tracking-wider mb-4 flex items-center gap-2" style={{ color: 'var(--color-primary)' }}>
                <IconComponent name="heart" className="w-4 h-4" /> {lang === 'cs' ? 'Resilience (Odolnost)' : 'Resilience'}
              </h3>
              <div className="space-y-4 mb-4">
                <div className="space-y-2">
                  <div className="flex justify-between items-center text-sm font-semibold">
                    <span style={{ color: 'var(--color-text-secondary)' }}>{lang === 'cs' ? 'Odolnost' : 'Resilience'}</span>
                    <span style={{ color: 'var(--color-primary)' }}>{rsResult.percent}%</span>
                  </div>
                  <div className="h-3 w-full overflow-hidden" style={{ backgroundColor: 'var(--color-border)', borderRadius: 'var(--radius-full)' }}>
                    <div className="h-full transition-all duration-1000 ease-out" style={{ width: `${rsResult.percent}%`, backgroundColor: '#f472b6', borderRadius: 'var(--radius-full)' }} />
                  </div>
                </div>
              </div>
              <div className="p-4" style={{ backgroundColor: 'var(--color-bg)', borderRadius: 'var(--radius-md)' }}>
                <p className="font-semibold text-sm mb-2" style={{ color: 'var(--color-text)' }}>{getResultLabel(rsResult, lang)}</p>
                <ul className="space-y-1">
                  {getResultTips(rsResult, lang).slice(0, 2).map((tip, i) => (
                    <li key={i} className="text-xs" style={{ color: 'var(--color-text-secondary)' }}>• {tip}</li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          {/* Gardner's Multiple Intelligences */}
          {gdResult && (
            <div className="card p-6">
              <h3 className="text-xs font-semibold uppercase tracking-wider mb-4 flex items-center gap-2" style={{ color: 'var(--color-primary)' }}>
                <IconComponent name="brain" className="w-4 h-4" /> {lang === 'cs' ? 'Mnohočetné inteligence (Gardner)' : 'Multiple Intelligences (Gardner)'}
              </h3>
              <div className="space-y-2 mb-4">
                {gdResult.intelligences.map((intel, i) => (
                  <div key={i} className="space-y-1">
                    <div className="flex justify-between items-center text-xs font-semibold">
                      <span style={{ color: 'var(--color-text-secondary)' }}>{intel.name[lang]}</span>
                      <span style={{ color: 'var(--color-primary)' }}>{intel.percent}%</span>
                    </div>
                    <div className="h-2 w-full overflow-hidden" style={{ backgroundColor: 'var(--color-border)', borderRadius: 'var(--radius-full)' }}>
                      <div className="h-full transition-all duration-1000 ease-out" style={{ width: `${intel.percent}%`, backgroundColor: '#818cf8', borderRadius: 'var(--radius-full)' }} />
                    </div>
                  </div>
                ))}
              </div>
              <div className="p-4" style={{ backgroundColor: 'var(--color-bg)', borderRadius: 'var(--radius-md)' }}>
                <p className="font-semibold text-sm mb-2" style={{ color: 'var(--color-text)' }}>{gdResult.summary[lang]}</p>
              </div>
            </div>
          )}

          {/* Kolb Learning Style */}
          {klResult && (
            <div className="card p-6">
              <h3 className="text-xs font-semibold uppercase tracking-wider mb-4 flex items-center gap-2" style={{ color: 'var(--color-primary)' }}>
                <IconComponent name="eye" className="w-4 h-4" /> {lang === 'cs' ? 'Kolbův učební styl' : 'Kolb Learning Style'}
              </h3>
              <div className="space-y-2 mb-4">
                {[
                  { label: { cs: 'Konkrétní zkušenost (CE)', en: 'Concrete Experience (CE)' }, percent: klResult.dimensions.cePercent, color: '#f59e0b' },
                  { label: { cs: 'Reflektivní pozorování (RO)', en: 'Reflective Observation (RO)' }, percent: klResult.dimensions.roPercent, color: '#3b82f6' },
                  { label: { cs: 'Abstraktní konceptualizace (AC)', en: 'Abstract Conceptualization (AC)' }, percent: klResult.dimensions.acPercent, color: '#8b5cf6' },
                  { label: { cs: 'Aktivní experimentování (AE)', en: 'Active Experimentation (AE)' }, percent: klResult.dimensions.aePercent, color: '#10b981' }
                ].map((dim, i) => (
                  <div key={i} className="space-y-1">
                    <div className="flex justify-between items-center text-xs font-semibold">
                      <span style={{ color: 'var(--color-text-secondary)' }}>{dim.label[lang]}</span>
                      <span style={{ color: 'var(--color-primary)' }}>{dim.percent}%</span>
                    </div>
                    <div className="h-2 w-full overflow-hidden" style={{ backgroundColor: 'var(--color-border)', borderRadius: 'var(--radius-full)' }}>
                      <div className="h-full transition-all duration-1000 ease-out" style={{ width: `${dim.percent}%`, backgroundColor: dim.color, borderRadius: 'var(--radius-full)' }} />
                    </div>
                  </div>
                ))}
              </div>
              <div className="p-4" style={{ backgroundColor: 'var(--color-bg)', borderRadius: 'var(--radius-md)' }}>
                <p className="font-semibold text-sm mb-2" style={{ color: 'var(--color-text)' }}>
                  {lang === 'cs' ? 'Učební styl' : 'Learning Style'}: {klResult.style[lang]}
                </p>
                <p className="text-xs mb-2" style={{ color: 'var(--color-text-secondary)' }}>{klResult.description[lang]}</p>
                <ul className="space-y-1">
                  {klResult.tips[lang].slice(0, 2).map((tip, i) => (
                    <li key={i} className="text-xs" style={{ color: 'var(--color-text-secondary)' }}>• {tip}</li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          {/* Study Stress */}
          {ssResult && (
            <div className="card p-6">
              <h3 className="text-xs font-semibold uppercase tracking-wider mb-4 flex items-center gap-2" style={{ color: 'var(--color-primary)' }}>
                <IconComponent name="heart" className="w-4 h-4" /> {lang === 'cs' ? 'Studijní stres' : 'Study Stress'}
                <span className="ml-1 bg-yellow-400 px-1.5 py-0.5 rounded-full text-yellow-900 text-[10px] font-bold">★ HF</span>
              </h3>
              <div className="space-y-4 mb-4">
                <div className="space-y-2">
                  <div className="flex justify-between items-center text-sm font-semibold">
                    <span style={{ color: 'var(--color-text-secondary)' }}>{lang === 'cs' ? 'Zvládání stresu' : 'Stress Management'}</span>
                    <span style={{ color: 'var(--color-primary)' }}>{ssResult.percent}%</span>
                  </div>
                  <div className="h-3 w-full overflow-hidden" style={{ backgroundColor: 'var(--color-border)', borderRadius: 'var(--radius-full)' }}>
                    <div className="h-full transition-all duration-1000 ease-out" style={{ width: `${ssResult.percent}%`, backgroundColor: '#ef4444', borderRadius: 'var(--radius-full)' }} />
                  </div>
                </div>
              </div>
              <div className="p-4" style={{ backgroundColor: 'var(--color-bg)', borderRadius: 'var(--radius-md)' }}>
                <p className="font-semibold text-sm mb-2" style={{ color: 'var(--color-text)' }}>{getResultLabel(ssResult, lang)}</p>
                <ul className="space-y-1">
                  {getResultTips(ssResult, lang).slice(0, 2).map((tip, i) => (
                    <li key={i} className="text-xs" style={{ color: 'var(--color-text-secondary)' }}>• {tip}</li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          {/* Study Strategies */}
          {stResult && (
            <div className="card p-6">
              <h3 className="text-xs font-semibold uppercase tracking-wider mb-4 flex items-center gap-2" style={{ color: 'var(--color-primary)' }}>
                <IconComponent name="brain" className="w-4 h-4" /> {lang === 'cs' ? 'Studijní strategie' : 'Study Strategies'}
                <span className="ml-1 bg-yellow-400 px-1.5 py-0.5 rounded-full text-yellow-900 text-[10px] font-bold">★ HF</span>
              </h3>
              <div className="space-y-4 mb-4">
                <div className="space-y-2">
                  <div className="flex justify-between items-center text-sm font-semibold">
                    <span style={{ color: 'var(--color-text-secondary)' }}>{lang === 'cs' ? 'Efektivita strategií' : 'Strategy Effectiveness'}</span>
                    <span style={{ color: 'var(--color-primary)' }}>{stResult.percent}%</span>
                  </div>
                  <div className="h-3 w-full overflow-hidden" style={{ backgroundColor: 'var(--color-border)', borderRadius: 'var(--radius-full)' }}>
                    <div className="h-full transition-all duration-1000 ease-out" style={{ width: `${stResult.percent}%`, backgroundColor: '#10b981', borderRadius: 'var(--radius-full)' }} />
                  </div>
                </div>
              </div>
              <div className="p-4" style={{ backgroundColor: 'var(--color-bg)', borderRadius: 'var(--radius-md)' }}>
                <p className="font-semibold text-sm mb-2" style={{ color: 'var(--color-text)' }}>{getResultLabel(stResult, lang)}</p>
                <ul className="space-y-1">
                  {getResultTips(stResult, lang).slice(0, 2).map((tip, i) => (
                    <li key={i} className="text-xs" style={{ color: 'var(--color-text-secondary)' }}>• {tip}</li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          {/* Cross-Assessment Synthesis */}
          {(() => {
            const scores: AssessmentScores = {
              growthMindset: gmResult?.percent,
              grit: gritResult?.percent,
              selfEfficacy: seResult?.percent,
              testAnxiety: taResult?.percent,
              metacognition: mcResult?.percent,
              eq: eqResult?.percent,
              procrastination: prResult?.percent,
              academicMotivation: amResult?.percent,
              timeManagement: tmResult?.percent,
              locusOfControl: lcResult?.percent,
              resilience: rsResult?.percent,
              extraversion: bfResult?.dimensions[0]?.percent,
              agreeableness: bfResult?.dimensions[1]?.percent,
              conscientiousness: bfResult?.dimensions[2]?.percent,
              emotionalStability: bfResult?.dimensions[3]?.percent,
              openness: bfResult?.dimensions[4]?.percent,
              stroopAccuracy: stroopResult?.accuracy,
              mentalRotationAccuracy: mrtResult?.accuracy,
            };
            const insights = generateCrossSynthesis(scores);
            if (insights.length === 0) return null;
            return (
              <div className="col-span-full">
                <h3 className="text-xs font-semibold uppercase tracking-wider mb-4 flex items-center gap-2" style={{ color: 'var(--color-primary)' }}>
                  Cross-Assessment Synthesis
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {insights.map(insight => (
                    <div key={insight.id} className="card p-5" style={{ borderLeft: `4px solid ${insight.type === 'strength' ? '#10b981' : insight.type === 'risk' ? '#ef4444' : '#f59e0b'}` }}>
                      <div className="flex items-start gap-3">
                        <span className="text-2xl">{insight.icon}</span>
                        <div>
                          <h4 className="font-semibold text-sm mb-1" style={{ color: 'var(--color-text)' }}>
                            {insight.title[lang]}
                          </h4>
                          <p className="text-xs mb-2" style={{ color: 'var(--color-text-secondary)' }}>
                            {insight.description[lang]}
                          </p>
                          <p className="text-[10px] italic" style={{ color: 'var(--color-text-muted)' }}>
                            {insight.source}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })()}

          {/* Stroop Test */}
          {stroopResult && (
            <div className="card p-6">
              <h3 className="text-xs font-semibold uppercase tracking-wider mb-4 flex items-center gap-2" style={{ color: 'var(--color-primary)' }}>
                <IconComponent name="eye" className="w-4 h-4" /> {lang === 'cs' ? 'Stroop Test (Pozornost)' : 'Stroop Test (Attention)'}
              </h3>
              <div className="space-y-3 mb-4">
                <div className="space-y-2">
                  <div className="flex justify-between items-center text-sm font-semibold">
                    <span style={{ color: 'var(--color-text-secondary)' }}>{lang === 'cs' ? 'Přesnost' : 'Accuracy'}</span>
                    <span style={{ color: 'var(--color-primary)' }}>{stroopResult.accuracy}%</span>
                  </div>
                  <div className="h-3 w-full overflow-hidden" style={{ backgroundColor: 'var(--color-border)', borderRadius: 'var(--radius-full)' }}>
                    <div className="h-full transition-all duration-1000 ease-out" style={{ width: `${stroopResult.accuracy}%`, backgroundColor: '#06b6d4', borderRadius: 'var(--radius-full)' }} />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3 mt-3">
                  <div className="p-2 text-center" style={{ backgroundColor: 'var(--color-bg)', borderRadius: 'var(--radius-sm)' }}>
                    <p className="text-xs" style={{ color: 'var(--color-text-muted)' }}>{lang === 'cs' ? 'Průměrný čas' : 'Avg. Time'}</p>
                    <p className="font-semibold" style={{ color: 'var(--color-text)' }}>{stroopResult.averageReactionTime} ms</p>
                  </div>
                  <div className="p-2 text-center" style={{ backgroundColor: 'var(--color-bg)', borderRadius: 'var(--radius-sm)' }}>
                    <p className="text-xs" style={{ color: 'var(--color-text-muted)' }}>{lang === 'cs' ? 'Stroop efekt' : 'Stroop Effect'}</p>
                    <p className="font-semibold" style={{ color: 'var(--color-text)' }}>{stroopResult.stroopEffect} ms</p>
                  </div>
                </div>
              </div>
              <div className="p-4" style={{ backgroundColor: 'var(--color-bg)', borderRadius: 'var(--radius-md)' }}>
                <p className="font-semibold text-sm mb-2" style={{ color: 'var(--color-text)' }}>{stroopResult.label}</p>
                <div className="flex gap-4 text-xs mb-2" style={{ color: 'var(--color-text-secondary)' }}>
                  <span>{lang === 'cs' ? 'Kogn. flexibilita' : 'Cognitive Flexibility'}: <strong>{stroopResult.cognitiveFlexibility}</strong></span>
                  <span>{lang === 'cs' ? 'Kontrola pozornosti' : 'Attention Control'}: <strong>{stroopResult.attentionControl}</strong></span>
                </div>
                <ul className="space-y-1">
                  {stroopResult.tips.slice(0, 2).map((tip, i) => (
                    <li key={i} className="text-xs" style={{ color: 'var(--color-text-secondary)' }}>• {tip}</li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </div>
        )}

        <div className="text-center pt-4">
          <button onClick={() => setView('dashboard')} className="font-medium transition-opacity hover:opacity-70" style={{ color: 'var(--color-text-muted)' }}>
            ← {lang === 'cs' ? 'Zpět na výběr testů' : 'Back to test selection'}
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: 'var(--color-bg)', color: 'var(--color-text)', fontFamily: 'var(--font-sans)' }}>
      {view !== 'welcome' && (
        <header className="px-6 py-4 flex items-center justify-between" style={{ borderBottom: '1px solid var(--color-border)', backgroundColor: 'var(--color-bg-card)' }}>
          <button onClick={() => setView('dashboard')} className="flex items-center gap-3 hover:opacity-80">
            <div className="w-10 h-10 bg-gradient-to-br from-[#C5A059] to-[#8B7355] flex items-center justify-center" style={{ borderRadius: 'var(--radius-md)', boxShadow: 'var(--shadow-gold)' }}>
              <svg viewBox="0 0 24 24" className="w-5 h-5 text-white" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
              </svg>
            </div>
            <div>
              <h1 className="font-serif text-lg leading-none" style={{ color: 'var(--color-text)', fontWeight: 600 }}>Navigator</h1>
              <p className="text-[10px] font-medium uppercase" style={{ color: 'var(--color-text-muted)', letterSpacing: '0.05em' }}>Academic v2</p>
            </div>
          </button>
          <div className="flex items-center gap-4">
            {studentName && <span className="text-sm hidden sm:block" style={{ color: 'var(--color-text-secondary)' }}>{t('greeting', lang)}, <span className="font-medium" style={{ color: 'var(--color-text)' }}>{studentName}</span></span>}
            {/* Language Switcher */}
            <div className="flex border rounded-md overflow-hidden" style={{ borderColor: 'var(--color-border)' }}>
              <button
                onClick={() => setLang('cs')}
                className={`px-2 py-1 text-xs font-medium transition-colors ${lang === 'cs' ? 'bg-amber-500 text-white' : 'hover:bg-slate-100'}`}
                style={{ color: lang === 'cs' ? undefined : 'var(--color-text-muted)' }}
              >
                CZ
              </button>
              <button
                onClick={() => setLang('en')}
                className={`px-2 py-1 text-xs font-medium transition-colors ${lang === 'en' ? 'bg-amber-500 text-white' : 'hover:bg-slate-100'}`}
                style={{ color: lang === 'en' ? undefined : 'var(--color-text-muted)' }}
              >
                EN
              </button>
            </div>
            <button
              onClick={() => setView('welcome')}
              className="p-2 hover:bg-slate-100 transition-colors"
              style={{ borderRadius: 'var(--radius-md)', color: 'var(--color-text-muted)' }}
              title={lang === 'cs' ? 'Domů - všichni studenti' : 'Home - all students'}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>
            </button>
            <button
              onClick={() => { setApiKeyInput(navigatorService.getApiKey()); setShowApiKeyModal(true); }}
              className="p-2 hover:bg-slate-100 transition-colors"
              style={{ borderRadius: 'var(--radius-md)', color: navigatorService.getApiKey() ? 'var(--color-text-muted)' : '#ef4444' }}
              title={lang === 'cs' ? 'Nastavení API klíče' : 'API Key Settings'}
            >
              <Settings className="w-5 h-5" />
            </button>
            <div className="flex gap-1.5">
              {modules.map(m => (
                <div key={m.id} className={`w-3 h-3 ${progress[m.id as keyof ModuleProgress] ? 'bg-emerald-500' : ''}`} style={{ borderRadius: 'var(--radius-full)', backgroundColor: progress[m.id as keyof ModuleProgress] ? undefined : 'var(--color-border)' }} title={m.title} />
              ))}
            </div>
          </div>
        </header>
      )}
      <main className="flex-1 flex flex-col">
        {view === 'welcome' && renderWelcome()}
        {view === 'dashboard' && renderDashboard()}
        {view === 'chat' && renderChat()}
        {view === 'typology' && renderTypology()}
        {view === 'vak' && renderVak()}
        {view === 'habits' && renderHabits()}
        {view === 'motivation' && renderMotivation()}
        {view === 'strengths' && renderStrengths()}
        {view === 'growthMindset' && renderAssessment(
          'Growth Mindset (Carol Dweck)',
          growthMindsetQuestions,
          currentGMQuestion,
          setCurrentGMQuestion,
          gmAnswers,
          setGmAnswers,
          () => {
            const result = scoreGrowthMindset(gmAnswers);
            setGmResult(result);
            setProgress(p => ({ ...p, growthMindset: true }));
            handleGenerateFeedback('growthMindset', 'Growth Mindset', result);
            setView('results');
          }
        )}
        {view === 'grit' && renderAssessment(
          'Grit Scale (Angela Duckworth)',
          gritQuestions,
          currentGritQuestion,
          setCurrentGritQuestion,
          gritAnswers,
          setGritAnswers,
          () => {
            const result = scoreGrit(gritAnswers);
            setGritResult(result);
            setProgress(p => ({ ...p, grit: true }));
            handleGenerateFeedback('grit', 'Vytrvalost (Grit)', result);
            setView('results');
          }
        )}
        {view === 'selfEfficacy' && renderAssessment(
          'Self-Efficacy (Albert Bandura)',
          selfEfficacyQuestions,
          currentSEQuestion,
          setCurrentSEQuestion,
          seAnswers,
          setSeAnswers,
          () => {
            const result = scoreSelfEfficacy(seAnswers);
            setSeResult(result);
            setProgress(p => ({ ...p, selfEfficacy: true }));
            handleGenerateFeedback('selfEfficacy', 'Self-Efficacy', result);
            setView('results');
          }
        )}
        {view === 'testAnxiety' && renderAssessment(
          'Testová úzkost',
          testAnxietyQuestions,
          currentTAQuestion,
          setCurrentTAQuestion,
          taAnswers,
          setTaAnswers,
          () => {
            const result = scoreTestAnxiety(taAnswers);
            setTaResult(result);
            setProgress(p => ({ ...p, testAnxiety: true }));
            handleGenerateFeedback('testAnxiety', 'Testová úzkost', result);
            setView('results');
          }
        )}
        {view === 'metacognition' && renderAssessment(
          'Metakognice',
          metacognitionQuestions,
          currentMCQuestion,
          setCurrentMCQuestion,
          mcAnswers,
          setMcAnswers,
          () => {
            const result = scoreMetacognition(mcAnswers);
            setMcResult(result);
            setProgress(p => ({ ...p, metacognition: true }));
            handleGenerateFeedback('metacognition', 'Metakognice', result);
            setView('results');
          }
        )}
        {view === 'riasec' && renderRiasecAssessment()}
        {view === 'eq' && renderAssessment(
          'Emoční inteligence (EQ)',
          eqQuestions,
          currentEQQuestion,
          setCurrentEQQuestion,
          eqAnswers,
          setEqAnswers,
          () => {
            const result = scoreEQ(eqAnswers);
            setEqResult(result);
            setProgress(p => ({ ...p, eq: true }));
            handleGenerateFeedback('eq', 'Emoční inteligence', result);
            setView('results');
          }
        )}
        {view === 'procrastination' && renderAssessment(
          'Akademická prokrastinace (Solomon & Rothblum)',
          procrastinationQuestions,
          currentPRQuestion,
          setCurrentPRQuestion,
          prAnswers,
          setPrAnswers,
          () => {
            const result = scoreProcrastination(prAnswers);
            setPrResult(result);
            setProgress(p => ({ ...p, procrastination: true }));
            handleGenerateFeedback('procrastination', 'Akademická prokrastinace', result);
            setView('results');
          }
        )}
        {view === 'academicMotivation' && renderAssessment(
          'Akademická motivace (Vallerand)',
          academicMotivationQuestions,
          currentAMQuestion,
          setCurrentAMQuestion,
          amAnswers,
          setAmAnswers,
          () => {
            const result = scoreAcademicMotivation(amAnswers);
            setAmResult(result);
            setProgress(p => ({ ...p, academicMotivation: true }));
            handleGenerateFeedback('academicMotivation', 'Akademická motivace', result);
            setView('results');
          }
        )}
        {view === 'timeManagement' && renderAssessment(
          'Time Management (Macan)',
          timeManagementQuestions,
          currentTMQuestion,
          setCurrentTMQuestion,
          tmAnswers,
          setTmAnswers,
          () => {
            const result = scoreTimeManagement(tmAnswers);
            setTmResult(result);
            setProgress(p => ({ ...p, timeManagement: true }));
            handleGenerateFeedback('timeManagement', 'Time Management', result);
            setView('results');
          }
        )}
        {view === 'bigFive' && renderAssessment(
          'Big Five - TIPI (Gosling)',
          bigFiveQuestions,
          currentBFQuestion,
          setCurrentBFQuestion,
          bfAnswers,
          setBfAnswers,
          () => {
            const result = scoreBigFive(bfAnswers);
            setBfResult(result);
            setProgress(p => ({ ...p, bigFive: true }));
            handleGenerateFeedback('bigFive', 'Big Five osobnost', { score: 0, percent: Math.round(result.dimensions.reduce((s, d) => s + d.percent, 0) / result.dimensions.length), label: result.summary.cs });
            setView('results');
          }
        )}
        {view === 'locusOfControl' && renderAssessment(
          'Locus of Control (Rotter)',
          locusOfControlQuestions,
          currentLCQuestion,
          setCurrentLCQuestion,
          lcAnswers,
          setLcAnswers,
          () => {
            const result = scoreLocusOfControl(lcAnswers);
            setLcResult(result);
            setProgress(p => ({ ...p, locusOfControl: true }));
            handleGenerateFeedback('locusOfControl', 'Locus of Control', result);
            setView('results');
          }
        )}
        {view === 'resilience' && renderAssessment(
          'Resilience (Smith et al.)',
          resilienceQuestions,
          currentRSQuestion,
          setCurrentRSQuestion,
          rsAnswers,
          setRsAnswers,
          () => {
            const result = scoreResilience(rsAnswers);
            setRsResult(result);
            setProgress(p => ({ ...p, resilience: true }));
            handleGenerateFeedback('resilience', 'Resilience', result);
            setView('results');
          }
        )}
        {view === 'gardner' && renderAssessment(
          'Gardner\'s Multiple Intelligences (1983)',
          gardnerQuestions,
          currentGDQuestion,
          setCurrentGDQuestion,
          gdAnswers,
          setGdAnswers,
          () => {
            const result = scoreGardner(gdAnswers);
            setGdResult(result);
            setProgress(p => ({ ...p, gardner: true }));
            setView('results');
          }
        )}
        {view === 'kolb' && renderAssessment(
          'Kolb Learning Style Inventory (1984)',
          kolbQuestions,
          currentKLQuestion,
          setCurrentKLQuestion,
          klAnswers,
          setKlAnswers,
          () => {
            const result = scoreKolb(klAnswers);
            setKlResult(result);
            setProgress(p => ({ ...p, kolb: true }));
            setView('results');
          }
        )}
        {view === 'studyStress' && renderAssessment(
          'Study Stress (HuggingFace: 0xmarvel/student-stress-survey)',
          studyStressQuestions,
          currentSSQuestion,
          setCurrentSSQuestion,
          ssAnswers,
          setSsAnswers,
          () => {
            const result = scoreStudyStress(ssAnswers);
            setSsResult(result);
            setProgress(p => ({ ...p, studyStress: true }));
            setView('results');
          }
        )}
        {view === 'studyStrategies' && renderAssessment(
          'Study Strategies (HuggingFace: 0xmarvel/student-stress-survey)',
          studyStrategiesQuestions,
          currentSTQuestion,
          setCurrentSTQuestion,
          stAnswers,
          setStAnswers,
          () => {
            const result = scoreStudyStrategies(stAnswers);
            setStResult(result);
            setProgress(p => ({ ...p, studyStrategies: true }));
            setView('results');
          }
        )}
        {view === 'stroop' && renderStroopTest()}
        {view === 'mentalRotation' && renderMentalRotationTest()}
        {view === 'voiceInterview' && renderVoiceInterview()}
        {view === 'emotionRecognition' && renderEmotionRecognition()}
        {view === 'mathReasoning' && (
          <div className="flex-1 overflow-y-auto px-4 py-8" style={{ backgroundColor: 'var(--color-bg)' }}>
            <div className="max-w-2xl mx-auto">
              {/* Header */}
              <div className="text-center mb-8">
                <div className="w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #3b82f6 0%, #6366f1 100%)' }}>
                  <Calculator className="w-8 h-8 text-white" />
                </div>
                <h1 className="text-h1 font-serif mb-2" style={{ color: 'var(--color-text)' }}>
                  {lang === 'cs' ? 'Matematické uvažování' : 'Math Reasoning'}
                </h1>
                <p style={{ color: 'var(--color-text-secondary)' }}>
                  {lang === 'cs' ? 'Nahraj video jak řešíš příklad a AI analyzuje tvůj postup' : 'Upload a video of solving a problem and AI analyzes your approach'}
                </p>
              </div>

              {/* Researcher Info Panel */}
              <div className="mb-6">
                <button
                  onClick={() => setShowMathInfo(!showMathInfo)}
                  className="w-full flex items-center justify-between p-3 rounded-lg text-sm transition-all"
                  style={{ backgroundColor: 'rgba(139, 92, 246, 0.1)', border: '1px solid rgba(139, 92, 246, 0.3)' }}
                >
                  <div className="flex items-center gap-2">
                    <GraduationCap className="w-4 h-4 text-purple-600" />
                    <span className="font-medium text-purple-700">
                      {lang === 'cs' ? 'Pro výzkumníka: O metodě' : 'For Researcher: About the Method'}
                    </span>
                  </div>
                  {showMathInfo ? <ChevronUp className="w-4 h-4 text-purple-600" /> : <ChevronDown className="w-4 h-4 text-purple-600" />}
                </button>

                {showMathInfo && (
                  <div className="mt-2 p-4 rounded-lg text-sm space-y-4" style={{ backgroundColor: 'var(--color-bg-card)', border: '1px solid rgba(139, 92, 246, 0.3)' }}>
                    {/* Method */}
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <BookOpen className="w-4 h-4 text-purple-600" />
                        <span className="font-semibold" style={{ color: 'var(--color-text)' }}>
                          {lang === 'cs' ? 'Vědecká metoda' : 'Scientific Method'}
                        </span>
                      </div>
                      <p style={{ color: 'var(--color-text-secondary)' }}>
                        {lang === 'cs'
                          ? 'Polyova metoda řešení problémů (1945) - čtyřkrokový heuristický přístup k řešení matematických úloh. Umožňuje identifikovat, ve které fázi má student potíže.'
                          : "Polya's Problem-Solving Method (1945) - a four-step heuristic approach to solving mathematical problems. Allows identification of which phase causes difficulty for the student."}
                      </p>
                    </div>

                    {/* What it measures */}
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <Target className="w-4 h-4 text-blue-600" />
                        <span className="font-semibold" style={{ color: 'var(--color-text)' }}>
                          {lang === 'cs' ? 'Co měří' : 'What It Measures'}
                        </span>
                      </div>
                      <ul className="list-disc list-inside space-y-1" style={{ color: 'var(--color-text-secondary)' }}>
                        <li>{lang === 'cs' ? 'Schopnost porozumět zadání' : 'Ability to understand the problem'}</li>
                        <li>{lang === 'cs' ? 'Plánování řešení a výběr strategie' : 'Solution planning and strategy selection'}</li>
                        <li>{lang === 'cs' ? 'Provedení výpočtů a postupů' : 'Execution of calculations and procedures'}</li>
                        <li>{lang === 'cs' ? 'Sebekontrola a verifikace' : 'Self-checking and verification'}</li>
                        <li>{lang === 'cs' ? 'Metakognitivní procesy' : 'Metacognitive processes'}</li>
                      </ul>
                    </div>

                    {/* Strengths */}
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <Sparkles className="w-4 h-4 text-amber-600" />
                        <span className="font-semibold" style={{ color: 'var(--color-text)' }}>
                          {lang === 'cs' ? 'Síla metody' : 'Method Strengths'}
                        </span>
                      </div>
                      <p style={{ color: 'var(--color-text-secondary)' }}>
                        {lang === 'cs'
                          ? 'AI analýza videa umožňuje objektivně identifikovat, které kroky student přeskočil, kde váhal, a jaké konceptuální mezery má. Kombinace vizuální analýzy a GPT-4 Vision poskytuje detailní zpětnou vazbu bez lidského bias.'
                          : 'AI video analysis allows objective identification of which steps the student skipped, where they hesitated, and what conceptual gaps exist. The combination of visual analysis and GPT-4 Vision provides detailed feedback without human bias.'}
                      </p>
                    </div>

                    {/* Links */}
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <Link className="w-4 h-4 text-green-600" />
                        <span className="font-semibold" style={{ color: 'var(--color-text)' }}>
                          {lang === 'cs' ? 'Zdroje a odkazy' : 'Sources & Links'}
                        </span>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        <a href="https://en.wikipedia.org/wiki/How_to_Solve_It" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 px-2 py-1 rounded text-xs bg-blue-100 text-blue-700 hover:bg-blue-200">
                          <ExternalLink className="w-3 h-3" /> Wikipedia
                        </a>
                        <a href="https://www.youtube.com/watch?v=h0gbw-Ur_do" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 px-2 py-1 rounded text-xs bg-red-100 text-red-700 hover:bg-red-200">
                          <ExternalLink className="w-3 h-3" /> YouTube
                        </a>
                        <a href="https://scholar.google.com/scholar?q=Polya+problem+solving" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 px-2 py-1 rounded text-xs bg-green-100 text-green-700 hover:bg-green-200">
                          <ExternalLink className="w-3 h-3" /> Google Scholar
                        </a>
                      </div>
                    </div>

                    {/* Citation */}
                    <div className="p-3 rounded-lg text-xs" style={{ backgroundColor: 'var(--color-bg)', fontFamily: 'monospace' }}>
                      Polya, G. (1945). <em>How to Solve It: A New Aspect of Mathematical Method.</em> Princeton University Press.
                    </div>
                  </div>
                )}
              </div>

              {/* Choose Mode Phase */}
              {mathPhase === 'choose' && (
                <div className="space-y-6">
                  {/* Problem Statement - Polya Method (1945) */}
                  <div className="p-6 rounded-xl" style={{ backgroundColor: 'var(--color-bg-card)', border: '2px solid #3b82f6' }}>
                    <div className="flex items-start gap-3 mb-4">
                      <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0" style={{ backgroundColor: '#3b82f6' }}>
                        <span className="text-white font-bold">?</span>
                      </div>
                      <div>
                        <p className="font-semibold mb-1" style={{ color: 'var(--color-text)' }}>
                          {lang === 'cs' ? 'Úloha k řešení' : 'Problem to Solve'}
                        </p>
                        <p className="text-xs" style={{ color: 'var(--color-text-muted)' }}>
                          {lang === 'cs' ? 'Polya (1945) - How to Solve It' : 'Polya (1945) - How to Solve It'}
                        </p>
                      </div>
                    </div>
                    <div className="p-4 rounded-lg mb-4" style={{ backgroundColor: 'var(--color-bg)', border: '1px solid var(--color-border)' }}>
                      <p className="text-lg" style={{ color: 'var(--color-text)' }}>
                        {lang === 'cs'
                          ? 'Student má k dispozici 500 Kč. Chce si koupit sešity za 35 Kč/kus a propisky za 12 Kč/kus. Potřebuje alespoň 8 sešitů a 5 propisek. Kolik maximálně sešitů si může koupit, aby mu zbyly peníze na všechny potřebné propisky?'
                          : 'A student has 500 CZK. They want to buy notebooks for 35 CZK each and pens for 12 CZK each. They need at least 8 notebooks and 5 pens. What is the maximum number of notebooks they can buy while having enough money for all the required pens?'}
                      </p>
                    </div>
                    <div className="grid grid-cols-2 gap-3 text-sm">
                      <div className="p-3 rounded-lg" style={{ backgroundColor: 'rgba(59, 130, 246, 0.1)' }}>
                        <p className="font-medium text-blue-600 mb-1">{lang === 'cs' ? '1. Porozuměj' : '1. Understand'}</p>
                        <p style={{ color: 'var(--color-text-muted)' }}>{lang === 'cs' ? 'Co je dáno? Co hledáme?' : 'What is given? What are we looking for?'}</p>
                      </div>
                      <div className="p-3 rounded-lg" style={{ backgroundColor: 'rgba(16, 185, 129, 0.1)' }}>
                        <p className="font-medium text-green-600 mb-1">{lang === 'cs' ? '2. Naplánuj' : '2. Plan'}</p>
                        <p style={{ color: 'var(--color-text-muted)' }}>{lang === 'cs' ? 'Jakou strategii použiješ?' : 'What strategy will you use?'}</p>
                      </div>
                      <div className="p-3 rounded-lg" style={{ backgroundColor: 'rgba(245, 158, 11, 0.1)' }}>
                        <p className="font-medium text-yellow-600 mb-1">{lang === 'cs' ? '3. Vyřeš' : '3. Solve'}</p>
                        <p style={{ color: 'var(--color-text-muted)' }}>{lang === 'cs' ? 'Proveď svůj plán' : 'Execute your plan'}</p>
                      </div>
                      <div className="p-3 rounded-lg" style={{ backgroundColor: 'rgba(139, 92, 246, 0.1)' }}>
                        <p className="font-medium text-purple-600 mb-1">{lang === 'cs' ? '4. Zkontroluj' : '4. Check'}</p>
                        <p style={{ color: 'var(--color-text-muted)' }}>{lang === 'cs' ? 'Ověř výsledek' : 'Verify the result'}</p>
                      </div>
                    </div>
                  </div>

                  <p className="text-center font-medium" style={{ color: 'var(--color-text)' }}>
                    {lang === 'cs' ? 'Vyber způsob řešení:' : 'Choose how to solve:'}
                  </p>

                  <div className="grid grid-cols-2 gap-4">
                    {/* Canvas Option */}
                    <button
                      onClick={() => {
                        setMathPhase('canvas');
                        // Initialize canvas after phase change
                        setTimeout(() => {
                          if (mathCanvasRef.current) {
                            const ctx = mathCanvasRef.current.getContext('2d');
                            if (ctx) {
                              ctx.fillStyle = '#ffffff';
                              ctx.fillRect(0, 0, mathCanvasRef.current.width, mathCanvasRef.current.height);
                              ctx.lineCap = 'round';
                              ctx.lineJoin = 'round';
                              canvasContextRef.current = ctx;
                            }
                          }
                        }, 100);
                      }}
                      className="p-6 rounded-xl text-center transition-all hover:scale-105"
                      style={{ backgroundColor: 'var(--color-bg-card)', border: '2px solid var(--color-border)' }}
                    >
                      <div className="w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)' }}>
                        <Pencil className="w-8 h-8 text-white" />
                      </div>
                      <p className="font-semibold mb-2" style={{ color: 'var(--color-text)' }}>
                        {lang === 'cs' ? 'Kreslit na plátno' : 'Draw on Canvas'}
                      </p>
                      <p className="text-sm" style={{ color: 'var(--color-text-muted)' }}>
                        {lang === 'cs' ? 'Řeš příklad přímo zde a nahrávej' : 'Solve the problem here and record'}
                      </p>
                    </button>

                    {/* Upload Option */}
                    <button
                      onClick={() => setMathPhase('upload')}
                      className="p-6 rounded-xl text-center transition-all hover:scale-105"
                      style={{ backgroundColor: 'var(--color-bg-card)', border: '2px solid var(--color-border)' }}
                    >
                      <div className="w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #3b82f6 0%, #6366f1 100%)' }}>
                        <Upload className="w-8 h-8 text-white" />
                      </div>
                      <p className="font-semibold mb-2" style={{ color: 'var(--color-text)' }}>
                        {lang === 'cs' ? 'Nahrát video' : 'Upload Video'}
                      </p>
                      <p className="text-sm" style={{ color: 'var(--color-text-muted)' }}>
                        {lang === 'cs' ? 'Nahraj existující video z mobilu' : 'Upload existing video from phone'}
                      </p>
                    </button>
                  </div>
                </div>
              )}

              {/* Canvas Drawing Phase - Split View */}
              {(mathPhase === 'canvas' || mathPhase === 'recording') && (
                <div className="fixed inset-0 z-40" style={{ backgroundColor: 'var(--color-bg)' }}>
                  <div className="h-full flex flex-col lg:flex-row gap-4 p-4">
                    {/* Left Side - Problem Statement */}
                    <div className="lg:w-80 flex-shrink-0 overflow-y-auto">
                      <div className="p-4 rounded-xl h-full" style={{ backgroundColor: 'var(--color-bg-card)', border: '2px solid #3b82f6' }}>
                        <div className="flex items-center gap-2 mb-3">
                          <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0" style={{ backgroundColor: '#3b82f6' }}>
                            <span className="text-white font-bold text-sm">?</span>
                          </div>
                          <div>
                            <p className="font-semibold text-sm" style={{ color: 'var(--color-text)' }}>
                              {lang === 'cs' ? 'Úloha k řešení' : 'Problem to Solve'}
                            </p>
                            <p className="text-xs" style={{ color: 'var(--color-text-muted)' }}>Polya (1945)</p>
                          </div>
                        </div>
                        <div className="p-3 rounded-lg mb-4 text-sm" style={{ backgroundColor: 'var(--color-bg)', border: '1px solid var(--color-border)' }}>
                          <p style={{ color: 'var(--color-text)' }}>
                            {lang === 'cs'
                              ? 'Student má k dispozici 500 Kč. Chce si koupit sešity za 35 Kč/kus a propisky za 12 Kč/kus. Potřebuje alespoň 8 sešitů a 5 propisek. Kolik maximálně sešitů si může koupit?'
                              : 'A student has 500 CZK. They want to buy notebooks for 35 CZK each and pens for 12 CZK each. They need at least 8 notebooks and 5 pens. What is the maximum number of notebooks they can buy?'}
                          </p>
                        </div>
                        <div className="space-y-2 text-xs">
                          <div className="p-2 rounded-lg" style={{ backgroundColor: 'rgba(59, 130, 246, 0.1)' }}>
                            <span className="font-medium text-blue-600">1.</span> {lang === 'cs' ? 'Porozuměj' : 'Understand'}
                          </div>
                          <div className="p-2 rounded-lg" style={{ backgroundColor: 'rgba(16, 185, 129, 0.1)' }}>
                            <span className="font-medium text-green-600">2.</span> {lang === 'cs' ? 'Naplánuj' : 'Plan'}
                          </div>
                          <div className="p-2 rounded-lg" style={{ backgroundColor: 'rgba(245, 158, 11, 0.1)' }}>
                            <span className="font-medium text-yellow-600">3.</span> {lang === 'cs' ? 'Vyřeš' : 'Solve'}
                          </div>
                          <div className="p-2 rounded-lg" style={{ backgroundColor: 'rgba(139, 92, 246, 0.1)' }}>
                            <span className="font-medium text-purple-600">4.</span> {lang === 'cs' ? 'Zkontroluj' : 'Check'}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Right Side - Canvas */}
                    <div className="flex-1 flex flex-col min-h-0">
                      {/* Toolbar */}
                      <div className="flex items-center justify-between p-3 rounded-lg mb-3" style={{ backgroundColor: 'var(--color-bg-card)', border: '1px solid var(--color-border)' }}>
                        <div className="flex items-center gap-2 flex-wrap">
                          <button
                            onClick={() => setIsEraser(false)}
                            className={`p-2 rounded-lg transition-all ${!isEraser ? 'ring-2 ring-blue-500' : ''}`}
                            style={{ backgroundColor: !isEraser ? 'rgba(59, 130, 246, 0.2)' : 'transparent' }}
                          >
                            <Pencil className="w-5 h-5" style={{ color: !isEraser ? '#3b82f6' : 'var(--color-text-muted)' }} />
                          </button>
                          <button
                            onClick={() => setIsEraser(true)}
                            className={`p-2 rounded-lg transition-all ${isEraser ? 'ring-2 ring-blue-500' : ''}`}
                            style={{ backgroundColor: isEraser ? 'rgba(59, 130, 246, 0.2)' : 'transparent' }}
                          >
                            <Eraser className="w-5 h-5" style={{ color: isEraser ? '#3b82f6' : 'var(--color-text-muted)' }} />
                          </button>
                          <div className="w-px h-6 mx-1" style={{ backgroundColor: 'var(--color-border)' }} />
                          {['#000000', '#3b82f6', '#ef4444', '#10b981'].map(color => (
                            <button
                              key={color}
                              onClick={() => { setPenColor(color); setIsEraser(false); }}
                              className={`w-6 h-6 rounded-full transition-all ${penColor === color && !isEraser ? 'ring-2 ring-offset-1 ring-gray-400' : ''}`}
                              style={{ backgroundColor: color }}
                            />
                          ))}
                          <div className="w-px h-6 mx-1" style={{ backgroundColor: 'var(--color-border)' }} />
                          {[2, 4, 8].map(size => (
                            <button
                              key={size}
                              onClick={() => setPenSize(size)}
                              className={`p-1 rounded ${penSize === size ? 'bg-blue-100' : ''}`}
                            >
                              <Circle className="text-gray-700" style={{ width: size + 6, height: size + 6 }} fill={penSize === size ? '#3b82f6' : 'currentColor'} />
                            </button>
                          ))}
                          <button
                            onClick={() => {
                              if (mathCanvasRef.current && canvasContextRef.current) {
                                canvasContextRef.current.fillStyle = '#ffffff';
                                canvasContextRef.current.fillRect(0, 0, mathCanvasRef.current.width, mathCanvasRef.current.height);
                              }
                            }}
                            className="p-2 rounded-lg hover:bg-gray-100 ml-1"
                          >
                            <RotateCcw className="w-5 h-5" style={{ color: 'var(--color-text-muted)' }} />
                          </button>
                        </div>
                        {mathPhase === 'recording' && (
                          <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-red-100">
                            <div className="w-3 h-3 rounded-full bg-red-500 animate-pulse" />
                            <span className="text-sm font-medium text-red-600">{lang === 'cs' ? 'Nahrávám...' : 'Recording...'}</span>
                          </div>
                        )}
                      </div>

                      {/* Canvas */}
                      <div className="flex-1 rounded-lg overflow-hidden min-h-0" style={{ backgroundColor: '#ffffff', border: '2px solid var(--color-border)' }}>
                        <canvas
                          ref={mathCanvasRef}
                          width={1200}
                          height={700}
                          className="w-full h-full cursor-crosshair touch-none"
                          onMouseDown={(e) => {
                            setIsDrawing(true);
                            const rect = mathCanvasRef.current!.getBoundingClientRect();
                            const scaleX = mathCanvasRef.current!.width / rect.width;
                            const scaleY = mathCanvasRef.current!.height / rect.height;
                            lastPointRef.current = { x: (e.clientX - rect.left) * scaleX, y: (e.clientY - rect.top) * scaleY };
                          }}
                          onMouseMove={(e) => {
                            if (!isDrawing || !canvasContextRef.current || !lastPointRef.current) return;
                            const rect = mathCanvasRef.current!.getBoundingClientRect();
                            const scaleX = mathCanvasRef.current!.width / rect.width;
                            const scaleY = mathCanvasRef.current!.height / rect.height;
                            const x = (e.clientX - rect.left) * scaleX;
                            const y = (e.clientY - rect.top) * scaleY;
                            canvasContextRef.current.beginPath();
                            canvasContextRef.current.moveTo(lastPointRef.current.x, lastPointRef.current.y);
                            canvasContextRef.current.lineTo(x, y);
                            canvasContextRef.current.strokeStyle = isEraser ? '#ffffff' : penColor;
                            canvasContextRef.current.lineWidth = isEraser ? penSize * 4 : penSize;
                            canvasContextRef.current.stroke();
                            lastPointRef.current = { x, y };
                          }}
                          onMouseUp={() => { setIsDrawing(false); lastPointRef.current = null; }}
                          onMouseLeave={() => { setIsDrawing(false); lastPointRef.current = null; }}
                          onTouchStart={(e) => {
                            e.preventDefault();
                            setIsDrawing(true);
                            const touch = e.touches[0];
                            const rect = mathCanvasRef.current!.getBoundingClientRect();
                            const scaleX = mathCanvasRef.current!.width / rect.width;
                            const scaleY = mathCanvasRef.current!.height / rect.height;
                            lastPointRef.current = { x: (touch.clientX - rect.left) * scaleX, y: (touch.clientY - rect.top) * scaleY };
                          }}
                          onTouchMove={(e) => {
                            e.preventDefault();
                            if (!isDrawing || !canvasContextRef.current || !lastPointRef.current) return;
                            const touch = e.touches[0];
                            const rect = mathCanvasRef.current!.getBoundingClientRect();
                            const scaleX = mathCanvasRef.current!.width / rect.width;
                            const scaleY = mathCanvasRef.current!.height / rect.height;
                            const x = (touch.clientX - rect.left) * scaleX;
                            const y = (touch.clientY - rect.top) * scaleY;
                            canvasContextRef.current.beginPath();
                            canvasContextRef.current.moveTo(lastPointRef.current.x, lastPointRef.current.y);
                            canvasContextRef.current.lineTo(x, y);
                            canvasContextRef.current.strokeStyle = isEraser ? '#ffffff' : penColor;
                            canvasContextRef.current.lineWidth = isEraser ? penSize * 4 : penSize;
                            canvasContextRef.current.stroke();
                            lastPointRef.current = { x, y };
                          }}
                          onTouchEnd={() => { setIsDrawing(false); lastPointRef.current = null; }}
                        />
                      </div>

                      {/* Action Buttons */}
                      <div className="flex gap-4 mt-3">
                        <button
                          onClick={() => {
                            if (canvasRecorder) canvasRecorder.stop();
                            setMathPhase('choose');
                            setRecordedChunks([]);
                          }}
                          className="flex-1 py-3 font-medium rounded-lg"
                          style={{ backgroundColor: 'var(--color-bg-card)', border: '1px solid var(--color-border)', color: 'var(--color-text)' }}
                        >
                          {lang === 'cs' ? 'Zpět' : 'Back'}
                        </button>
                        {mathPhase === 'canvas' ? (
                          <button
                            onClick={() => {
                              if (!mathCanvasRef.current) return;
                              const stream = mathCanvasRef.current.captureStream(10);
                              const recorder = new MediaRecorder(stream, { mimeType: 'video/webm' });
                              const chunks: Blob[] = [];
                              recorder.ondataavailable = (e) => { if (e.data.size > 0) chunks.push(e.data); };
                              recorder.onstop = () => {
                                const blob = new Blob(chunks, { type: 'video/webm' });
                                const file = new File([blob], 'canvas-recording.webm', { type: 'video/webm' });
                                setMathVideo(file);
                                setMathVideoUrl(URL.createObjectURL(blob));
                                setMathPhase('preview');
                              };
                              recorder.start(100);
                              setCanvasRecorder(recorder);
                              setMathPhase('recording');
                            }}
                            className="flex-1 py-3 text-white font-semibold rounded-lg flex items-center justify-center gap-2"
                            style={{ background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)' }}
                          >
                            <Play className="w-5 h-5" />
                            {lang === 'cs' ? 'Začít nahrávat' : 'Start Recording'}
                          </button>
                        ) : (
                          <button
                            onClick={() => {
                              if (canvasRecorder) { canvasRecorder.stop(); setCanvasRecorder(null); }
                            }}
                            className="flex-1 py-3 text-white font-semibold rounded-lg flex items-center justify-center gap-2"
                            style={{ background: 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)' }}
                          >
                            <StopCircle className="w-5 h-5" />
                            {lang === 'cs' ? 'Zastavit a analyzovat' : 'Stop & Analyze'}
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Upload Phase */}
              {mathPhase === 'upload' && (
                <div className="space-y-6">
                  <button
                    onClick={() => setMathPhase('choose')}
                    className="flex items-center gap-2 text-sm mb-4"
                    style={{ color: 'var(--color-text-muted)' }}
                  >
                    <ChevronLeft className="w-4 h-4" />
                    {lang === 'cs' ? 'Zpět na výběr' : 'Back to selection'}
                  </button>
                  <div
                    className="border-2 border-dashed rounded-lg p-12 text-center cursor-pointer transition-all hover:border-blue-400"
                    style={{ borderColor: 'var(--color-border)', backgroundColor: 'var(--color-bg-card)' }}
                    onClick={() => mathVideoInputRef.current?.click()}
                  >
                    <Upload className="w-12 h-12 mx-auto mb-4" style={{ color: 'var(--color-text-muted)' }} />
                    <p className="font-medium mb-2" style={{ color: 'var(--color-text)' }}>
                      {lang === 'cs' ? 'Klikni pro nahrání videa' : 'Click to upload video'}
                    </p>
                    <p className="text-sm" style={{ color: 'var(--color-text-muted)' }}>
                      MP4, MOV, WebM (max 100MB)
                    </p>
                  </div>
                  <input
                    ref={mathVideoInputRef}
                    type="file"
                    accept="video/*"
                    className="hidden"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        setMathVideo(file);
                        setMathVideoUrl(URL.createObjectURL(file));
                        setMathPhase('preview');
                      }
                    }}
                  />
                  <div className="p-4 rounded-lg" style={{ backgroundColor: 'rgba(59, 130, 246, 0.1)', border: '1px solid rgba(59, 130, 246, 0.3)' }}>
                    <p className="text-sm font-medium text-blue-600 mb-2">
                      {lang === 'cs' ? 'Tip pro nahrávání:' : 'Recording tip:'}
                    </p>
                    <ul className="text-sm space-y-1" style={{ color: 'var(--color-text)' }}>
                      <li>• {lang === 'cs' ? 'Nahraj mobil jak píšeš příklad na papír' : 'Record with your phone while writing on paper'}</li>
                      <li>• {lang === 'cs' ? 'Dobrý osvětlení a čitelné písmo' : 'Good lighting and readable handwriting'}</li>
                      <li>• {lang === 'cs' ? 'Ukaž celý postup od začátku do konce' : 'Show the entire process from start to finish'}</li>
                    </ul>
                  </div>
                </div>
              )}

              {/* Preview Phase */}
              {mathPhase === 'preview' && mathVideoUrl && (
                <div className="space-y-6">
                  <div className="rounded-lg overflow-hidden" style={{ backgroundColor: '#000' }}>
                    <video
                      src={mathVideoUrl}
                      controls
                      className="w-full max-h-96 object-contain"
                    />
                  </div>
                  <div className="flex gap-4">
                    <button
                      onClick={() => {
                        setMathPhase('upload');
                        setMathVideo(null);
                        if (mathVideoUrl) URL.revokeObjectURL(mathVideoUrl);
                        setMathVideoUrl(null);
                      }}
                      className="flex-1 py-3 font-medium rounded-lg transition-all"
                      style={{ backgroundColor: 'var(--color-bg-card)', border: '1px solid var(--color-border)', color: 'var(--color-text)' }}
                    >
                      {lang === 'cs' ? 'Nahrát jiné video' : 'Upload different video'}
                    </button>
                    <button
                      onClick={async () => {
                        if (!mathVideo) return;
                        setMathPhase('analyzing');
                        setMathAnalyzing(true);
                        try {
                          const frames = await visionAnalysisService.extractFramesFromVideo(mathVideo, 8);
                          const result = await visionAnalysisService.analyzeMathReasoning(frames, lang);
                          setMathResult(result);
                          setMathPhase('done');
                          setProgress(p => ({ ...p, mathReasoning: true }));
                        } catch (error) {
                          console.error('Analysis error:', error);
                          alert(lang === 'cs' ? 'Chyba při analýze videa' : 'Error analyzing video');
                          setMathPhase('preview');
                        } finally {
                          setMathAnalyzing(false);
                        }
                      }}
                      className="flex-1 py-3 text-white font-semibold rounded-lg transition-all flex items-center justify-center gap-2"
                      style={{ background: 'linear-gradient(135deg, #3b82f6 0%, #6366f1 100%)' }}
                    >
                      <Sparkles className="w-5 h-5" />
                      {lang === 'cs' ? 'Analyzovat s AI' : 'Analyze with AI'}
                    </button>
                  </div>
                </div>
              )}

              {/* Analyzing Phase */}
              {mathPhase === 'analyzing' && (
                <div className="text-center py-12">
                  <div className="w-16 h-16 border-4 border-t-transparent rounded-full animate-spin mx-auto mb-4" style={{ borderColor: '#3b82f6', borderTopColor: 'transparent' }} />
                  <p className="text-lg font-medium mb-2" style={{ color: 'var(--color-text)' }}>
                    {lang === 'cs' ? 'Analyzuji video...' : 'Analyzing video...'}
                  </p>
                  <p className="text-sm" style={{ color: 'var(--color-text-muted)' }}>
                    {lang === 'cs' ? 'GPT-4 Vision zkoumá tvůj postup řešení' : 'GPT-4 Vision is examining your problem-solving process'}
                  </p>
                </div>
              )}

              {/* Results Phase */}
              {mathPhase === 'done' && mathResult && (
                <div className="space-y-6">
                  {/* Score */}
                  <div className="p-6 rounded-lg text-center" style={{ backgroundColor: 'var(--color-bg-card)', border: '1px solid var(--color-border)' }}>
                    <div className="text-4xl font-bold mb-2" style={{ color: mathResult.overallScore >= 70 ? '#10b981' : mathResult.overallScore >= 40 ? '#f59e0b' : '#ef4444' }}>
                      {mathResult.overallScore}%
                    </div>
                    <p className="text-sm" style={{ color: 'var(--color-text-muted)' }}>
                      {lang === 'cs' ? 'Celkové hodnocení' : 'Overall Score'}
                    </p>
                  </div>

                  {/* Problem Description */}
                  <div className="p-4 rounded-lg" style={{ backgroundColor: 'var(--color-bg-card)', border: '1px solid var(--color-border)' }}>
                    <p className="text-sm font-medium mb-1" style={{ color: 'var(--color-text-muted)' }}>
                      {lang === 'cs' ? 'Rozpoznaný příklad:' : 'Identified problem:'}
                    </p>
                    <p style={{ color: 'var(--color-text)' }}>{mathResult.problemDescription}</p>
                  </div>

                  {/* Steps */}
                  {mathResult.stepsIdentified.length > 0 && (
                    <div className="p-4 rounded-lg" style={{ backgroundColor: 'var(--color-bg-card)', border: '1px solid var(--color-border)' }}>
                      <p className="text-sm font-medium mb-3" style={{ color: 'var(--color-text-muted)' }}>
                        {lang === 'cs' ? 'Identifikované kroky:' : 'Identified steps:'}
                      </p>
                      <div className="space-y-2">
                        {mathResult.stepsIdentified.map((step, i) => (
                          <div key={i} className="flex items-start gap-3">
                            <span className={`w-6 h-6 rounded-full flex items-center justify-center text-sm text-white flex-shrink-0 ${step.isCorrect ? 'bg-green-500' : 'bg-red-500'}`}>
                              {step.stepNumber}
                            </span>
                            <div>
                              <p className="text-sm" style={{ color: 'var(--color-text)' }}>{step.description}</p>
                              <p className="text-xs" style={{ color: 'var(--color-text-muted)' }}>{step.conceptUsed}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Missing Steps */}
                  {mathResult.missingSteps.length > 0 && (
                    <div className="p-4 rounded-lg" style={{ backgroundColor: 'rgba(239, 68, 68, 0.1)', border: '1px solid rgba(239, 68, 68, 0.3)' }}>
                      <p className="text-sm font-medium mb-2 text-red-600">
                        {lang === 'cs' ? 'Chybějící kroky:' : 'Missing steps:'}
                      </p>
                      <ul className="space-y-1">
                        {mathResult.missingSteps.map((step, i) => (
                          <li key={i} className="text-sm flex items-start gap-2" style={{ color: 'var(--color-text)' }}>
                            <span className="text-red-500">•</span> {step}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Feedback */}
                  <div className="p-4 rounded-lg" style={{ backgroundColor: 'rgba(59, 130, 246, 0.1)', border: '1px solid rgba(59, 130, 246, 0.3)' }}>
                    <p className="text-sm font-medium mb-2 text-blue-600">
                      {lang === 'cs' ? 'Zpětná vazba:' : 'Feedback:'}
                    </p>
                    <p className="text-sm" style={{ color: 'var(--color-text)' }}>{mathResult.feedback}</p>
                  </div>

                  {/* Recommendations */}
                  {mathResult.recommendations.length > 0 && (
                    <div className="p-4 rounded-lg" style={{ backgroundColor: 'rgba(16, 185, 129, 0.1)', border: '1px solid rgba(16, 185, 129, 0.3)' }}>
                      <p className="text-sm font-medium mb-2 text-green-600">
                        {lang === 'cs' ? 'Doporučení:' : 'Recommendations:'}
                      </p>
                      <ul className="space-y-1">
                        {mathResult.recommendations.map((rec, i) => (
                          <li key={i} className="text-sm flex items-start gap-2" style={{ color: 'var(--color-text)' }}>
                            <ArrowRight className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" /> {rec}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  <button
                    onClick={() => setView('results')}
                    className="w-full py-3 text-white font-semibold rounded-lg transition-all"
                    style={{ background: 'linear-gradient(135deg, #3b82f6 0%, #6366f1 100%)' }}
                  >
                    {lang === 'cs' ? 'Zobrazit všechny výsledky' : 'View All Results'}
                  </button>
                </div>
              )}

              {/* Back button */}
              <button
                onClick={() => {
                  setView('dashboard');
                  setMathPhase('upload');
                  setMathVideo(null);
                  if (mathVideoUrl) URL.revokeObjectURL(mathVideoUrl);
                  setMathVideoUrl(null);
                  setMathResult(null);
                }}
                className="mt-6 flex items-center gap-2 text-sm"
                style={{ color: 'var(--color-text-secondary)' }}
              >
                <ChevronLeft className="w-4 h-4" />
                {lang === 'cs' ? 'Zpět na dashboard' : 'Back to dashboard'}
              </button>
            </div>
          </div>
        )}
        {view === 'garminHealth' && (
          <div className="flex-1 overflow-y-auto px-4 py-8" style={{ backgroundColor: 'var(--color-bg)' }}>
            <div className="max-w-2xl mx-auto text-center">
              <div className="w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #10b981 0%, #14b8a6 100%)' }}>
                <Heart className="w-8 h-8 text-white" />
              </div>
              <h1 className="text-h1 font-serif mb-2" style={{ color: 'var(--color-text)' }}>
                Garmin Health
              </h1>
              <p className="mb-8" style={{ color: 'var(--color-text-secondary)' }}>
                {lang === 'cs' ? 'Propoj své Garmin hodinky a sleduj stres během testů.' : 'Connect your Garmin watch and track stress during tests.'}
              </p>
              <div className="p-6 rounded-lg mb-6" style={{ backgroundColor: 'var(--color-bg-card)', border: '1px solid var(--color-border)' }}>
                <p className="text-green-600 font-medium mb-2">
                  {lang === 'cs' ? 'Vyžaduje Garmin Developer účet' : 'Requires Garmin Developer account'}
                </p>
                <p className="text-sm" style={{ color: 'var(--color-text-muted)' }}>
                  {lang === 'cs' ? 'Registruj se na developer.garmin.com' : 'Register at developer.garmin.com'}
                </p>
              </div>
              <button onClick={() => setView('dashboard')} className="flex items-center gap-2 mx-auto text-sm" style={{ color: 'var(--color-text-secondary)' }}>
                <ChevronLeft className="w-4 h-4" />{lang === 'cs' ? 'Zpět' : 'Back'}
              </button>
            </div>
          </div>
        )}

        {/* Baum Test (Koch, 1952) - Tree Drawing Creativity Test */}
        {view === 'baumTest' && (
          <div className="flex-1 overflow-y-auto px-4 py-8" style={{ backgroundColor: 'var(--color-bg)' }}>
            <div className="max-w-2xl mx-auto">
              {/* Header */}
              <div className="text-center mb-8">
                <div className="w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)' }}>
                  <TreeDeciduous className="w-8 h-8 text-white" />
                </div>
                <h1 className="text-h1 font-serif mb-2" style={{ color: 'var(--color-text)' }}>
                  {lang === 'cs' ? 'Baum Test (Kresba stromu)' : 'Tree Drawing Test'}
                </h1>
                <p style={{ color: 'var(--color-text-secondary)' }}>
                  {lang === 'cs' ? 'Nakresli strom a AI analyzuje tvou kreativitu a osobnost' : 'Draw a tree and AI analyzes your creativity and personality'}
                </p>
                <p className="text-xs mt-1" style={{ color: 'var(--color-text-muted)' }}>
                  Koch, K. (1952). Der Baumtest
                </p>
              </div>

              {/* Researcher Info Panel */}
              <div className="mb-6">
                <button
                  onClick={() => setShowBaumInfo(!showBaumInfo)}
                  className="w-full flex items-center justify-between p-3 rounded-lg text-sm transition-all"
                  style={{ backgroundColor: 'rgba(245, 158, 11, 0.1)', border: '1px solid rgba(245, 158, 11, 0.3)' }}
                >
                  <div className="flex items-center gap-2">
                    <GraduationCap className="w-4 h-4 text-amber-600" />
                    <span className="font-medium text-amber-700">
                      {lang === 'cs' ? 'Pro výzkumníka: O metodě' : 'For Researcher: About the Method'}
                    </span>
                  </div>
                  {showBaumInfo ? <ChevronUp className="w-4 h-4 text-amber-600" /> : <ChevronDown className="w-4 h-4 text-amber-600" />}
                </button>

                {showBaumInfo && (
                  <div className="mt-2 p-4 rounded-lg text-sm space-y-4" style={{ backgroundColor: 'var(--color-bg-card)', border: '1px solid rgba(245, 158, 11, 0.3)' }}>
                    {/* Method */}
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <BookOpen className="w-4 h-4 text-amber-600" />
                        <span className="font-semibold" style={{ color: 'var(--color-text)' }}>
                          {lang === 'cs' ? 'Vědecká metoda' : 'Scientific Method'}
                        </span>
                      </div>
                      <p style={{ color: 'var(--color-text-secondary)' }}>
                        {lang === 'cs'
                          ? 'Baum test (Koch, 1952) je projektivní psychologický test, kde subjekt kreslí strom. Kresba odhaluje nevědomé aspekty osobnosti, emoční stav a kreativitu. Používá se v klinické a pedagogické psychologii.'
                          : 'The Baum test (Koch, 1952) is a projective psychological test where the subject draws a tree. The drawing reveals unconscious aspects of personality, emotional state, and creativity. Used in clinical and educational psychology.'}
                      </p>
                    </div>

                    {/* What it measures */}
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <Target className="w-4 h-4 text-blue-600" />
                        <span className="font-semibold" style={{ color: 'var(--color-text)' }}>
                          {lang === 'cs' ? 'Co měří' : 'What It Measures'}
                        </span>
                      </div>
                      <ul className="list-disc list-inside space-y-1" style={{ color: 'var(--color-text-secondary)' }}>
                        <li>{lang === 'cs' ? 'Kreativita a originalita myšlení' : 'Creativity and originality of thinking'}</li>
                        <li>{lang === 'cs' ? 'Emoční stabilita (velikost, pozice stromu)' : 'Emotional stability (size, position of tree)'}</li>
                        <li>{lang === 'cs' ? 'Sebevědomí (síla kmene)' : 'Self-confidence (trunk strength)'}</li>
                        <li>{lang === 'cs' ? 'Sociální orientace (větve, koruna)' : 'Social orientation (branches, crown)'}</li>
                        <li>{lang === 'cs' ? 'Vztah k minulosti (kořeny)' : 'Relationship to the past (roots)'}</li>
                        <li>{lang === 'cs' ? 'Pozornost k detailům (listy, textura)' : 'Attention to detail (leaves, texture)'}</li>
                      </ul>
                    </div>

                    {/* Strengths */}
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <Sparkles className="w-4 h-4 text-amber-600" />
                        <span className="font-semibold" style={{ color: 'var(--color-text)' }}>
                          {lang === 'cs' ? 'Síla metody' : 'Method Strengths'}
                        </span>
                      </div>
                      <p style={{ color: 'var(--color-text-secondary)' }}>
                        {lang === 'cs'
                          ? 'Neverbální test bez jazykových bariér. Snižuje sociální desirabilitu (účastník neví, co je "správná" odpověď). AI analýza pomocí GPT-4 Vision poskytuje konzistentní hodnocení bez subjektivního bias hodnotitele. Vhodné pro mezinárodní srovnání.'
                          : 'Non-verbal test without language barriers. Reduces social desirability (participant does not know what the "correct" answer is). AI analysis using GPT-4 Vision provides consistent evaluation without subjective rater bias. Suitable for international comparison.'}
                      </p>
                    </div>

                    {/* Links */}
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <Link className="w-4 h-4 text-green-600" />
                        <span className="font-semibold" style={{ color: 'var(--color-text)' }}>
                          {lang === 'cs' ? 'Zdroje a odkazy' : 'Sources & Links'}
                        </span>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        <a href="https://en.wikipedia.org/wiki/Baum_test" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 px-2 py-1 rounded text-xs bg-blue-100 text-blue-700 hover:bg-blue-200">
                          <ExternalLink className="w-3 h-3" /> Wikipedia
                        </a>
                        <a href="https://www.youtube.com/watch?v=JDf-9yN6Kts" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 px-2 py-1 rounded text-xs bg-red-100 text-red-700 hover:bg-red-200">
                          <ExternalLink className="w-3 h-3" /> YouTube
                        </a>
                        <a href="https://scholar.google.com/scholar?q=Koch+Baum+test+tree+drawing" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 px-2 py-1 rounded text-xs bg-green-100 text-green-700 hover:bg-green-200">
                          <ExternalLink className="w-3 h-3" /> Google Scholar
                        </a>
                      </div>
                    </div>

                    {/* Citation */}
                    <div className="p-3 rounded-lg text-xs" style={{ backgroundColor: 'var(--color-bg)', fontFamily: 'monospace' }}>
                      Koch, K. (1952). <em>Der Baumtest: Der Baumzeichenversuch als psychodiagnostisches Hilfsmittel.</em> Bern: Hans Huber.
                    </div>
                  </div>
                )}
              </div>

              {/* Intro Phase */}
              {baumPhase === 'intro' && (
                <div className="space-y-6">
                  <div className="p-6 rounded-xl" style={{ backgroundColor: 'var(--color-bg-card)', border: '1px solid var(--color-border)' }}>
                    <h3 className="font-semibold mb-4" style={{ color: 'var(--color-text)' }}>
                      {lang === 'cs' ? 'Instrukce' : 'Instructions'}
                    </h3>
                    <div className="space-y-3 text-sm" style={{ color: 'var(--color-text)' }}>
                      <p className="flex items-start gap-3">
                        <span className="w-6 h-6 rounded-full bg-amber-100 text-amber-700 flex items-center justify-center flex-shrink-0 font-medium">1</span>
                        {lang === 'cs' ? 'Nakresli strom - jakýkoliv strom, jak si ho představuješ' : 'Draw a tree - any tree, as you imagine it'}
                      </p>
                      <p className="flex items-start gap-3">
                        <span className="w-6 h-6 rounded-full bg-amber-100 text-amber-700 flex items-center justify-center flex-shrink-0 font-medium">2</span>
                        {lang === 'cs' ? 'Neexistuje správná nebo špatná odpověď' : 'There is no right or wrong answer'}
                      </p>
                      <p className="flex items-start gap-3">
                        <span className="w-6 h-6 rounded-full bg-amber-100 text-amber-700 flex items-center justify-center flex-shrink-0 font-medium">3</span>
                        {lang === 'cs' ? 'Kresli podle sebe - kmen, větve, korunu, kořeny...' : 'Draw as you like - trunk, branches, crown, roots...'}
                      </p>
                      <p className="flex items-start gap-3">
                        <span className="w-6 h-6 rounded-full bg-amber-100 text-amber-700 flex items-center justify-center flex-shrink-0 font-medium">4</span>
                        {lang === 'cs' ? 'AI analyzuje kreativitu, detail a osobnostní rysy' : 'AI analyzes creativity, detail, and personality traits'}
                      </p>
                    </div>
                  </div>

                  <div className="p-4 rounded-lg" style={{ backgroundColor: 'rgba(245, 158, 11, 0.1)', border: '1px solid rgba(245, 158, 11, 0.3)' }}>
                    <p className="text-sm" style={{ color: 'var(--color-text)' }}>
                      🌳 {lang === 'cs'
                        ? 'Baum test (Koch, 1952) je projektivní psychologický test používaný pro analýzu osobnosti a kreativity. AI interpretace je pouze orientační.'
                        : 'The Baum test (Koch, 1952) is a projective psychological test used for personality and creativity analysis. AI interpretation is indicative only.'}
                    </p>
                  </div>

                  <button
                    onClick={() => {
                      setBaumPhase('drawing');
                      setTimeout(() => {
                        if (baumCanvasRef.current) {
                          const ctx = baumCanvasRef.current.getContext('2d');
                          if (ctx) {
                            ctx.fillStyle = '#fefce8';
                            ctx.fillRect(0, 0, baumCanvasRef.current.width, baumCanvasRef.current.height);
                            ctx.lineCap = 'round';
                            ctx.lineJoin = 'round';
                            baumContextRef.current = ctx;
                          }
                        }
                      }, 100);
                    }}
                    className="w-full py-4 text-white font-semibold rounded-lg transition-all flex items-center justify-center gap-2"
                    style={{ background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)' }}
                  >
                    <Pencil className="w-5 h-5" />
                    {lang === 'cs' ? 'Začít kreslit' : 'Start Drawing'}
                  </button>
                </div>
              )}

              {/* Drawing Phase */}
              {baumPhase === 'drawing' && (
                <div className="space-y-4">
                  {/* Toolbar */}
                  <div className="flex items-center justify-between p-3 rounded-lg" style={{ backgroundColor: 'var(--color-bg-card)', border: '1px solid var(--color-border)' }}>
                    <div className="flex items-center gap-2">
                      {/* Colors - earthy tones */}
                      {['#2d1b0e', '#5c4033', '#228b22', '#8b4513', '#654321'].map(color => (
                        <button
                          key={color}
                          onClick={() => setBaumPenColor(color)}
                          className={`w-7 h-7 rounded-full transition-all ${baumPenColor === color ? 'ring-2 ring-offset-2 ring-amber-400' : ''}`}
                          style={{ backgroundColor: color }}
                        />
                      ))}

                      <div className="w-px h-6 mx-2" style={{ backgroundColor: 'var(--color-border)' }} />

                      {/* Pen Size */}
                      {[2, 4, 8].map(size => (
                        <button
                          key={size}
                          onClick={() => setBaumPenSize(size)}
                          className={`p-1 rounded transition-all ${baumPenSize === size ? 'bg-amber-100' : ''}`}
                        >
                          <Circle
                            className="text-amber-700"
                            style={{ width: size + 8, height: size + 8 }}
                            fill={baumPenSize === size ? '#f59e0b' : 'currentColor'}
                          />
                        </button>
                      ))}

                      <div className="w-px h-6 mx-2" style={{ backgroundColor: 'var(--color-border)' }} />

                      {/* Clear */}
                      <button
                        onClick={() => {
                          if (baumCanvasRef.current && baumContextRef.current) {
                            baumContextRef.current.fillStyle = '#fefce8';
                            baumContextRef.current.fillRect(0, 0, baumCanvasRef.current.width, baumCanvasRef.current.height);
                          }
                        }}
                        className="p-2 rounded-lg hover:bg-amber-50 transition-all"
                        title={lang === 'cs' ? 'Vymazat' : 'Clear'}
                      >
                        <RotateCcw className="w-5 h-5 text-amber-600" />
                      </button>
                    </div>
                  </div>

                  {/* Canvas */}
                  <div
                    className="rounded-lg overflow-hidden"
                    style={{ backgroundColor: '#fefce8', border: '2px solid #fbbf24' }}
                  >
                    <canvas
                      ref={baumCanvasRef}
                      width={800}
                      height={600}
                      className="w-full cursor-crosshair touch-none"
                      style={{ maxHeight: '60vh' }}
                      onMouseDown={(e) => {
                        setBaumDrawing(true);
                        const rect = baumCanvasRef.current!.getBoundingClientRect();
                        const scaleX = baumCanvasRef.current!.width / rect.width;
                        const scaleY = baumCanvasRef.current!.height / rect.height;
                        setBaumLastPoint({
                          x: (e.clientX - rect.left) * scaleX,
                          y: (e.clientY - rect.top) * scaleY
                        });
                      }}
                      onMouseMove={(e) => {
                        if (!baumDrawing || !baumContextRef.current || !baumLastPoint) return;
                        const rect = baumCanvasRef.current!.getBoundingClientRect();
                        const scaleX = baumCanvasRef.current!.width / rect.width;
                        const scaleY = baumCanvasRef.current!.height / rect.height;
                        const x = (e.clientX - rect.left) * scaleX;
                        const y = (e.clientY - rect.top) * scaleY;

                        baumContextRef.current.beginPath();
                        baumContextRef.current.moveTo(baumLastPoint.x, baumLastPoint.y);
                        baumContextRef.current.lineTo(x, y);
                        baumContextRef.current.strokeStyle = baumPenColor;
                        baumContextRef.current.lineWidth = baumPenSize;
                        baumContextRef.current.stroke();

                        setBaumLastPoint({ x, y });
                      }}
                      onMouseUp={() => { setBaumDrawing(false); setBaumLastPoint(null); }}
                      onMouseLeave={() => { setBaumDrawing(false); setBaumLastPoint(null); }}
                      onTouchStart={(e) => {
                        e.preventDefault();
                        setBaumDrawing(true);
                        const touch = e.touches[0];
                        const rect = baumCanvasRef.current!.getBoundingClientRect();
                        const scaleX = baumCanvasRef.current!.width / rect.width;
                        const scaleY = baumCanvasRef.current!.height / rect.height;
                        setBaumLastPoint({
                          x: (touch.clientX - rect.left) * scaleX,
                          y: (touch.clientY - rect.top) * scaleY
                        });
                      }}
                      onTouchMove={(e) => {
                        e.preventDefault();
                        if (!baumDrawing || !baumContextRef.current || !baumLastPoint) return;
                        const touch = e.touches[0];
                        const rect = baumCanvasRef.current!.getBoundingClientRect();
                        const scaleX = baumCanvasRef.current!.width / rect.width;
                        const scaleY = baumCanvasRef.current!.height / rect.height;
                        const x = (touch.clientX - rect.left) * scaleX;
                        const y = (touch.clientY - rect.top) * scaleY;

                        baumContextRef.current.beginPath();
                        baumContextRef.current.moveTo(baumLastPoint.x, baumLastPoint.y);
                        baumContextRef.current.lineTo(x, y);
                        baumContextRef.current.strokeStyle = baumPenColor;
                        baumContextRef.current.lineWidth = baumPenSize;
                        baumContextRef.current.stroke();

                        setBaumLastPoint({ x, y });
                      }}
                      onTouchEnd={() => { setBaumDrawing(false); setBaumLastPoint(null); }}
                    />
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-4">
                    <button
                      onClick={() => setBaumPhase('intro')}
                      className="flex-1 py-3 font-medium rounded-lg transition-all"
                      style={{ backgroundColor: 'var(--color-bg-card)', border: '1px solid var(--color-border)', color: 'var(--color-text)' }}
                    >
                      {lang === 'cs' ? 'Zpět' : 'Back'}
                    </button>
                    <button
                      onClick={async () => {
                        if (!baumCanvasRef.current) return;
                        setBaumPhase('analyzing');
                        setBaumAnalyzing(true);

                        try {
                          const imageData = baumCanvasRef.current.toDataURL('image/png');

                          const response = await fetch('https://api.openai.com/v1/chat/completions', {
                            method: 'POST',
                            headers: {
                              'Content-Type': 'application/json',
                              'Authorization': `Bearer ${import.meta.env.VITE_OPENAI_API_KEY}`
                            },
                            body: JSON.stringify({
                              model: 'gpt-4o',
                              messages: [
                                {
                                  role: 'system',
                                  content: lang === 'cs'
                                    ? `Jsi expert na psychologickou analýzu kresby stromu (Baum test, Koch 1952). Analyzuj kresbu a vrať POUZE validní JSON:
{
  "creativity": 0-100,
  "detail": 0-100,
  "stability": 0-100,
  "interpretation": "2-3 věty o celkovém dojmu z kresby",
  "traits": ["rys1", "rys2", "rys3", "rys4", "rys5"],
  "recommendations": ["doporučení1", "doporučení2", "doporučení3"]
}
Hodnoť: velikost stromu, pozice, kmen (síla, textura), větve (směr, počet), koruna (tvar, hustota), kořeny, detaily (listy, plody, krajina).`
                                    : `You are an expert in psychological tree drawing analysis (Baum test, Koch 1952). Analyze the drawing and return ONLY valid JSON:
{
  "creativity": 0-100,
  "detail": 0-100,
  "stability": 0-100,
  "interpretation": "2-3 sentences about overall impression",
  "traits": ["trait1", "trait2", "trait3", "trait4", "trait5"],
  "recommendations": ["recommendation1", "recommendation2", "recommendation3"]
}
Evaluate: tree size, position, trunk (strength, texture), branches (direction, count), crown (shape, density), roots, details (leaves, fruits, landscape).`
                                },
                                {
                                  role: 'user',
                                  content: [
                                    { type: 'text', text: lang === 'cs' ? 'Analyzuj tuto kresbu stromu:' : 'Analyze this tree drawing:' },
                                    { type: 'image_url', image_url: { url: imageData, detail: 'high' } }
                                  ]
                                }
                              ],
                              max_tokens: 1000
                            })
                          });

                          const data = await response.json();
                          const content = data.choices?.[0]?.message?.content || '';
                          const jsonMatch = content.match(/\{[\s\S]*\}/);

                          if (jsonMatch) {
                            const result = JSON.parse(jsonMatch[0]);
                            setBaumResult(result);
                            setProgress(p => ({ ...p, baumTest: true }));
                          }
                          setBaumPhase('done');
                        } catch (error) {
                          console.error('Baum test analysis error:', error);
                          alert(lang === 'cs' ? 'Chyba při analýze' : 'Analysis error');
                          setBaumPhase('drawing');
                        } finally {
                          setBaumAnalyzing(false);
                        }
                      }}
                      className="flex-1 py-3 text-white font-semibold rounded-lg transition-all flex items-center justify-center gap-2"
                      style={{ background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)' }}
                    >
                      <Sparkles className="w-5 h-5" />
                      {lang === 'cs' ? 'Analyzovat kresbu' : 'Analyze Drawing'}
                    </button>
                  </div>
                </div>
              )}

              {/* Analyzing Phase */}
              {baumPhase === 'analyzing' && (
                <div className="text-center py-12">
                  <div className="w-16 h-16 border-4 border-t-transparent rounded-full animate-spin mx-auto mb-4" style={{ borderColor: '#f59e0b', borderTopColor: 'transparent' }} />
                  <p className="text-lg font-medium mb-2" style={{ color: 'var(--color-text)' }}>
                    {lang === 'cs' ? 'Analyzuji kresbu...' : 'Analyzing drawing...'}
                  </p>
                  <p className="text-sm" style={{ color: 'var(--color-text-muted)' }}>
                    {lang === 'cs' ? 'AI vyhodnocuje kreativitu a osobnostní rysy' : 'AI is evaluating creativity and personality traits'}
                  </p>
                </div>
              )}

              {/* Results Phase */}
              {baumPhase === 'done' && baumResult && (
                <div className="space-y-6">
                  {/* Scores */}
                  <div className="grid grid-cols-3 gap-4">
                    <div className="p-4 rounded-lg text-center" style={{ backgroundColor: 'var(--color-bg-card)', border: '1px solid var(--color-border)' }}>
                      <div className="text-3xl font-bold text-amber-600">{baumResult.creativity}%</div>
                      <p className="text-sm" style={{ color: 'var(--color-text-muted)' }}>{lang === 'cs' ? 'Kreativita' : 'Creativity'}</p>
                    </div>
                    <div className="p-4 rounded-lg text-center" style={{ backgroundColor: 'var(--color-bg-card)', border: '1px solid var(--color-border)' }}>
                      <div className="text-3xl font-bold text-green-600">{baumResult.detail}%</div>
                      <p className="text-sm" style={{ color: 'var(--color-text-muted)' }}>{lang === 'cs' ? 'Detail' : 'Detail'}</p>
                    </div>
                    <div className="p-4 rounded-lg text-center" style={{ backgroundColor: 'var(--color-bg-card)', border: '1px solid var(--color-border)' }}>
                      <div className="text-3xl font-bold text-blue-600">{baumResult.stability}%</div>
                      <p className="text-sm" style={{ color: 'var(--color-text-muted)' }}>{lang === 'cs' ? 'Stabilita' : 'Stability'}</p>
                    </div>
                  </div>

                  {/* Interpretation */}
                  <div className="p-6 rounded-xl" style={{ backgroundColor: 'var(--color-bg-card)', border: '1px solid var(--color-border)' }}>
                    <h3 className="font-semibold mb-3" style={{ color: 'var(--color-text)' }}>
                      {lang === 'cs' ? 'Interpretace' : 'Interpretation'}
                    </h3>
                    <p style={{ color: 'var(--color-text-secondary)' }}>{baumResult.interpretation}</p>
                  </div>

                  {/* Traits */}
                  <div className="p-6 rounded-xl" style={{ backgroundColor: 'var(--color-bg-card)', border: '1px solid var(--color-border)' }}>
                    <h3 className="font-semibold mb-3" style={{ color: 'var(--color-text)' }}>
                      {lang === 'cs' ? 'Identifikované rysy' : 'Identified Traits'}
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {baumResult.traits.map((trait, i) => (
                        <span key={i} className="px-3 py-1 rounded-full text-sm" style={{ backgroundColor: 'rgba(245, 158, 11, 0.2)', color: '#b45309' }}>
                          {trait}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Recommendations */}
                  <div className="p-6 rounded-xl" style={{ backgroundColor: 'rgba(16, 185, 129, 0.1)', border: '1px solid rgba(16, 185, 129, 0.3)' }}>
                    <h3 className="font-semibold mb-3 text-green-700">
                      {lang === 'cs' ? 'Doporučení' : 'Recommendations'}
                    </h3>
                    <ul className="space-y-2">
                      {baumResult.recommendations.map((rec, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm" style={{ color: 'var(--color-text)' }}>
                          <Check className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                          {rec}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-4">
                    <button
                      onClick={() => {
                        setBaumPhase('intro');
                        setBaumResult(null);
                      }}
                      className="flex-1 py-3 font-medium rounded-lg transition-all"
                      style={{ backgroundColor: 'var(--color-bg-card)', border: '1px solid var(--color-border)', color: 'var(--color-text)' }}
                    >
                      {lang === 'cs' ? 'Zkusit znovu' : 'Try Again'}
                    </button>
                    <button
                      onClick={() => setView('results')}
                      className="flex-1 py-3 text-white font-semibold rounded-lg transition-all"
                      style={{ background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)' }}
                    >
                      {lang === 'cs' ? 'Zobrazit všechny výsledky' : 'View All Results'}
                    </button>
                  </div>
                </div>
              )}

              {/* Back button for all phases except done */}
              {baumPhase !== 'done' && (
                <button
                  onClick={() => setView('dashboard')}
                  className="flex items-center gap-2 mx-auto mt-6 text-sm"
                  style={{ color: 'var(--color-text-muted)' }}
                >
                  <ChevronLeft className="w-4 h-4" />
                  {lang === 'cs' ? 'Zpět na přehled' : 'Back to Dashboard'}
                </button>
              )}
            </div>
          </div>
        )}

        {view === 'results' && renderResults()}
      </main>
      {renderStudentsModal()}

      {/* AI Feedback Modal - shown after each test */}
      {showFeedbackModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4" onClick={() => setShowFeedbackModal(false)}>
          <div
            className="bg-white w-full max-w-2xl max-h-[85vh] overflow-y-auto"
            style={{ borderRadius: 'var(--radius-lg)', boxShadow: 'var(--shadow-lg)' }}
            onClick={e => e.stopPropagation()}
          >
            {isFeedbackLoading ? (
              <div className="p-12 text-center">
                <div className="flex justify-center mb-4">
                  <div className="w-12 h-12 border-4 border-t-transparent rounded-full animate-spin" style={{ borderColor: 'var(--color-primary)', borderTopColor: 'transparent' }}></div>
                </div>
                <p className="text-lg font-medium" style={{ color: 'var(--color-text)' }}>Generuji AI doporučení...</p>
                <p className="text-sm mt-2" style={{ color: 'var(--color-text-secondary)' }}>Analyzuji tvůj výsledek a připravuji personalizované tipy</p>
              </div>
            ) : currentFeedback && (
              <>
                {/* Header */}
                <div className="px-6 py-4 flex items-center justify-between" style={{ borderBottom: '1px solid var(--color-border)', background: 'linear-gradient(135deg, #C5A059 0%, #8B7355 100%)' }}>
                  <div className="flex items-center gap-3">
                    <Sparkles className="w-6 h-6 text-white" />
                    <h2 className="text-lg font-serif font-semibold text-white">{currentFeedback.title}</h2>
                  </div>
                  <button onClick={() => setShowFeedbackModal(false)} className="text-white/80 hover:text-white">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                  </button>
                </div>

                {/* Content */}
                <div className="p-6 space-y-6">
                  {/* AI Feedback */}
                  <div>
                    <h3 className="text-xs font-semibold uppercase tracking-wider mb-3 flex items-center gap-2" style={{ color: 'var(--color-primary)' }}>
                      <MessageCircle className="w-4 h-4" /> Co to znamená pro tebe
                    </h3>
                    <div className="prose prose-sm max-w-none" style={{ color: 'var(--color-text)' }}>
                      <ReactMarkdown>{currentFeedback.feedback}</ReactMarkdown>
                    </div>
                  </div>

                  {/* Action Steps */}
                  {currentFeedback.actionSteps.length > 0 && (
                    <div>
                      <h3 className="text-xs font-semibold uppercase tracking-wider mb-3 flex items-center gap-2" style={{ color: 'var(--color-primary)' }}>
                        <Check className="w-4 h-4" /> Co můžeš udělat HNED
                      </h3>
                      <div className="space-y-2">
                        {currentFeedback.actionSteps.map((step, i) => (
                          <div key={i} className="flex gap-3 p-3" style={{ backgroundColor: 'var(--color-bg)', borderRadius: 'var(--radius-md)' }}>
                            <div className="flex-shrink-0 w-6 h-6 flex items-center justify-center font-bold text-xs" style={{ backgroundColor: 'var(--color-primary)', color: '#fff', borderRadius: 'var(--radius-full)' }}>
                              {i + 1}
                            </div>
                            <p className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>{step}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Resources */}
                  {currentFeedback.resources.length > 0 && (
                    <div>
                      <h3 className="text-xs font-semibold uppercase tracking-wider mb-3 flex items-center gap-2" style={{ color: 'var(--color-primary)' }}>
                        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                        </svg>
                        Doporučené zdroje
                      </h3>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        {currentFeedback.resources.map((resource, i) => (
                          <a
                            key={i}
                            href={resource.videoId ? `https://www.youtube.com/watch?v=${resource.videoId}` : '#'}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="block p-3 hover:-translate-y-0.5 transition-all"
                            style={{ backgroundColor: 'var(--color-bg)', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)' }}
                          >
                            {resource.videoId && (
                              <div className="relative aspect-video mb-2 rounded overflow-hidden">
                                <img
                                  src={`https://img.youtube.com/vi/${resource.videoId}/mqdefault.jpg`}
                                  alt={resource.title}
                                  className="w-full h-full object-cover"
                                />
                                <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                                  <div className="w-8 h-8 flex items-center justify-center bg-red-600 rounded-full">
                                    <svg className="w-3 h-3 text-white ml-0.5" fill="currentColor" viewBox="0 0 24 24">
                                      <path d="M8 5v14l11-7z"/>
                                    </svg>
                                  </div>
                                </div>
                              </div>
                            )}
                            <p className="font-medium text-xs mb-1" style={{ color: 'var(--color-text)' }}>{resource.title}</p>
                            <p className="text-xs line-clamp-2" style={{ color: 'var(--color-text-muted)' }}>{resource.description}</p>
                          </a>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Footer */}
                <div className="px-6 py-4 flex justify-end gap-3" style={{ borderTop: '1px solid var(--color-border)' }}>
                  <button
                    onClick={() => setShowFeedbackModal(false)}
                    className="px-6 py-2.5 font-medium text-white transition-all hover:opacity-90"
                    style={{ backgroundColor: 'var(--color-primary)', borderRadius: 'var(--radius-md)' }}
                  >
                    Pokračovat na výsledky
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}

      {/* API Key Modal */}
      {showApiKeyModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4" onClick={() => setShowApiKeyModal(false)}>
          <div className="bg-white w-full max-w-md" style={{ borderRadius: 'var(--radius-lg)', boxShadow: 'var(--shadow-lg)' }} onClick={e => e.stopPropagation()}>
            <div className="px-6 py-4 flex items-center justify-between" style={{ borderBottom: '1px solid var(--color-border)', background: 'linear-gradient(135deg, #C5A059 0%, #8B7355 100%)' }}>
              <div className="flex items-center gap-3">
                <Settings className="w-5 h-5 text-white" />
                <h2 className="text-lg font-serif font-semibold text-white">{lang === 'cs' ? 'Nastavení API klíče' : 'API Key Settings'}</h2>
              </div>
              <button onClick={() => setShowApiKeyModal(false)} className="text-white/70 hover:text-white text-xl">&times;</button>
            </div>
            <div className="p-6 space-y-4">
              <p className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>
                {lang === 'cs'
                  ? 'Pro AI syntézu, koučink a zpětnou vazbu potřebuješ OpenAI API klíč. Klíč se ukládá pouze v tvém prohlížeči.'
                  : 'For AI synthesis, coaching, and feedback you need an OpenAI API key. The key is stored only in your browser.'}
              </p>
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider mb-2" style={{ color: 'var(--color-text-muted)' }}>
                  OpenAI API Key
                </label>
                <input
                  type="password"
                  value={apiKeyInput}
                  onChange={e => setApiKeyInput(e.target.value)}
                  placeholder="sk-..."
                  className="w-full px-4 py-3 text-sm border outline-none focus:ring-2 focus:ring-amber-500"
                  style={{ borderColor: 'var(--color-border)', borderRadius: 'var(--radius-md)', color: 'var(--color-text)' }}
                />
              </div>
              <div className="flex gap-3 justify-end pt-2">
                <button
                  onClick={() => setShowApiKeyModal(false)}
                  className="px-4 py-2 text-sm font-medium transition-colors hover:bg-slate-100"
                  style={{ borderRadius: 'var(--radius-md)', color: 'var(--color-text-muted)' }}
                >
                  {lang === 'cs' ? 'Zrušit' : 'Cancel'}
                </button>
                <button
                  onClick={() => {
                    navigatorService.setApiKey(apiKeyInput.trim());
                    setShowApiKeyModal(false);
                  }}
                  className="px-6 py-2 text-sm font-medium text-white transition-all hover:opacity-90"
                  style={{ backgroundColor: 'var(--color-primary)', borderRadius: 'var(--radius-md)' }}
                >
                  {lang === 'cs' ? 'Uložit' : 'Save'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
