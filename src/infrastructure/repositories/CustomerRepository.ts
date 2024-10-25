import { Customer } from "src/domain/entities/Customer.entity";
import { BaseRepository } from "./base/BaseRepository";
import { ICustomerRepository } from "src/domain/repositories/entities/ICustomerRepository";
import { Injectable } from "@nestjs/common";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";

@Injectable()
export class CustomerRepository extends BaseRepository<Customer> implements ICustomerRepository {

    constructor(
        @InjectRepository(Customer)
        private readonly customerRepository: Repository<Customer>,
    ) {
        super(Customer, customerRepository);
    }

}