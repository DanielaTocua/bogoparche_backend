import { MigrationInterface, QueryRunner } from "typeorm";

export class CalificacionAdded1683524660561 implements MigrationInterface {
	name = "CalificacionAdded1683524660561";

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(
			`ALTER TABLE "commentPlan" ADD "calificacion" integer NOT NULL`,
		);
		await queryRunner.query(
			`ALTER TABLE "commentEvent" ADD "calificacion" integer NOT NULL`,
		);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(
			`ALTER TABLE "commentEvent" DROP COLUMN "calificacion"`,
		);
		await queryRunner.query(
			`ALTER TABLE "commentPlan" DROP COLUMN "calificacion"`,
		);
	}
}
