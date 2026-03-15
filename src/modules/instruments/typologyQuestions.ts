/**
 * Typology Test - 30 questions (A-D)
 * Based on: ILS (Felder-Silverman), Kolb, VARK
 *
 * 5 dimensions:
 * D1: Abstract vs. Concrete (8 questions)
 * D2: Active vs. Reflective (6 questions)
 * D3: Visual vs. Verbal (6 questions)
 * D4: Sequential vs. Global (6 questions)
 * D5: Structure vs. Flexibility (4 questions)
 */

import { Language } from '../../i18n/translations';

export type AnswerKey = 'A' | 'B' | 'C' | 'D';

export type DimensionId = 'D1' | 'D2' | 'D3' | 'D4' | 'D5';

export type DimensionSide = 'left' | 'right';

export interface TypologyOption {
  key: AnswerKey;
  text: { cs: string; en: string };
  side: DimensionSide;
}

export interface TypologyQuestion {
  id: string;
  dimension: DimensionId;
  text: { cs: string; en: string };
  options: TypologyOption[];
}

export interface DimensionMeta {
  id: DimensionId;
  leftLabel: { cs: string; en: string };
  rightLabel: { cs: string; en: string };
  leftDescription: { cs: string; en: string };
  rightDescription: { cs: string; en: string };
  questionCount: number;
}

// Dimension metadata
export const dimensionsMeta: DimensionMeta[] = [
  {
    id: 'D1',
    leftLabel: { cs: 'Konkrétní', en: 'Concrete' },
    rightLabel: { cs: 'Abstraktní', en: 'Abstract' },
    leftDescription: { cs: 'Preferuješ příklady, fakta a praktické postupy', en: 'You prefer examples, facts, and practical procedures' },
    rightDescription: { cs: 'Preferuješ principy, teorie a koncepty', en: 'You prefer principles, theories, and concepts' },
    questionCount: 8
  },
  {
    id: 'D2',
    leftLabel: { cs: 'Aktivní', en: 'Active' },
    rightLabel: { cs: 'Reflektivní', en: 'Reflective' },
    leftDescription: { cs: 'Učíš se dělením, zkoušením a experimentováním', en: 'You learn by doing, trying, and experimenting' },
    rightDescription: { cs: 'Učíš se přemýšlením, plánováním a analýzou', en: 'You learn by thinking, planning, and analyzing' },
    questionCount: 6
  },
  {
    id: 'D3',
    leftLabel: { cs: 'Vizuální', en: 'Visual' },
    rightLabel: { cs: 'Verbální', en: 'Verbal' },
    leftDescription: { cs: 'Preferuješ obrázky, schémata a grafy', en: 'You prefer images, diagrams, and graphs' },
    rightDescription: { cs: 'Preferuješ text, slova a vysvětlení', en: 'You prefer text, words, and explanations' },
    questionCount: 6
  },
  {
    id: 'D4',
    leftLabel: { cs: 'Sekvenční', en: 'Sequential' },
    rightLabel: { cs: 'Globální', en: 'Global' },
    leftDescription: { cs: 'Postupuješ krok za krokem, systematicky', en: 'You proceed step by step, systematically' },
    rightDescription: { cs: 'Preferuješ velký obrázek a souvislosti', en: 'You prefer the big picture and connections' },
    questionCount: 6
  },
  {
    id: 'D5',
    leftLabel: { cs: 'Strukturovaný', en: 'Structured' },
    rightLabel: { cs: 'Flexibilní', en: 'Flexible' },
    leftDescription: { cs: 'Máš rád plány, rutiny a organizaci', en: 'You like plans, routines, and organization' },
    rightDescription: { cs: 'Preferuješ volnost a adaptaci', en: 'You prefer freedom and adaptation' },
    questionCount: 4
  }
];

// 30 questions
export const typologyQuestions: TypologyQuestion[] = [
  // =====================
  // D1: Abstract vs. Concrete (8 questions)
  // =====================
  {
    id: 'Q1',
    dimension: 'D1',
    text: { cs: 'Když se učíš nový pojem, nejvíc ti pomůže:', en: 'When learning a new concept, what helps you most:' },
    options: [
      { key: 'A', text: { cs: 'konkrétní příklad z praxe', en: 'a concrete example from practice' }, side: 'left' },
      { key: 'B', text: { cs: 'definice + jasná pravidla', en: 'definition + clear rules' }, side: 'left' },
      { key: 'C', text: { cs: 'proč to funguje, princip v pozadí', en: 'why it works, the underlying principle' }, side: 'right' },
      { key: 'D', text: { cs: 'propojení s jinými koncepty', en: 'connection with other concepts' }, side: 'right' }
    ]
  },
  {
    id: 'Q2',
    dimension: 'D1',
    text: { cs: 'Když narazíš na nový problém, jdeš spíš:', en: 'When you encounter a new problem, you tend to:' },
    options: [
      { key: 'A', text: { cs: 'najdu podobný příklad a napodobím postup', en: 'find a similar example and imitate the approach' }, side: 'left' },
      { key: 'B', text: { cs: 'sepíšu si fakta a známé hodnoty', en: 'write down facts and known values' }, side: 'left' },
      { key: 'C', text: { cs: 'odvodím si obecný model', en: 'derive a general model' }, side: 'right' },
      { key: 'D', text: { cs: 'zformuluju hypotézu a ověřím', en: 'formulate a hypothesis and verify' }, side: 'right' }
    ]
  },
  {
    id: 'Q3',
    dimension: 'D1',
    text: { cs: 'V matematice nebo analýze dat ti sedí víc:', en: 'In math or data analysis, you prefer:' },
    options: [
      { key: 'A', text: { cs: 'počítání podle vzoru', en: 'calculating by pattern' }, side: 'left' },
      { key: 'B', text: { cs: 'tabulky, postupy, checklisty', en: 'tables, procedures, checklists' }, side: 'left' },
      { key: 'C', text: { cs: 'důkazy, abstraktní struktury', en: 'proofs, abstract structures' }, side: 'right' },
      { key: 'D', text: { cs: 'generalizace a "co kdyby"', en: 'generalizations and "what if"' }, side: 'right' }
    ]
  },
  {
    id: 'Q4',
    dimension: 'D1',
    text: { cs: 'Nejvíc tě baví úlohy, které:', en: 'You enjoy tasks that:' },
    options: [
      { key: 'A', text: { cs: 'mají jasný postup a 1 správný výsledek', en: 'have a clear procedure and 1 correct answer' }, side: 'left' },
      { key: 'B', text: { cs: 'jsou "práce s daty krok za krokem"', en: 'are "step-by-step data work"' }, side: 'left' },
      { key: 'C', text: { cs: 'mají víc cest a jde o nápad', en: 'have multiple paths and require creativity' }, side: 'right' },
      { key: 'D', text: { cs: 'nutí přemýšlet o principu, ne o číslech', en: 'make you think about principles, not numbers' }, side: 'right' }
    ]
  },
  {
    id: 'Q5',
    dimension: 'D1',
    text: { cs: 'Když čteš výukový text, nejvíc hledáš:', en: 'When reading educational text, you look for:' },
    options: [
      { key: 'A', text: { cs: 'příklady použití', en: 'examples of use' }, side: 'left' },
      { key: 'B', text: { cs: 'definice a pravidla', en: 'definitions and rules' }, side: 'left' },
      { key: 'C', text: { cs: 'intuici a vysvětlení "proč"', en: 'intuition and "why" explanations' }, side: 'right' },
      { key: 'D', text: { cs: 'souvislosti a konceptuální mapu', en: 'connections and conceptual map' }, side: 'right' }
    ]
  },
  {
    id: 'Q6',
    dimension: 'D1',
    text: { cs: 'Pokud ti někdo vysvětluje něco složitého, chceš:', en: 'When someone explains something complex, you want:' },
    options: [
      { key: 'A', text: { cs: 'ukázat 1 konkrétní řešený příklad', en: 'to see 1 concrete solved example' }, side: 'left' },
      { key: 'B', text: { cs: 'rozpis kroků', en: 'a breakdown of steps' }, side: 'left' },
      { key: 'C', text: { cs: 'analogii nebo metaforu', en: 'an analogy or metaphor' }, side: 'right' },
      { key: 'D', text: { cs: 'zobecnění a hranice platnosti', en: 'generalization and scope of validity' }, side: 'right' }
    ]
  },
  {
    id: 'Q7',
    dimension: 'D1',
    text: { cs: 'Při učení si víc užíváš:', en: 'When learning, you enjoy more:' },
    options: [
      { key: 'A', text: { cs: '"umět to udělat"', en: '"being able to do it"' }, side: 'left' },
      { key: 'B', text: { cs: '"mít to srovnané a zapamatované"', en: '"having it organized and memorized"' }, side: 'left' },
      { key: 'C', text: { cs: '"pochopit princip"', en: '"understanding the principle"' }, side: 'right' },
      { key: 'D', text: { cs: '"vidět to v širším systému"', en: '"seeing it in a broader system"' }, side: 'right' }
    ]
  },
  {
    id: 'Q8',
    dimension: 'D1',
    text: { cs: 'Když je něco nejasné, nejvíc ti pomůže:', en: 'When something is unclear, what helps most:' },
    options: [
      { key: 'A', text: { cs: 'další příklad', en: 'another example' }, side: 'left' },
      { key: 'B', text: { cs: 'přesnější definice', en: 'a more precise definition' }, side: 'left' },
      { key: 'C', text: { cs: 'vysvětlení intuitivně', en: 'intuitive explanation' }, side: 'right' },
      { key: 'D', text: { cs: 'propojení na známé koncepty', en: 'connection to known concepts' }, side: 'right' }
    ]
  },

  // =====================
  // D2: Active vs. Reflective (6 questions)
  // =====================
  {
    id: 'Q9',
    dimension: 'D2',
    text: { cs: 'Když se učíš, obvykle:', en: 'When learning, you usually:' },
    options: [
      { key: 'A', text: { cs: 'hned řeším úlohy', en: 'immediately solve problems' }, side: 'left' },
      { key: 'B', text: { cs: 'něco zkouším a ladím', en: 'try things and adjust' }, side: 'left' },
      { key: 'C', text: { cs: 'nejdřív přemýšlím a teprve pak dělám', en: 'think first and then do' }, side: 'right' },
      { key: 'D', text: { cs: 'dělám si poznámky a shrnutí', en: 'take notes and summaries' }, side: 'right' }
    ]
  },
  {
    id: 'Q10',
    dimension: 'D2',
    text: { cs: 'Nejvíc si pamatuješ, když:', en: 'You remember best when:' },
    options: [
      { key: 'A', text: { cs: 'to použiješ v praxi', en: 'you use it in practice' }, side: 'left' },
      { key: 'B', text: { cs: 'to vysvětlíš někomu jinému', en: 'you explain it to someone else' }, side: 'left' },
      { key: 'C', text: { cs: 'si to v klidu projdeš', en: 'you go through it calmly' }, side: 'right' },
      { key: 'D', text: { cs: 'si to sepíšeš do vlastních slov', en: 'you write it in your own words' }, side: 'right' }
    ]
  },
  {
    id: 'Q11',
    dimension: 'D2',
    text: { cs: 'Když se zasekneš:', en: 'When you get stuck:' },
    options: [
      { key: 'A', text: { cs: 'zkouším varianty', en: 'I try variations' }, side: 'left' },
      { key: 'B', text: { cs: 'hledám podobné řešení a upravuju', en: 'I look for similar solutions and adapt' }, side: 'left' },
      { key: 'C', text: { cs: 'zastavím se a promyslím strukturu', en: 'I stop and think through the structure' }, side: 'right' },
      { key: 'D', text: { cs: 'vrátím se k teorii a poznámkám', en: 'I go back to theory and notes' }, side: 'right' }
    ]
  },
  {
    id: 'Q12',
    dimension: 'D2',
    text: { cs: 'Skupinová práce:', en: 'Group work:' },
    options: [
      { key: 'A', text: { cs: 'mě nakopne a rozhýbe', en: 'energizes and motivates me' }, side: 'left' },
      { key: 'B', text: { cs: 'nejlíp mi sedí spolupracovat na úloze', en: 'I prefer collaborating on tasks' }, side: 'left' },
      { key: 'C', text: { cs: 'raději si to promyslím sám a pak sdílím', en: 'I prefer thinking alone first then sharing' }, side: 'right' },
      { key: 'D', text: { cs: 'raději pracuju sám v klidu', en: 'I prefer working alone quietly' }, side: 'right' }
    ]
  },
  {
    id: 'Q13',
    dimension: 'D2',
    text: { cs: 'Nové téma:', en: 'New topic:' },
    options: [
      { key: 'A', text: { cs: '"dej mi úkol a jedu"', en: '"give me a task and I\'ll go"' }, side: 'left' },
      { key: 'B', text: { cs: '"dej mi nástroj a zkouším"', en: '"give me a tool and I\'ll try"' }, side: 'left' },
      { key: 'C', text: { cs: '"nejdřív chci pochopit"', en: '"first I want to understand"' }, side: 'right' },
      { key: 'D', text: { cs: '"nejdřív si udělám plán"', en: '"first I\'ll make a plan"' }, side: 'right' }
    ]
  },
  {
    id: 'Q14',
    dimension: 'D2',
    text: { cs: 'Při učení preferuješ:', en: 'When learning, you prefer:' },
    options: [
      { key: 'A', text: { cs: 'krátké cykly pokus–omyl', en: 'short trial-and-error cycles' }, side: 'left' },
      { key: 'B', text: { cs: 'projekty a experimenty', en: 'projects and experiments' }, side: 'left' },
      { key: 'C', text: { cs: 'čtení + přemýšlení', en: 'reading + thinking' }, side: 'right' },
      { key: 'D', text: { cs: 'shrnutí + struktura', en: 'summaries + structure' }, side: 'right' }
    ]
  },

  // =====================
  // D3: Visual vs. Verbal (6 questions)
  // =====================
  {
    id: 'Q15',
    dimension: 'D3',
    text: { cs: 'Když se něco učíš, pomůže ti nejvíc:', en: 'When learning something, what helps you most:' },
    options: [
      { key: 'A', text: { cs: 'obrázek, schéma, graf', en: 'picture, diagram, graph' }, side: 'left' },
      { key: 'B', text: { cs: 'barevné zvýraznění, layout', en: 'color highlighting, layout' }, side: 'left' },
      { key: 'C', text: { cs: 'vysvětlení slovně', en: 'verbal explanation' }, side: 'right' },
      { key: 'D', text: { cs: 'textový krokový popis', en: 'written step-by-step description' }, side: 'right' }
    ]
  },
  {
    id: 'Q16',
    dimension: 'D3',
    text: { cs: 'Když si něco vybavuješ:', en: 'When recalling something:' },
    options: [
      { key: 'A', text: { cs: '"vidím to před očima"', en: '"I see it in my mind\'s eye"' }, side: 'left' },
      { key: 'B', text: { cs: 'pamatuju si slidy / grafy', en: 'I remember slides/graphs' }, side: 'left' },
      { key: 'C', text: { cs: '"slyším si to v hlavě"', en: '"I hear it in my head"' }, side: 'right' },
      { key: 'D', text: { cs: 'pamatuju si formulace', en: 'I remember phrases' }, side: 'right' }
    ]
  },
  {
    id: 'Q17',
    dimension: 'D3',
    text: { cs: 'V materiálech chceš víc:', en: 'In materials, you want more:' },
    options: [
      { key: 'A', text: { cs: 'diagramy a mapy', en: 'diagrams and maps' }, side: 'left' },
      { key: 'B', text: { cs: 'ukázky a vizualizace', en: 'examples and visualizations' }, side: 'left' },
      { key: 'C', text: { cs: 'textové vysvětlení', en: 'written explanations' }, side: 'right' },
      { key: 'D', text: { cs: 'komentované kroky', en: 'commented steps' }, side: 'right' }
    ]
  },
  {
    id: 'Q18',
    dimension: 'D3',
    text: { cs: 'Když je látka těžká:', en: 'When material is difficult:' },
    options: [
      { key: 'A', text: { cs: 'nakreslím si to', en: 'I draw it' }, side: 'left' },
      { key: 'B', text: { cs: 'dělám si schémata', en: 'I make diagrams' }, side: 'left' },
      { key: 'C', text: { cs: 'vysvětlím si to slovy', en: 'I explain it to myself in words' }, side: 'right' },
      { key: 'D', text: { cs: 'píšu si poznámky', en: 'I write notes' }, side: 'right' }
    ]
  },
  {
    id: 'Q19',
    dimension: 'D3',
    text: { cs: 'U videí preferuješ:', en: 'In videos, you prefer:' },
    options: [
      { key: 'A', text: { cs: 'vizuálně bohaté', en: 'visually rich' }, side: 'left' },
      { key: 'B', text: { cs: 'ukázky na obrazovce', en: 'on-screen demonstrations' }, side: 'left' },
      { key: 'C', text: { cs: 'dobrý výklad', en: 'good narration' }, side: 'right' },
      { key: 'D', text: { cs: 'rozhovor / komentář', en: 'discussion/commentary' }, side: 'right' }
    ]
  },
  {
    id: 'Q20',
    dimension: 'D3',
    text: { cs: 'Když máš vysvětlit téma:', en: 'When explaining a topic:' },
    options: [
      { key: 'A', text: { cs: 'kreslím a ukazuju', en: 'I draw and show' }, side: 'left' },
      { key: 'B', text: { cs: 'používám grafy', en: 'I use graphs' }, side: 'left' },
      { key: 'C', text: { cs: 'mluvím a strukturuju argument', en: 'I speak and structure arguments' }, side: 'right' },
      { key: 'D', text: { cs: 'píšu stručné body', en: 'I write concise points' }, side: 'right' }
    ]
  },

  // =====================
  // D4: Sequential vs. Global (6 questions)
  // =====================
  {
    id: 'Q21',
    dimension: 'D4',
    text: { cs: 'Při učení jdeš spíš:', en: 'When learning, you tend to go:' },
    options: [
      { key: 'A', text: { cs: 'krok za krokem', en: 'step by step' }, side: 'left' },
      { key: 'B', text: { cs: 'od základů nahoru', en: 'from basics upward' }, side: 'left' },
      { key: 'C', text: { cs: 'nejdřív chci velký obrázek', en: 'first I want the big picture' }, side: 'right' },
      { key: 'D', text: { cs: 'nejdřív chci vědět "kam to směřuje"', en: 'first I want to know "where it\'s heading"' }, side: 'right' }
    ]
  },
  {
    id: 'Q22',
    dimension: 'D4',
    text: { cs: 'Když dostaneš složitou kapitolu:', en: 'When given a complex chapter:' },
    options: [
      { key: 'A', text: { cs: 'rozdělím ji na malé části', en: 'I break it into small parts' }, side: 'left' },
      { key: 'B', text: { cs: 'jedu od začátku a nepřeskakuju', en: 'I go from the start without skipping' }, side: 'left' },
      { key: 'C', text: { cs: 'prolétnu to a pak se vrátím', en: 'I skim through then come back' }, side: 'right' },
      { key: 'D', text: { cs: 'najdu souvislosti a mapu tématu', en: 'I find connections and topic map' }, side: 'right' }
    ]
  },
  {
    id: 'Q23',
    dimension: 'D4',
    text: { cs: 'V úlohách ti vyhovuje:', en: 'In tasks, you prefer:' },
    options: [
      { key: 'A', text: { cs: 'přesný postup', en: 'exact procedure' }, side: 'left' },
      { key: 'B', text: { cs: 'checklist kroků', en: 'checklist of steps' }, side: 'left' },
      { key: 'C', text: { cs: 'možnost skákat mezi částmi', en: 'ability to jump between parts' }, side: 'right' },
      { key: 'D', text: { cs: 'hledat zkratky přes koncept', en: 'finding shortcuts through concepts' }, side: 'right' }
    ]
  },
  {
    id: 'Q24',
    dimension: 'D4',
    text: { cs: 'Když se ztratíš:', en: 'When you get lost:' },
    options: [
      { key: 'A', text: { cs: 'vrátím se o krok zpět', en: 'I go back one step' }, side: 'left' },
      { key: 'B', text: { cs: 'projdu postup znovu', en: 'I go through the procedure again' }, side: 'left' },
      { key: 'C', text: { cs: 'podívám se na shrnutí', en: 'I look at the summary' }, side: 'right' },
      { key: 'D', text: { cs: 'najdu "hlavní myšlenku"', en: 'I find the "main idea"' }, side: 'right' }
    ]
  },
  {
    id: 'Q25',
    dimension: 'D4',
    text: { cs: 'Při plánování učení:', en: 'When planning your learning:' },
    options: [
      { key: 'A', text: { cs: 'rozpis úkolů po dnech', en: 'daily task breakdown' }, side: 'left' },
      { key: 'B', text: { cs: 'jasný harmonogram', en: 'clear schedule' }, side: 'left' },
      { key: 'C', text: { cs: 'cíle + volnost jak k nim', en: 'goals + freedom how to reach them' }, side: 'right' },
      { key: 'D', text: { cs: 'rámcový plán a improvizace', en: 'framework plan and improvisation' }, side: 'right' }
    ]
  },
  {
    id: 'Q26',
    dimension: 'D4',
    text: { cs: 'Vysvětlení ti sedí víc:', en: 'Explanations suit you better:' },
    options: [
      { key: 'A', text: { cs: 'nejdřív základ, pak detaily', en: 'basics first, then details' }, side: 'left' },
      { key: 'B', text: { cs: 'kroková ukázka', en: 'step-by-step demonstration' }, side: 'left' },
      { key: 'C', text: { cs: 'nejdřív kontext, pak detaily', en: 'context first, then details' }, side: 'right' },
      { key: 'D', text: { cs: 'nejdřív příběh/koncept, pak formalizace', en: 'story/concept first, then formalization' }, side: 'right' }
    ]
  },

  // =====================
  // D5: Structure vs. Flexibility (4 questions)
  // =====================
  {
    id: 'Q27',
    dimension: 'D5',
    text: { cs: 'Když máš volný čas na učení:', en: 'When you have free time for learning:' },
    options: [
      { key: 'A', text: { cs: 'mám pevný plán', en: 'I have a fixed plan' }, side: 'left' },
      { key: 'B', text: { cs: 'jedu podle seznamu', en: 'I follow a list' }, side: 'left' },
      { key: 'C', text: { cs: 'podle nálady/energie', en: 'based on mood/energy' }, side: 'right' },
      { key: 'D', text: { cs: 'podle toho, co hoří', en: 'based on what\'s urgent' }, side: 'right' }
    ]
  },
  {
    id: 'Q28',
    dimension: 'D5',
    text: { cs: 'Deadliny:', en: 'Deadlines:' },
    options: [
      { key: 'A', text: { cs: 'motivují mě plánovat dopředu', en: 'motivate me to plan ahead' }, side: 'left' },
      { key: 'B', text: { cs: 'držím si rezervu', en: 'I keep a buffer' }, side: 'left' },
      { key: 'C', text: { cs: 'funguje mi sprint na konci', en: 'final sprint works for me' }, side: 'right' },
      { key: 'D', text: { cs: 'jedu v nepravidelných vlnách', en: 'I work in irregular waves' }, side: 'right' }
    ]
  },
  {
    id: 'Q29',
    dimension: 'D5',
    text: { cs: 'Poznámky:', en: 'Notes:' },
    options: [
      { key: 'A', text: { cs: 'strukturované, čisté', en: 'structured, clean' }, side: 'left' },
      { key: 'B', text: { cs: 'systém složek/tagů', en: 'folder/tag system' }, side: 'left' },
      { key: 'C', text: { cs: 'spíš chaotické, ale vím kde co je', en: 'somewhat chaotic, but I know where things are' }, side: 'right' },
      { key: 'D', text: { cs: 'skoro žádné, radši praxe', en: 'almost none, prefer practice' }, side: 'right' }
    ]
  },
  {
    id: 'Q30',
    dimension: 'D5',
    text: { cs: 'Když se ti nechce:', en: 'When you don\'t feel like it:' },
    options: [
      { key: 'A', text: { cs: 'držím rutinu', en: 'I stick to routine' }, side: 'left' },
      { key: 'B', text: { cs: 'udělám aspoň malý krok', en: 'I do at least a small step' }, side: 'left' },
      { key: 'C', text: { cs: 'počkám na "správný moment"', en: 'I wait for the "right moment"' }, side: 'right' },
      { key: 'D', text: { cs: 'přepnu na něco jiného', en: 'I switch to something else' }, side: 'right' }
    ]
  }
];

// Helper: get questions by dimension
export function getQuestionsByDimension(dimension: DimensionId): TypologyQuestion[] {
  return typologyQuestions.filter(q => q.dimension === dimension);
}

// Helper: get dimension metadata
export function getDimensionMeta(dimension: DimensionId): DimensionMeta | undefined {
  return dimensionsMeta.find(d => d.id === dimension);
}

// Helper: get question text by language
export function getTypologyQuestionText(question: TypologyQuestion, lang: Language): string {
  return question.text[lang];
}

// Helper: get option text by language
export function getTypologyOptionText(option: TypologyOption, lang: Language): string {
  return option.text[lang];
}

// Helper: get dimension label by language
export function getDimensionLabel(meta: DimensionMeta, side: 'left' | 'right', lang: Language): string {
  return side === 'left' ? meta.leftLabel[lang] : meta.rightLabel[lang];
}

// Helper: get dimension description by language
export function getDimensionDescription(meta: DimensionMeta, side: 'left' | 'right', lang: Language): string {
  return side === 'left' ? meta.leftDescription[lang] : meta.rightDescription[lang];
}