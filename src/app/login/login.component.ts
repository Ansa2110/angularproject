import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { loginAction } from '../store/login.actions';
import { CommonModule } from '@angular/common';
import { AuthService } from '../store/login.service';
import { RouterModule } from '@angular/router';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
   loginForm!: FormGroup
   login: string = '';
   password: string = '';
   isVisible = false;
   constructor(private store: Store, private authService: AuthService, private fb: FormBuilder) {}
   ngOnInit()
   {

    this.loginForm = this.fb.group({
      login:['', Validators.required],
      password:['', Validators.required]
    })

    this.authService.isVisible$.subscribe(isVisible => {
      this.isVisible = isVisible
     })
   }

   enterUser()
   {
     this.store.dispatch(loginAction({login: this.loginForm.value.login, password:this.loginForm.value.password}))
   }

}
