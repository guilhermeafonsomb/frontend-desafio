import { TestBed } from '@angular/core/testing';

import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { NotificationService } from '../../../shared/services/notification.service';
import { DataUpdateService } from '../../notifications/data-update.service';
import { mockUserDTO, mockUsersReponse } from './users.mock';
import { UsersService } from './users.service';

describe('UsersService', () => {
  let service: UsersService;
  let httpTestingController: HttpTestingController;
  let notificationService: Partial<NotificationService>;
  let dataUpdateService: Partial<DataUpdateService>;

  beforeEach(() => {
    notificationService = { showSuccess: jest.fn() };
    dataUpdateService = { notifyData: jest.fn() };

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        UsersService,
        { provide: NotificationService, useValue: notificationService },
        { provide: DataUpdateService, useValue: dataUpdateService },
      ],
    });

    service = TestBed.inject(UsersService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should call createUser and return new user', () => {
    service.createUser(mockUserDTO).subscribe((response) => {
      expect(response).toEqual(mockUserDTO);
      expect(notificationService.showSuccess).toHaveBeenCalledWith(
        'Usuário cadastrado com sucesso.'
      );
      expect(dataUpdateService.notifyData).toHaveBeenCalledWith('create');
    });

    const req = httpTestingController.expectOne((service as any).url);
    expect(req.request.method).toBe('POST');
    req.flush(mockUserDTO);
  });

  it('should fetch all users', () => {
    service.getAllUsers().subscribe((users) => {
      expect(users).toEqual(mockUsersReponse);
    });

    const req = httpTestingController.expectOne((service as any).url);
    expect(req.request.method).toBe('GET');
    req.flush(mockUsersReponse);
  });

  it('should fetch a specific agenda by ID', () => {
    const testId = '123';

    service.getUserById(testId).subscribe((user) => {
      expect(user).toEqual(mockUsersReponse);
    });

    const req = httpTestingController.expectOne(
      `${(service as any).url}/${testId}`
    );
    expect(req.request.method).toBe('GET');
    req.flush(mockUsersReponse);
  });

  it('should call updateUser and return updated user', () => {
    const testId = '123';

    service.updateUser(testId, mockUserDTO).subscribe((response) => {
      expect(response).toEqual(mockUserDTO);
      expect(notificationService.showSuccess).toHaveBeenCalledWith(
        'Usuário atualizado com sucesso.'
      );
      expect(dataUpdateService.notifyData).toHaveBeenCalledWith('update');
    });

    const req = httpTestingController.expectOne(
      `${(service as any).url}/${testId}`
    );
    expect(req.request.method).toBe('PUT');
    req.flush(mockUserDTO);
  });

  it('should call deleteUser and return status 200', () => {
    service.deleteUser('123').subscribe((response) => {
      expect(response).toEqual(200);
      expect(notificationService.showSuccess).toHaveBeenCalledWith(
        'Usuário deletado com sucesso.'
      );
      expect(dataUpdateService.notifyData).toHaveBeenCalledWith('delete');
    });

    const req = httpTestingController.expectOne(`${(service as any).url}/123`);
    expect(req.request.method).toBe('DELETE');
    req.flush(200);
  });
});
