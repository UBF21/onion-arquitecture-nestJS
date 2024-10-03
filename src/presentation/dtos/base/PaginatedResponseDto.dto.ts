export class PaginatedResponseDto<T>{
    data: T[];
    totalItems: number;
    currentPage: number;
    pageSize: number;
}