import { Routes } from '@angular/router';
import { TicketsList } from './tickets-list/tickets-list';

export const routes: Routes = [
  { path: '', component: TicketsList, title: 'Tickets List' },
];
