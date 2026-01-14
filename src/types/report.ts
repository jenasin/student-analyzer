export interface Skill {
  label: string;
  value: number;
}

export interface Report {
  studentPassport: string;
  researchBlock: string;
  skills: Skill[];
  studentType?: string;
  interests?: string[];
  learningStyle?: string;
}

export interface ExtendedReport extends Report {
  vakResult?: {
    visual: number;
    auditory: number;
    kinesthetic: number;
    label: string;
  };
  texScore?: {
    autoScore: number;
    autoMax: number;
    transferScore: number;
    transferMax: number;
    total: number;
    totalMax: number;
    percentage: number;
  };
  sessionDuration?: number;
  completedModules?: string[];
}
