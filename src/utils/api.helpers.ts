import type { AxiosResponse } from 'axios';
import type { ApiResponse, PagedResponse } from '../types/common.types';

//Extrae `response.data.data` del wrapper { exito, mensaje, data }
//que el backend envuelve en TODAS las respuestas.
export function unwrapData<T>(response: AxiosResponse<ApiResponse<T>>): T {
  return response.data.data;
}


//Extrae únicamente los `items` de una respuesta paginada.
export function unwrapItems<T>(response: AxiosResponse<ApiResponse<PagedResponse<T>>>): T[] {
  return response.data.data.items;
}


// El backend envuelve los errores con un formato similar a las respuestas exitosas:
// { exito: false, mensaje: "Descripción del error", data: null }
// Por eso se puede extraer el mensaje específico del backend para mostrarlo al usuario.
export function extractErrorMessage(error: unknown): string {
  if (error && typeof error === 'object' && 'response' in error) {
    const axiosError = error as { response?: { data?: { mensaje?: string }; status?: number } };
    const backendMsg = axiosError.response?.data?.mensaje;
    if (backendMsg) return backendMsg;

    const status = axiosError.response?.status;
    if (status === 404) return 'El recurso no fue encontrado.';
    if (status === 409) return 'Ya existe un registro con esos datos.';
    if (status === 422) return 'Los datos ingresados no son válidos.';
    if (status === 403) return 'No tenés permisos para realizar esta acción.';
  }
  return 'Ocurrió un error inesperado. Intentá de nuevo.';
}
