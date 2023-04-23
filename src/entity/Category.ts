import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";


@Entity("category")
export class Category extends BaseEntity {
	@PrimaryGeneratedColumn()
	id: number;

    @Column("varchar",{length:100, unique:true})
    nombre_categoria:string
}
