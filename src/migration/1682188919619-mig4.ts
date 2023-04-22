import { MigrationInterface, QueryRunner } from "typeorm";

export class Mig41682188919619 implements MigrationInterface {
	name = "Mig41682188919619";

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(
			`ALTER TABLE "token" ALTER COLUMN "createdAt" SET DEFAULT now()`,
		);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(
			`ALTER TABLE "token" ALTER COLUMN "createdAt" DROP DEFAULT`,
		);
	}
}
