import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { User } from './login.interface';
import { Router } from '@angular/router'
import { UserService } from './user.service';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private usersUrl = 'https://65f1afc9034bdbecc763605d.mockapi.io/api/angularproject/users';

    private isVisibleSubject = new BehaviorSubject<boolean>(false);
    isVisible$ = this.isVisibleSubject.asObservable();

    private isRegisteredSubject = new BehaviorSubject<boolean>(false)
    isRegistered$ = this.isRegisteredSubject.asObservable();

    constructor(private http: HttpClient, private router: Router, private userService: UserService) { }

    login(login: string, password: string): Observable<User | null> {
        return this.http.get<User[]>(this.usersUrl).pipe(
            map((users: User[]) => {
                const foundUser = users.find(user => user.login === login && user.password === password);
                if (foundUser) {
                    this.isVisibleSubject.next(false)
                    this.userService.setCurrentUser(foundUser)
                    this.router.navigate(['/home'])
                    return foundUser;
                }
                else {
                    this.isVisibleSubject.next(true)
                    console.log("Wrong login or password");

                    return null;
                }
            }),
            catchError(() => {
                console.log('Wrong login or password');
                return of(null);
            })
        );
    }
    register(name: string, surname: string, login:string, password:string, age: string, phonenumber: string, email: string): Observable<User | null> {
        const newUser: User = {
            name: name,
            surname: surname,
            login: login,
            password: password,
            age: age,
            phonenumber: phonenumber,
            email: email,
        };
        this.isRegisteredSubject.next(true)
        return this.http.post<User>(this.usersUrl, newUser).pipe(
            catchError(() => {
                console.log("Failed to register user")
                return of(null)
            })
        )
    }
}
