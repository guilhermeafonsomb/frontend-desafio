import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CategoryUpdateService {
  private updateNotifierCategory = new BehaviorSubject<string>('');

  public updatesCategory$ = this.updateNotifierCategory.asObservable();

  constructor() {}

  notifyUpdate(type: 'create' | 'update' | 'delete' | 'patch') {
    this.updateNotifierCategory.next(type);
  }
}
