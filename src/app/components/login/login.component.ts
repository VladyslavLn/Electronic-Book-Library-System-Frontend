import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../service/auth.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";

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
    private routerService: Router
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
    ).subscribe(
      (response) => {
        const token = response.access_token;
        if (token != null) {
          localStorage.setItem('token', token)
          this.routerService.navigateByUrl("/home")
        }
      }
    )
  }
}
