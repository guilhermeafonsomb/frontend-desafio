import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { Agenda, AgendaDTO } from '../../../shared/models/agendas.interface';
import { NotificationService } from '../../../shared/services/notification.service';
import { SessionUpdateService } from '../../notifications/session-update.service';

@Injectable({
  providedIn: 'root',
})
export class AgendasService {
  private url = `${environment.api}/agendas`;

  constructor(
    private http: HttpClient,
    private notificationService: NotificationService,
    private sessionUpdateService: SessionUpdateService
  ) {}

  createAgenda(payload: AgendaDTO): Observable<Agenda> {
    return this.http.post<Agenda>(this.url, payload).pipe(
      tap(() => {
        this.notificationService.showSuccess('Pauta cadastrada com sucesso.'),
          this.sessionUpdateService.notifyUpdate('create');
      })
    );
  }

  getAgendaByCategory(categoryId: string): Observable<Agenda[]> {
    return this.http.get<Agenda[]>(`${this.url}/byCategory/${categoryId}`);
  }

  getAllAgendas(status: string): Observable<Agenda[]> {
    return this.http.get<Agenda[]>(`${this.url}/${status}`);
  }

  getAgendaById(id: string): Observable<Agenda> {
    return this.http.get<Agenda>(`${this.url}/byOne/${id}`);
  }

  updateAgenda(id: string, payload: AgendaDTO): Observable<Agenda> {
    return this.http.put<Agenda>(`${this.url}/${id}`, payload).pipe(
      tap(() => {
        this.notificationService.showSuccess('Pauta atualizada com sucesso.'),
          this.sessionUpdateService.notifyUpdate('update');
      })
    );
  }

  deleteAgenda(id: string): Observable<any> {
    return this.http.delete(`${this.url}/${id}`).pipe(
      tap(() => {
        this.notificationService.showSuccess('Pauta removida com sucesso.'),
          this.sessionUpdateService.notifyUpdate('delete');
      })
    );
  }
}
