export interface PedidoDto {
  id: number;
  usuarioId: number;
  direccionId: number;
  cuponId?: number;
  total: number;
  estado: string;
  fechaCreacion: string;
  detalles: DetallePedidoDto[];
}

export interface DetallePedidoDto {
  id: number;
  pedidoId: number;
  productoId: number;
  cantidad: number;
  precioUnitario: number;
  productoNombre?: string;
}

export interface CreatePedidoDto {
  direccionId: number;
  cuponCodigo?: string;
  metodoPago: string;
}
