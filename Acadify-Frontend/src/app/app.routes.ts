import { Routes } from '@angular/router';
import { QuizappComponent } from './quizapp/quizapp.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';

export const routes: Routes = [
    { path: 'quizapp', component: QuizappComponent },
    { path: 'dashboard', component: DashboardComponent},
    { path: 'signup', component: SignupComponent },
    { path: 'login', component: LoginComponent },
];
