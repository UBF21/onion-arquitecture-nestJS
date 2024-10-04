import { BadRequestException, InternalServerErrorException, NotFoundException } from "@nestjs/common";
import { Customer } from "src/domain/entities/Customer.entity";
import { IBaseRepository } from "src/domain/repositories/base/IBaseRepository";
import { DeleteResponseDto } from "src/presentation/dtos/base/DeleteResponseDto.dto";
import { PaginatedResponseDto } from "src/presentation/dtos/base/PaginatedResponseDto.dto";
import { ResponseDto } from "src/presentation/dtos/base/ResponseDto.dto";
import { Constants } from "src/utils/Constants.util";
import { RelationKeys } from "src/utils/CustomTypes";
import { RegularExpression } from "src/utils/RegularExpressions.util";
import { EntityTarget, FindOneOptions, FindOptionsRelationByString, FindOptionsRelations, FindOptionsSelect, FindOptionsSelectByString, FindOptionsWhere, Repository, SelectQueryBuilder } from "typeorm";
import { QueryDeepPartialEntity } from "typeorm/query-builder/QueryPartialEntity";

export class BaseRepository<T> implements IBaseRepository<T> {

    private repository: Repository<T>;
    private entity: EntityTarget<T>;

    constructor(entity: EntityTarget<T>, repository: Repository<T>) {
        this.entity = entity;
        this.repository = repository;
    }

    async getAllByFieldName(fieldName: keyof T, value: any, page: number, pageSize: number, selectFields?: (keyof T)[], relations?: RelationKeys<T>[]): Promise<PaginatedResponseDto<T>> {

        if (page <= 0 || isNaN(page)) throw new BadRequestException('Invalid page number. Page number must be a positive integer.');

        if (pageSize <= 0 || isNaN(pageSize)) throw new BadRequestException('Invalid page size. Page size must be a positive integer.');

        if (pageSize > Constants.MAX_PAGE_SIZE) throw new BadRequestException(`Page size too large. Maximum allowed page size is ${Constants.MAX_PAGE_SIZE}.`);

        try {

            const [data, totalItems] = await this.repository.findAndCount(
                {
                    where: { [fieldName]: value } as any,
                    skip: (page - 1) * pageSize,
                    take: pageSize,
                    select: selectFields as (keyof T)[],
                    relations: relations as string[] || []
                }
            );
            const totalPages = Math.ceil(totalItems / pageSize);
            if (page > totalPages) throw new NotFoundException(`Page number exceeds total number of pages. Total pages: ${totalPages}.`);

            return { data, totalItems, currentPage: page, pageSize };

        } catch (error) {
            throw new InternalServerErrorException(`Error retrieving data: ${error.message}`);
        }

    }

    async add(entity: T): Promise<ResponseDto<T>> {

        // try {

        //     const saveEntity: T = await this.repository.save(entity);

        //     if (!saveEntity) return { message: "ups, the entity was not created succesfully.", success: false };

        //     return { message: "Entity created successfully.", success: true };

        // } catch (error) {
        //     throw new InternalServerErrorException(`Error creating data: ${error.message}`);
        // }

        return await { message: "Entity created successfully.", success: true };

    }
    async getAll(page: number, pageSize: number, selectFields?: (keyof T)[], relations?: RelationKeys<T>[]): Promise<PaginatedResponseDto<T>> {

        if (page <= 0 || isNaN(page)) throw new BadRequestException('Invalid page number. Page number must be a positive integer.');

        if (pageSize <= 0 || isNaN(pageSize)) throw new BadRequestException('Invalid page size. Page size must be a positive integer.');

        if (pageSize > Constants.MAX_PAGE_SIZE) throw new BadRequestException(`Page size too large. Maximum allowed page size is ${Constants.MAX_PAGE_SIZE}.`);


        try {

            const [data, totalItems] = await this.repository.findAndCount(
                {
                    skip: (page - 1) * pageSize,
                    take: pageSize,
                    select: selectFields as (keyof T)[],
                    relations: relations as string[] || []

                });

            const totalPages = Math.ceil(totalItems / pageSize);
            if (page > totalPages) throw new NotFoundException(`Page number exceeds total number of pages. Total pages: ${totalPages}.`);


            return { data, totalItems, currentPage: page, pageSize };

        } catch (error) {
            throw new InternalServerErrorException(`Error retrieving data: ${error.message}`);
        }
    }

    async getById(where: FindOptionsWhere<T> | FindOptionsWhere<T>[], select?: FindOptionsSelect<T>, relations?: FindOptionsRelations<T>): Promise<ResponseDto<T>> {

        // if (!RegularExpression.UUID.test(id)) throw new BadRequestException(new ResponseDto(false, "Invalid ID format. ID must be a valid UUID.", null));

        try {
            
            const entity: T = await this.repository.findOne(
                {
                    where,
                    select,
                    relations
                });

            if (!entity) throw new NotFoundException(new ResponseDto(false, "Entity not found successfully.", null));

            return { success: true, message: "Entity found successfully.", data: entity };

        } catch (error) {
            throw new InternalServerErrorException(new ResponseDto(false, `Error retrieving entity: ${error.message}`, null));
        }
    }

    async update(id: string, entity: QueryDeepPartialEntity<T>): Promise<ResponseDto<T>> {

        // if (!RegularExpression.UUID.test(id)) throw new BadRequestException(new ResponseDto(false, "Invalid ID format. ID must be a valid UUID.", null));

        // try {

        //     const existingEntity = (await this.getById(id)).data;

        //     if (!existingEntity) throw new NotFoundException(new ResponseDto(false, "Entity not found successfully.", null));

        //     const updateResult = await this.repository.update(id, entity);

        //     if (updateResult.affected === 0) throw new InternalServerErrorException(new ResponseDto(false, "Failed to update the entity.", null));


        //     const updatedEntity = (await this.getById(id)).data;

        //     return await new ResponseDto(true, "Entity updated successfully.", updatedEntity);

        // } catch (error) {
        //     throw new InternalServerErrorException(new ResponseDto(false, `Error updating entity: ${error.message}`, null));
        // }

        return await new ResponseDto(true, "Entity updated successfully.", null);

    }
    async delete(id: string): Promise<DeleteResponseDto> {
        // if (!RegularExpression.UUID.test(id)) throw new BadRequestException(new DeleteResponseDto(false, "Invalid ID format. ID must be a valid UUID."));

        // try {

        //     const existingEntity = (await this.getById(id)).data;

        //     if (!existingEntity) throw new NotFoundException(new DeleteResponseDto(false, "Entity not found."));

        //     const deleteResult = await this.repository.delete(id);

        //     if (deleteResult.affected === 0) throw new InternalServerErrorException(new DeleteResponseDto(false, "Failed to delete the entity."));

        //     return await new DeleteResponseDto(true, "Entity deleted successfully.");

        // } catch (error) {
        //     throw new InternalServerErrorException(new DeleteResponseDto(false, `Error deleting entity: ${error.message}`));
        // }
        return await new DeleteResponseDto(true, "Entity deleted successfully.");

    }
}