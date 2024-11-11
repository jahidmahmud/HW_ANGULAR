import { Component,OnInit } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [RouterOutlet, RouterLink],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.css'
})
export class NavComponent implements OnInit{
  isAuthinticated:boolean=false;
  constructor(
  private authService:AuthService){
  }

  ngOnInit() {
    this.isAuthinticated = this.authService.isAuthenticated();
  }
  logout(){
    this.authService.logOut();
    this.isAuthinticated = false;
  }
}
