import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ILogin } from '../login';
import { AuthService } from '../services/auth.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  model: ILogin = { userid: "admin", password: "admin" };
  loginForm: FormGroup;
  submitted = false;
  isLoginError: boolean = false;
  errMessage: string = ''; 
  returnUrl: string;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    public authService: AuthService
  ) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      userid: ['', [Validators.required]],
      password: ['', Validators.required]
    });
    this.returnUrl = '/user';
    this.authService.logout();
  }

  get userid() { return this.loginForm.get('userid'); }
  get password() { return this.loginForm.get('password'); }

  loginUser() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.loginForm.invalid) {
      return;
    }
    else{
      if(this.userid.value == this.model.userid && this.password.value == this.model.password){
        console.log("Login successful");
        //this.authService.authLogin(this.model);
        localStorage.setItem('isLoggedIn', "true");
        localStorage.setItem('token', this.userid.value);
        this.router.navigate([this.returnUrl]);
      }
      else{
        this.isLoginError = true;
        this.errMessage = "Please check your userid and password";
      }
    }  
  }

}
