import api from './api';
import type { PagedResponse, ApiResponse } from '../types/common.types';
import type { ProductoResponseDto, CreateProductoDto, UpdateProductoDto, ProductoFilterDto } from '../types/producto.types';
import type { CategoriaDto, CreateCategoriaDto, UpdateCategoriaDto } from '../types/categoria.types';
import type { PedidoResponseDto, UpdateOrderStatusDto } from '../types/pedido.types';
import type { UsuarioResponseDto, UpdateUsuarioDto } from '../types/usuario.types';
import { unwrapData, unwrapItems } from '../utils/api.helpers';

// ─── Productos ────────────────────────────────────────────────────

export const adminProductoService = {
  
    //Obtiene todos los productos sin filtrar por `activo`. El admin necesita ver tanto activos como inactivos.
   
  getAll: async (
    params: Pick<ProductoFilterDto, 'pageNumber' | 'pageSize'> = { pageNumber: 1, pageSize: 100 }
  ): Promise<PagedResponse<ProductoResponseDto>> => {
    const response = await api.get<{ exito: boolean; mensaje: string; data: PagedResponse<ProductoResponseDto> }>(
      '/producto',
      // Pasamos los params explícitos — no sobreescribimos `activo` con undefined (frágil)
      { params }
    );
    return unwrapData(response);
  },

  create: async (dto: CreateProductoDto): Promise<ProductoResponseDto> => {
    const response = await api.post<{ exito: boolean; mensaje: string; data: ProductoResponseDto }>(
      '/producto',
      dto
    );
    return unwrapData(response);
  },

  update: async (id: number, dto: UpdateProductoDto): Promise<ProductoResponseDto> => {
    const response = await api.put<{ exito: boolean; mensaje: string; data: ProductoResponseDto }>(
      `/producto/${id}`,
      dto
    );
    return unwrapData(response);
  },

  delete: async (id: number): Promise<void> => {
    await api.delete(`/producto/${id}`);
  },

  uploadImagen: async (id: number, file: File): Promise<ProductoResponseDto> => {
    const form = new FormData();
    form.append('file', file);
    const response = await api.post<{ exito: boolean; mensaje: string; data: ProductoResponseDto }>(
      `/producto/${id}/imagen`,
      form,
      // No establecemos Content-Type — axios lo setea automáticamente con el boundary correcto
      { headers: { 'Content-Type': 'multipart/form-data' } }
    );
    return unwrapData(response);
  },
};

// ─── Categorías ───────────────────────────────────────────────────

export const adminCategoriaService = {
  getAll: async (): Promise<CategoriaDto[]> => {
    const response = await api.get<{ exito: boolean; mensaje: string; data: PagedResponse<CategoriaDto> }>(
      '/categoria',
      { params: { limit: 100 } }
    );
    return unwrapItems(response);
  },

  create: async (dto: CreateCategoriaDto): Promise<CategoriaDto> => {
    const response = await api.post<{ exito: boolean; mensaje: string; data: CategoriaDto }>(
      '/categoria/create',
      dto
    );
    return unwrapData(response);
  },

  update: async (id: number, dto: UpdateCategoriaDto): Promise<CategoriaDto> => {
    const response = await api.put<{ exito: boolean; mensaje: string; data: CategoriaDto }>(
      `/categoria/${id}`,
      dto
    );
    return unwrapData(response);
  },

  delete: async (id: number): Promise<void> => {
    await api.delete(`/categoria/${id}`);
  },
};

// ─── Pedidos ──────────────────────────────────────────────────────

export const adminPedidoService = {
  /**
   * El backend no tiene un endpoint GET /pedido para admin con lista paginada.
   * Este método obtiene el detalle por ID. Para listar pedidos, usar
   * GET /pedido/mis-compras (solo para el usuario autenticado).
   * TODO: Agregar endpoint GET /pedido?page=1&limit=50 en el backend.
   */
  getById: async (id: number): Promise<PedidoResponseDto> => {
    const response = await api.get<{ exito: boolean; mensaje: string; data: PedidoResponseDto }>(
      `/pedido/${id}`
    );
    return unwrapData(response);
  },

  updateStatus: async (id: number, dto: UpdateOrderStatusDto): Promise<PedidoResponseDto> => {
    const response = await api.patch<{ exito: boolean; mensaje: string; data: PedidoResponseDto }>(
      `/pedido/${id}/status`,
      dto
    );
    return unwrapData(response);
  },
};

// ─── Usuarios ─────────────────────────────────────────────────────

export const adminUsuarioService = {
  getAll: async (): Promise<UsuarioResponseDto[]> => {
    const response = await api.get<ApiResponse<PagedResponse<UsuarioResponseDto>>>('/usuarios');
    return response.data.data.items;
  },

  update: async (id: number, dto: UpdateUsuarioDto): Promise<UsuarioResponseDto> => {
    const response = await api.put<ApiResponse<UsuarioResponseDto>>(`/usuarios/${id}`, dto);
    return response.data.data;
  },

  delete: async (id: number): Promise<void> => {
    await api.delete(`/usuarios/${id}`);
  },
};
