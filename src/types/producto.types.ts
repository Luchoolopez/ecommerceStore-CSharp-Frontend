export interface ProductoResponseDto {
  id: number;
  sku?: string;
  nombre: string;
  descripcion?: string;
  precioBase: number;
  descuento: number;
  precioFinal: number;
  peso?: number;
  categoriaId?: number;
  categoriaNombre?: string;
  imagenPrincipal?: string;
  esNuevo: boolean;
  esDestacado: boolean;
  activo: boolean;
  fechaCreacion: string;
  fechaActualizacion: string;
}

export interface CreateProductoDto {
  sku?: string;
  nombre: string;
  descripcion?: string;
  precioBase: number;
  descuento: number;
  peso?: number;
  categoriaId?: number;
  imagenPrincipal?: string;
  esNuevo: boolean;
  esDestacado: boolean;
  activo: boolean;
}

export interface UpdateProductoDto extends Partial<CreateProductoDto> {}

export interface ProductoFilterDto {
  categoriaId?: number;
  esNuevo?: boolean;
  esDestacado?: boolean;
  search?: string;
  pageNumber?: number;
  pageSize?: number;
}
