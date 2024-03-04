import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { environment } from '../../../../environments/environment';
import {
  Category,
  CategoryDTO,
} from '../../../shared/models/categories.interface';
import { NotificationService } from '../../../shared/services/notification.service';
import { DataUpdateService } from '../../notifications/data-update.service';

@Injectable({
  providedIn: 'root',
})
export class CategoriesService {
  private url = `${environment.api}/categories`;

  constructor(
    private http: HttpClient,
    private notificationService: NotificationService,
    private dataUpdateService: DataUpdateService
  ) {}

  createCategory(payload: CategoryDTO): Observable<Category> {
    return this.http.post<Category>(this.url, payload).pipe(
      tap(() => {
        this.notificationService.showSuccess('Categoria criada com sucesso.'),
          this.dataUpdateService.notifyData('create');
      })
    );
  }

  getAllCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(this.url);
  }

  getCategoryById(id: string): Observable<Category> {
    return this.http.get<Category>(`${this.url}/${id}`);
  }

  updateCategory(id: string, payload: CategoryDTO): Observable<Category> {
    return this.http.put<Category>(`${this.url}/${id}`, payload).pipe(
      tap(() => {
        this.notificationService.showSuccess(
          'Categoria atualizada com sucesso.'
        ),
          this.dataUpdateService.notifyData('update');
      })
    );
  }

  deleteCategory(id: string): Observable<any> {
    return this.http.delete(`${this.url}/${id}`).pipe(
      tap(() => {
        this.notificationService.showSuccess('Categoria removida com sucesso.');
        this.dataUpdateService.notifyData('delete');
      })
    );
  }
}
