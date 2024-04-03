import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

/*  -Observable Data Service pattern
      -BehaviorSubject to store the current state of the loading indicator
      -keeping the subject private, to keep control over who can emit values using it
      -exposing the subject as an Observable 
        -so that any component can subscribe to it 
          -gets notified when the loading indicator is turned on or off
      -exposing two simple public methods to turn the loading indicator on or off
*/

@Injectable({
  providedIn: 'root',
})
export class LoadingService {
  
  private loadingSubject = new BehaviorSubject<boolean>(false);

  loading$ = this.loadingSubject.asObservable();  

  loadingOn() {
    this.loadingSubject.next(true);
  }

  loadingOff() {
    this.loadingSubject.next(false);
  }
}
