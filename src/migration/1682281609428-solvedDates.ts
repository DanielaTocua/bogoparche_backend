import { MigrationInterface, QueryRunner } from "typeorm";

export class SolvedDates1682281609428 implements MigrationInterface {
	name = "SolvedDates1682281609428";

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`ALTER TABLE "event" DROP COLUMN "fecha_inicio"`);
		await queryRunner.query(
			`ALTER TABLE "event" ADD "fecha_inicio" date NOT NULL`,
		);
		await queryRunner.query(`ALTER TABLE "event" DROP COLUMN "fecha_fin"`);
		await queryRunner.query(
			`ALTER TABLE "event" ADD "fecha_fin" date NOT NULL`,
		);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`ALTER TABLE "event" DROP COLUMN "fecha_fin"`);
		await queryRunner.query(
			`ALTER TABLE "event" ADD "fecha_fin" TIMESTAMP NOT NULL`,
		);
		await queryRunner.query(`ALTER TABLE "event" DROP COLUMN "fecha_inicio"`);
		await queryRunner.query(
			`ALTER TABLE "event" ADD "fecha_inicio" TIMESTAMP NOT NULL`,
		);
	}
}
