import { Routes } from '@angular/router';

import { VerProductosComponent } from './pages/ver-productos/ver-productos.component';
import { CrearProductoComponent } from './pages/crear-producto/crear-producto.component';
import { ActualizarStockComponent } from './pages/actualizar-stock/actualizar-stock.component';
import { RevertirVentaComponent } from './pages/revertir-venta/revertir-venta.component';
import { CalculadoraComponent } from './pages/calculadora/calculadora.component';
import { AgregarVentaComponent } from './pages/agregar-venta/agregar-venta.component';

export const PRODUCTOS_ROUTES: Routes = [
  {
    path: 'crear-producto',
    component: CrearProductoComponent,
  },
  {
    path: 'agregar-venta',
    component: AgregarVentaComponent,
  },

  {
    path: 'agregar-stock',
    component: ActualizarStockComponent,
  },

  {
    path: 'revertir-venta',
    component: RevertirVentaComponent,
  },

  {
    path: 'ver-productos',
    component: VerProductosComponent,
  },
  {
    path:'calculadora',
    component:CalculadoraComponent
  }
];
