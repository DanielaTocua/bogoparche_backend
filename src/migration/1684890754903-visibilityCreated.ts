import { MigrationInterface, QueryRunner } from "typeorm";

export class VisibilityCreated1684890754903 implements MigrationInterface {
	name = "VisibilityCreated1684890754903";

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(
			`CREATE TABLE "visibility" ("id_usuario" integer NOT NULL, "id_actividad" integer NOT NULL, CONSTRAINT "PK_cf5007453443cce4b3caa45c7e4" PRIMARY KEY ("id_usuario", "id_actividad"))`,
		);
		await queryRunner.query(
			`ALTER TABLE "visibility" ADD CONSTRAINT "FK_11ee492b05848d05be8271f736c" FOREIGN KEY ("id_usuario") REFERENCES "bgp_user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
		);
		await queryRunner.query(
			`ALTER TABLE "visibility" ADD CONSTRAINT "FK_af1212602a31e63224f16ed4bf1" FOREIGN KEY ("id_actividad") REFERENCES "activity"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
		);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(
			`ALTER TABLE "visibility" DROP CONSTRAINT "FK_af1212602a31e63224f16ed4bf1"`,
		);
		await queryRunner.query(
			`ALTER TABLE "visibility" DROP CONSTRAINT "FK_11ee492b05848d05be8271f736c"`,
		);
		await queryRunner.query(`DROP TABLE "visibility"`);
	}
}
