import { Component, computed, inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  Validators,
  ReactiveFormsModule
} from '@angular/forms';

import { CommonModule } from '@angular/common';
import { toSignal } from '@angular/core/rxjs-interop';

import { ProductosStore } from '../../state/productos.store';
import { ToastService } from '../../../../shared/components/toast/toast.service';

import { SelectModule } from 'primeng/select';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { MultiSelectModule } from 'primeng/multiselect';
import { InputNumberModule } from 'primeng/inputnumber';

@Component({
  selector: 'app-agregar-venta',
  standalone: true,
  templateUrl: './agregar-venta.component.html',
  styleUrls: ['./agregar-venta.component.scss'],
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
export class AgregarVentaComponent implements OnInit {

  productosStore = inject(ProductosStore);
  private fb = inject(FormBuilder);
  private toast = inject(ToastService);

  ngOnInit() {

    this.productosStore.loadProductos()
  }

  formVenta = this.fb.group({
    productoId: ['', Validators.required],
    cantidad: [0, [Validators.required, Validators.min(1)]]
  });

  formValue = toSignal(this.formVenta.valueChanges, {
    initialValue: this.formVenta.value
  });

  hasLoadedDataError = computed(() => {
    return this.productosStore.error() != null;
  });

  productosConStock = computed(() => {
    return this.productosStore.productos().map(p => ({
      ...p,
      sinStock: (p.disponibles || 0) === 0
    }));
  });

  productoSeleccionado = computed(() => {
    const form = this.formValue();
    return this.productosConStock().find(p => p.id === form.productoId);
  });

  cantidadExcedeStock = computed(() => {
    const form = this.formValue();
    const producto = this.productoSeleccionado();

    return (form.cantidad ?? 0) > (producto?.disponibles ?? 0);
  });

  registrarVenta() {
    if (this.formVenta.invalid) return;

    const { productoId, cantidad } = this.formVenta.value;

    const producto = this.productosStore.productos()
      .find(p => p.id === productoId);

    if (!producto) return;

    const disponibles = producto.disponibles || 0;

    if (cantidad! > disponibles) {
      this.toast.error('Error', 'No puedes vender más del stock disponible');
      return;
    }

    this.productosStore.registrarVenta(productoId!, cantidad!);

    this.formVenta.reset({
      productoId: '',
      cantidad: 0
    });
  }

  obtenerError(control: string): string | null {
    const field = this.formVenta.get(control);

    if (!field || !field.touched) return null;

    if (field.hasError('required')) return 'Este campo es obligatorio';
    if (field.hasError('min')) return 'Debe ser mayor a 0';

    return null;
  }

}