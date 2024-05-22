import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {UserService} from "./service/user.service";
import {AuthService} from "./service/auth.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  title = 'library-frontend';
  userId: number;
  isAuthenticated: boolean;
  isAdmin: boolean;

  constructor(private router: Router,
              private userService: UserService,
              private authService: AuthService) {
    this.authService.currentAuthStatus.subscribe(status => this.isAuthenticated = status);
    this.authService.currentAdminStatus.subscribe(status => this.isAdmin = status);
  }

  logoutUser() {
    localStorage.removeItem("token");
    this.authService.changeAuthStatus(false);
    this.authService.changeAdminStatus(false);
    this.router.navigateByUrl("/login");
  }

  ngOnInit(): void {
    let userInfoFromToken = this.userService.getUserInfoFromToken();
    if (userInfoFromToken != null) {
      this.userId = userInfoFromToken.userId;
      this.isAdmin = this.userService.getUserInfoFromToken().roles.includes('ADMIN');
    }
  }
}
