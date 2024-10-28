import { Controller, Get } from '@nestjs/common';
import { PaginatedResponseDto } from 'src/application/dtos/base/paginated-response.dto';
import { CountryCustomer } from 'src/domain/entities/CountryCustomer.entity';
import { CountryCustomerRepository } from 'src/infrastructure/repositories/entities/CountryCustomerRepository';
import { CustomerRepository } from 'src/infrastructure/repositories/entities/CustomerRepository';

@Controller('example')
export class ExampleController {

    constructor(private readonly customer: CustomerRepository, private readonly countryCustomerCustomer: CountryCustomerRepository) { }

    @Get()
    async getHello(): Promise<PaginatedResponseDto<CountryCustomer>> {
      return await this.countryCustomerCustomer.getAll(1, 3, null,null, { cliente: true, pais: true });
    }
}
