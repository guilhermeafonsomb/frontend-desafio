import { TestBed } from '@angular/core/testing';

import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { NotificationService } from '../../../shared/services/notification.service';
import { DataUpdateService } from '../../notifications/data-update.service';
import { mockCategoriesDTO, mockCategoriesResponse } from './categories.mock';
import { CategoriesService } from './categories.service';

describe('CategoriesService', () => {
  let service: CategoriesService;
  let httpTestingController: HttpTestingController;
  let notificationService: Partial<NotificationService>;
  let dataUpdateService: Partial<DataUpdateService>;

  beforeEach(() => {
    notificationService = { showSuccess: jest.fn() };
    dataUpdateService = { notifyData: jest.fn() };

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        CategoriesService,
        { provide: NotificationService, useValue: notificationService },
        { provide: DataUpdateService, useValue: dataUpdateService },
      ],
    });

    service = TestBed.inject(CategoriesService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should call createCategory and return new category', () => {
    service.createCategory(mockCategoriesDTO).subscribe((response) => {
      expect(response).toEqual(mockCategoriesDTO);
      expect(notificationService.showSuccess).toHaveBeenCalledWith(
        'Categoria cadastrada com sucesso.'
      );
      expect(dataUpdateService.notifyData).toHaveBeenCalledWith('create');
    });

    const req = httpTestingController.expectOne((service as any).url);
    expect(req.request.method).toBe('POST');
    req.flush(mockCategoriesDTO);
  });

  it('should fetch all categories', () => {
    service.getAllCategories().subscribe((categories) => {
      expect(categories).toEqual(mockCategoriesResponse);
    });

    const req = httpTestingController.expectOne((service as any).url);
    expect(req.request.method).toBe('GET');
    req.flush(mockCategoriesResponse);
  });

  it('should fetch a specific category by ID', () => {
    const testId = '123';

    service.getCategoryById(testId).subscribe((category) => {
      expect(category).toEqual({ title: 'title category' });
    });

    const req = httpTestingController.expectOne(
      `${(service as any).url}/${testId}`
    );
    expect(req.request.method).toBe('GET');
    req.flush({ title: 'title category' });
  });

  it('should call updateCategory and return updated category', () => {
    service.updateCategory('123', mockCategoriesDTO).subscribe((response) => {
      expect(response).toEqual(mockCategoriesDTO);
      expect(notificationService.showSuccess).toHaveBeenCalledWith(
        'Categoria atualizada com sucesso.'
      );
      expect(dataUpdateService.notifyData).toHaveBeenCalledWith('update');
    });

    const req = httpTestingController.expectOne(`${(service as any).url}/123`);
    expect(req.request.method).toBe('PUT');
    req.flush(mockCategoriesDTO);
  });

  it('should call deleteCategory and return status 200', () => {
    service.deleteCategory('123').subscribe((response) => {
      expect(response).toEqual(null);
      expect(notificationService.showSuccess).toHaveBeenCalledWith(
        'Categoria removida com sucesso.'
      );
      expect(dataUpdateService.notifyData).toHaveBeenCalledWith('delete');
    });

    const req = httpTestingController.expectOne(`${(service as any).url}/123`);
    expect(req.request.method).toBe('DELETE');
    req.flush(null);
  });
});
