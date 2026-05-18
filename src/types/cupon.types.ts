export interface CuponDto {
  id: number;
  codigo: string;
  porcentajeDescuento: number;
  validoDesde: string;
  validoHasta: string;
  activo: boolean;
  limiteUsos?: number;
  usosActuales: number;
}

export interface ValidateCuponDto {
  codigo: string;
}
