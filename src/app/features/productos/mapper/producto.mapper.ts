import { Producto } from "../models/producto.model";
import { CrearProductoRequest } from "../models/producto-request.model";
export class ProductoMapper {
    static uiToCreateApi(producto: Producto): CrearProductoRequest {
        const request: CrearProductoRequest = {
            producto:producto.producto,
            cantidad:producto.cantidad,
            costo:producto.costo,
            margen:producto.margen
        }
        return request;
    }
}