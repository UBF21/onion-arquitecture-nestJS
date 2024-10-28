import { FindOneOptions, FindOptionsRelations, FindOptionsSelect, FindOptionsWhere } from "typeorm";
import { QueryDeepPartialEntity } from "typeorm/query-builder/QueryPartialEntity";

export interface IBaseRepository<T> {
    add(entity: T): Promise<T>;
    getAll(page: number, pageSize: number, where?: FindOptionsWhere<T>, select?: FindOptionsSelect<T>, relations?: FindOptionsRelations<T>): Promise<{ data: T[]; totalItems: number; currentPage: number; pageSize: number }>;
    getById(id: string, select?: FindOptionsSelect<T>, relations?: FindOptionsRelations<T>): Promise<T>;
    update(id: string, entity: QueryDeepPartialEntity<T>): Promise<T>;
    delete(id: string): Promise<boolean>;
    getAllByFieldName(fieldName: keyof T, value: any, page: number, pageSize: number, select?: FindOptionsSelect<T>, relations?: FindOptionsRelations<T>): Promise<{ data: T[]; totalItems: number; currentPage: number; pageSize: number }>;
    getAllBy(where?: FindOptionsWhere<T>, select?: FindOptionsSelect<T>, relations?: FindOptionsRelations<T>): Promise<T[]>;
    getCount(where?: FindOptionsWhere<T>, relations?: FindOptionsRelations<T>);
}