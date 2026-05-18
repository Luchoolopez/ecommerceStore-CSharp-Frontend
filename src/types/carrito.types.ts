export interface CarritoItemDto {
  productoId: number;
  cantidad: number;
  precioUnitario: number;
  precioTotal: number;
  productoNombre?: string;
  imagenPrincipal?: string;
}

export interface CarritoDto {
  id: number;
  usuarioId: number;
  items: CarritoItemDto[];
  total: number;
}
