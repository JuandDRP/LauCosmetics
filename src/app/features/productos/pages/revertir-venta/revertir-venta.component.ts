import { Component, computed, inject, OnInit } from '@angular/core';

import { FormBuilder, Validators, ReactiveFormsModule, FormGroup } from '@angular/forms';

import { ProductosStore } from '../../state/productos.store';

import { CommonModule } from '@angular/common';

import { SelectModule } from 'primeng/select';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { MultiSelectModule } from 'primeng/multiselect';
import { InputNumberModule } from 'primeng/inputnumber';

import { ToastService } from '../../../../shared/components/toast/toast.service';

@Component({
  selector: 'app-revertir-venta',
  templateUrl: './revertir-venta.component.html',
  styleUrls: ['./revertir-venta.component.scss'],
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
export class RevertirVentaComponent implements OnInit {
  productosStore = inject(ProductosStore);
  hasLoadedDataError = computed(() => {
    return (this.productosStore.error()) != null;
  })

  private fb = inject(FormBuilder);
  private toast = inject(ToastService);

  formRevertir = this.fb.group({
    productoId: ['', Validators.required],
    cantidad: [0, [Validators.required, Validators.min(1)]]
  });

  ngOnInit() {

    this.productosStore.loadProductos()
  }

  productosConVendidos = computed(() => {
    return this.productosStore.productos().map(p => {
      const vendidos = p.cantidad - (p.disponibles || 0);

      return {
        ...p,
        vendidos,
        sinVentas: vendidos === 0
      };
    });
  });


  productoSeleccionado = computed(() => {
    const id = this.formRevertir.get('productoId')?.value;
    return this.productosConVendidos().find(p => p.id === id);
  });

  revertirVenta() {
    if (this.formRevertir.invalid) return;

    const { productoId, cantidad } = this.formRevertir.value;

    const producto = this.productosStore.productos()
      .find(p => p.id === productoId);

    if (!producto) return;

    const vendidos = producto.cantidad - (producto.disponibles || 0);

    if (cantidad! > vendidos) {
      this.toast.error('Error', 'No puedes revertir más de lo vendido');
      return;
    }

    this.productosStore.revertirVenta(productoId!, cantidad!);

    this.formRevertir.reset();
  }
}