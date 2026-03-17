// Cross-Assessment Synthesis Engine
// Rule-based insights derived from scientific literature
// Each rule fires when specific result combinations are detected

import { Language } from '../i18n/translations';

export interface SynthesisInsight {
  id: string;
  title: { cs: string; en: string };
  description: { cs: string; en: string };
  source: string;
  type: 'strength' | 'risk' | 'opportunity';
  icon: string; // emoji
}

interface AssessmentScores {
  growthMindset?: number;
  grit?: number;
  selfEfficacy?: number;
  testAnxiety?: number; // higher = less anxiety
  metacognition?: number;
  eq?: number;
  procrastination?: number; // higher = less procrastination
  academicMotivation?: number;
  timeManagement?: number;
  locusOfControl?: number;
  resilience?: number;
  // Big Five dimensions (percent)
  extraversion?: number;
  agreeableness?: number;
  conscientiousness?: number;
  emotionalStability?: number;
  openness?: number;
  // Other
  vakType?: string;
  riasecCode?: string;
  stroopAccuracy?: number;
  mentalRotationAccuracy?: number;
}

type Rule = {
  id: string;
  condition: (s: AssessmentScores) => boolean;
  insight: SynthesisInsight;
};

const rules: Rule[] = [
  // ============================================
  // STRENGTH combinations
  // ============================================
  {
    id: 'grit_growth',
    condition: (s) => (s.grit ?? 0) >= 70 && (s.growthMindset ?? 0) >= 70,
    insight: {
      id: 'grit_growth',
      title: { cs: 'Vytrvalost + Růstové myšlení', en: 'Grit + Growth Mindset' },
      description: {
        cs: 'Kombinace vysoké vytrvalosti a růstového myšlení je nejsilnějším prediktorem akademické resilience. Neúspěchy tě nezlomí – vnímáš je jako příležitost k učení.',
        en: 'The combination of high grit and growth mindset is the strongest predictor of academic resilience. Setbacks don\'t break you – you see them as learning opportunities.'
      },
      source: 'Duckworth & Yeager (2015). Measurement matters. Educational Researcher.',
      type: 'strength',
      icon: '🏆'
    }
  },
  {
    id: 'high_metacognition_efficacy',
    condition: (s) => (s.metacognition ?? 0) >= 70 && (s.selfEfficacy ?? 0) >= 70,
    insight: {
      id: 'high_metacognition_efficacy',
      title: { cs: 'Efektivní sebeřízené učení', en: 'Effective Self-Regulated Learning' },
      description: {
        cs: 'Vysoká metakognice spojená s vírou ve vlastní schopnosti je klíčem k sebeřízenému učení. Víš, jak se učíš, a věříš, že to zvládneš.',
        en: 'High metacognition combined with self-efficacy belief is key to self-regulated learning. You know how you learn and believe you can succeed.'
      },
      source: 'Zimmerman (2000). Self-efficacy and self-regulated learning. J. of Educational Psychology.',
      type: 'strength',
      icon: '🧠'
    }
  },
  {
    id: 'internal_locus_grit',
    condition: (s) => (s.locusOfControl ?? 0) >= 70 && (s.grit ?? 0) >= 65,
    insight: {
      id: 'internal_locus_grit',
      title: { cs: 'Proaktivní přístup ke studiu', en: 'Proactive Study Approach' },
      description: {
        cs: 'Věříš, že výsledky závisí na tobě, a máš vytrvalost to dotáhnout. Tento profil je spojen s vyšším studijním průměrem a nižším rizikem studijního selhání.',
        en: 'You believe results depend on you and have perseverance to follow through. This profile is linked to higher GPA and lower risk of academic failure.'
      },
      source: 'Findley & Cooper (1983). Locus of control and academic achievement. J. of Personality & Social Psychology.',
      type: 'strength',
      icon: '🎯'
    }
  },
  {
    id: 'eq_agreeableness',
    condition: (s) => (s.eq ?? 0) >= 70 && (s.agreeableness ?? 0) >= 65,
    insight: {
      id: 'eq_agreeableness',
      title: { cs: 'Silné sociální dovednosti', en: 'Strong Social Skills' },
      description: {
        cs: 'Vysoká emoční inteligence v kombinaci s přívětivostí předpovídá úspěch v týmové práci a vedení skupinových projektů.',
        en: 'High emotional intelligence combined with agreeableness predicts success in teamwork and leading group projects.'
      },
      source: 'Petrides et al. (2004). Trait emotional intelligence and academic performance. Learning & Individual Differences.',
      type: 'strength',
      icon: '🤝'
    }
  },
  {
    id: 'time_conscientiousness',
    condition: (s) => (s.timeManagement ?? 0) >= 70 && (s.conscientiousness ?? 0) >= 65,
    insight: {
      id: 'time_conscientiousness',
      title: { cs: 'Organizovaný a spolehlivý student', en: 'Organized and Reliable Student' },
      description: {
        cs: 'Svědomitost spojená s dobrým time managementem je konzistentně nejsilnějším osobnostním prediktorem akademického úspěchu napříč kulturami.',
        en: 'Conscientiousness combined with good time management is consistently the strongest personality predictor of academic success across cultures.'
      },
      source: 'Poropat (2009). A meta-analysis of the Big Five and academic performance. Psychological Bulletin.',
      type: 'strength',
      icon: '📋'
    }
  },
  {
    id: 'resilience_growth',
    condition: (s) => (s.resilience ?? 0) >= 70 && (s.growthMindset ?? 0) >= 65,
    insight: {
      id: 'resilience_growth',
      title: { cs: 'Psychická odolnost', en: 'Psychological Hardiness' },
      description: {
        cs: 'Vysoká resilience a růstové myšlení společně chrání před vyhoření a studijním stresem. Zkoušková období zvládáš lépe než ostatní.',
        en: 'High resilience and growth mindset together protect against burnout and academic stress. You handle exam periods better than others.'
      },
      source: 'Yeager & Dweck (2012). Mindsets that promote resilience. American Psychologist.',
      type: 'strength',
      icon: '💪'
    }
  },
  {
    id: 'intrinsic_motivation_openness',
    condition: (s) => (s.academicMotivation ?? 0) >= 70 && (s.openness ?? 0) >= 65,
    insight: {
      id: 'intrinsic_motivation_openness',
      title: { cs: 'Vnitřně motivovaný badatel', en: 'Intrinsically Motivated Explorer' },
      description: {
        cs: 'Vnitřní motivace ke studiu a otevřenost zkušenosti je profil typický pro budoucí výzkumníky a inovátory. Studium tě baví samo o sobě.',
        en: 'Intrinsic study motivation and openness to experience is a profile typical of future researchers and innovators. You enjoy studying for its own sake.'
      },
      source: 'Ryan & Deci (2000). Self-determination theory and intrinsic motivation. American Psychologist.',
      type: 'strength',
      icon: '🔬'
    }
  },
  {
    id: 'stroop_mental_rotation',
    condition: (s) => (s.stroopAccuracy ?? 0) >= 85 && (s.mentalRotationAccuracy ?? 0) >= 75,
    insight: {
      id: 'stroop_mental_rotation',
      title: { cs: 'Silný kognitivní profil', en: 'Strong Cognitive Profile' },
      description: {
        cs: 'Vysoká přesnost ve Stroop testu i mentální rotaci ukazuje na silnou pozornost i prostorové myšlení – výhoda v STEM oborech.',
        en: 'High accuracy in both Stroop and mental rotation indicates strong attention and spatial thinking – an advantage in STEM fields.'
      },
      source: 'Wai et al. (2009). Spatial ability for STEM domains. J. of Educational Psychology.',
      type: 'strength',
      icon: '⚡'
    }
  },

  // ============================================
  // RISK combinations
  // ============================================
  {
    id: 'procrastination_poor_time',
    condition: (s) => (s.procrastination ?? 100) < 40 && (s.timeManagement ?? 100) < 40,
    insight: {
      id: 'procrastination_poor_time',
      title: { cs: 'Kritická kombinace: Prokrastinace + Slabý time management', en: 'Critical: Procrastination + Poor Time Management' },
      description: {
        cs: 'Tato kombinace je nejsilnějším prediktorem akademického neúspěchu. Doporučení: začni s 2minutovým pravidlem – jakýkoli úkol, který zabere méně než 2 minuty, udělej hned.',
        en: 'This combination is the strongest predictor of academic failure. Recommendation: start with the 2-minute rule – any task taking less than 2 minutes, do it immediately.'
      },
      source: 'Steel (2007). The nature of procrastination: A meta-analytic review. Psychological Bulletin.',
      type: 'risk',
      icon: '⚠️'
    }
  },
  {
    id: 'low_efficacy_high_anxiety',
    condition: (s) => (s.selfEfficacy ?? 100) < 40 && (s.testAnxiety ?? 100) < 40,
    insight: {
      id: 'low_efficacy_high_anxiety',
      title: { cs: 'Bludný kruh: Nízká sebedůvěra × Vysoká úzkost', en: 'Vicious Cycle: Low Self-Efficacy × High Anxiety' },
      description: {
        cs: 'Nízká víra ve vlastní schopnosti zesiluje úzkost, a úzkost dále snižuje sebedůvěru. Klíč k prolomení: buduj malé úspěchy (Bandura) a nauč se dechová cvičení.',
        en: 'Low belief in your abilities amplifies anxiety, and anxiety further reduces self-confidence. Key to breaking the cycle: build small successes (Bandura) and learn breathing exercises.'
      },
      source: 'Bandura (1997). Self-efficacy: The exercise of control. W. H. Freeman.',
      type: 'risk',
      icon: '🔄'
    }
  },
  {
    id: 'external_locus_low_resilience',
    condition: (s) => (s.locusOfControl ?? 100) < 40 && (s.resilience ?? 100) < 40,
    insight: {
      id: 'external_locus_low_resilience',
      title: { cs: 'Naučená bezmoc', en: 'Learned Helplessness Pattern' },
      description: {
        cs: 'Kombinace vnějšího locus of control a nízké resilience může vést k naučené bezmoci – pocitu, že nemůžeš nic změnit. Důležité: každý malý krok, který uděláš, je důkaz, že kontrolu MÁŠ.',
        en: 'Combination of external locus of control and low resilience can lead to learned helplessness – feeling you can\'t change anything. Important: every small step you take proves you DO have control.'
      },
      source: 'Seligman (1975). Helplessness: On Depression, Development, and Death. W. H. Freeman.',
      type: 'risk',
      icon: '🚨'
    }
  },
  {
    id: 'low_motivation_procrastination',
    condition: (s) => (s.academicMotivation ?? 100) < 40 && (s.procrastination ?? 100) < 45,
    insight: {
      id: 'low_motivation_procrastination',
      title: { cs: 'Motivační krize', en: 'Motivation Crisis' },
      description: {
        cs: 'Nízká motivace ke studiu v kombinaci s prokrastinací naznačuje, že studuješ obor, který tě nezajímá, nebo nemáš jasný cíl. Zvažuj kariérní poradenství.',
        en: 'Low study motivation combined with procrastination suggests you may be studying a field that doesn\'t interest you or lack a clear goal. Consider career counseling.'
      },
      source: 'Vallerand et al. (1992). Academic Motivation Scale. Educational & Psychological Measurement.',
      type: 'risk',
      icon: '❓'
    }
  },
  {
    id: 'fixed_mindset_low_grit',
    condition: (s) => (s.growthMindset ?? 100) < 40 && (s.grit ?? 100) < 40,
    insight: {
      id: 'fixed_mindset_low_grit',
      title: { cs: 'Fixní myšlení × Vzdávání se', en: 'Fixed Mindset × Giving Up' },
      description: {
        cs: 'Víra, že schopnosti jsou dané, vede k rychlému vzdávání se při překážkách. Neurověda dokazuje opak: mozek se mění a roste s každým novým učením.',
        en: 'Belief that abilities are fixed leads to quick surrender when facing obstacles. Neuroscience proves otherwise: the brain changes and grows with every new learning.'
      },
      source: 'Dweck (2006). Mindset: The New Psychology of Success. Random House.',
      type: 'risk',
      icon: '🧱'
    }
  },
  {
    id: 'low_metacognition_low_efficacy',
    condition: (s) => (s.metacognition ?? 100) < 40 && (s.selfEfficacy ?? 100) < 45,
    insight: {
      id: 'low_metacognition_low_efficacy',
      title: { cs: 'Nevím jak se učit + Nevěřím si', en: 'Don\'t Know How to Study + Don\'t Believe in Myself' },
      description: {
        cs: 'Neznalost vlastních učebních strategií snižuje výsledky, což oslabuje sebedůvěru. Začni s jednoduchou technikou: po každém učení si řekni 3 věci, co sis zapamatoval/a.',
        en: 'Not knowing your own learning strategies lowers results, which weakens self-confidence. Start simple: after each study session, name 3 things you remember.'
      },
      source: 'Flavell (1979). Metacognition and cognitive monitoring. American Psychologist.',
      type: 'risk',
      icon: '📉'
    }
  },
  {
    id: 'high_neuroticism_high_anxiety',
    condition: (s) => (s.emotionalStability ?? 100) < 35 && (s.testAnxiety ?? 100) < 40,
    insight: {
      id: 'high_neuroticism_high_anxiety',
      title: { cs: 'Emoční zranitelnost u zkoušek', en: 'Emotional Vulnerability in Exams' },
      description: {
        cs: 'Nižší emoční stabilita zesiluje testovou úzkost. Doporučení: pravidelná meditace (10 min/den) prokazatelně snižuje neurotismus i úzkost u studentů.',
        en: 'Lower emotional stability amplifies test anxiety. Recommendation: regular meditation (10 min/day) demonstrably reduces neuroticism and anxiety in students.'
      },
      source: 'Chamorro-Premuzic & Furnham (2003). Personality predicts academic performance. J. of Research in Personality.',
      type: 'risk',
      icon: '😰'
    }
  },

  // ============================================
  // OPPORTUNITY combinations
  // ============================================
  {
    id: 'high_eq_low_metacognition',
    condition: (s) => (s.eq ?? 0) >= 65 && (s.metacognition ?? 100) < 45,
    insight: {
      id: 'high_eq_low_metacognition',
      title: { cs: 'Nevyužitý potenciál: EQ bez strategie', en: 'Untapped Potential: EQ Without Strategy' },
      description: {
        cs: 'Máš dobré sociální dovednosti, ale chybí ti učební strategie. Zkus studijní skupiny – tvá EQ ti pomůže učit se efektivně s ostatními.',
        en: 'You have good social skills but lack learning strategies. Try study groups – your EQ will help you learn effectively with others.'
      },
      source: 'Goleman (1995). Emotional Intelligence. Bantam Books.',
      type: 'opportunity',
      icon: '💡'
    }
  },
  {
    id: 'growth_mindset_low_grit',
    condition: (s) => (s.growthMindset ?? 0) >= 65 && (s.grit ?? 100) < 45,
    insight: {
      id: 'growth_mindset_low_grit',
      title: { cs: 'Věříš v rozvoj, ale chybí vytrvání', en: 'Believe in Growth but Lack Persistence' },
      description: {
        cs: 'Máš růstové myšlení – to je skvělý základ. Teď potřebuješ návyky: zkus si vybrat JEDEN cíl a sleduj pokrok každý den po 30 dní.',
        en: 'You have a growth mindset – that\'s a great foundation. Now you need habits: try picking ONE goal and tracking progress every day for 30 days.'
      },
      source: 'Duckworth (2016). Grit: The Power of Passion and Perseverance. Scribner.',
      type: 'opportunity',
      icon: '🌱'
    }
  },
  {
    id: 'good_time_low_motivation',
    condition: (s) => (s.timeManagement ?? 0) >= 60 && (s.academicMotivation ?? 100) < 45,
    insight: {
      id: 'good_time_low_motivation',
      title: { cs: 'Organizovaný, ale bez nadšení', en: 'Organized but Without Passion' },
      description: {
        cs: 'Umíš si organizovat čas, ale chybí ti vnitřní motivace. Hledej propojení studia se svými zájmy – autonomie a smysluplnost zvyšují motivaci.',
        en: 'You can organize your time but lack intrinsic motivation. Find connections between studies and your interests – autonomy and meaningfulness increase motivation.'
      },
      source: 'Deci & Ryan (2000). The "what" and "why" of goal pursuits. Psychological Inquiry.',
      type: 'opportunity',
      icon: '🔑'
    }
  },
  {
    id: 'high_resilience_external_locus',
    condition: (s) => (s.resilience ?? 0) >= 60 && (s.locusOfControl ?? 100) < 45,
    insight: {
      id: 'high_resilience_external_locus',
      title: { cs: 'Odolný, ale nevěříš ve vlastní vliv', en: 'Resilient but Don\'t Believe in Your Influence' },
      description: {
        cs: 'Dokážeš se vzpamatovat z neúspěchů, ale přičítáš výsledky okolnostem. Zkus po každém úspěchu zapsat, co jsi pro něj udělal/a TY.',
        en: 'You can bounce back from failures but attribute results to circumstances. After each success, write down what YOU did for it.'
      },
      source: 'Rotter (1966). Generalized expectancies for internal vs. external control. Psychological Monographs.',
      type: 'opportunity',
      icon: '🪞'
    }
  },
  {
    id: 'visual_learner_low_stroop',
    condition: (s) => s.vakType === 'visual' && (s.stroopAccuracy ?? 100) < 70,
    insight: {
      id: 'visual_learner_low_stroop',
      title: { cs: 'Vizuální typ s nižší pozorností', en: 'Visual Learner with Lower Attention' },
      description: {
        cs: 'Preferuješ vizuální učení, ale Stroop test ukázal nižší selektivní pozornost. Zkus barevné kódování poznámek a mind mapy – využiješ vizuální sílu a zlepšíš soustředění.',
        en: 'You prefer visual learning but Stroop test showed lower selective attention. Try color-coding notes and mind maps – use visual strength and improve focus.'
      },
      source: 'Stroop (1935). Studies of interference in serial verbal reactions. J. of Experimental Psychology.',
      type: 'opportunity',
      icon: '🎨'
    }
  },
  {
    id: 'introvert_high_metacognition',
    condition: (s) => (s.extraversion ?? 100) < 40 && (s.metacognition ?? 0) >= 65,
    insight: {
      id: 'introvert_high_metacognition',
      title: { cs: 'Tichý stratég', en: 'Quiet Strategist' },
      description: {
        cs: 'Jako introvert s vysokou metakognicí máš přirozenou výhodu v hloubkovém učení. Využij samostatné studium s pravidelnou sebereflexí.',
        en: 'As an introvert with high metacognition, you have a natural advantage in deep learning. Use independent study with regular self-reflection.'
      },
      source: 'Furnham & Chamorro-Premuzic (2004). Personality and intelligence as predictors of academic performance. Personality & Individual Differences.',
      type: 'opportunity',
      icon: '🦉'
    }
  }
];

export function generateCrossSynthesis(scores: AssessmentScores): SynthesisInsight[] {
  return rules
    .filter(rule => rule.condition(scores))
    .map(rule => rule.insight);
}

export function getSynthesisTitle(insight: SynthesisInsight, lang: Language): string {
  return insight.title[lang];
}

export function getSynthesisDescription(insight: SynthesisInsight, lang: Language): string {
  return insight.description[lang];
}

export { AssessmentScores };
