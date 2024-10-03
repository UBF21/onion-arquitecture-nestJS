import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CustomerRepository } from './repositories/CustomerRepository';
import { Customer } from 'src/domain/entities/Customer.entity';
import { Country } from 'src/domain/entities/Country.entity';
import { CountryCustomer } from 'src/domain/entities/CountryCustomer.entity';
import { CountryCustomerRepository } from './repositories/CountryCustomerRepository';

@Module({
  imports: [
    DatabaseModule,
    TypeOrmModule.forFeature([Customer,Country,CountryCustomer])
  ],
  providers: [
    CustomerRepository,
    CountryCustomerRepository
  ],
  exports:[
    CustomerRepository,
    CountryCustomerRepository  
  ]
})
export class InfrastructureModule { }
