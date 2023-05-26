import { MigrationInterface, QueryRunner } from "typeorm";

export class UserIsAdmin1682017621853 implements MigrationInterface {
	name = "UserIsAdmin1682017621853";

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(
			`ALTER TABLE "user" ADD "isAdmin" boolean NOT NULL DEFAULT false`,
		);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "isAdmin"`);
	}
}
