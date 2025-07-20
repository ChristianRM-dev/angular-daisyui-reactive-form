import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ReactiveFormDemo } from './components/reactive-form-demo/reactive-form-demo';

@Component({
  selector: 'app-root',
  imports: [ReactiveFormsModule, CommonModule, ReactiveFormDemo],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {}
