export type EstadoPedido =
  | 'pendiente'
  | 'confirmado'
  | 'armando'
  | 'enviado'
  | 'entregado'
  | 'cancelado';

export type ShippingProvider = 'andreani' | 'correo_argentino';

export interface DetallePedidoResponseDto {
  varianteId: number;
  skuVariante?: string;
  nombreProducto?: string;
  atributoVariante?: string;
  cantidad: number;
  precioUnitario: number;
  descuentoAplicado: number;
  subtotal: number;
}

export interface PedidoResponseDto {
  id: number;
  numeroPedido?: string;
  usuarioId: number;
  direccionId?: number;
  total: number;
  estado: EstadoPedido;
  notas?: string;
  fecha: string;
  fechaEnvio?: string;
  fechaEntrega?: string;
  shippingProvider?: ShippingProvider;
  shippingService?: string;
  trackingNumber?: string;
  shippingCost: number;
  detalles: DetallePedidoResponseDto[];
}

export interface CheckoutRequestDto {
  direccionId: number;
  notas?: string;
  codigoCupon?: string;
}

export interface UpdateOrderStatusDto {
  estado: EstadoPedido;
  trackingNumber?: string;
  shippingProvider?: ShippingProvider;
  shippingService?: string;
}
