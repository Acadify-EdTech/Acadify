// import { Component, inject, Signal, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
// import { RouterOutlet } from '@angular/router';
// import '@material/web/all';


// @Component({
//   selector: 'app-root',
//   standalone: true,
//   imports: [RouterOutlet],
//   templateUrl: './app.component.html',
//   styleUrl: './app.component.css',
//   schemas: [CUSTOM_ELEMENTS_SCHEMA]
// })
import { Component, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  @ViewChild('sidebar', { static: true }) sidebar!: ElementRef;
  
  toggleSidebar() {
    this.sidebar.nativeElement.classList.toggle('close');
  }

  toggleSubmenu(event: Event) {
    let parent = (event.target as Element).parentElement?.parentElement;
    if (parent) {
      parent.classList.toggle('showMenu');
    }
  }
}