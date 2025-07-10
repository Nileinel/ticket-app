import { Component, OnInit, WritableSignal } from '@angular/core';
import { Ticket } from '../ticket'; 
import { TicketService } from '../ticket.service';
import { RouterModule} from '@angular/router';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-tickets-list',
  imports: [RouterModule, MatTableModule, MatButtonModule, MatCardModule],
  styles: [
    `
      table {
        width: 100%;
        button:first-of-type{
          margin-right: 1rem;
        }
      }
      .mat-mdc-card {
        margin: 2rem auto;
        max-width: 800px;
      }
      .mat-mdc-card-header {
        display: flex;
        justify-content: center;
      }
      .mat-mdc-card-title {
        font-size: 1.5rem;
        font-weight: bold;
      }
      .mat-mdc-card-content {
        padding: 1rem;
      }
      .mat-mdc-card-actions {
        display: flex;
        justify-content: center;
      }
      .mat-mdc-card-actions button {
        margin: 0 0.5rem;
      }
    `,
  ],
  template:`
    <mat-card>
      <br />
      <mat-card-header>
        <mat-card-title>Tickets List</mat-card-title>
      </mat-card-header>
      <br />
      <mat-card-content>
        <table mat-table [dataSource]="tickets$()">
          <ng-container matColumnDef="col-id">
            <th mat-header-cell *matHeaderCellDef> ID </th>
            <td mat-cell *matCellDef="let ticket"> {{ticket._id}} </td>
          </ng-container>

          <ng-container matColumnDef="col-name">
            <th mat-header-cell *matHeaderCellDef> Name </th>
            <td mat-cell *matCellDef="let ticket"> {{ticket.name}} </td>
          </ng-container>

          <ng-container matColumnDef="col-actions">
            <th mat-header-cell *matHeaderCellDef> Actions </th>
            <td mat-cell *matCellDef="let ticket">
              <button mat-raised-button [routerLink] = "['edit/', ticket._id]"> Edit </button>
              <button mat-raised-button color="warn" (click)="deleteTicket(ticket._id || '')"> Delete </button>
            </td>
          </ng-container>

          <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
          <tr mat-row *matRowDef="let row; columns: displayedColumns;"></tr>
        </table>
      </mat-card-content>
      <mat-card-actions>
        <button mat-raised-button color="primary" [routerLink]="['new']">Create Ticket</button>
      </mat-card-actions>
    </mat-card>
  `,
})

export class TicketsList implements OnInit {
  tickets$ = {} as WritableSignal<Ticket[]>;
  displayedColumns: string[] = [
    'col-id',
    'col-name',
    'col-actions'
  ];

  constructor(private ticketService: TicketService){}

  ngOnInit(){
    this.fetchTickets();
  }

  deleteTicket(id: string): void {
    this.ticketService.deleteTicket(id).subscribe(({
      next: () => {
        console.log(`Ticket with ID ${id} deleted successfully.`);
        this.fetchTickets();
      }
    }));
  }

  private fetchTickets(): void {
    this.tickets$ = this.ticketService.tickets$;
    this.ticketService.getTickets();
  }

}

