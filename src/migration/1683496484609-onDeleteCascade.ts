import { MigrationInterface, QueryRunner } from "typeorm";

export class OnDeleteCascade1683496484609 implements MigrationInterface {
	name = "OnDeleteCascade1683496484609";

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(
			`ALTER TABLE "event" DROP CONSTRAINT "FK_30c2f3bbaf6d34a55f8ae6e4614"`,
		);
		await queryRunner.query(
			`ALTER TABLE "plan" DROP CONSTRAINT "FK_54a2b686aed3b637654bf7ddbb3"`,
		);
		await queryRunner.query(
			`ALTER TABLE "event" ADD CONSTRAINT "FK_30c2f3bbaf6d34a55f8ae6e4614" FOREIGN KEY ("id") REFERENCES "activity"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
		);
		await queryRunner.query(
			`ALTER TABLE "plan" ADD CONSTRAINT "FK_54a2b686aed3b637654bf7ddbb3" FOREIGN KEY ("id") REFERENCES "activity"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
		);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(
			`ALTER TABLE "plan" DROP CONSTRAINT "FK_54a2b686aed3b637654bf7ddbb3"`,
		);
		await queryRunner.query(
			`ALTER TABLE "event" DROP CONSTRAINT "FK_30c2f3bbaf6d34a55f8ae6e4614"`,
		);
		await queryRunner.query(
			`ALTER TABLE "plan" ADD CONSTRAINT "FK_54a2b686aed3b637654bf7ddbb3" FOREIGN KEY ("id") REFERENCES "activity"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
		);
		await queryRunner.query(
			`ALTER TABLE "event" ADD CONSTRAINT "FK_30c2f3bbaf6d34a55f8ae6e4614" FOREIGN KEY ("id") REFERENCES "activity"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
		);
	}
}
