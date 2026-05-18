export interface CarritoItemDto {
  varianteId: number;
  productoId: number;
  nombreProducto: string;
  atributoVariante: string;
  precioUnitario: number;
  cantidad: number;
  subtotal: number;
  imagen?: string;
}

export interface CarritoDto {
  id: number;
  usuarioId: number;
  items: CarritoItemDto[];
  total: number;
}
