import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DataUpdateService {
  private dataNotifier = new BehaviorSubject<string>('');

  public datas$ = this.dataNotifier.asObservable();

  constructor() {}

  notifyData(type: 'create' | 'update' | 'delete' | 'patch') {
    this.dataNotifier.next(type);
  }
}
