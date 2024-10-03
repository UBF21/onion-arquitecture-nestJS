import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { BaseEntity } from "./base/BaseEntity.entity";
import { CountryCustomer } from "./CountryCustomer.entity";

@Entity('Paises')
export class Country extends BaseEntity{
    @PrimaryGeneratedColumn('uuid', { name: 'pais_id' })
    id: string;

    @Column({ length: 50 })
    nombre: string;

    @Column({ length: 3, name: 'codigo_iso' })
    codigoIso: string;

    @OneToMany(() => CountryCustomer, countryCustomer => countryCustomer.cliente)
    CustomerCountries: CountryCustomer[];

}