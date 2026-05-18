export interface DireccionDto {
  id: number;
  usuarioId: number;
  calle: string;
  numero: string;
  ciudad: string;
  provincia: string;
  codigoPostal: string;
  referencia?: string;
  esPrincipal: boolean;
}

export interface CreateDireccionDto extends Omit<DireccionDto, 'id' | 'usuarioId'> {}
