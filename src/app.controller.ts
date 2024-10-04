import { Controller, Get, Param } from '@nestjs/common';
import { CustomerRepository } from './infrastructure/repositories/CustomerRepository';
import { ResponseDto } from './presentation/dtos/base/ResponseDto.dto';
import { Customer } from './domain/entities/Customer.entity';
import { CountryCustomerRepository } from './infrastructure/repositories/CountryCustomerRepository';
import { CountryCustomer } from './domain/entities/CountryCustomer.entity';

@Controller('example')
export class AppController {
  constructor(private readonly customer: CustomerRepository, private readonly countryCustomerCustomer: CountryCustomerRepository) { }

  @Get(':id')
  async getHello(@Param('id') id: string): Promise<ResponseDto<CountryCustomer>> {
    return await this.countryCustomerCustomer.getById(
      { clienteId: id },
      {
        clienteId: false, paisId: false
      },
      {
        cliente: true, pais: true,
      }
    );
  }
}
