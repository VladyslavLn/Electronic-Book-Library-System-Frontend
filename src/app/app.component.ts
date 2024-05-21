import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {UserService} from "./service/user.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  title = 'library-frontend';
  userId: number;

  constructor(private router: Router,
              private userService: UserService,) {
  }

  isUserAuthenticated(): any {
   return localStorage.getItem("token");
  }

  logoutUser() {
    localStorage.removeItem("token");
    this.router.navigateByUrl("/login");
  }

  ngOnInit(): void {
    let userInfoFromToken = this.userService.getUserInfoFromToken();
    this.userId = userInfoFromToken.userId;
  }
}
