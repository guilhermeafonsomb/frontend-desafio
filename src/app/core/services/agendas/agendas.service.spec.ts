import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { NotificationService } from '../../../shared/services/notification.service';
import { DataUpdateService } from '../../notifications/data-update.service';
import { mockAgendaDTO, mockAgendaReponse } from './agenda.mock';
import { AgendasService } from './agendas.service';

describe('AgendasService', () => {
  let service: AgendasService;
  let httpTestingController: HttpTestingController;
  let notificationService: Partial<NotificationService>;
  let dataUpdateService: Partial<DataUpdateService>;

  beforeEach(() => {
    notificationService = { showSuccess: jest.fn() };
    dataUpdateService = { notifyData: jest.fn() };

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        AgendasService,
        { provide: NotificationService, useValue: notificationService },
        { provide: DataUpdateService, useValue: dataUpdateService },
      ],
    });

    service = TestBed.inject(AgendasService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should call createAgenda and return new agenda', () => {
    service.createAgenda(mockAgendaDTO).subscribe((response) => {
      expect(response).toEqual(mockAgendaReponse);
      expect(notificationService.showSuccess).toHaveBeenCalledWith(
        'Pauta cadastrada com sucesso.'
      );
      expect(dataUpdateService.notifyData).toHaveBeenCalledWith('create');
    });

    const req = httpTestingController.expectOne((service as any).url);
    expect(req.request.method).toBe('POST');
    req.flush(mockAgendaReponse);
  });

  it('should fetch a specific agenda by ID', () => {
    const testId = '123';

    service.getAgendaById(testId).subscribe((agenda) => {
      expect(agenda).toEqual(mockAgendaReponse);
    });

    const req = httpTestingController.expectOne(
      `${(service as any).url}/byOne/${testId}`
    );
    expect(req.request.method).toBe('GET');
    req.flush(mockAgendaReponse);
  });

  it('should fetch all agendas by status', () => {
    const testStatus = 'close';

    service.getAllAgendas(testStatus).subscribe((agendas) => {
      expect(agendas).toEqual([mockAgendaReponse]);
    });

    const req = httpTestingController.expectOne(
      `${(service as any).url}/${testStatus}`
    );
    expect(req.request.method).toBe('GET');
    req.flush([mockAgendaReponse]);
  });

  it('should fetch all agendas by category', () => {
    const testCategoryId = '123';

    service.getAgendaByCategory(testCategoryId).subscribe((agendas) => {
      expect(agendas).toEqual([mockAgendaReponse]);
    });

    const req = httpTestingController.expectOne(
      `${(service as any).url}/byCategory/${testCategoryId}`
    );
    expect(req.request.method).toBe('GET');
    req.flush([mockAgendaReponse]);
  });

  it('should call updateAgenda and return updated agenda', () => {
    const testId = '123';

    service.updateAgenda(testId, mockAgendaDTO).subscribe((response) => {
      expect(response).toEqual(mockAgendaReponse);
      expect(notificationService.showSuccess).toHaveBeenCalledWith(
        'Pauta atualizada com sucesso.'
      );
      expect(dataUpdateService.notifyData).toHaveBeenCalledWith('update');
    });

    const req = httpTestingController.expectOne(
      `${(service as any).url}/${testId}`
    );
    expect(req.request.method).toBe('PUT');
    req.flush(mockAgendaReponse);
  });

  it('should call deleteAgenda and return nothing', () => {
    const testId = '123';

    service.deleteAgenda(testId).subscribe(() => {
      expect(notificationService.showSuccess).toHaveBeenCalledWith(
        'Pauta removida com sucesso.'
      );
      expect(dataUpdateService.notifyData).toHaveBeenCalledWith('delete');
    });

    const req = httpTestingController.expectOne(
      `${(service as any).url}/${testId}`
    );
    expect(req.request.method).toBe('DELETE');
    req.flush(null);
  });
});
