
export type Role = 'user' | 'model';

export interface Skill {
  label: string;
  value: number;
}

export interface Message {
  role: Role;
  text: string;
  timestamp: Date;
}

export interface Report {
  studentPassport: string;
  researchBlock: string;
  skills: Skill[];
}

export enum AppStatus {
  INITIAL = 'INITIAL',
  CHATTING = 'CHATTING',
  EVALUATING = 'EVALUATING',
  FINISHED = 'FINISHED'
}
