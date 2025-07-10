import { Component, effect, EventEmitter, input, Output } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule, FormGroup } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButton } from '@angular/material/button';
import { Router, RouterModule } from '@angular/router';
import { Ticket } from '../ticket';

@Component({
  selector: 'app-ticket-form',
  standalone: true,
  imports: [
    ReactiveFormsModule, 
    MatInputModule, 
    MatFormFieldModule,
    MatButton,
    RouterModule
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
      margin-bottom: 1rem;
    }
    .mat-error {
      font-size: 0.75rem;
      color: #f44336;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      max-width: 100%;
    }
    .button-container {
      width: 100%;
      display: flex;
      justify-content: center;
      gap: 1rem;
      margin-top: 1rem;
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
      <div class="button-container">
        <button 
          mat-raised-button 
          color="primary" 
          type="submit" 
          [disabled]="ticketForm.invalid"
        >
          Save Ticket
        </button>
        <button 
          mat-raised-button 
          type="button"
          (click)="cancel()"
        >
          Cancel
        </button>
      </div>
    </form>
  `,
})
export class TicketForm {
  initialState = input<Ticket>();

  @Output() formValuesChanged = new EventEmitter<Ticket>();

  @Output() formSubmitted = new EventEmitter<Ticket>();

  ticketForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private router: Router) {
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
  cancel() {
    this.router.navigate(['/']);
  }

}
