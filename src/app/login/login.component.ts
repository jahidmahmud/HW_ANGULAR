import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { routes } from '../app.routes';
import { AuthService } from '../auth.service';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  constructor(private router:Router,
    private authService:AuthService){

  }
  logIn(email: string, password: string) {
    if(email=="abc@gmail.com" && password == "1234"){
      this.authService.logIn();
      console.log("Login Successful");
    } else{
      console.log("Login failed");
    }
    this.router.navigate(['/home']);
  }

  logOut(){
    this.authService.logOut();
  }
}
