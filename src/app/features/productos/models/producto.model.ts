export interface Producto {
  id?: string;
  producto: string;
  cantidad: number;
  costo: number;
  margen: number;
  precioventa?: number;
  disponibles?: number;
  totalVentas?: number;
  totalinvertido?: number;
  fechaCreacion?: Date;
}
