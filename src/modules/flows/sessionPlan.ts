export interface SessionModule {
  id: string;
  title: string;
  minutes: number;
  description?: string;
}

/**
 * Aktualizovaný 60 min plán s typologickým testem
 */
export const sessionPlan = {
  totalMinutes: 60,
  modules: [
    {
      id: 'consent',
      title: 'Souhlas & start',
      minutes: 2,
      description: 'Uvítání, vysvětlení procesu, souhlas s účastí'
    },
    {
      id: 'chat',
      title: 'Koučovací rozhovor',
      minutes: 12,
      description: 'AI chat - zájmy, učební styl, silné/slabé stránky (8-10 otázek)'
    },
    {
      id: 'typology',
      title: 'Typologický test',
      minutes: 14,
      description: '30 otázek A-D: abstraktní/konkrétní, aktivní/reflektivní, vizuální/verbální, sekvenční/globální, struktura/flexibilita'
    },
    {
      id: 'tex_read',
      title: 'Čtení TEX',
      minutes: 12,
      description: 'Student čte zadaný text vlastním tempem'
    },
    {
      id: 'tex_test',
      title: 'Test porozumění TEX',
      minutes: 12,
      description: 'MCQ, T/F, cloze, řazení, krátká odpověď'
    },
    {
      id: 'transfer',
      title: 'Transfer úloha',
      minutes: 6,
      description: 'Aplikace naučeného na nový kontext'
    },
    {
      id: 'wrap',
      title: 'Závěr & profil',
      minutes: 2,
      description: 'Shrnutí, zobrazení kompletního profilu, tipy'
    }
  ] as SessionModule[]
} as const;

export type SessionModuleId = typeof sessionPlan.modules[number]['id'];

// Helper pro získání modulu podle ID
export function getModuleById(id: SessionModuleId): SessionModule | undefined {
  return sessionPlan.modules.find(m => m.id === id);
}

// Helper pro výpočet celkového času do určitého modulu
export function getTimeUpToModule(id: SessionModuleId): number {
  let total = 0;
  for (const m of sessionPlan.modules) {
    if (m.id === id) break;
    total += m.minutes;
  }
  return total;
}

// Helper pro výpočet progress v %
export function getProgressPercent(completedModuleId: SessionModuleId): number {
  const timeUp = getTimeUpToModule(completedModuleId);
  const currentModule = getModuleById(completedModuleId);
  const totalTime = timeUp + (currentModule?.minutes || 0);
  return Math.round((totalTime / sessionPlan.totalMinutes) * 100);
}
