import { DeleteResponseDto } from "src/application/dtos/base/delete-response.dto";
import { PaginatedResponseDto } from "src/application/dtos/base/paginated-response.dto";
import { ResponseDto } from "src/application/dtos/base/response.dto";
import { RelationKeys } from "src/utils/CustomTypes";
import { FindOneOptions, FindOptionsRelations, FindOptionsSelect, FindOptionsWhere } from "typeorm";
import { QueryDeepPartialEntity } from "typeorm/query-builder/QueryPartialEntity";

export interface IBaseRepository<T> {
    add(entity: T): Promise<T>;
    getAll(page: number, pageSize: number,where?: FindOptionsWhere<T>, select?: FindOptionsSelect<T>, relations?: FindOptionsRelations<T>): Promise<{ data: T[]; totalItems: number; currentPage: number; pageSize: number }>;
    getById(id: string, select?: FindOptionsSelect<T>, relations?: FindOptionsRelations<T>): Promise<T>;
    update(id: string, entity: QueryDeepPartialEntity<T>): Promise<T>;
    delete(id: string): Promise<boolean>;
    getAllByFieldName(fieldName: keyof T, value: any, page: number, pageSize: number, select?: FindOptionsSelect<T>, relations?: FindOptionsRelations<T>): Promise<{ data: T[]; totalItems: number; currentPage: number; pageSize: number }>;
}