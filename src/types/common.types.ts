// Wrapper que el backend envuelve en TODAS las respuestas
export interface ApiResponse<T> {
  exito: boolean;
  mensaje: string;
  data: T;
}

// Coincide con DTOs/PagedResponse.cs del backend
export interface PagedResponse<T> {
  items: T[];
  totalItems: number;
  page: number;
  limit: number;
  totalPages: number;
}
