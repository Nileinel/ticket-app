import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TicketForm } from '../ticket-form/ticket-form';
import { Ticket } from '../ticket';
import { TicketService } from '../ticket.service';
import { MatCardModule } from '@angular/material/card';


@Component({
  selector: 'app-add-ticket',
  standalone: true, 
  imports: [MatCardModule, TicketForm],
  template: `
    <mat-card>
      <mat-card-header>
        <mat-card-title>Add New Ticket</mat-card-title>
      </mat-card-header>
      <mat-card-content>
        <app-ticket-form (formSubmitted)="addTicket($event)"></app-ticket-form>
      </mat-card-content>
    </mat-card>
  `,
  styles: `
    mat-card {
      margin: 2rem auto;
      max-width: 600px;
      box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
      border-radius: 8px;
      padding: 1rem;
    }
    mat-card-header {
      text-align: center;
      justify-content: center;
    }
    mat-card-content{
      padding: 1rem;
    }
  `
})
export class AddTicket {
  constructor(private ticketService: TicketService, private router: Router) {}

  addTicket(ticket: Ticket) {
    this.ticketService.createTicket(ticket).subscribe({
      next: () => {
        this.router.navigate(['/']);
      },
      error: (err) => {
        alert(('Failed to create ticket'));
        console.error('Error adding ticket:', err);
      },
    });

    this.ticketService.getTickets();
  }   

}
