import { MigrationInterface, QueryRunner } from "typeorm";

export class SolvedBoolInMedioContacto1682281448681
	implements MigrationInterface
{
	name = "SolvedBoolInMedioContacto1682281448681";

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`ALTER TABLE "event" DROP COLUMN "medio_contacto"`);
		await queryRunner.query(
			`ALTER TABLE "event" ADD "medio_contacto" character varying(200) NOT NULL`,
		);
		await queryRunner.query(`ALTER TABLE "plan" DROP COLUMN "medio_contacto"`);
		await queryRunner.query(
			`ALTER TABLE "plan" ADD "medio_contacto" character varying(200) NOT NULL`,
		);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`ALTER TABLE "plan" DROP COLUMN "medio_contacto"`);
		await queryRunner.query(
			`ALTER TABLE "plan" ADD "medio_contacto" boolean NOT NULL DEFAULT false`,
		);
		await queryRunner.query(`ALTER TABLE "event" DROP COLUMN "medio_contacto"`);
		await queryRunner.query(
			`ALTER TABLE "event" ADD "medio_contacto" boolean NOT NULL DEFAULT false`,
		);
	}
}
