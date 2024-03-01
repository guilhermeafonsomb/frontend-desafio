import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SessionUpdateService {
  private updateNotifier = new BehaviorSubject<string>('');

  public updates$ = this.updateNotifier.asObservable();

  constructor() {}

  notifyUpdate(type: 'create' | 'update' | 'delete') {
    this.updateNotifier.next(type);
  }
}
