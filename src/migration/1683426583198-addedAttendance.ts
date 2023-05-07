import { MigrationInterface, QueryRunner } from "typeorm";

export class AddedAttendance1683426583198 implements MigrationInterface {
	name = "AddedAttendance1683426583198";

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(
			`CREATE TABLE "attendance" ("id" SERIAL NOT NULL, "id_usuario" integer NOT NULL, "id_actividad" integer NOT NULL, "es_plan" boolean NOT NULL, CONSTRAINT "PK_ee0ffe42c1f1a01e72b725c0cb2" PRIMARY KEY ("id"))`,
		);
		await queryRunner.query(
			`ALTER TABLE "attendance" ADD CONSTRAINT "FK_a9e61c8b999abf376e1a9cb4770" FOREIGN KEY ("id_usuario") REFERENCES "bgp_user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
		);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(
			`ALTER TABLE "attendance" DROP CONSTRAINT "FK_a9e61c8b999abf376e1a9cb4770"`,
		);
		await queryRunner.query(`DROP TABLE "attendance"`);
	}
}
