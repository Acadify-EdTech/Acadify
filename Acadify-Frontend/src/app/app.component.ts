import { Component, inject, Signal, CUSTOM_ELEMENTS_SCHEMA, ElementRef, ViewChild, Renderer2} from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';
import '@material/web/all';
import { DashboardComponent } from './dashboard/dashboard.component';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, DashboardComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})

export class AppComponent {
}