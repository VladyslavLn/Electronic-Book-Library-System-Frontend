import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../service/auth.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {UserService} from "../../service/user.service";
import {MatDialog} from "@angular/material/dialog";
import {WarningDialogComponent} from "../warning-dialog/warning-dialog.component";
import {catchError, of} from "rxjs";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {

  loginForm:  FormGroup | undefined;
  constructor(
    private authService: AuthService,
    private fb: FormBuilder,
    private routerService: Router,
    private userService: UserService,
    private dialog: MatDialog
  ) {
  }
  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    })
  }

  submitForm() {
    this.authService.login(
      this.loginForm.value
    ).pipe(
      catchError(err => {
        console.log(err);
        this.dialog.open(WarningDialogComponent, {
          data: err.error.message,
        });
        return of(err);
      })
    ).subscribe(
      (response) => {
        const token = response.access_token;
        if (token != null) {
          localStorage.setItem('token', token);
          const isUserAdmin = this.userService.getUserInfoFromToken().roles.includes('ADMIN');
          this.authService.changeAuthStatus(true);
          this.authService.changeAdminStatus(isUserAdmin);
          this.routerService.navigateByUrl("/home")
        }
      }
    )
  }
}
