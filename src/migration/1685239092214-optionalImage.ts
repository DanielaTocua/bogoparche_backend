import { MigrationInterface, QueryRunner } from "typeorm";

export class OptionalImage1685239092214 implements MigrationInterface {
	name = "OptionalImage1685239092214";

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`ALTER TABLE "activity" DROP COLUMN "image"`);
		await queryRunner.query(
			`ALTER TABLE "activity" ADD "image" character varying(200)`,
		);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`ALTER TABLE "activity" DROP COLUMN "image"`);
		await queryRunner.query(
			`ALTER TABLE "activity" ADD "image" character varying(100) NOT NULL`,
		);
	}
}
