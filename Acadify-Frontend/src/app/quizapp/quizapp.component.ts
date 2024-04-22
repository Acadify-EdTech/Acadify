import { Component, AfterViewInit, CUSTOM_ELEMENTS_SCHEMA, OnInit, ViewEncapsulation, PLATFORM_ID, Inject, HostListener } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import '@material/web/all';
import { timer, interval } from 'rxjs';
import { takeWhile } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { FormControl } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { SanitizeHtmlPipe } from './sanitize-html.pipe';
import { Router } from '@angular/router';

declare global {
  interface Document {
    webkitFullscreenElement: Element | null;
    mozFullScreenElement: Element | null;
    msFullscreenElement: Element | null;
  }
}

@Component({
  selector: 'app-quizapp',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, SanitizeHtmlPipe],
  templateUrl: './quizapp.component.html',
  styleUrls: ['./quizapp.component.css'],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})

export class QuizappComponent implements OnInit {
  timerText = '60:00';
  countdownTime = 60 * 60; // 60 minutes in seconds

  questions: any[] = []; // Initialize the 'questions' property with an empty array
  currentQuestionIndex = 0;

  constructor(@Inject(PLATFORM_ID) private platformId: Object, private http: HttpClient, private router: Router) { }

  ngOnInit() {
    this.http.get<any[]>('http://localhost:3000/api/questions').subscribe((data: any[]) => {
      this.questions = data;
    });

    if (isPlatformBrowser(this.platformId)) {
      this.checkFullscreen();
    }
  }
  startTimer() {
    const countdown$ = timer(0, 1000)
      .pipe(takeWhile(() => --this.countdownTime >= 0));

    countdown$.subscribe(() => {
      const minutes = Math.floor(this.countdownTime / 60);
      const seconds = this.countdownTime % 60;

      this.timerText = `${minutes < 10 ? '0' + minutes : minutes}:${seconds < 10 ? '0' + seconds : seconds}`;
    });
  }
  @HostListener('document:fullscreenchange', [])
  onFullscreenChange() {
    this.checkFullscreen();
  }

  @HostListener('document:visibilitychange', [])
  onVisibilityChange() {
    if (document.visibilityState === 'hidden') {
      this.showDialog();
    }
  }

  checkFullscreen() {
    if (
      document.fullscreenElement || /* Standard syntax */
      document.webkitFullscreenElement || /* Chrome, Safari and Opera syntax */
      document.mozFullScreenElement ||/* Firefox syntax */
      document.msFullscreenElement /* IE/Edge syntax */
    ) {
      // User is in full screen mode
    } else {
      this.showDialog();
    }
  }

  showDialog() {
    const dialog = document.getElementById('fullscreenDialog') as any;
    if (dialog) {
      dialog.show();
    }
  }

  showEndDialog() {
    const dialog = document.getElementById('confirmDialog') as any;
    if (dialog) {
      dialog.show();
    }
  }

  get currentQuestion() {
    return this.questions[this.currentQuestionIndex];
  }

  previousQuestion() {
    if (this.currentQuestionIndex > 0) {
      this.currentQuestionIndex--;
    }
  }

  nextQuestion() {
    if (this.currentQuestionIndex < this.questions.length - 1) {
      this.currentQuestionIndex++;
    }
  }

  selectedOption = new FormControl();

  selectAnswer(question: any, answer: any) {
    question.selectedAnswer = answer;
    this.selectedOption.setValue(answer);
  }

  checkAnswer() {
    if (this.selectedOption.value === this.questions[this.currentQuestionIndex].correctAnswer) {
      console.log('Correct answer!');
    } else {
      console.log('Incorrect answer.');
    }
  }

  clearSelection() {
    if (this.currentQuestionIndex < this.questions.length) {
      this.questions[this.currentQuestionIndex].selectedAnswer = null;
    }
  }

  flagQuestion() {
    if (this.currentQuestionIndex < this.questions.length) {
      this.questions[this.currentQuestionIndex].flagged = true;
    }
  }

  unflagQuestion() {
    if (this.currentQuestionIndex < this.questions.length) {
      this.questions[this.currentQuestionIndex].flagged = false;
    }
  }

  toggleFlag() {
    if (this.questions[this.currentQuestionIndex].flagged) {
      this.unflagQuestion();
    } else {
      this.flagQuestion();
    }
  }

  isDark = true;

  toggleTheme() {
    this.isDark = !this.isDark;
  }

  goFullscreen() {
    if (document.documentElement.requestFullscreen) {
      document.documentElement.requestFullscreen();
    }
  }

  closeDialog() {
    const dialog = document.getElementById('fullscreenDialog');
    if (dialog) {
      const closestDialog = dialog.closest('dialog');
      if (closestDialog) {
        closestDialog.close();
      }
    }
  }

  endTest() {
    this.router.navigate(['/dashboard']);
  }
}