/**
 * Typologický test - 30 otázek (A-D)
 * Založeno na: ILS (Felder-Silverman), Kolb, VARK
 *
 * 5 dimenzí:
 * D1: Abstraktní vs. Konkrétní (8 otázek)
 * D2: Aktivní vs. Reflektivní (6 otázek)
 * D3: Vizuální vs. Verbální (6 otázek)
 * D4: Sekvenční vs. Globální (6 otázek)
 * D5: Struktura vs. Flexibilita (4 otázky)
 */

export type AnswerKey = 'A' | 'B' | 'C' | 'D';

export type DimensionId = 'D1' | 'D2' | 'D3' | 'D4' | 'D5';

export type DimensionSide = 'left' | 'right';

export interface TypologyOption {
  key: AnswerKey;
  text: string;
  side: DimensionSide; // left nebo right pro skórování
}

export interface TypologyQuestion {
  id: string;
  dimension: DimensionId;
  text: string;
  options: TypologyOption[];
}

export interface DimensionMeta {
  id: DimensionId;
  leftLabel: string;
  rightLabel: string;
  leftDescription: string;
  rightDescription: string;
  questionCount: number;
}

// Metadata dimenzí
export const dimensionsMeta: DimensionMeta[] = [
  {
    id: 'D1',
    leftLabel: 'Konkrétní',
    rightLabel: 'Abstraktní',
    leftDescription: 'Preferuješ příklady, fakta a praktické postupy',
    rightDescription: 'Preferuješ principy, teorie a koncepty',
    questionCount: 8
  },
  {
    id: 'D2',
    leftLabel: 'Aktivní',
    rightLabel: 'Reflektivní',
    leftDescription: 'Učíš se dělením, zkoušením a experimentováním',
    rightDescription: 'Učíš se přemýšlením, plánováním a analýzou',
    questionCount: 6
  },
  {
    id: 'D3',
    leftLabel: 'Vizuální',
    rightLabel: 'Verbální',
    leftDescription: 'Preferuješ obrázky, schémata a grafy',
    rightDescription: 'Preferuješ text, slova a vysvětlení',
    questionCount: 6
  },
  {
    id: 'D4',
    leftLabel: 'Sekvenční',
    rightLabel: 'Globální',
    leftDescription: 'Postupuješ krok za krokem, systematicky',
    rightDescription: 'Preferuješ velký obrázek a souvislosti',
    questionCount: 6
  },
  {
    id: 'D5',
    leftLabel: 'Strukturovaný',
    rightLabel: 'Flexibilní',
    leftDescription: 'Máš rád plány, rutiny a organizaci',
    rightDescription: 'Preferuješ volnost a adaptaci',
    questionCount: 4
  }
];

// 30 otázek
export const typologyQuestions: TypologyQuestion[] = [
  // =====================
  // D1: Abstraktní vs. Konkrétní (8 otázek)
  // =====================
  {
    id: 'Q1',
    dimension: 'D1',
    text: 'Když se učíš nový pojem, nejvíc ti pomůže:',
    options: [
      { key: 'A', text: 'konkrétní příklad z praxe', side: 'left' },
      { key: 'B', text: 'definice + jasná pravidla', side: 'left' },
      { key: 'C', text: 'proč to funguje, princip v pozadí', side: 'right' },
      { key: 'D', text: 'propojení s jinými koncepty', side: 'right' }
    ]
  },
  {
    id: 'Q2',
    dimension: 'D1',
    text: 'Když narazíš na nový problém, jdeš spíš:',
    options: [
      { key: 'A', text: 'najdu podobný příklad a napodobím postup', side: 'left' },
      { key: 'B', text: 'sepíšu si fakta a známé hodnoty', side: 'left' },
      { key: 'C', text: 'odvodím si obecný model', side: 'right' },
      { key: 'D', text: 'zformuluju hypotézu a ověřím', side: 'right' }
    ]
  },
  {
    id: 'Q3',
    dimension: 'D1',
    text: 'V matematice nebo analýze dat ti sedí víc:',
    options: [
      { key: 'A', text: 'počítání podle vzoru', side: 'left' },
      { key: 'B', text: 'tabulky, postupy, checklisty', side: 'left' },
      { key: 'C', text: 'důkazy, abstraktní struktury', side: 'right' },
      { key: 'D', text: 'generalizace a "co kdyby"', side: 'right' }
    ]
  },
  {
    id: 'Q4',
    dimension: 'D1',
    text: 'Nejvíc tě baví úlohy, které:',
    options: [
      { key: 'A', text: 'mají jasný postup a 1 správný výsledek', side: 'left' },
      { key: 'B', text: 'jsou "práce s daty krok za krokem"', side: 'left' },
      { key: 'C', text: 'mají víc cest a jde o nápad', side: 'right' },
      { key: 'D', text: 'nutí přemýšlet o principu, ne o číslech', side: 'right' }
    ]
  },
  {
    id: 'Q5',
    dimension: 'D1',
    text: 'Když čteš výukový text, nejvíc hledáš:',
    options: [
      { key: 'A', text: 'příklady použití', side: 'left' },
      { key: 'B', text: 'definice a pravidla', side: 'left' },
      { key: 'C', text: 'intuici a vysvětlení "proč"', side: 'right' },
      { key: 'D', text: 'souvislosti a konceptuální mapu', side: 'right' }
    ]
  },
  {
    id: 'Q6',
    dimension: 'D1',
    text: 'Pokud ti někdo vysvětluje něco složitého, chceš:',
    options: [
      { key: 'A', text: 'ukázat 1 konkrétní řešený příklad', side: 'left' },
      { key: 'B', text: 'rozpis kroků', side: 'left' },
      { key: 'C', text: 'analogii nebo metaforu', side: 'right' },
      { key: 'D', text: 'zobecnění a hranice platnosti', side: 'right' }
    ]
  },
  {
    id: 'Q7',
    dimension: 'D1',
    text: 'Při učení si víc užíváš:',
    options: [
      { key: 'A', text: '"umět to udělat"', side: 'left' },
      { key: 'B', text: '"mít to srovnané a zapamatované"', side: 'left' },
      { key: 'C', text: '"pochopit princip"', side: 'right' },
      { key: 'D', text: '"vidět to v širším systému"', side: 'right' }
    ]
  },
  {
    id: 'Q8',
    dimension: 'D1',
    text: 'Když je něco nejasné, nejvíc ti pomůže:',
    options: [
      { key: 'A', text: 'další příklad', side: 'left' },
      { key: 'B', text: 'přesnější definice', side: 'left' },
      { key: 'C', text: 'vysvětlení intuitivně', side: 'right' },
      { key: 'D', text: 'propojení na známé koncepty', side: 'right' }
    ]
  },

  // =====================
  // D2: Aktivní vs. Reflektivní (6 otázek)
  // =====================
  {
    id: 'Q9',
    dimension: 'D2',
    text: 'Když se učíš, obvykle:',
    options: [
      { key: 'A', text: 'hned řeším úlohy', side: 'left' },
      { key: 'B', text: 'něco zkouším a ladím', side: 'left' },
      { key: 'C', text: 'nejdřív přemýšlím a teprve pak dělám', side: 'right' },
      { key: 'D', text: 'dělám si poznámky a shrnutí', side: 'right' }
    ]
  },
  {
    id: 'Q10',
    dimension: 'D2',
    text: 'Nejvíc si pamatuješ, když:',
    options: [
      { key: 'A', text: 'to použiješ v praxi', side: 'left' },
      { key: 'B', text: 'to vysvětlíš někomu jinému', side: 'left' },
      { key: 'C', text: 'si to v klidu projdeš', side: 'right' },
      { key: 'D', text: 'si to sepíšeš do vlastních slov', side: 'right' }
    ]
  },
  {
    id: 'Q11',
    dimension: 'D2',
    text: 'Když se zasekneš:',
    options: [
      { key: 'A', text: 'zkouším varianty', side: 'left' },
      { key: 'B', text: 'hledám podobné řešení a upravuju', side: 'left' },
      { key: 'C', text: 'zastavím se a promyslím strukturu', side: 'right' },
      { key: 'D', text: 'vrátím se k teorii a poznámkám', side: 'right' }
    ]
  },
  {
    id: 'Q12',
    dimension: 'D2',
    text: 'Skupinová práce:',
    options: [
      { key: 'A', text: 'mě nakopne a rozhýbe', side: 'left' },
      { key: 'B', text: 'nejlíp mi sedí spolupracovat na úloze', side: 'left' },
      { key: 'C', text: 'raději si to promyslím sám a pak sdílím', side: 'right' },
      { key: 'D', text: 'raději pracuju sám v klidu', side: 'right' }
    ]
  },
  {
    id: 'Q13',
    dimension: 'D2',
    text: 'Nové téma:',
    options: [
      { key: 'A', text: '"dej mi úkol a jedu"', side: 'left' },
      { key: 'B', text: '"dej mi nástroj a zkouším"', side: 'left' },
      { key: 'C', text: '"nejdřív chci pochopit"', side: 'right' },
      { key: 'D', text: '"nejdřív si udělám plán"', side: 'right' }
    ]
  },
  {
    id: 'Q14',
    dimension: 'D2',
    text: 'Při učení preferuješ:',
    options: [
      { key: 'A', text: 'krátké cykly pokus–omyl', side: 'left' },
      { key: 'B', text: 'projekty a experimenty', side: 'left' },
      { key: 'C', text: 'čtení + přemýšlení', side: 'right' },
      { key: 'D', text: 'shrnutí + struktura', side: 'right' }
    ]
  },

  // =====================
  // D3: Vizuální vs. Verbální (6 otázek)
  // =====================
  {
    id: 'Q15',
    dimension: 'D3',
    text: 'Když se něco učíš, pomůže ti nejvíc:',
    options: [
      { key: 'A', text: 'obrázek, schéma, graf', side: 'left' },
      { key: 'B', text: 'barevné zvýraznění, layout', side: 'left' },
      { key: 'C', text: 'vysvětlení slovně', side: 'right' },
      { key: 'D', text: 'textový krokový popis', side: 'right' }
    ]
  },
  {
    id: 'Q16',
    dimension: 'D3',
    text: 'Když si něco vybavuješ:',
    options: [
      { key: 'A', text: '"vidím to před očima"', side: 'left' },
      { key: 'B', text: 'pamatuju si slidy / grafy', side: 'left' },
      { key: 'C', text: '"slyším si to v hlavě"', side: 'right' },
      { key: 'D', text: 'pamatuju si formulace', side: 'right' }
    ]
  },
  {
    id: 'Q17',
    dimension: 'D3',
    text: 'V materiálech chceš víc:',
    options: [
      { key: 'A', text: 'diagramy a mapy', side: 'left' },
      { key: 'B', text: 'ukázky a vizualizace', side: 'left' },
      { key: 'C', text: 'textové vysvětlení', side: 'right' },
      { key: 'D', text: 'komentované kroky', side: 'right' }
    ]
  },
  {
    id: 'Q18',
    dimension: 'D3',
    text: 'Když je látka těžká:',
    options: [
      { key: 'A', text: 'nakreslím si to', side: 'left' },
      { key: 'B', text: 'dělám si schémata', side: 'left' },
      { key: 'C', text: 'vysvětlím si to slovy', side: 'right' },
      { key: 'D', text: 'píšu si poznámky', side: 'right' }
    ]
  },
  {
    id: 'Q19',
    dimension: 'D3',
    text: 'U videí preferuješ:',
    options: [
      { key: 'A', text: 'vizuálně bohaté', side: 'left' },
      { key: 'B', text: 'ukázky na obrazovce', side: 'left' },
      { key: 'C', text: 'dobrý výklad', side: 'right' },
      { key: 'D', text: 'rozhovor / komentář', side: 'right' }
    ]
  },
  {
    id: 'Q20',
    dimension: 'D3',
    text: 'Když máš vysvětlit téma:',
    options: [
      { key: 'A', text: 'kreslím a ukazuju', side: 'left' },
      { key: 'B', text: 'používám grafy', side: 'left' },
      { key: 'C', text: 'mluvím a strukturuju argument', side: 'right' },
      { key: 'D', text: 'píšu stručné body', side: 'right' }
    ]
  },

  // =====================
  // D4: Sekvenční vs. Globální (6 otázek)
  // =====================
  {
    id: 'Q21',
    dimension: 'D4',
    text: 'Při učení jdeš spíš:',
    options: [
      { key: 'A', text: 'krok za krokem', side: 'left' },
      { key: 'B', text: 'od základů nahoru', side: 'left' },
      { key: 'C', text: 'nejdřív chci velký obrázek', side: 'right' },
      { key: 'D', text: 'nejdřív chci vědět "kam to směřuje"', side: 'right' }
    ]
  },
  {
    id: 'Q22',
    dimension: 'D4',
    text: 'Když dostaneš složitou kapitolu:',
    options: [
      { key: 'A', text: 'rozdělím ji na malé části', side: 'left' },
      { key: 'B', text: 'jedu od začátku a nepřeskakuju', side: 'left' },
      { key: 'C', text: 'prolétnu to a pak se vrátím', side: 'right' },
      { key: 'D', text: 'najdu souvislosti a mapu tématu', side: 'right' }
    ]
  },
  {
    id: 'Q23',
    dimension: 'D4',
    text: 'V úlohách ti vyhovuje:',
    options: [
      { key: 'A', text: 'přesný postup', side: 'left' },
      { key: 'B', text: 'checklist kroků', side: 'left' },
      { key: 'C', text: 'možnost skákat mezi částmi', side: 'right' },
      { key: 'D', text: 'hledat zkratky přes koncept', side: 'right' }
    ]
  },
  {
    id: 'Q24',
    dimension: 'D4',
    text: 'Když se ztratíš:',
    options: [
      { key: 'A', text: 'vrátím se o krok zpět', side: 'left' },
      { key: 'B', text: 'projdu postup znovu', side: 'left' },
      { key: 'C', text: 'podívám se na shrnutí', side: 'right' },
      { key: 'D', text: 'najdu "hlavní myšlenku"', side: 'right' }
    ]
  },
  {
    id: 'Q25',
    dimension: 'D4',
    text: 'Při plánování učení:',
    options: [
      { key: 'A', text: 'rozpis úkolů po dnech', side: 'left' },
      { key: 'B', text: 'jasný harmonogram', side: 'left' },
      { key: 'C', text: 'cíle + volnost jak k nim', side: 'right' },
      { key: 'D', text: 'rámcový plán a improvizace', side: 'right' }
    ]
  },
  {
    id: 'Q26',
    dimension: 'D4',
    text: 'Vysvětlení ti sedí víc:',
    options: [
      { key: 'A', text: 'nejdřív základ, pak detaily', side: 'left' },
      { key: 'B', text: 'kroková ukázka', side: 'left' },
      { key: 'C', text: 'nejdřív kontext, pak detaily', side: 'right' },
      { key: 'D', text: 'nejdřív příběh/koncept, pak formalizace', side: 'right' }
    ]
  },

  // =====================
  // D5: Struktura vs. Flexibilita (4 otázky)
  // =====================
  {
    id: 'Q27',
    dimension: 'D5',
    text: 'Když máš volný čas na učení:',
    options: [
      { key: 'A', text: 'mám pevný plán', side: 'left' },
      { key: 'B', text: 'jedu podle seznamu', side: 'left' },
      { key: 'C', text: 'podle nálady/energie', side: 'right' },
      { key: 'D', text: 'podle toho, co hoří', side: 'right' }
    ]
  },
  {
    id: 'Q28',
    dimension: 'D5',
    text: 'Deadliny:',
    options: [
      { key: 'A', text: 'motivují mě plánovat dopředu', side: 'left' },
      { key: 'B', text: 'držím si rezervu', side: 'left' },
      { key: 'C', text: 'funguje mi sprint na konci', side: 'right' },
      { key: 'D', text: 'jedu v nepravidelných vlnách', side: 'right' }
    ]
  },
  {
    id: 'Q29',
    dimension: 'D5',
    text: 'Poznámky:',
    options: [
      { key: 'A', text: 'strukturované, čisté', side: 'left' },
      { key: 'B', text: 'systém složek/tagů', side: 'left' },
      { key: 'C', text: 'spíš chaotické, ale vím kde co je', side: 'right' },
      { key: 'D', text: 'skoro žádné, radši praxe', side: 'right' }
    ]
  },
  {
    id: 'Q30',
    dimension: 'D5',
    text: 'Když se ti nechce:',
    options: [
      { key: 'A', text: 'držím rutinu', side: 'left' },
      { key: 'B', text: 'udělám aspoň malý krok', side: 'left' },
      { key: 'C', text: 'počkám na "správný moment"', side: 'right' },
      { key: 'D', text: 'přepnu na něco jiného', side: 'right' }
    ]
  }
];

// Helper: získej otázky pro konkrétní dimenzi
export function getQuestionsByDimension(dimension: DimensionId): TypologyQuestion[] {
  return typologyQuestions.filter(q => q.dimension === dimension);
}

// Helper: získej metadata dimenze
export function getDimensionMeta(dimension: DimensionId): DimensionMeta | undefined {
  return dimensionsMeta.find(d => d.id === dimension);
}
