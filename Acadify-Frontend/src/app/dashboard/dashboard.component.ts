import { Component, inject, Signal, CUSTOM_ELEMENTS_SCHEMA, ElementRef, ViewChild, Renderer2} from '@angular/core';
import { Router } from '@angular/router';
import '@material/web/all';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class DashboardComponent {
  @ViewChild('sidebar') sidebar!: ElementRef;

  constructor(private renderer: Renderer2, private http: HttpClient, private router: Router) {}

  toggleSidebar() {
    this.sidebar.nativeElement.classList.contains('close') ?
      this.renderer.removeClass(this.sidebar.nativeElement, 'close') :
      this.renderer.addClass(this.sidebar.nativeElement, 'close');
  }

  logout() {
    console.log('hit');
    this.http.post('http://localhost:3000/api/user/logout', {}).subscribe({
      next: (response: any) => {
        if (response.msg == "Logged out") {
          this.router.navigate(['/']);
        }
      },
      error: (error: any) => {
        console.error(error);
      }
    });
  }
}
