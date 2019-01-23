import { AbstractControl } from '@angular/forms';
import { Observable, Observer, of } from 'rxjs';

export const checkImageSize = (control: AbstractControl): Promise<{[key: string]: any}> | Observable<{[key: string]: any}> => {
  const file = control.value as File;
  if (file == null) {
    return of(null);
  }
  const fileReader = new FileReader();
  const frObs = Observable.create((observer: Observer<{[key: string]: any}>) => {
    fileReader.addEventListener('loadend', () => {
      const arr = new Uint8Array(fileReader.result as ArrayBuffer).subarray(0, 4);
      let header = '';
      let isValid = false;
      for (let i = 0; i < arr.length; i++) {
        header +=  arr[i].toString(16);
      }
      switch (header) {
        case '89504e47':
          isValid = true;
          break;
        case 'ffd8ffe0':
        case 'ffd8ffe1':
        case 'ffd8ffe2':
        case 'ffd8ffe3':
        case 'ffd8ffe8':
          isValid = true;
          break;
        default:
          isValid = false;
          break;
      }
      if (isValid) {
        const urlReader = new FileReader();
        urlReader.addEventListener('loadend', () => {
          const image = new Image;
          image.onload = () => {
            if (image.width < 100 || image.width > 300 || image.height < 100 || image.height > 300) {
              observer.next({ invalidImage: true });
            } else {
              observer.next(null);
            }
            observer.complete();
          };
          image.src = (urlReader.result as string);
        });
        urlReader.readAsDataURL(file);
      } else {
        observer.next({ invalidImage: true });
        observer.complete();
      }
    });
    fileReader.readAsArrayBuffer(file);
  });
  return frObs;
};
