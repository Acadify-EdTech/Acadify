import { Component, inject, Signal, CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet, RouterLink } from '@angular/router';
import '@material/web/all';
import { QuizappComponent } from './quizapp/quizapp.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { SanitizeHtmlPipe } from './quizapp/sanitize-html.pipe';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, QuizappComponent, DashboardComponent, CommonModule, HttpClientModule, FormsModule, ReactiveFormsModule, SanitizeHtmlPipe],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})

export class AppComponent {
  showButton = true;

  openQuizApp() {
    const quizWindow = window.open('/quizapp', '_blank', 'toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=yes, resizable=no, copyhistory=no, width=' + screen.width + ', height=' + screen.height);
    if (quizWindow) {
      quizWindow.moveTo(0, 0);
      quizWindow.document.body.innerHTML += '<button onclick="document.documentElement.requestFullscreen()">Go Fullscreen</button>';
    }
  }

}