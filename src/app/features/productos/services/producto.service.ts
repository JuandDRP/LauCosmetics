import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { ApiClientService } from '../../../core/http/api-client.service';
import { Producto } from '../models/producto.model';
import { map, Observable } from 'rxjs';
import { ProductoMapper } from '../mapper/producto.mapper';
import { CrearProductoRequest } from '../models/producto-request.model';



@Injectable({
  providedIn: 'root',
})
export class ProductosService {

  private readonly API_PRODUCTOS = 'productos';
  private readonly API_VENTAS = 'ventas';
  private readonly API_STOCK = 'stock';
  private readonly API_REVERTIR = 'ventas/revertir';

  constructor(private api: ApiClientService) {}

  // 📦 OBTENER PRODUCTOS
  getProductos(): Observable<{ productos: Producto[]; total: number }> {
    return this.api.get<Producto[]>(this.API_PRODUCTOS)
      .pipe(
        map((response) => {
          const productos: Producto[] = response.map((p: any) => ({
            id: p.id,
            producto: p.producto,
            cantidad: p.cantidad,
            costo: Number(p.costo),
            margen: p.margen,
            precioventa: Number(p.precioVenta),
            disponibles: p.disponibles,
            totalVentas: Number(p.totalVentas),
            totalinvertido: Number(p.totalinvertido),
            fechaCreacion: new Date(p.fechaCreacion)
          }));

          return {
            productos,
            total: productos.length
          };
        })
      );
  }

  // ✅ CREAR PRODUCTO (FIX PRINCIPAL)
  createProduct(producto: Producto): Observable<Producto> {
    const request = ProductoMapper.uiToCreateApi(producto);

    return this.api.post<Producto, CrearProductoRequest>(
      this.API_PRODUCTOS,   // ✅ CORRECTO
      request
    );
  }

  // ➕ AGREGAR STOCK
  addStock(id: string, cantidad: number): Observable<Producto> {
    return this.api.post<Producto, { id: string; cantidad: number }>(
      this.API_STOCK,
      { id, cantidad }
    );
  }

  // 🔄 REVERTIR VENTA
  revertirVenta(id: string, cantidad: number): Observable<Producto> {
    return this.api.post<Producto, { id: string; cantidad: number }>(
      this.API_REVERTIR,
      { id, cantidad }
    );
  }

  // 💰 REGISTRAR VENTA
  registrarVenta(id: string, cantidad: number): Observable<Producto> {
    return this.api.post<Producto, { id: string; cantidadVendida: number }>(
      this.API_VENTAS,
      {
        id,
        cantidadVendida: cantidad
      }
    );
  }

  // 🗑️ ELIMINAR PRODUCTO (te faltaba este)
  deleteProducto(mongoId: string): Observable<any> {
    return this.api.delete(`${this.API_PRODUCTOS}/${mongoId}`);
  }

}