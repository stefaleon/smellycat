import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  private toastSubject = new Subject<any>();

  show(message: string, type: string) {
    this.toastSubject.next({ message, type });
  }

  getToastObservable() {
    return this.toastSubject.asObservable();
  }
}
