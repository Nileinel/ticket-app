import { Routes } from '@angular/router';
import { TicketsList } from './tickets-list/tickets-list';
import { AddTicket } from './add-ticket/add-ticket';
import { EditTicket } from './edit-ticket/edit-ticket';

export const routes: Routes = [
  { path: '', component: TicketsList, title: 'Tickets List' },
  { path: 'new', component: AddTicket },
  { path: 'edit/:id', component: EditTicket, title: 'Edit Ticket' },
];
