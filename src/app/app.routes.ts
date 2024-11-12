import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AboutusComponent } from './aboutus/aboutus.component';
import { ContactusComponent } from './contactus/contactus.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './auth.guard';
import {EmployeeComponent} from "./employee/employee.component";

export const routes: Routes = [
  { path: 'home',   component:HomeComponent },
  { path: 'about-us', component: AboutusComponent },
  { path: 'contact-us', component: ContactusComponent , canActivate: [AuthGuard] },
  { path: 'log-in', component: LoginComponent },
  { path: 'employee', component: EmployeeComponent },
  { path: '',   redirectTo: '/home', pathMatch: 'full' }
];
