import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterLink, Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { switchMap } from 'rxjs/operators';

@Component({
    selector: 'app-signup',
    standalone: true,
    imports: [
        RouterLink,
        FormsModule,
        ReactiveFormsModule,
        CommonModule,
        HttpClientModule,
    ],
    templateUrl: './signup.component.html',
    styleUrl: './signup.component.css',
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
})

export class SignupComponent {
    hidePassword = true;
    formSubmitted = false;
    passwordsMatch = true;
    step = 1;
    userData = {
        firstName: '',
        lastName: '',
        username: '',
        email: '',
        educational_institute: '',
        password: '',
    };
    setotp = {
        email: '',
        otp: 0,
        method: '',
    };
    state = 'Init';

    constructor(private http: HttpClient, private router: Router) { }

    onSubmit(form: NgForm) { 
        if (form.value.password !== form.value.confirmPassword) {
            this.passwordsMatch = false;
            return;
        }
        if (form.valid) {
            this.userData.firstName = form.value.firstName;
            this.userData.lastName = form.value.lastName;
            this.userData.username = form.value.username;
            this.userData.password = form.value.password;
            // TODO : Go to next step only if data is entered
            this.step = 2;
        } else {
            console.error('Form is invalid');
        }
    }

    getOtp(email: string) {
        const body = { email };
        this.userData.email = email;
        this.setotp.email = email;
        this.http
            .post('http://localhost:3000/api/user/getotp', body)
            .subscribe((response: any) => {
                this.state = response.msg;
            });
    }

    onGetOtp(form: NgForm) {
        this.formSubmitted = true;
        if (form.valid) {
            this.step = 3;
        } else {
            console.error('Error Occurred');
        }
    }

    

    onSubmitOtp(form: NgForm) {
        if (form.valid) {
            this.setotp.otp = parseInt(form.value.otp);
            this.setotp.method = 'signup';
            // Send a request to the server to verify the OTP
            this.http
                .post('http://localhost:3000/api/user/verifyotp', this.setotp)
                .pipe(
                    switchMap((response: any) => {
                        console.log(response);
                        this.state = response.msg;
                        if (this.state == 'Verification Success') {
                            // If OTP verification is successful, make a POST request to /api/user/signup
                            return this.http.post('http://localhost:3000/api/user/signup', this.userData);
                        } else {
                            // If OTP verification fails, throw an error
                            throw new Error('OTP verification failed');
                        }
                    })
                )
                .subscribe(
                    (response: any) => {
                        console.log(response);
                        // Handle successful signup
                        this.router.navigate(['/login']);
                    },
                    (error) => {
                        console.error(error);
                        // Handle failed signup
                    }
                );
        } else {
            console.error('Form is invalid');
        }
    }
}