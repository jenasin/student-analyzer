import { Language } from '../../i18n/translations';

export type VakOption = 'V' | 'A' | 'K';

export interface VakQuestion {
  id: string;
  text: { cs: string; en: string };
  options: { key: VakOption; text: { cs: string; en: string } }[];
}

export const vakQuestions: VakQuestion[] = [
  {
    id: 'vak1',
    text: {
      cs: 'Když se učíš nový koncept, nejvíc ti pomůže:',
      en: 'When learning a new concept, what helps you most:'
    },
    options: [
      { key: 'V', text: { cs: 'diagram, graf nebo schéma', en: 'a diagram, graph, or schema' } },
      { key: 'A', text: { cs: 'někdo, kdo ti to vysvětlí slovně', en: 'someone explaining it verbally' } },
      { key: 'K', text: { cs: 'vyzkoušet si to na příkladu', en: 'trying it out with an example' } }
    ]
  },
  {
    id: 'vak2',
    text: {
      cs: 'Když si něco pamatuješ nejlépe, je to proto, že:',
      en: 'When you remember something best, it\'s because:'
    },
    options: [
      { key: 'V', text: { cs: 'sis to představil', en: 'you visualized it' } },
      { key: 'A', text: { cs: 'slyšel jsi to vysvětlené', en: 'you heard it explained' } },
      { key: 'K', text: { cs: 'jsi s tím aktivně pracoval', en: 'you actively worked with it' } }
    ]
  },
  {
    id: 'vak3',
    text: {
      cs: 'Při přednášce si nejvíc zapamatuješ:',
      en: 'During a lecture, you remember most:'
    },
    options: [
      { key: 'V', text: { cs: 'slidy, obrázky a strukturu', en: 'slides, images, and structure' } },
      { key: 'A', text: { cs: 'výklad a formulace vyučujícího', en: 'the instructor\'s explanation and phrasing' } },
      { key: 'K', text: { cs: 'úlohy, demonstrace, praktické kroky', en: 'tasks, demonstrations, practical steps' } }
    ]
  },
  {
    id: 'vak4',
    text: {
      cs: 'Když čteš odborný text, nejvíc ti pomůže:',
      en: 'When reading technical text, what helps you most:'
    },
    options: [
      { key: 'V', text: { cs: 'zvýrazňování a struktura', en: 'highlighting and structure' } },
      { key: 'A', text: { cs: 'číst si pasáže „v hlavě" nebo nahlas', en: 'reading passages "in your head" or aloud' } },
      { key: 'K', text: { cs: 'převést text do příkladů / úloh', en: 'converting text into examples/exercises' } }
    ]
  },
  {
    id: 'vak5',
    text: {
      cs: 'Když narazíš na složitý problém, první krok je:',
      en: 'When facing a complex problem, your first step is:'
    },
    options: [
      { key: 'V', text: { cs: 'nakreslit si schéma / přehled', en: 'draw a diagram/overview' } },
      { key: 'A', text: { cs: 'slovně si to vysvětlit', en: 'explain it to yourself verbally' } },
      { key: 'K', text: { cs: 'začít zkoušet řešení', en: 'start trying solutions' } }
    ]
  },
  {
    id: 'vak6',
    text: {
      cs: 'Nejlépe se soustředíš, když:',
      en: 'You concentrate best when:'
    },
    options: [
      { key: 'V', text: { cs: 'máš vizuálně čisté prostředí', en: 'you have a visually clean environment' } },
      { key: 'A', text: { cs: 'je ticho nebo jemný zvuk', en: 'it\'s quiet or there\'s soft sound' } },
      { key: 'K', text: { cs: 'můžeš psát / klikat / měnit pozici', en: 'you can write/click/change position' } }
    ]
  },
  {
    id: 'vak7',
    text: {
      cs: 'Když si vybavuješ látku u zkoušky:',
      en: 'When recalling material during an exam:'
    },
    options: [
      { key: 'V', text: { cs: '„vidíš" poznámky nebo obrázky', en: 'you "see" notes or images' } },
      { key: 'A', text: { cs: '„slyšíš" výklad / vlastní vysvětlení', en: 'you "hear" the explanation/your own words' } },
      { key: 'K', text: { cs: '„cítíš", jak jsi to řešil krok za krokem', en: 'you "feel" how you solved it step by step' } }
    ]
  },
  {
    id: 'vak8',
    text: {
      cs: 'Nejvíc tě frustruje výuka, když:',
      en: 'Teaching frustrates you most when:'
    },
    options: [
      { key: 'V', text: { cs: 'nemá přehled a strukturu', en: 'it lacks overview and structure' } },
      { key: 'A', text: { cs: 'není dobře vysvětlená', en: 'it\'s not well explained' } },
      { key: 'K', text: { cs: 'je jen teorie bez použití', en: 'it\'s only theory without application' } }
    ]
  },
  {
    id: 'vak9',
    text: {
      cs: 'Když se učíš doma, nejčastěji:',
      en: 'When studying at home, you most often:'
    },
    options: [
      { key: 'V', text: { cs: 'pracuješ s textem/obrázky', en: 'work with text/images' } },
      { key: 'A', text: { cs: 'mluvíš si k látce / vysvětluješ si', en: 'talk about the material/explain to yourself' } },
      { key: 'K', text: { cs: 'přepínáš mezi úkoly / zkoušíš', en: 'switch between tasks/experiment' } }
    ]
  },
  {
    id: 'vak10',
    text: {
      cs: 'Nejrychleji pochopíš novou metodu, když:',
      en: 'You understand a new method fastest when:'
    },
    options: [
      { key: 'V', text: { cs: 'vidíš celý proces přehledně', en: 'you see the whole process clearly' } },
      { key: 'A', text: { cs: 'slyšíš postup krok za krokem', en: 'you hear the procedure step by step' } },
      { key: 'K', text: { cs: 'ji sám aplikuješ na příkladu', en: 'you apply it yourself with an example' } }
    ]
  }
];

// Helper to get question text by language
export function getVakQuestionText(question: VakQuestion, lang: Language): string {
  return question.text[lang];
}

// Helper to get option text by language
export function getVakOptionText(option: { key: VakOption; text: { cs: string; en: string } }, lang: Language): string {
  return option.text[lang];
}