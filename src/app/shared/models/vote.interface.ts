export interface AddVoteDTO {
  agendaId: string;
  userId: string;
  vote: 'SIM' | 'NAO';
}
