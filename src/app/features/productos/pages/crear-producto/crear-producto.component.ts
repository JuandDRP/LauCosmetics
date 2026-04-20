import { Component, inject, computed, effect } from '@angular/core';

import { CommonModule } from '@angular/common';

import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, } from '@angular/forms';

import { Producto } from '../../models/producto.model';


import { SelectModule } from 'primeng/select';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { MultiSelectModule } from 'primeng/multiselect';
import { InputNumberModule } from 'primeng/inputnumber';


import { ProductosStore } from '../../state/productos.store';
@Component({
  selector: 'app-crear-producto',
  standalone: true,
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
  ],
  templateUrl: './crear-producto.component.html',
  styleUrls: ['./crear-producto.component.scss'],
})
export class CrearProductoComponent {

  productosStore = inject(ProductosStore)

  hasLoadedDataError = computed(() => {
    return (this.productosStore.error()) != null;
  })

  formulario: FormGroup;


  constructor(private fb: FormBuilder) {
    this.formulario = this.fb.group({
      producto: [null, Validators.required],
      cantidad: [null, Validators.required],
      costo: [null, Validators.required],
      margen: [null, Validators.required]
    });
  }

  ngOnInit() {
    this.productosStore.loadProductos()
  }


  crearProducto(): void {
    if (this.formulario.invalid) {
      this.formulario.markAllAsTouched();
      return;
    }

    const form = this.formulario.value;
    const payload: Producto = {
      producto: form.producto,
      cantidad: form.cantidad,
      costo: form.costo,
      margen: form.margen
    }

    this.productosStore.createProducto(payload);
    this.formulario.reset()


  }

  limpiarFormulario(): void {
    this.formulario.reset();
  }

  obtenerError(campo: string): string | null {
    const control = this.formulario.get(campo);

    if (!control || !control.errors || !control.touched) {
      return null;
    }

    if (control.errors['required']) {
      return 'Este campo es obligatorio';
    }

    if (control.errors['maxlength']) {
      const max = control.errors['maxlength'].requiredLength;
      return `Se excedió el máximo de ${max} caracteres`;
    }

    return null;
  }
}
