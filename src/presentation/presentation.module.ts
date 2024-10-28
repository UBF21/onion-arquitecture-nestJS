import { Module } from '@nestjs/common';
import { ExampleController } from './example/example.controller';
import { CustomerRepository } from 'src/infrastructure/repositories/entities/CustomerRepository';
import { CountryCustomerRepository } from 'src/infrastructure/repositories/entities/CountryCustomerRepository';
import { InfrastructureModule } from 'src/infrastructure/infrastructure.module';
import { ApplicationModule } from 'src/application/application.module';

@Module({
  controllers: [ExampleController],
  imports:[
    InfrastructureModule,
    ApplicationModule,
  ]
})
export class PresentationModule {}
