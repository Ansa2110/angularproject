import { Injectable } from '@angular/core';
import { User } from './login.interface';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private currentUserKey = 'currentUser';
  Logged: boolean = false;
  setCurrentUser(user: User): void {
    const user1 =
    {
        name: user.name,
        surname: user.surname,
        age: user.age,
        phonenumber: user.phonenumber,
        email: user.email,
    }
    localStorage.setItem(this.currentUserKey, JSON.stringify(user1))
  }

  getCurrentUser(): User | null {
    const userJson = localStorage.getItem(this.currentUserKey)
    return userJson ? JSON.parse(userJson) : null;
  }

  isLogged(): boolean
  {
    const currentUser = localStorage.getItem(this.currentUserKey)
    if(currentUser != null)
    {
      return true
    }
    else
    {
      return false
    }
  }
  get getUserFromLocalStorage()
  {
    return JSON.parse(localStorage.getItem('currentUser') || 'null');
  }
}
