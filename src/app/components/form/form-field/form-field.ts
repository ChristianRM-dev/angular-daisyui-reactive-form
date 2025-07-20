import { CommonModule } from '@angular/common';
import {
  Component,
  input,
  computed,
  ChangeDetectionStrategy,
  signal,
  OnInit,
  OnDestroy
} from '@angular/core';
import {
  AbstractControl,
  ReactiveFormsModule
} from '@angular/forms';
import { Subscription } from 'rxjs';

/**
 * Reusable form field component that handles validation and error messaging
 * Works with Angular Reactive Forms
 */
@Component({
  selector: 'app-form-field',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './form-field.html',
})
export class FormField implements OnInit, OnDestroy {
  // Required form control input
  control = input.required<AbstractControl>();

  // Optional field label
  label = input<string>('');

  // Optional hint text
  hint = input<string | null>(null);

  // Whether the field is required
  required = input<boolean>(false);

  // Custom error messages for validation errors
  customErrors = input<{ [key: string]: string }>({});

  // Internal signals to track control state
  private isTouched = signal(false);
  private isInvalid = signal(false);

  // Subscription for control status changes
  private statusSub?: Subscription;

  /**
   * Initialize component and set up status change subscription
   */
  ngOnInit(): void {
    const ctrl = this.control();

    // Initialize state
    this.isTouched.set(ctrl.touched);
    this.isInvalid.set(ctrl.invalid);

    // Subscribe to status changes
    this.statusSub = ctrl.statusChanges?.subscribe(() => {
      this.isTouched.set(ctrl.touched);
      this.isInvalid.set(ctrl.invalid);
    });
  }

  /**
   * Clean up subscriptions
   */
  ngOnDestroy(): void {
    this.statusSub?.unsubscribe();
  }

  /**
   * Computed property to determine if errors should be shown
   * Returns true when control is invalid and touched
   */
  readonly showErrors = computed(() =>
    this.isInvalid() && this.isTouched()
  );

  /**
   * Computed property that returns the appropriate error message
   * Checks custom errors first, then falls back to default messages
   */
  readonly errorMessage = computed(() => {
    const errors = this.control().errors || {};

    for (const key of Object.keys(errors)) {
      // Check for custom error message first
      if (this.customErrors()[key]) {
        return this.customErrors()[key];
      }

      // Default error messages
      switch (key) {
        case 'required': return 'This field is required.';
        case 'email': return 'Invalid email format.';
        case 'minlength': return `Minimum length: ${errors[key].requiredLength}`;
        case 'maxlength': return `Maximum length: ${errors[key].requiredLength}`;
        case 'pattern': return 'Invalid format.';
      }
    }

    return 'Invalid input.';
  });
}
