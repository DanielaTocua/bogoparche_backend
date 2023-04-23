import { MigrationInterface, QueryRunner } from "typeorm";

export class Altertabledescripcion1682267037825 implements MigrationInterface {
	name = "Altertabledescripcion1682267037825";

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(
			`ALTER TABLE "event" RENAME COLUMN "description" TO "descripcion"`,
		);
		await queryRunner.query(
			`ALTER TABLE "plan" RENAME COLUMN "description" TO "descripcion"`,
		);
		await queryRunner.query(
			`CREATE TABLE "category" ("id" SERIAL NOT NULL, "nombre_categoria" character varying(100) NOT NULL, CONSTRAINT "UQ_c9f61a1f8701f81b2a5a6bd2c01" UNIQUE ("nombre_categoria"), CONSTRAINT "PK_9c4e4a89e3674fc9f382d733f03" PRIMARY KEY ("id"))`,
		);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`DROP TABLE "category"`);
		await queryRunner.query(
			`ALTER TABLE "plan" RENAME COLUMN "descripcion" TO "description"`,
		);
		await queryRunner.query(
			`ALTER TABLE "event" RENAME COLUMN "descripcion" TO "description"`,
		);
	}
}
