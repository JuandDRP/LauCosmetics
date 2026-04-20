import { Component, computed, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';

import { ProductosStore } from '../../state/productos.store';

import { DropdownModule } from 'primeng/dropdown';
import { InputNumberModule } from 'primeng/inputnumber';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';

@Component({
    selector: 'app-actualizar-stock',
    standalone: true,
    templateUrl: './actualizar-stock.component.html',
    styleUrls: ['./actualizar-stock.component.scss'],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        DropdownModule,
        InputNumberModule,
        CardModule,
        ButtonModule
    ]
})
export class ActualizarStockComponent implements OnInit {

    productosStore = inject(ProductosStore);

    hasLoadedDataError = computed(() => {
        return (this.productosStore.error()) != null;
    })


    formulario: FormGroup;

    constructor(private fb: FormBuilder) {
        this.formulario = this.fb.group({
            productoId: [null, Validators.required],
            cantidad: [null, [Validators.required, Validators.min(1)]]
        });
    }

    ngOnInit() {
        this.productosStore.loadProductos();
    }

    actualizarStock() {
        if (this.formulario.invalid) {
            this.formulario.markAllAsTouched();
            return;
        }

        const { productoId, cantidad } = this.formulario.value;

        this.productosStore.addStock(productoId!, cantidad!);

        this.formulario.reset();

    }

    limpiarFormulario() {
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

        if (control.errors['min']) {
            return 'Debe ser mayor a 0';
        }

        return null;
    }

}