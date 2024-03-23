import { Component, inject, Signal, CUSTOM_ELEMENTS_SCHEMA, ElementRef, ViewChild, Renderer2} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import '@material/web/all';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
//import { Component, ElementRef, ViewChild } from '@angular/core';

// @Component({
//   selector: 'app-root',
//   standalone: true,
//   templateUrl: './app.component.html',
//   styleUrl: './app.component.css',
//   schemas: [CUSTOM_ELEMENTS_SCHEMA]
// })

export class AppComponent {
  @ViewChild('sidebar') sidebar!: ElementRef;

  constructor(private renderer: Renderer2) {}

  toggleSidebar() {
    this.sidebar.nativeElement.classList.contains('close') ?
      this.renderer.removeClass(this.sidebar.nativeElement, 'close') :
      this.renderer.addClass(this.sidebar.nativeElement, 'close');
  }
}