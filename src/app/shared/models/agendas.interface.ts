export interface AgendaDTO {
  title: string;
  duration: number;
}

export interface Agenda {
  id: number;
  title: string;
  duration: number;
  approved: boolean;
  active: boolean;
  open: boolean;
  yesVotes: number;
  noVotes: number;
}
