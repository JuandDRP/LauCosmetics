export interface CrearProductoRequest{
    id?:string,
    producto:string,
    cantidad:number,
    costo:number,
    margen:number,
    precioVenta?:number,
    disponibles?:number,
    totalVentas?:number,
    totalinvertido?:number,
    fechaCreacion?:Date
}