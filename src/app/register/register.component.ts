import { Component } from '@angular/core';
import { FormGroup, FormsModule, ReactiveFormsModule, Validators, FormBuilder } from '@angular/forms';
import { Store } from '@ngrx/store';
import { registerAction } from '../store/login.actions';
import { CommonModule } from '@angular/common';
import { AuthService } from '../store/login.service';
import { RouterModule } from '@angular/router';
@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, CommonModule, RouterModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  myForm!:FormGroup;

  constructor(private fb: FormBuilder, private store: Store, private authService: AuthService) { }
  isRegistered = false;
  ngOnInit()
  {
    this.myForm = this.fb.group({
      name: ['', [Validators.required, Validators.pattern('[a-zA-Zа-яА-я\-]*')]],
      surname: ['', [Validators.required, Validators.pattern('[a-zA-Zа-яА-я\-]*')]],
      login: ['', [Validators.required, Validators.pattern(/^[a-zA-Z][a-zA-Z0-9_-]{2,19}$/)]],
      password: ['', [Validators.required, Validators.pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+}{"':;?/>.<,])(?=.*[a-zA-Z]).{8,20}$/)]],
      age: ['', [Validators.required, Validators.pattern('[0-9]*')]],
      phonenumber: ['', [Validators.required, Validators.pattern('[0-9]*')]],
      email: ['', [Validators.required, Validators.pattern(/^(?=.{1,254}$)(?=.{1,64}@)[-!#$%&'*+/0-9=?A-Z^_`a-z{|}~]+(\.[-!#$%&'*+/0-9=?A-Z^_`a-z{|}~]+)*@[A-Za-z0-9]([A-Za-z0-9-]{0,61}[A-Za-z0-9])?(\.[A-Za-z0-9]([A-Za-z0-9-]{0,61}[A-Za-z0-9])?)*$/)]]

    })
    this.authService.isRegistered$.subscribe(isRegistered => {
      this.isRegistered = isRegistered
     })
  }

  onRegister()
  {
    if(this.myForm.valid)
    {
      const formData = this.myForm.value;
      this.store.dispatch(registerAction({name: formData.name, surname: formData.surname, login: formData.login, password: formData.password, age: formData.age, phonenumber: formData.phonenumber, email: formData.email }))
      this.myForm.reset()
    }
  }
}
