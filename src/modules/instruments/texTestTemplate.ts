export type QuestionType = 'mcq' | 'tf' | 'cloze' | 'order' | 'short';

export interface BaseQ {
  id: string;
  type: QuestionType;
  prompt: string;
}

export interface McqQ extends BaseQ {
  type: 'mcq';
  options: { id: 'A' | 'B' | 'C' | 'D'; text: string }[];
  correct: 'A' | 'B' | 'C' | 'D';
}

export interface TfQ extends BaseQ {
  type: 'tf';
  correct: boolean;
}

export interface ClozeQ extends BaseQ {
  type: 'cloze';
  correct: string[]; // povol i více variant
}

export interface OrderQ extends BaseQ {
  type: 'order';
  items: string[];
  correctOrder: number[]; // indexy
}

export interface ShortQ extends BaseQ {
  type: 'short';
  rubric: { score2: string; score1: string; score0: string };
}

export type TexQuestion = McqQ | TfQ | ClozeQ | OrderQ | ShortQ;

export interface TexTest {
  texId: string;
  title: string;
  questions: TexQuestion[];
}

// Příklad TEX testu
export const exampleTexTest: TexTest = {
  texId: 'demo-1',
  title: 'Ukázkový test porozumění',
  questions: [
    {
      id: 'q1',
      type: 'mcq',
      prompt: 'Co je hlavní myšlenkou textu?',
      options: [
        { id: 'A', text: 'Možnost A' },
        { id: 'B', text: 'Možnost B' },
        { id: 'C', text: 'Možnost C' },
        { id: 'D', text: 'Možnost D' }
      ],
      correct: 'B'
    },
    {
      id: 'q2',
      type: 'tf',
      prompt: 'Text pojednává o historii.',
      correct: false
    },
    {
      id: 'q3',
      type: 'cloze',
      prompt: 'Doplň chybějící slovo: Hlavní postavou je ___.',
      correct: ['student', 'žák']
    },
    {
      id: 'q4',
      type: 'order',
      prompt: 'Seřaď události podle toho, jak se staly v textu:',
      items: ['Událost A', 'Událost B', 'Událost C'],
      correctOrder: [1, 0, 2]
    },
    {
      id: 'q5',
      type: 'short',
      prompt: 'Vysvětli vlastními slovy, proč je toto téma důležité.',
      rubric: {
        score2: 'Jasné vysvětlení s příkladem nebo zdůvodněním',
        score1: 'Částečné vysvětlení bez příkladu',
        score0: 'Chybí vysvětlení nebo je zcela mimo téma'
      }
    }
  ]
};
