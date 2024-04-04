import { Component } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'library-frontend';

  constructor(private router: Router) {
  }
  isUserAuthenticated(): any {
   return localStorage.getItem("token")
  }

  logoutUser() {
    localStorage.removeItem("token")
    this.router.navigateByUrl("/login")
  }
}
