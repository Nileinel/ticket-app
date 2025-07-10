import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TicketsList } from './tickets-list/tickets-list';
import { MatToolbarModule } from '@angular/material/toolbar';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, TicketsList, MatToolbarModule],
  styles: [
    `
      main {
        display: flex; 
        justify-content: center;
        padding: 2rem 4rem;
      }
    `,
  ],
  template: 
  `
    <mat-toolbar color="primary">
      <span>Ticket Management App</span>
    </mat-toolbar>
    <main>
      <router-outlet></router-outlet>
    </main>
  `,
})
export class App {
  protected title = 'client';
}
