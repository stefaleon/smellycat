
// import { Injectable } from '@angular/core';
// import { Subject } from 'rxjs';

// @Injectable({
//   providedIn: 'root',
// })
// export class ToastService {
//   private toastSubject$ = new Subject<any>();

//   show(message: string, type: string) {
//     this.toastSubject$.next({ message, type });
//   }

//   getToastObservable() {
//     return this.toastSubject$.asObservable();
//   }
// }


/**
 * Alternative implementation
 * (just a basic alternative to RxJS's Subject)
 * The getToastObservable method returns an object that mimics the behavior of an observable.
 * It provides subscribe and unsubscribe methods to register and unregister observer functions.
 */
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  private toastObservers: Array<
    (toast: { message: string; type: string }) => void
  > = [];

  show(message: string, type: string) {
    const toast = { message, type };
    this.toastObservers.forEach((observer) => observer(toast));
  }

  getToastObservable() {
    return {
      subscribe: (
        observer: (toast: { message: string; type: string }) => void
      ) => {
        this.toastObservers.push(observer);
      },
      unsubscribe: (
        observer: (toast: { message: string; type: string }) => void
      ) => {
        const index = this.toastObservers.indexOf(observer);
        if (index !== -1) {
          this.toastObservers.splice(index, 1);
        }
      },
    };
  }
}
