import { Component, effect, EventEmitter, input, Output } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule, FormGroup } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButton } from '@angular/material/button';
import { Ticket } from '../ticket';

@Component({
  selector: 'app-ticket-form',
  standalone: true,
  imports: [
    ReactiveFormsModule, 
    MatInputModule, 
    MatFormFieldModule,
    MatButton
  ],
  styles: `
    .ticket-form {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      padding: 2rem;
    }
    .mat-mdc-form-field {
      width: 100%;
    }
  `,
  template: `
    <form class="ticket-form" autocomplete="off" [formGroup]="ticketForm" (submit)="submitForm()">
      <mat-form-field>
        <mat-label>Name</mat-label>
        <input matInput placeholder="Enter ticket name" formControlName="name" required />
        @if (name.invalid) {
          <mat-error> Name must be at least 3 characters long. </mat-error>
        }
      </mat-form-field>
      <br />
      <button 
        mat-raised-button 
        color="primary" 
        type="submit" 
        [disabled]="ticketForm.invalid"
      >
        Add Ticket
      </button>
    </form>
  `,
})
export class TicketForm {
  initialState = input<Ticket>();

  @Output() formValuesChanged = new EventEmitter<Ticket>();

  @Output() formSubmitted = new EventEmitter<Ticket>();

  ticketForm: FormGroup;

  constructor(private formBuilder: FormBuilder) {
    this.ticketForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
    });

    effect(() => {
      this.ticketForm.setValue({
        name: this.initialState()?.name || '',
      })
    });

    this.ticketForm.valueChanges.subscribe((value) => {
      this.formValuesChanged.emit(value as Ticket);
    });
  }

  get name(){
    return this.ticketForm.get('name')!;
  }

  submitForm() {
    if (this.ticketForm.valid) {
      this.formSubmitted.emit(this.ticketForm.value as Ticket);
    }
  }

}
