import {
  Component,
  ChangeDetectionStrategy,
  forwardRef,
  signal,
  input,
  effect,
} from '@angular/core';
import {
  ControlValueAccessor,
  NG_VALUE_ACCESSOR,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { CommonModule } from '@angular/common';

/**
 * A reusable form input component that implements ControlValueAccessor
 * for seamless integration with Angular forms.
 */
@Component({
  selector: 'app-form-input',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => FormInput),
      multi: true,
    },
  ],
  templateUrl: './form-input.html',
  styleUrl: './form-input.scss',
})
export class FormInput implements ControlValueAccessor {
  // === CONFIGURABLE INPUT PROPERTIES ===

  /**
   * The type of input (text, email, password, number)
   * @default 'text'
   */
  type = input<'text' | 'email' | 'password' | 'number'>('text');

  /**
   * Placeholder text for the input
   * @default ''
   */
  placeholder = input<string>('');

  /**
   * Whether the input is disabled
   * @default false
   */
  disabledInput = input<boolean>(false);

  /**
   * Internal signal for disabled state management
   */
  disabledSignal = signal(this.disabledInput());

  // === INTERNAL STATE MANAGEMENT ===

  /**
   * Current value of the input
   */
  value = signal<string>('');

  /**
   * Track if the input has been touched
   */
  isTouched = signal(false);

  // === CONTROL VALUE ACCESSOR CALLBACKS ===
  private onChange = (value: string) => {};
  private onTouched = () => {};

  constructor() {
    // Sync disabled state from input to internal signal
    effect(() => {
      this.disabledSignal.set(this.disabledInput());
    });
  }

  /**
   * Registers a callback function for value changes
   * @param fn The callback function
   */
  registerOnChange(fn: (value: string) => void): void {
    this.onChange = fn;
  }

  /**
   * Registers a callback function for touch events
   * @param fn The callback function
   */
  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  /**
   * Sets the disabled state of the input
   * @param isDisabled Whether the input should be disabled
   */
  setDisabledState(isDisabled: boolean): void {
    this.disabledSignal.set(isDisabled);
  }

  // === EVENT HANDLERS ===

  /**
   * Handles input events and updates the value
   * @param event The input event
   */
  onInput(event: Event): void {
    const inputValue = (event.target as HTMLInputElement).value;
    this.value.set(inputValue);
    this.onChange(inputValue);
  }

  /**
   * Handles blur events and marks the control as touched
   */
  onBlur(): void {
    if (!this.isTouched()) {
      this.isTouched.set(true);
      this.onTouched();
    }
  }

  /**
   * Writes a new value to the input
   * @param value The new value
   */
  writeValue(value: string): void {
    this.value.set(value ?? '');
  }
}
