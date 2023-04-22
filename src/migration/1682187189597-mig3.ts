import { MigrationInterface, QueryRunner } from "typeorm";

export class Mig31682187189597 implements MigrationInterface {
	name = "Mig31682187189597";

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(
			`CREATE TABLE "token" ("token" character varying(512) NOT NULL, "createdAt" TIMESTAMP NOT NULL, CONSTRAINT "PK_d9959ee7e17e2293893444ea371" PRIMARY KEY ("token"))`,
		);
		await queryRunner.query(
			`ALTER TABLE "user" ADD CONSTRAINT "UQ_78a916df40e02a9deb1c4b75edb" UNIQUE ("username")`,
		);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(
			`ALTER TABLE "user" DROP CONSTRAINT "UQ_78a916df40e02a9deb1c4b75edb"`,
		);
		await queryRunner.query(`DROP TABLE "token"`);
	}
}
