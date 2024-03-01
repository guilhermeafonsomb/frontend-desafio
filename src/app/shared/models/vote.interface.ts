export interface AddVoteDTO {
  agendaId: number;
  userId: number;
  vote: 'SIM' | 'NAO';
}
