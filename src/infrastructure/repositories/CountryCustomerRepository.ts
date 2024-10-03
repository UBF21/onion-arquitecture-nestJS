import { CountryCustomer } from "src/domain/entities/CountryCustomer.entity";
import { BaseRepository } from "./base/BaseRepository";
import { ICountryCustomerRepository } from "src/domain/repositories/ICountryCustomerRepository";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";

export class CountryCustomerRepository extends  BaseRepository<CountryCustomer> implements ICountryCustomerRepository {

    constructor(
        @InjectRepository(CountryCustomer)
        private readonly countryCustomerRepository: Repository<CountryCustomer>,
    ) {
        super(CountryCustomer, countryCustomerRepository);
    }
}