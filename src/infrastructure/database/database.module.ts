import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Country } from 'src/domain/entities/Country.entity';
import { CountryCustomer } from 'src/domain/entities/CountryCustomer.entity';
import { Customer } from 'src/domain/entities/Customer.entity';

@Module({
    imports: [
        TypeOrmModule.forRoot({
            type: "mssql",
            host: 'localhost',
            port: 1433,
            username: 'sa',
            password: 'chichobelo',
            database: 'general-empresa',
            entities: [Country,CountryCustomer,Customer],
            synchronize: false,
            logging: true,
            options: {
                encrypt: true, // Utilizado para conexiones seguras, si tu base de datos requiere SSL.
                enableArithAbort: true,  // Esto puede ser necesario dependiendo de la versión de SQL Server.
                trustServerCertificate:true
            }
        })
    ]
})
export class DatabaseModule { }
