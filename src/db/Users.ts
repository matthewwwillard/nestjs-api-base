import { Exclude, Expose } from "class-transformer";
import { BaseEntity, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Users extends BaseEntity {
    @Expose()
    @PrimaryGeneratedColumn('uuid')
    id:string;

    @Expose()
    @Column()
    displayName:string;

    @Column()
    email:string;

    @Column()
    password:string;

    @CreateDateColumn()
    created:string;

    @UpdateDateColumn()
    updated:string;
}