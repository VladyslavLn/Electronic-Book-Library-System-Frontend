import {Component} from '@angular/core';
import {Router} from "@angular/router";
import {JwtHelperService} from "@auth0/angular-jwt";
import {UserJwt} from "./models/user";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'library-frontend';
  helper = new JwtHelperService();

  constructor(private router: Router) {
  }

  isUserAuthenticated(): any {
   return localStorage.getItem("token");
  }

  logoutUser() {
    localStorage.removeItem("token");
    this.router.navigateByUrl("/login");
  }

  getUserInfoFromToken(): UserJwt {
    let token = localStorage.getItem("token")
    let decodedToken = this.helper.decodeToken(token);
    return {
      userId: decodedToken.userId,
      email: decodedToken.sub,
      roles: decodedToken.roles
    };
  }
}
