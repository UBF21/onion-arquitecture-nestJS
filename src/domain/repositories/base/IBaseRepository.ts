import { DeleteResponseDto } from "src/presentation/dtos/base/DeleteResponseDto.dto";
import { PaginatedResponseDto } from "src/presentation/dtos/base/PaginatedResponseDto.dto";
import { ResponseDto } from "src/presentation/dtos/base/ResponseDto.dto";
import { RelationKeys } from "src/utils/CustomTypes";
import { FindOneOptions, FindOptionsRelations, FindOptionsSelect, FindOptionsWhere } from "typeorm";
import { QueryDeepPartialEntity } from "typeorm/query-builder/QueryPartialEntity";

export interface IBaseRepository<T> {
    add(entity: T): Promise<ResponseDto<T>>;
    getAll(page: number, pageSize: number, selectFields?: (keyof T)[], relations?: RelationKeys<T>[]): Promise<PaginatedResponseDto<T>>;
    getById(where: FindOptionsWhere<T> | FindOptionsWhere<T>[], select?: FindOptionsSelect<T>, relations?: FindOptionsRelations<T>): Promise<ResponseDto<T>>;
    update(id: string, entity: QueryDeepPartialEntity<T>): Promise<ResponseDto<T>>;
    delete(id: string): Promise<DeleteResponseDto>;
    getAllByFieldName(fieldName: keyof T, value: any, page: number, pageSize: number, selectFields?: (keyof T)[], relations?: RelationKeys<T>[]): Promise<PaginatedResponseDto<T>>;
}