import { Component, inject, ChangeDetectionStrategy, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { CardModule } from 'primeng/card';
import { TableModule, Table } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { MultiSelectModule } from 'primeng/multiselect';



import { FormsModule } from '@angular/forms';

import { ProductosStore } from '../../state/productos.store';


@Component({
  selector: 'app-ver-productos',
  standalone: true,
  imports: [CardModule, TableModule, CommonModule, ButtonModule, RouterModule, DropdownModule, FormsModule, MultiSelectModule],
  templateUrl: './ver-productos.component.html',
  styleUrl: './ver-productos.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VerProductosComponent {

  productosStore = inject(ProductosStore)

  hasLoadedDataError = computed(() => {
    return (this.productosStore.error()) != null;
  })

  constructor() { }

  ngOnInit() {

    this.productosStore.loadProductos()
  }



  actualizarProductos(): void {
    this.productosStore.loadProductos()
  }

  clear(table: Table) {
    table.clear();
  }




}
