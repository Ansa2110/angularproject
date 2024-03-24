import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { SuggestedEvent } from './login.interface'
import { catchError } from 'rxjs/operators';
import { UserService } from './user.service';
@Injectable({
  providedIn: 'root'
})
export class SuggestedEventsService {

  constructor(private http: HttpClient, private userSerivce: UserService) { }

  addSuggestedEvent(eventname: string, date: Date, location: string, description: string, typeevent: string, deadline: Date, photourl: string): Observable<SuggestedEvent | null> {

    const userJson = localStorage.getItem('currentUser');

    if (userJson !== null) {
      const currentUser = JSON.parse(userJson);

      const newStartupEvent: SuggestedEvent = {
        eventname: eventname,
        date: date,
        location: location,
        description: description,
        typeevent: typeevent,
        deadline: deadline,
        photourl: photourl,
        email: currentUser.email,
      };

      return this.http.post<SuggestedEvent>('https://65f8418ddf151452460eef2f.mockapi.io/api/angularproject/suggestedevent', newStartupEvent).pipe(
        catchError(() => {
          console.log("Failed to register user");
          return of(null);
        })
      );
    } else {
      console.log("No user data found in local storage");
      return of(null);
    }
  }
}