import { MigrationInterface, QueryRunner } from "typeorm";

export class SolvedTime1682281815914 implements MigrationInterface {
	name = "SolvedTime1682281815914";

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`ALTER TABLE "event" DROP COLUMN "hora_inicio"`);
		await queryRunner.query(
			`ALTER TABLE "event" ADD "hora_inicio" TIME NOT NULL`,
		);
		await queryRunner.query(`ALTER TABLE "event" DROP COLUMN "hora_fin"`);
		await queryRunner.query(`ALTER TABLE "event" ADD "hora_fin" TIME NOT NULL`);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`ALTER TABLE "event" DROP COLUMN "hora_fin"`);
		await queryRunner.query(
			`ALTER TABLE "event" ADD "hora_fin" TIMESTAMP NOT NULL`,
		);
		await queryRunner.query(`ALTER TABLE "event" DROP COLUMN "hora_inicio"`);
		await queryRunner.query(
			`ALTER TABLE "event" ADD "hora_inicio" TIMESTAMP NOT NULL`,
		);
	}
}
