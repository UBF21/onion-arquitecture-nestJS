import { Column } from "typeorm";

export abstract class BaseEntity {

    @Column({ type: 'date', nullable: true }) // Permitir valores nulos
    created: Date | null;

    @Column({ type: 'date', nullable: true }) // Permitir valores nulos
    deleted: Date | null;

    @Column({ type: 'date', nullable: true }) // Permitir valores nulos
    modified: Date | null;
}