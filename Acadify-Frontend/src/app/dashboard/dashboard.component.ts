import { Component, inject, Signal, CUSTOM_ELEMENTS_SCHEMA, ElementRef, ViewChild, Renderer2} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import '@material/web/all';


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

  constructor(private renderer: Renderer2) {}

  toggleSidebar() {
    this.sidebar.nativeElement.classList.contains('close') ?
      this.renderer.removeClass(this.sidebar.nativeElement, 'close') :
      this.renderer.addClass(this.sidebar.nativeElement, 'close');
  }
}
