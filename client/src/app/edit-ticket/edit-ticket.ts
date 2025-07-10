import { Component, OnInit, WritableSignal } from '@angular/core';
import { TicketForm } from '../ticket-form/ticket-form';
import { ActivatedRoute, Router } from '@angular/router';
import { Ticket } from '../ticket';
import { TicketService } from '../ticket.service';
import { MatCardModule } from '@angular/material/card';
import { Writable } from 'stream';


@Component({
  selector: 'app-edit-ticket',
  imports: [MatCardModule, TicketForm],
  template: `
    <mat-card>
      <mat-card-header>
        <mat-card-title>Edit Ticket</mat-card-title>
      </mat-card-header>
      <mat-card-content>
        <app-ticket-form 
          [initialState]="ticket()"
          (formSubmitted)="editTicket($event)"
        ></app-ticket-form>
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
export class EditTicket implements OnInit {
  ticket = {} as WritableSignal<Ticket>;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private ticketService: TicketService
  ){}

  ngOnInit(){
    const id = this.route.snapshot.paramMap.get('id');
    if (!id) {
      alert('Ticket ID is missing');
    }

    this.ticketService.getTicket(id!);
    this.ticket = this.ticketService.ticket$;
  }

  editTicket(ticket: Ticket) {
    this.ticketService
      .updateTicket(this.ticket()._id || '', ticket)
      .subscribe({
        next: () => {
          this.router.navigate(['/']);
        },
        error: (err) => {
          console.error('Error updating ticket:', err);
          alert('Failed to update ticket');
        }
      });
  }

}
