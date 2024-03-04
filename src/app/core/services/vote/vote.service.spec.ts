import { TestBed } from '@angular/core/testing';

import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { NotificationService } from '../../../shared/services/notification.service';
import { DataUpdateService } from '../../notifications/data-update.service';
import { mockAddVoteDTO } from './vote.mock';
import { VoteService } from './vote.service';

describe('VoteService', () => {
  let service: VoteService;
  let httpTestingController: HttpTestingController;
  let notificationService: Partial<NotificationService>;
  let dataUpdateService: Partial<DataUpdateService>;

  beforeEach(() => {
    notificationService = { showSuccess: jest.fn() };
    dataUpdateService = { notifyData: jest.fn() };

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        VoteService,
        { provide: NotificationService, useValue: notificationService },
        { provide: DataUpdateService, useValue: dataUpdateService },
      ],
    });

    service = TestBed.inject(VoteService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should call openVotingSession and return success message', () => {
    service.openVotingSession('123').subscribe(() => {
      expect(notificationService.showSuccess).toHaveBeenCalledWith(
        'Votação iniciada com sucesso.'
      );
      expect(dataUpdateService.notifyData).toHaveBeenCalledWith('patch');
    });

    const req = httpTestingController.expectOne(`${service['url']}/open/123`);
    expect(req.request.method).toBe('PATCH');
    req.flush({});
  });

  it('should call closeVotingSession and return success message', () => {
    service.closeVotingSession('123').subscribe(() => {
      expect(dataUpdateService.notifyData).toHaveBeenCalledWith('patch');
    });

    const req = httpTestingController.expectOne(`${service['url']}/close/123`);
    expect(req.request.method).toBe('PATCH');
    req.flush({});
  });

  it('should call addVote and return success message', () => {
    service.addVote(mockAddVoteDTO).subscribe(() => {
      expect(notificationService.showSuccess).toHaveBeenCalledWith(
        'Voto realizado com sucesso.'
      );
      expect(dataUpdateService.notifyData).toHaveBeenCalledWith('create');
    });

    const req = httpTestingController.expectOne(service['url']);
    expect(req.request.method).toBe('POST');
    req.flush({});
  });
});
