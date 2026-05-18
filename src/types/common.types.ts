export interface PagedResponse<T> {
  data: T[];
  pageNumber: number;
  pageSize: number;
  totalElements: number;
  totalPages: number;
  hasPreviousPage: boolean;
  hasNextPage: boolean;
}
