import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { ApplicationModule } from './application/application.module';
import { DomainModule } from './domain/domain.module';
import { InfrastructureModule } from './infrastructure/infrastructure.module';
import { PresentationModule } from './presentation/presentation.module';
import { ConfigurationModule } from './configuration/configuration.module';
import { DatabaseModule } from './infrastructure/database/database.module';

@Module({
  imports: [
    ApplicationModule, 
    DomainModule, 
    InfrastructureModule, 
    PresentationModule, 
    ConfigurationModule
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule { }
