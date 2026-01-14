export type VakOption = 'V' | 'A' | 'K';

export interface VakQuestion {
  id: string;
  text: string;
  options: { key: VakOption; text: string }[];
}

export const vakQuestions: VakQuestion[] = [
  {
    id: 'vak1',
    text: 'Když se učíš nový koncept, nejvíc ti pomůže:',
    options: [
      { key: 'V', text: 'diagram, graf nebo schéma' },
      { key: 'A', text: 'někdo, kdo ti to vysvětlí slovně' },
      { key: 'K', text: 'vyzkoušet si to na příkladu' }
    ]
  },
  {
    id: 'vak2',
    text: 'Když si něco pamatuješ nejlépe, je to proto, že:',
    options: [
      { key: 'V', text: 'sis to představil' },
      { key: 'A', text: 'slyšel jsi to vysvětlené' },
      { key: 'K', text: 'jsi s tím aktivně pracoval' }
    ]
  },
  {
    id: 'vak3',
    text: 'Při přednášce si nejvíc zapamatuješ:',
    options: [
      { key: 'V', text: 'slidy, obrázky a strukturu' },
      { key: 'A', text: 'výklad a formulace vyučujícího' },
      { key: 'K', text: 'úlohy, demonstrace, praktické kroky' }
    ]
  },
  {
    id: 'vak4',
    text: 'Když čteš odborný text, nejvíc ti pomůže:',
    options: [
      { key: 'V', text: 'zvýrazňování a struktura' },
      { key: 'A', text: 'číst si pasáže „v hlavě" nebo nahlas' },
      { key: 'K', text: 'převést text do příkladů / úloh' }
    ]
  },
  {
    id: 'vak5',
    text: 'Když narazíš na složitý problém, první krok je:',
    options: [
      { key: 'V', text: 'nakreslit si schéma / přehled' },
      { key: 'A', text: 'slovně si to vysvětlit' },
      { key: 'K', text: 'začít zkoušet řešení' }
    ]
  },
  {
    id: 'vak6',
    text: 'Nejlépe se soustředíš, když:',
    options: [
      { key: 'V', text: 'máš vizuálně čisté prostředí' },
      { key: 'A', text: 'je ticho nebo jemný zvuk' },
      { key: 'K', text: 'můžeš psát / klikat / měnit pozici' }
    ]
  },
  {
    id: 'vak7',
    text: 'Když si vybavuješ látku u zkoušky:',
    options: [
      { key: 'V', text: '„vidíš" poznámky nebo obrázky' },
      { key: 'A', text: '„slyšíš" výklad / vlastní vysvětlení' },
      { key: 'K', text: '„cítíš", jak jsi to řešil krok za krokem' }
    ]
  },
  {
    id: 'vak8',
    text: 'Nejvíc tě frustruje výuka, když:',
    options: [
      { key: 'V', text: 'nemá přehled a strukturu' },
      { key: 'A', text: 'není dobře vysvětlená' },
      { key: 'K', text: 'je jen teorie bez použití' }
    ]
  },
  {
    id: 'vak9',
    text: 'Když se učíš doma, nejčastěji:',
    options: [
      { key: 'V', text: 'pracuješ s textem/obrázky' },
      { key: 'A', text: 'mluvíš si k látce / vysvětluješ si' },
      { key: 'K', text: 'přepínáš mezi úkoly / zkoušíš' }
    ]
  },
  {
    id: 'vak10',
    text: 'Nejrychleji pochopíš novou metodu, když:',
    options: [
      { key: 'V', text: 'vidíš celý proces přehledně' },
      { key: 'A', text: 'slyšíš postup krok za krokem' },
      { key: 'K', text: 'ji sám aplikuješ na příkladu' }
    ]
  }
];
