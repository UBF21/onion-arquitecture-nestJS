import { BadRequestException, InternalServerErrorException, NotFoundException } from "@nestjs/common";
import { Customer } from "src/domain/entities/Customer.entity";
import { IBaseRepository } from "src/domain/repositories/base/IBaseRepository";
import { DeleteResponseDto } from "src/application/dtos/base/delete-response.dto";
import { PaginatedResponseDto } from "src/application/dtos/base/paginated-response.dto";
import { ResponseDto } from "src/application/dtos/base/response.dto";
import { Constants } from "src/utils/Constants.util";
import { RegularExpression } from "src/utils/RegularExpressions.util";
import { EntityTarget, FindOneOptions, FindOptionsRelations, FindOptionsSelect, FindOptionsWhere, Repository, SelectQueryBuilder } from "typeorm";
import { QueryDeepPartialEntity } from "typeorm/query-builder/QueryPartialEntity";

export class BaseRepository<T> implements IBaseRepository<T> {

    private repository: Repository<T>;
    private entity: EntityTarget<T>;

    constructor(entity: EntityTarget<T>, repository: Repository<T>) {
        this.entity = entity;
        this.repository = repository;
    }

    async getAllByFieldName(fieldName: keyof T, value: any, page: number, pageSize: number, select?: FindOptionsSelect<T>, relations?: FindOptionsRelations<T>): Promise<{ data: T[]; totalItems: number; currentPage: number; pageSize: number }> {

        if (page <= 0 || isNaN(page)) throw new BadRequestException('Invalid page number. Page number must be a positive integer.');

        if (pageSize <= 0 || isNaN(pageSize)) throw new BadRequestException('Invalid page size. Page size must be a positive integer.');

        if (pageSize > Constants.MAX_PAGE_SIZE) throw new BadRequestException(`Page size too large. Maximum allowed page size is ${Constants.MAX_PAGE_SIZE}.`);

        try {

            const [data, totalItems] = await this.repository.findAndCount(
                {
                    where: { [fieldName]: value } as any,
                    skip: (page - 1) * pageSize,
                    take: pageSize,
                    select,
                    relations
                }
            );
            const totalPages = Math.ceil(totalItems / pageSize);
            if (page > totalPages) throw new NotFoundException(`Page number exceeds total number of pages. Total pages: ${totalPages}.`);

            return { data, totalItems, currentPage: page, pageSize };

        } catch (error) {
            throw new InternalServerErrorException(`Error retrieving data: ${error.message}`);
        }

    }

    async add(entity: T): Promise<T> {
        try {
            const saveEntity: T = await this.repository.save(entity);
            if (!saveEntity) throw new InternalServerErrorException(`ups, the entity was not created succesfully.`);
            return saveEntity;
        } catch (error) {
            throw new InternalServerErrorException(`Error creating data: ${error.message}`);
        }
    }

    async getAll(page: number, pageSize: number, where?: FindOptionsWhere<T>, select?: FindOptionsSelect<T>, relations?: FindOptionsRelations<T>): Promise<{ data: T[]; totalItems: number; currentPage: number; pageSize: number }> {

        if (page <= 0 || isNaN(page)) throw new BadRequestException('Invalid page number. Page number must be a positive integer.');

        if (pageSize <= 0 || isNaN(pageSize)) throw new BadRequestException('Invalid page size. Page size must be a positive integer.');

        if (pageSize > Constants.MAX_PAGE_SIZE) throw new BadRequestException(`Page size too large. Maximum allowed page size is ${Constants.MAX_PAGE_SIZE}.`);


        try {

            const [data, totalItems] = await this.repository.findAndCount(
                {
                    skip: (page - 1) * pageSize,
                    take: pageSize,
                    where,
                    select,
                    relations
                });

            const totalPages = Math.ceil(totalItems / pageSize);
            if (page > totalPages) throw new NotFoundException(`Page number exceeds total number of pages. Total pages: ${totalPages}.`);


            return { data, totalItems, currentPage: page, pageSize };

        } catch (error) {
            throw new InternalServerErrorException(`Error retrieving data: ${error.message}`);
        }
    }

    async getById(id: string, select?: FindOptionsSelect<T>, relations?: FindOptionsRelations<T>): Promise<T> {

        if (!RegularExpression.UUID.test(id)) throw new BadRequestException(new ResponseDto(false, "Invalid ID format. ID must be a valid UUID.", null));

        try {

            const entity: T = await this.repository.findOne(
                {
                    where: { id } as any,
                    select,
                    relations
                });

            if (!entity) throw new NotFoundException(new ResponseDto(false, "Entity not found successfully.", null));

            return entity;

        } catch (error) {
            throw new InternalServerErrorException(new ResponseDto(false, `Error retrieving entity: ${error.message}`, null));
        }
    }

    async update(id: string, entity: QueryDeepPartialEntity<T>): Promise<T> {


        try {

            const updateResult = await this.repository.update(id, entity);

            if (updateResult.affected === 0) throw new InternalServerErrorException(new ResponseDto(false, "Failed to update the entity.", null));

            const updatedEntity: T = await this.getById(id);

            return await updatedEntity;

        } catch (error) {
            throw new InternalServerErrorException(new ResponseDto(false, `Error updating entity: ${error.message}`, null));
        }


    }

    async delete(id: string): Promise<boolean> {

        if (!RegularExpression.UUID.test(id)) throw new BadRequestException(new DeleteResponseDto(false, "Invalid ID format. ID must be a valid UUID."));

        try {
            const deleteResult = await this.repository.delete(id);
            return (deleteResult.affected > 0)

        } catch (error) {
            throw new InternalServerErrorException(new DeleteResponseDto(false, `Error deleting entity: ${error.message}`));
        }
    }
}