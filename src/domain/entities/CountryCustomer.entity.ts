import { Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";
import { Customer } from "./Customer.entity";
import { Country } from "./Country.entity";

@Entity('Clientes_Paises')
export class CountryCustomer {
    @PrimaryColumn('uuid', { name: 'cliente_id' })
    clienteId: string;

    @PrimaryColumn('uuid', { name: 'pais_id' })
    paisId: string;

    @ManyToOne(() => Customer, cliente => cliente)
    @JoinColumn({ name: 'cliente_id' })
    cliente: Customer;

    @ManyToOne(() => Country, Country => Country.CustomerCountries)
    @JoinColumn({ name: 'pais_id' })
    pais: Country;
}