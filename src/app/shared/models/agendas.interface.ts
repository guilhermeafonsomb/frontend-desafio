import { Category } from './categories.interface';

export interface AgendaDTO {
  title: string;
  duration: number;
  category: Category;
}

export interface Agenda {
  id: string;
  title: string;
  duration: number;
  approved: boolean;
  active: boolean;
  category: Category;
  open: boolean;
  yesVotes: number;
  noVotes: number;
  startTime: string;
}
