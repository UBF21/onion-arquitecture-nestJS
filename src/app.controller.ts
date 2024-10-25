import { Controller, Get, Param } from '@nestjs/common';
import { CustomerRepository } from './infrastructure/repositories/CustomerRepository';
import { ResponseDto } from './application/dtos/base/response.dto';
import { Customer } from './domain/entities/Customer.entity';
import { CountryCustomerRepository } from './infrastructure/repositories/CountryCustomerRepository';
import { CountryCustomer } from './domain/entities/CountryCustomer.entity';
import { PaginatedResponseDto } from './application/dtos/base/paginated-response.dto';
import { log } from 'console';
import { join } from 'path';

@Controller('example')
export class AppController {
  constructor(private readonly customer: CustomerRepository, private readonly countryCustomerCustomer: CountryCustomerRepository) { }

  @Get()
  async getHello(): Promise<PaginatedResponseDto<CountryCustomer>> {
    return await this.countryCustomerCustomer.getAll(1, 3, null,null, { cliente: true, pais: true });
  }
}
