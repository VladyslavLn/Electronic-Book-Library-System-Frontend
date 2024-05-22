import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../service/auth.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {MatDialog} from "@angular/material/dialog";
import {WarningDialogComponent} from "../warning-dialog/warning-dialog.component";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup | undefined;

  constructor(
    private authService: AuthService,
    private fb: FormBuilder,
    private router: Router,
    private dialog: MatDialog
  ) {
  }

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    })
  }

  submitForm() {
    this.authService.register(
      this.registerForm.value
    ).subscribe(response => {
      if (response.id != null) {
        this.dialog.open(WarningDialogComponent, {
          data: 'User with email ' + response.email + ' successfully registered!',
        });
        this.router.navigateByUrl("/login");
      }
    })
  }
}
