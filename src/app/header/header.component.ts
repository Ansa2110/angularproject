import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { User } from '../store/login.interface';
import { UserService } from '../store/user.service';
import { CommonModule } from '@angular/common';
import { AppliedUser } from '../store/login.interface';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
    currentUser: User | null | undefined;
    constructor(private userService: UserService)  {}
    isLogged = false;
    ngOnInit()
    {
      this.currentUser = this.userService.getCurrentUser();
      if(this.currentUser)
      {
        this.isLogged = true
      }
    }
    logout() {
      localStorage.clear();
      this.isLogged = false;
    }
}
