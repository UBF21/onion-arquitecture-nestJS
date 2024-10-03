import { Column, Entity, OneToMany, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
import { BaseEntity } from "./base/BaseEntity.entity";
import { CountryCustomer } from "./CountryCustomer.entity";

@Entity('Clientes')
export class Customer extends BaseEntity {
    @PrimaryColumn('uuid', { name: "cliente_id" }) // Especifica que es un UNIQUEIDENTIFIER
    id: string; // Se usa string para representar el UUID

    @Column({ name: 'nombre', length: 50 }) // Limitar la longitud a 50 caracteres
    name: string;

    @OneToMany(() => CountryCustomer, countryCustomer => countryCustomer.cliente)
    CustomerCountries: CountryCustomer[];
}