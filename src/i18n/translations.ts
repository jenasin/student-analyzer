// Internationalization translations
export type Language = 'cs' | 'en';

export const translations = {
  // Header
  greeting: {
    cs: 'Ahoj',
    en: 'Hello'
  },
  academicNavigator: {
    cs: 'Akademický Navigátor',
    en: 'Academic Navigator'
  },
  studyProfile: {
    cs: 'studijní profil',
    en: 'study profile'
  },
  selectTest: {
    cs: 'Vyber si test a začni. Můžeš je dělat v libovolném pořadí.',
    en: 'Select a test and start. You can complete them in any order.'
  },
  ofDone: {
    cs: 'hotovo',
    en: 'done'
  },
  done: {
    cs: 'Hotovo',
    en: 'Done'
  },

  // Buttons
  startTest: {
    cs: 'Začít test',
    en: 'Start Test'
  },
  showResults: {
    cs: 'Zobrazit výsledky',
    en: 'Show Results'
  },
  showCompleteProfile: {
    cs: 'Zobrazit kompletní profil',
    en: 'Show Complete Profile'
  },
  back: {
    cs: 'Zpět',
    en: 'Back'
  },
  next: {
    cs: 'Další',
    en: 'Next'
  },
  finish: {
    cs: 'Dokončit',
    en: 'Finish'
  },
  openApp: {
    cs: 'Otevřít aplikaci',
    en: 'Open App'
  },

  // Module titles
  modules: {
    typology: {
      title: { cs: 'Jak přemýšlíš', en: 'How You Think' },
      description: {
        cs: 'Zjisti svůj myšlenkový styl: abstraktní vs konkrétní, aktivní vs reflektivní, vizuální vs verbální.',
        en: 'Discover your thinking style: abstract vs concrete, active vs reflective, visual vs verbal.'
      },
      tags: { cs: ['30 otázek', 'Typologie', 'Myšlení'], en: ['30 questions', 'Typology', 'Thinking'] }
    },
    vak: {
      title: { cs: 'Učební styl (VAK)', en: 'Learning Style (VAK)' },
      description: {
        cs: 'Jsi vizuální, auditivní nebo kinestetický typ? Zjisti, jak se nejlépe učíš.',
        en: 'Are you a visual, auditory, or kinesthetic learner? Discover how you learn best.'
      },
      tags: { cs: ['10 otázek', 'VAK test', 'Učení'], en: ['10 questions', 'VAK test', 'Learning'] }
    },
    chat: {
      title: { cs: 'AI Koučink', en: 'AI Coaching' },
      description: {
        cs: 'Interaktivní rozhovor s AI mentorem o tvých zájmech, studiu a silných stránkách.',
        en: 'Interactive conversation with an AI mentor about your interests, studies, and strengths.'
      },
      tags: { cs: ['GPT-4o', 'Rozhovor', 'Personalizace'], en: ['GPT-4o', 'Conversation', 'Personalization'] }
    },
    habits: {
      title: { cs: 'Studijní návyky', en: 'Study Habits' },
      description: {
        cs: 'Analyzuj své studijní návyky: plánování, prokrastinace, soustředění a práce s časem.',
        en: 'Analyze your study habits: planning, procrastination, focus, and time management.'
      },
      tags: { cs: ['8 otázek', 'Time management', 'Produktivita'], en: ['8 questions', 'Time management', 'Productivity'] }
    },
    motivation: {
      title: { cs: 'Motivace', en: 'Motivation' },
      description: {
        cs: 'Co tě pohání vpřed? Zjisti svůj typ motivace a jak ji využít pro lepší výsledky.',
        en: 'What drives you forward? Discover your motivation type and how to leverage it for better results.'
      },
      tags: { cs: ['8 otázek', 'Vnitřní motivace', 'Cíle'], en: ['8 questions', 'Intrinsic motivation', 'Goals'] }
    },
    strengths: {
      title: { cs: 'Silné stránky', en: 'Strengths' },
      description: {
        cs: 'Objeví své talenty a oblasti, ve kterých vynikáš. Analytika, kreativita nebo komunikace?',
        en: 'Discover your talents and areas where you excel. Analytics, creativity, or communication?'
      },
      tags: { cs: ['6 otázek', 'Talent', 'Sebepoznání'], en: ['6 questions', 'Talent', 'Self-awareness'] }
    },
    gemini: {
      title: { cs: 'Gemini AI Studio', en: 'Gemini AI Studio' },
      description: {
        cs: 'Otevři Google AI Studio a vyzkoušej nejnovější Gemini modely pro analýzu a generování.',
        en: 'Open Google AI Studio and try the latest Gemini models for analysis and generation.'
      },
      tags: { cs: ['Web app', 'Gemini 2.5', 'Google AI'], en: ['Web app', 'Gemini 2.5', 'Google AI'] }
    },
    growthMindset: {
      title: { cs: 'Growth Mindset', en: 'Growth Mindset' },
      description: {
        cs: 'Zjisti, jestli máš fixní nebo růstové myšlení. Klíč k rozvoji schopností (Carol Dweck).',
        en: 'Discover if you have a fixed or growth mindset. Key to developing abilities (Carol Dweck).'
      },
      tags: { cs: ['8 otázek', 'Dweck', 'Myšlení'], en: ['8 questions', 'Dweck', 'Mindset'] }
    },
    grit: {
      title: { cs: 'Grit (Vytrvalost)', en: 'Grit (Perseverance)' },
      description: {
        cs: 'Změř svou vytrvalost a vášeň pro dlouhodobé cíle (Angela Duckworth).',
        en: 'Measure your perseverance and passion for long-term goals (Angela Duckworth).'
      },
      tags: { cs: ['8 otázek', 'Duckworth', 'Vytrvalost'], en: ['8 questions', 'Duckworth', 'Perseverance'] }
    },
    selfEfficacy: {
      title: { cs: 'Self-Efficacy', en: 'Self-Efficacy' },
      description: {
        cs: 'Jak moc věříš ve své schopnosti? Klíčový prediktor úspěchu (Albert Bandura).',
        en: 'How much do you believe in your abilities? Key predictor of success (Albert Bandura).'
      },
      tags: { cs: ['8 otázek', 'Bandura', 'Sebevědomí'], en: ['8 questions', 'Bandura', 'Confidence'] }
    },
    testAnxiety: {
      title: { cs: 'Testová úzkost', en: 'Test Anxiety' },
      description: {
        cs: 'Jak moc tě stresují zkoušky? Najdi strategie pro zvládání.',
        en: 'How much do exams stress you? Find strategies for coping.'
      },
      tags: { cs: ['8 otázek', 'Stres', 'Zkoušky'], en: ['8 questions', 'Stress', 'Exams'] }
    },
    metacognition: {
      title: { cs: 'Metakognice', en: 'Metacognition' },
      description: {
        cs: 'Jak dobře znáš své vlastní myšlení a učení? "Učení se učit".',
        en: 'How well do you know your own thinking and learning? "Learning to learn".'
      },
      tags: { cs: ['8 otázek', 'Učení', 'Strategie'], en: ['8 questions', 'Learning', 'Strategies'] }
    },
    riasec: {
      title: { cs: 'RIASEC (Kariéra)', en: 'RIASEC (Career)' },
      description: {
        cs: 'Holland test kariérních zájmů. Zjisti, které obory ti sedí.',
        en: 'Holland career interest test. Discover which fields suit you.'
      },
      tags: { cs: ['12 otázek', 'Holland', 'Kariéra'], en: ['12 questions', 'Holland', 'Career'] }
    },
    eq: {
      title: { cs: 'Emoční inteligence', en: 'Emotional Intelligence' },
      description: {
        cs: 'Jak dobře rozumíš emocím svým i ostatních? EQ test.',
        en: 'How well do you understand your emotions and others? EQ test.'
      },
      tags: { cs: ['8 otázek', 'EQ', 'Empatie'], en: ['8 questions', 'EQ', 'Empathy'] }
    },
    stroop: {
      title: { cs: 'Stroop Test (Kamera)', en: 'Stroop Test (Camera)' },
      description: {
        cs: 'Validovaný kognitivní test měřící pozornost, rychlost a kognitivní flexibilitu. S kamerou!',
        en: 'Validated cognitive test measuring attention, speed, and cognitive flexibility. With camera!'
      },
      tags: { cs: ['24 úkolů', 'Pozornost', 'Kamera'], en: ['24 tasks', 'Attention', 'Camera'] }
    },
    mentalRotation: {
      title: { cs: 'Prostorová představivost', en: 'Spatial Visualization' },
      description: {
        cs: 'Test mentální rotace (Shepard & Metzler). Měří prostorovou představivost - klíčová dovednost pro STEM obory.',
        en: 'Mental rotation test (Shepard & Metzler). Measures spatial visualization - a key skill for STEM fields.'
      },
      tags: { cs: ['16 úkolů', 'Prostorové myšlení', 'STEM'], en: ['16 tasks', 'Spatial thinking', 'STEM'] }
    },
    voiceInterview: {
      title: { cs: 'Hlasový rozhovor', en: 'Voice Interview' },
      description: {
        cs: 'AI rozhovor o tvých studijních návycích a cílech. Mluv a AI ti odpoví.',
        en: 'AI conversation about your study habits and goals. Speak and AI responds.'
      },
      tags: { cs: ['Mikrofon', 'AI', 'Rozhovor'], en: ['Microphone', 'AI', 'Interview'] }
    },
    emotionRecognition: {
      title: { cs: 'Rozpoznávání emocí', en: 'Emotion Recognition' },
      description: {
        cs: 'Sleduj své emoce během testů pomocí kamery a AI.',
        en: 'Track your emotions during tests using camera and AI.'
      },
      tags: { cs: ['Kamera', 'AI', 'Emoce'], en: ['Camera', 'AI', 'Emotions'] }
    },
    mathReasoning: {
      title: { cs: 'Matematické uvažování', en: 'Math Reasoning' },
      description: {
        cs: 'Nahraj video řešení příkladu a AI analyzuje tvůj postup.',
        en: 'Record video of solving a problem and AI analyzes your approach.'
      },
      tags: { cs: ['Video', 'GPT-4 Vision', 'Matematika'], en: ['Video', 'GPT-4 Vision', 'Math'] }
    },
    garminHealth: {
      title: { cs: 'Garmin Health', en: 'Garmin Health' },
      description: {
        cs: 'Propoj hodinky Garmin a sleduj stres během testů.',
        en: 'Connect your Garmin watch and track stress during tests.'
      },
      tags: { cs: ['Hodinky', 'HRV', 'Stres'], en: ['Watch', 'HRV', 'Stress'] }
    },
    baumTest: {
      title: { cs: 'Baum Test (Kreativita)', en: 'Tree Test (Creativity)' },
      description: {
        cs: 'Nakresli strom a AI analyzuje tvou kreativitu a osobnost (Koch, 1952).',
        en: 'Draw a tree and AI analyzes your creativity and personality (Koch, 1952).'
      },
      tags: { cs: ['Kresba', 'Kreativita', 'Psychologie'], en: ['Drawing', 'Creativity', 'Psychology'] }
    },
    procrastination: {
      title: { cs: 'Akademická prokrastinace', en: 'Academic Procrastination' },
      description: {
        cs: 'Odkládáš studium? Zjisti míru prokrastinace a strategie na její překonání (Solomon & Rothblum).',
        en: 'Do you delay studying? Measure your procrastination level and find strategies to overcome it (Solomon & Rothblum).'
      },
      tags: { cs: ['8 otázek', 'Prokrastinace', 'Návyky'], en: ['8 questions', 'Procrastination', 'Habits'] }
    },
    academicMotivation: {
      title: { cs: 'Akademická motivace', en: 'Academic Motivation' },
      description: {
        cs: 'Studuješ z vlastního zájmu nebo kvůli vnějším tlakům? Test dle Self-Determination Theory (Vallerand).',
        en: 'Do you study from personal interest or external pressure? Based on Self-Determination Theory (Vallerand).'
      },
      tags: { cs: ['8 otázek', 'SDT', 'Motivace'], en: ['8 questions', 'SDT', 'Motivation'] }
    },
    timeManagement: {
      title: { cs: 'Time Management', en: 'Time Management' },
      description: {
        cs: 'Jak efektivně si organizuješ čas? Plánování, priority a rovnováha studia a volna (Macan).',
        en: 'How effectively do you organize your time? Planning, priorities, and study-life balance (Macan).'
      },
      tags: { cs: ['8 otázek', 'Plánování', 'Produktivita'], en: ['8 questions', 'Planning', 'Productivity'] }
    },
    bigFive: {
      title: { cs: 'Big Five (Osobnost)', en: 'Big Five (Personality)' },
      description: {
        cs: 'Krátký osobnostní profil: extraverze, přívětivost, svědomitost, stabilita, otevřenost (Gosling TIPI).',
        en: 'Brief personality profile: extraversion, agreeableness, conscientiousness, stability, openness (Gosling TIPI).'
      },
      tags: { cs: ['10 otázek', 'TIPI', 'Osobnost'], en: ['10 questions', 'TIPI', 'Personality'] }
    },
    locusOfControl: {
      title: { cs: 'Locus of Control', en: 'Locus of Control' },
      description: {
        cs: 'Věříš, že tvé výsledky závisí na tobě, nebo na okolnostech? Akademický locus of control (Rotter).',
        en: 'Do you believe your results depend on you or on circumstances? Academic locus of control (Rotter).'
      },
      tags: { cs: ['8 otázek', 'Rotter', 'Kontrola'], en: ['8 questions', 'Rotter', 'Control'] }
    },
    resilience: {
      title: { cs: 'Resilience (Odolnost)', en: 'Resilience' },
      description: {
        cs: 'Jak rychle se vzpamatováváš z neúspěchů a stresu? Brief Resilience Scale (Smith et al.).',
        en: 'How quickly do you bounce back from setbacks and stress? Brief Resilience Scale (Smith et al.).'
      },
      tags: { cs: ['8 otázek', 'BRS', 'Odolnost'], en: ['8 questions', 'BRS', 'Resilience'] }
    },
    gardner: {
      title: { cs: 'Mnohočetné inteligence', en: 'Multiple Intelligences' },
      description: { cs: 'Zjisti své silné typy inteligence podle Gardnerovy teorie (1983). Jazykový, logický, prostorový nebo hudební typ?', en: 'Discover your intelligence types according to Gardner\'s theory (1983). Linguistic, logical, spatial, or musical type?' },
      tags: { cs: ['16 otázek', 'Gardner', 'Inteligence'], en: ['16 questions', 'Gardner', 'Intelligence'] }
    },
    kolb: {
      title: { cs: 'Kolbův učební styl', en: 'Kolb Learning Style' },
      description: { cs: 'Jak se učíš? Zkušeností, pozorováním, teorií nebo experimentováním? Kolbův cyklus učení (1984).', en: 'How do you learn? By experience, observation, theory, or experimentation? Kolb\'s learning cycle (1984).' },
      tags: { cs: ['12 otázek', 'Kolb', 'Učební cyklus'], en: ['12 questions', 'Kolb', 'Learning cycle'] }
    }
  },

  // Results
  results: {
    title: { cs: 'Tvůj profil', en: 'Your Profile' },
    overview: { cs: 'Přehled výsledků', en: 'Results Overview' },
    synthesis: { cs: 'AI Syntéza', en: 'AI Synthesis' },
    coaching: { cs: 'AI Koučink', en: 'AI Coaching' },
    completeResults: { cs: 'Kompletní přehled všech výsledků', en: 'Complete overview of all results' }
  },

  // Time
  minutes: {
    cs: 'min',
    en: 'min'
  },
  questions: {
    cs: 'otázek',
    en: 'questions'
  },
  tasks: {
    cs: 'úkolů',
    en: 'tasks'
  },

  // Misc
  external: {
    cs: 'Externí',
    en: 'External'
  },
  practice: {
    cs: 'Cvičení',
    en: 'Practice'
  }
};

// Helper function to get translation
export function t(key: keyof typeof translations, lang: Language): string {
  const entry = translations[key];
  if (typeof entry === 'object' && 'cs' in entry && 'en' in entry) {
    return entry[lang] as string;
  }
  return key;
}

// Helper for module translations
export function tModule(
  moduleId: string,
  field: 'title' | 'description' | 'tags',
  lang: Language
): string | string[] {
  const mod = (translations.modules as any)[moduleId];
  if (mod && mod[field]) {
    return mod[field][lang];
  }
  return field === 'tags' ? [] : moduleId;
}
