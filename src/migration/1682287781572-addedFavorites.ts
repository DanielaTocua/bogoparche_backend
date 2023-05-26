import { MigrationInterface, QueryRunner } from "typeorm";

export class AddedFavorites1682287781572 implements MigrationInterface {
	name = "AddedFavorites1682287781572";

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(
			`CREATE TABLE "favorite" ("id" SERIAL NOT NULL, "id_actividad" integer NOT NULL, "es_plan" boolean NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "id_usuario" integer, CONSTRAINT "PK_495675cec4fb09666704e4f610f" PRIMARY KEY ("id"))`,
		);
		await queryRunner.query(
			`ALTER TABLE "favorite" ADD CONSTRAINT "FK_79e8391e2c4a04596532c59578d" FOREIGN KEY ("id_usuario") REFERENCES "bgp_user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
		);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(
			`ALTER TABLE "favorite" DROP CONSTRAINT "FK_79e8391e2c4a04596532c59578d"`,
		);
		await queryRunner.query(`DROP TABLE "favorite"`);
	}
}
