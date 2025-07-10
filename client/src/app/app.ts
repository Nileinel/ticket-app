import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TicketsList } from './tickets-list/tickets-list';
import { MatToolbarModule } from '@angular/material/toolbar';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, MatToolbarModule],
  styles: [
    `
      main {
        display: flex; 
        justify-content: center;
        padding: 2rem 4rem;
      }
      mat-toolbar {
        font-size: 1.5rem;
        font-weight: bold;
      }
    `,
  ],
  template: 
  `
    <mat-toolbar color="primary">
      <span>MyTicket</span>
    </mat-toolbar>
    <main>
      <router-outlet></router-outlet>
    </main>
  `,
})
export class App {
  protected title = 'client';
}
