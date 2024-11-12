import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { FooterComponent } from './footer/footer.component';
import { NavComponent } from './nav/nav.component';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import {EmployeeComponent} from "./employee/employee.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,HomeComponent,NavComponent,
    FooterComponent,RouterOutlet, RouterLink,CommonModule,HttpClientModule,EmployeeComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'login';
}
