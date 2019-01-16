import { AbstractControl } from '@angular/forms';
import { Observable, Observer } from 'rxjs';

export const checkImage = (control: AbstractControl): Promise<{[key: string]: any}> | Observable<{[key: string]: any}> => {
  const file = control.value as File;
  const fileReader = new FileReader();
  const frObs = Observable.create((observer: Observer<{[key: string]: any}>) => {
    fileReader.addEventListener('loadend', () => {
      observer.next({ invalidFile: true });
      observer.complete();
    });
    fileReader.readAsArrayBuffer(file);
  });
  return frObs;
};
