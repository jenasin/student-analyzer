/**
 * Skórování typologického testu
 * 5 dimenzí, každá 0-100%
 */

import {
  AnswerKey,
  DimensionId,
  DimensionSide,
  typologyQuestions,
  dimensionsMeta,
  TypologyQuestion
} from './typologyQuestions';

export interface DimensionScore {
  dimension: DimensionId;
  leftLabel: string;
  rightLabel: string;
  leftScore: number;    // 0-100
  rightScore: number;   // 0-100
  label: string;        // "spíš konkrétní" / "vyvážený" / "spíš abstraktní"
  answeredCount: number;
  totalQuestions: number;
}

export interface TypologyResult {
  dimensions: DimensionScore[];
  answersDetail: AnswerDetail[];
  overallProfile: string;
  tips: string[];
}

export interface AnswerDetail {
  questionId: string;
  questionText: string;
  answer: AnswerKey;
  answerText: string;
  dimension: DimensionId;
  side: DimensionSide;
  interpretation: string; // např. "spíš konkrétní"
}

/**
 * Hlavní funkce pro výpočet skóre
 */
export function scoreTypology(
  answers: Record<string, AnswerKey>
): TypologyResult {
  const dimensionScores: DimensionScore[] = [];
  const answersDetail: AnswerDetail[] = [];

  // Pro každou dimenzi spočítej skóre
  for (const meta of dimensionsMeta) {
    const questions = typologyQuestions.filter(q => q.dimension === meta.id);
    let leftCount = 0;
    let rightCount = 0;
    let answeredCount = 0;

    for (const q of questions) {
      const answer = answers[q.id];
      if (answer) {
        answeredCount++;
        const option = q.options.find(o => o.key === answer);
        if (option) {
          if (option.side === 'left') {
            leftCount++;
          } else {
            rightCount++;
          }

          // Detail odpovědi
          answersDetail.push({
            questionId: q.id,
            questionText: q.text,
            answer,
            answerText: option.text,
            dimension: meta.id,
            side: option.side,
            interpretation: option.side === 'left' ? `spíš ${meta.leftLabel.toLowerCase()}` : `spíš ${meta.rightLabel.toLowerCase()}`
          });
        }
      }
    }

    const total = leftCount + rightCount || 1;
    const leftScore = Math.round((leftCount / total) * 100);
    const rightScore = Math.round((rightCount / total) * 100);

    // Label
    let label: string;
    if (rightScore >= 61) {
      label = `${meta.rightLabel} preference`;
    } else if (leftScore >= 61) {
      label = `${meta.leftLabel} preference`;
    } else {
      label = 'Vyvážený';
    }

    dimensionScores.push({
      dimension: meta.id,
      leftLabel: meta.leftLabel,
      rightLabel: meta.rightLabel,
      leftScore,
      rightScore,
      label,
      answeredCount,
      totalQuestions: questions.length
    });
  }

  // Celkový profil
  const overallProfile = generateOverallProfile(dimensionScores);
  const tips = generateTips(dimensionScores);

  return {
    dimensions: dimensionScores,
    answersDetail,
    overallProfile,
    tips
  };
}

/**
 * Generuje celkový popis profilu
 */
function generateOverallProfile(scores: DimensionScore[]): string {
  const dominant: string[] = [];

  for (const s of scores) {
    if (s.rightScore >= 65) {
      dominant.push(s.rightLabel.toLowerCase());
    } else if (s.leftScore >= 65) {
      dominant.push(s.leftLabel.toLowerCase());
    }
  }

  if (dominant.length === 0) {
    return 'Máš vyvážený profil bez výrazné dominance v jednom stylu. Dokážeš se přizpůsobit různým situacím.';
  }

  if (dominant.length === 1) {
    return `Tvůj profil ukazuje ${dominant[0]} přístup k učení.`;
  }

  return `Tvůj profil kombinuje ${dominant.slice(0, -1).join(', ')} a ${dominant[dominant.length - 1]} přístup.`;
}

/**
 * Generuje tipy na základě výsledků
 */
function generateTips(scores: DimensionScore[]): string[] {
  const tips: string[] = [];

  for (const s of scores) {
    // Abstraktní vs Konkrétní
    if (s.dimension === 'D1') {
      if (s.rightScore >= 60) {
        tips.push('Snaž se spojovat teorii s konkrétními příklady – pomůže ti to lépe zapamatovat.');
      } else if (s.leftScore >= 60) {
        tips.push('Zkus občas hledat "proč" za postupy – hlubší pochopení ti pomůže řešit nové situace.');
      }
    }

    // Aktivní vs Reflektivní
    if (s.dimension === 'D2') {
      if (s.leftScore >= 60) {
        tips.push('Před akcí si dej chvíli na rozmyšlení – ušetříš si opakování chyb.');
      } else if (s.rightScore >= 60) {
        tips.push('Neboj se začít dřív, než máš vše promyšlené – učení praxí je taky cenné.');
      }
    }

    // Vizuální vs Verbální
    if (s.dimension === 'D3') {
      if (s.leftScore >= 60) {
        tips.push('Používej myšlenkové mapy, schémata a barevné poznámky – sedí ti vizuální styl.');
      } else if (s.rightScore >= 60) {
        tips.push('Zkus si látku vysvětlovat nahlas nebo ji přepisovat vlastními slovy.');
      }
    }

    // Sekvenční vs Globální
    if (s.dimension === 'D4') {
      if (s.leftScore >= 60) {
        tips.push('Děl si úkoly na menší kroky a odškrtávej – dává ti to pocit postupu.');
      } else if (s.rightScore >= 60) {
        tips.push('Než se ponoříš do detailů, udělej si přehled celého tématu.');
      }
    }

    // Struktura vs Flexibilita
    if (s.dimension === 'D5') {
      if (s.leftScore >= 60) {
        tips.push('Tvoje síla je v plánování – využij to a vytvoř si studijní rozvrh.');
      } else if (s.rightScore >= 60) {
        tips.push('Zkus si dát alespoň malé deadline – pomůže ti to se soustředit.');
      }
    }
  }

  // Max 4 tipy
  return tips.slice(0, 4);
}

/**
 * Konvertuje skóre do formátu pro UI bary
 */
export function scoresToBars(scores: DimensionScore[]): {
  label: string;
  value: number;
  leftLabel: string;
  rightLabel: string;
}[] {
  return scores.map(s => ({
    label: `${s.leftLabel} / ${s.rightLabel}`,
    value: s.rightScore, // 0 = úplně left, 100 = úplně right
    leftLabel: s.leftLabel,
    rightLabel: s.rightLabel
  }));
}

/**
 * Exportuje výsledky jako markdown
 */
export function exportAsMarkdown(result: TypologyResult): string {
  let md = '## Tvůj učební profil\n\n';
  md += result.overallProfile + '\n\n';

  md += '### Dimenze\n\n';
  for (const d of result.dimensions) {
    md += `**${d.leftLabel} vs ${d.rightLabel}:** ${d.label}\n`;
    md += `- ${d.leftLabel}: ${d.leftScore}%\n`;
    md += `- ${d.rightLabel}: ${d.rightScore}%\n\n`;
  }

  if (result.tips.length > 0) {
    md += '### Tipy pro tebe\n\n';
    for (const tip of result.tips) {
      md += `- ${tip}\n`;
    }
  }

  return md;
}
