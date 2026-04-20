import { Routes } from '@angular/router';

import { PRODUCTOS_ROUTES } from './features/productos/productos.routes';
import { MainLayoutComponent } from './shared/layout/main-layout/main-layout.component';

export const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      {
        path: '',
        redirectTo: 'ver-productos',
        pathMatch: 'full', 
      },
      ...PRODUCTOS_ROUTES
    ],
  },
  
  {
    path: '**',
    redirectTo: 'ver-productos',
  },
];
