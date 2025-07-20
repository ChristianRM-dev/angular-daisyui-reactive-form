import { Component } from '@angular/core';
import {
  ReactiveFormsModule,
  FormBuilder,
  Validators,
  FormGroup,
  FormControl,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FormField } from '../form/form-field/form-field';
import { FormInput } from '../form/form-input/form-input';

/**
 * Interface defining the structure and types of form controls
 */
interface UserForm {
  name: FormControl<string>;
  email: FormControl<string>;
  password: FormControl<string>;
}

/**
 * Demo component showcasing reactive form implementation
 * with custom form controls and validation
 */
@Component({
  selector: 'app-reactive-form-demo',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormField, FormInput],
  templateUrl: './reactive-form-demo.html',
  styleUrl: './reactive-form-demo.scss',
})
export class ReactiveFormDemo {
  /**
   * The main form group instance
   */
  form: FormGroup<UserForm>;

  constructor(private fb: FormBuilder) {
    this.form = this.initForm();
  }

  /**
   * Initializes the form with controls and validators
   * @returns The configured FormGroup
   */
  private initForm(): FormGroup<UserForm> {
    return this.fb.group<UserForm>({
      name: this.fb.control('', {
        validators: [Validators.required, Validators.minLength(3)],
        nonNullable: true, // Ensures value is never null
      }),
      email: this.fb.control('', {
        validators: [Validators.required, Validators.email],
        nonNullable: true,
      }),
      password: this.fb.control('', {
        validators: [Validators.required, Validators.minLength(6)],
        nonNullable: true,
      }),
    });
  }

  /**
   * Handles form submission
   * - Marks all controls as touched
   * - Triggers validation
   * - Logs form value if valid
   */
  onSubmit() {
    // Mark all controls as touched to show validation messages
    this.form.markAllAsTouched();

    // Force validation update on all controls
    Object.values(this.form.controls).forEach((control) => {
      control.updateValueAndValidity();
    });

    if (this.form.valid) {
      console.log('Form submitted:', this.form.getRawValue());
      // Additional submission logic (API calls, etc.) would go here
    }
  }

  // === CONTROL ACCESSORS ===

  /**
   * Gets the name form control
   */
  get nameControl() {
    return this.form.controls.name;
  }

  /**
   * Gets the email form control
   */
  get emailControl() {
    return this.form.controls.email;
  }

  /**
   * Gets the password form control
   */
  get passwordControl() {
    return this.form.controls.password;
  }
}
