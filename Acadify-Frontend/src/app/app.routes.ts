import { Routes } from '@angular/router';
import { QuizappComponent } from './quizapp/quizapp.component';
import { DashboardComponent } from './dashboard/dashboard.component';

export const routes: Routes = [
    { path: 'quizapp', component: QuizappComponent },
    { path: 'dashboard', component: DashboardComponent }
];
