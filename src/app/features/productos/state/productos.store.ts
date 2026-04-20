import { Injectable, signal, computed, inject } from '@angular/core';

import { Producto } from '../models/producto.model';



import { ProductosService } from '../services/producto.service';
import { ToastService } from '../../../shared/components/toast/toast.service';


interface State {
  productos: Producto[];
  totalProductos: number;
  loading: boolean;
  error: any;
}

@Injectable({
  providedIn: 'root',
})
export class ProductosStore {

  private toast = inject(ToastService);


  private state = signal<State>({
    productos: [],
    totalProductos: 0,
    loading: false,
    error: null,
  });

  productos = computed(() => this.state().productos);
  totalProductos = computed(() => this.state().totalProductos);
  loading = computed(() => this.state().loading);
  error = computed(() => this.state().error);

  constructor(private productosService: ProductosService) { }

  loadProductos() {
    this.setLoading(true);

    this.productosService.getProductos().subscribe({
      next: (res) => {
        this.patchState({ productos: res.productos, totalProductos: res.total });
      },
      error: (error) => {
        this.patchState({ error });
      },
      complete: () => {
        this.setLoading(false);
      },
    });
  }

  createProducto(producto: Producto) {
    this.setLoading(true);

    this.productosService.createProduct(producto).subscribe({
      next: (newProduct) => {
        this.patchState({ productos: [newProduct, ...this.state().productos], totalProductos: this.state().totalProductos + 1 });
        this.toast.success('Producto creado', 'El producto fue creado correctamente');
      },
      error: (error) => {
        this.patchState({ error });
        this.toast.error('Error al crear el producto', 'Hubo un problema al crear el producto');
      },
      complete: () => {
        this.setLoading(false);
      },
    });
  }

  addStock(id: string, cantidad: number) {
    this.setLoading(true);

    this.productosService.addStock(id, cantidad).subscribe({
      next: (productoActualizado) => {
        const productosActualizados = this.state().productos.map(p =>
          p.id === id ? { ...p, ...productoActualizado } : p
        );
        this.patchState({
          productos: productosActualizados
        });
        this.toast.success('Stock actualizado', 'Se agregó correctamente el stock');
      },
      error: (error) => {
        this.patchState({ error });
        this.toast.error('Error', 'No se pudo actualizar el stock');
      },
      complete: () => {
        this.setLoading(false);
      }
    });
  }

  revertirVenta(id: string, cantidad: number) {
    this.setLoading(true);

    this.productosService.revertirVenta(id, cantidad).subscribe({
      next: (productoActualizado) => {
        const productosActualizados = this.state().productos.map(p =>
          p.id === id ? { ...p, ...productoActualizado } : p
        );

        this.patchState({ productos: productosActualizados });

        this.toast.success('Venta revertida', 'Se restauró el stock correctamente');
      },
      error: (error) => {
        this.patchState({ error });
        this.toast.error('Error', 'No se pudo revertir la venta');
      },
      complete: () => {
        this.setLoading(false);
      }
    });
  }

  registrarVenta(id: string, cantidad: number) {
    this.setLoading(true);

    this.productosService.registrarVenta(id, cantidad).subscribe({
      next: (productoActualizado) => {

        const productosActualizados = this.state().productos.map(p =>
          p.id === id ? { ...p, ...productoActualizado } : p
        );

        this.patchState({
          productos: productosActualizados
        });

        this.toast.success('Venta registrada', 'Se realizó la venta correctamente');
      },
      error: (error) => {
        this.patchState({ error });
        this.toast.error('Error', 'No se pudo registrar la venta');
      },
      complete: () => {
        this.setLoading(false);
      }
    });
  }

  private setLoading(loading: boolean) {
    this.patchState({ loading });
  }

  private patchState(partial: Partial<State>) {
    this.state.update((s) => ({ ...s, ...partial }));
  }

}
