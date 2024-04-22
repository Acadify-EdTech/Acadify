import { Component, OnInit } from '@angular/core';
import { RouterLink, Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms'


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterLink, CommonModule, FormsModule, ReactiveFormsModule, HttpClientModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})

export class LoginComponent implements OnInit{
  loginVerifier = false;
  hidePassword = true;
  body = {
    "username": "",
    "password": ""
  }
  state="init"

    constructor(private http: HttpClient, private router: Router) { }

    ngOnInit() {
      this.http.get('/api/user/checkAuth').subscribe({
        next: (response: any) => {
          if (response.isLoggedIn) {
            this.router.navigate(['/dashboard']);
          }
        },
        error: error => {
          console.error(error);
        }
      });
    }

    onSubmit(form: NgForm) {
        if (form.valid ) {

            this.body.username = form.value.email;
            this.body.password = form.value.password;
            this.http
                .post('http://localhost:3000/api/user/signin', this.body)
                .subscribe((response: any) => {       
                    this.state = response.msg;
                    if(this.state == "Log In Success"){
                        this.loginVerifier = true;
                        this.router.navigate(['/dashboard']);
                    }
                });
        } else {
            console.error('Form is invalid');
        }
    }
  
}