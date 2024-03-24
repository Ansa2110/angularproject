import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './profile/profile.component';
import { StartupeventsComponent } from './startupevents/startupevents.component';
import { SuggestedeventformComponent } from './suggestedeventform/suggestedeventform.component';

export const routes: Routes = [
    {path: '', redirectTo:'/home', pathMatch:'full'},
    {path: 'home', component: HomeComponent},
    {path: 'profile', component: ProfileComponent},
    {path: 'login', component: LoginComponent},
    {path: 'register', component: RegisterComponent},
    {path: 'startupevents', component:StartupeventsComponent},
    {path: 'suggestedeventform', component: SuggestedeventformComponent}
];
