import type { VakOption } from './vakQuestions';
import type { TexTest } from './texTestTemplate';

export interface VakResult {
  visual: number;
  auditory: number;
  kinesthetic: number;
  label: string; // např. "Vizuálně-kinestetický" / "Vyvážený"
}

export function scoreVak(answers: VakOption[]): VakResult {
  const n = answers.length || 1;
  const V = answers.filter(a => a === 'V').length;
  const A = answers.filter(a => a === 'A').length;
  const K = answers.filter(a => a === 'K').length;

  const visual = Math.round((V / n) * 100);
  const auditory = Math.round((A / n) * 100);
  const kinesthetic = Math.round((K / n) * 100);

  // label logika (měkká, ne tvrdé škatulky)
  const sorted = [
    { key: 'V', val: visual, name: 'Vizuální' },
    { key: 'A', val: auditory, name: 'Auditivní' },
    { key: 'K', val: kinesthetic, name: 'Kinestetický' }
  ].sort((x, y) => y.val - x.val);

  let label = 'Vyvážený';
  if (sorted[0].val >= 40 && (sorted[0].val - sorted[1].val) >= 10) {
    label = `${sorted[0].name} preference`;
  } else if (Math.abs(sorted[0].val - sorted[1].val) < 10) {
    label = `${sorted[0].name}-${sorted[1].name} mix`;
  }

  return { visual, auditory, kinesthetic, label };
}

export interface TexScore {
  autoScore: number;     // MCQ/TF/Cloze/Order
  autoMax: number;
  transferScore: number; // short Q (0-2) – typicky ručně nebo AI-rubrikou
  transferMax: number;
  total: number;
  totalMax: number;
  percentage: number;
}

export function scoreTexAuto(
  test: TexTest,
  userAnswers: Record<string, unknown>
): TexScore {
  let autoScore = 0;
  let autoMax = 0;
  let transferScore = 0;
  let transferMax = 0;

  for (const q of test.questions) {
    if (q.type === 'short') {
      transferMax += 2;
      // transferScore se doplní zvlášť (rubrika / AI)
      continue;
    }
    autoMax += 1;

    const ans = userAnswers[q.id];

    if (q.type === 'mcq') {
      if (ans === q.correct) autoScore += 1;
    } else if (q.type === 'tf') {
      if (ans === q.correct) autoScore += 1;
    } else if (q.type === 'cloze') {
      const normalized = String(ans ?? '').trim().toLowerCase();
      const ok = q.correct.some(v => v.trim().toLowerCase() === normalized);
      if (ok) autoScore += 1;
    } else if (q.type === 'order') {
      // očekává se pole indexů
      if (
        Array.isArray(ans) &&
        JSON.stringify(ans) === JSON.stringify(q.correctOrder)
      ) {
        autoScore += 1;
      }
    }
  }

  const totalMax = autoMax + transferMax;
  const total = autoScore + transferScore;
  const percentage = totalMax > 0 ? Math.round((total / totalMax) * 100) : 0;

  return { autoScore, autoMax, transferScore, transferMax, total, totalMax, percentage };
}

// Utility pro přidání transfer score (short questions)
export function addTransferScore(
  currentScore: TexScore,
  shortScores: number[]
): TexScore {
  const transferScore = shortScores.reduce((sum, s) => sum + s, 0);
  const total = currentScore.autoScore + transferScore;
  const percentage =
    currentScore.totalMax > 0
      ? Math.round((total / currentScore.totalMax) * 100)
      : 0;

  return {
    ...currentScore,
    transferScore,
    total,
    percentage
  };
}
