import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/model/user';
import { AuthService } from 'src/app/service/auth.service';
import { AppService } from 'src/app/service/app.service';
import { sampleData } from 'src/app/mock/assignment_sample';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  isSubmitted = false;

  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private router: Router,
    private appService: AppService
  ) {}

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  get formControls() {
    return this.loginForm.controls;
  }

  login() {
    console.log(this.loginForm.value);
    this.isSubmitted = true;
    if (this.loginForm.invalid) {
      return;
    }
    this.authService.login(this.loginForm.value);
    this.appService.saveSampleDataInStorage(sampleData);
    this.router.navigateByUrl('/home');
  }
}
