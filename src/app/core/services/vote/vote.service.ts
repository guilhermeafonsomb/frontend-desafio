import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { AddVoteDTO } from '../../../shared/models/vote.interface';

@Injectable({
  providedIn: 'root',
})
export class VoteService {
  private url = `${environment.api}/vote`;

  constructor(private http: HttpClient) {}

  openVotingSession(agendaId: number) {
    return this.http.patch(`${this.url}/open/${agendaId}`, {});
  }

  closeVotingSession(agendaId: number) {
    return this.http.patch(`${this.url}/close/${agendaId}`, {});
  }

  addVote(payload: AddVoteDTO) {
    return this.http.post(`${this.url}`, payload);
  }
}
