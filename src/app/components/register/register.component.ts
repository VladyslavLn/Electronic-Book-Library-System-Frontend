import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../service/auth.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup | undefined;

  constructor(
    private authService: AuthService,
    private fb: FormBuilder
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
    console.log(this.registerForm.value);
    this.authService.register(
      this.registerForm.value
    ).subscribe(response => {
      if (response.id != null) {
        alert("User with email " + response.email + " successfully registered!")
      }
    })
  }
}
