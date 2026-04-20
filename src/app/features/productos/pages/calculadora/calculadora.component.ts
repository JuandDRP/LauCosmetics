import { Component, signal, inject } from '@angular/core';
import {
  FormBuilder,
  Validators,
  ReactiveFormsModule
} from '@angular/forms';

import { CommonModule } from '@angular/common';

import { SelectModule } from 'primeng/select';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { MultiSelectModule } from 'primeng/multiselect';
import { InputNumberModule } from 'primeng/inputnumber';

@Component({
  selector: 'app-calculadora',
  standalone: true,
  templateUrl: './calculadora.component.html',
  styleUrls: ['./calculadora.component.scss'],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    DropdownModule,
    InputTextModule,
    ButtonModule,
    CardModule,
    MultiSelectModule,
    SelectModule,
    InputNumberModule
  ]
})
export class CalculadoraComponent {

  private fb = inject(FormBuilder);

  form = this.fb.group({
    costo: [0, [Validators.required, Validators.min(1)]],
    margen: [0, [Validators.required, Validators.min(0), Validators.max(99)]],
    descuento: [0, [Validators.min(0), Validators.max(100)]]
  });

  precioVenta = signal<number | null>(null);
  precioConDescuento = signal<number | null>(null);
  errorDescuento = signal(false);

  calcular() {
    if (this.form.invalid) return;

    const costo = this.form.get('costo')?.value ?? 0;
    const margen = this.form.get('margen')?.value ?? 0;
    const descuento = this.form.get('descuento')?.value ?? 0;

    const precio = Math.round(costo / (1 - margen / 100));
    const precioDesc = Math.round(precio * (1 - descuento / 100));

    this.precioVenta.set(precio);
    this.precioConDescuento.set(precioDesc);

    this.errorDescuento.set(precioDesc < costo);
  }

}