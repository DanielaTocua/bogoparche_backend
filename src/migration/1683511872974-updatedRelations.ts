import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdatedRelations1683511872974 implements MigrationInterface {
	name = "UpdatedRelations1683511872974";

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(
			`ALTER TABLE "attendance" ADD CONSTRAINT "FK_35520ffb9e42f4457dcb9812d66" FOREIGN KEY ("id_actividad") REFERENCES "activity"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
		);
		await queryRunner.query(
			`ALTER TABLE "favorite" ADD CONSTRAINT "FK_c3a5cd5ac934a3eec68ae483ce5" FOREIGN KEY ("id_actividad") REFERENCES "activity"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
		);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(
			`ALTER TABLE "favorite" DROP CONSTRAINT "FK_c3a5cd5ac934a3eec68ae483ce5"`,
		);
		await queryRunner.query(
			`ALTER TABLE "attendance" DROP CONSTRAINT "FK_35520ffb9e42f4457dcb9812d66"`,
		);
	}
}
