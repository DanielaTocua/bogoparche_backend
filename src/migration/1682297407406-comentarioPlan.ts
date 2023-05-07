import { MigrationInterface, QueryRunner } from "typeorm";

export class ComentarioPlan1682297407406 implements MigrationInterface {
	name = "ComentarioPlan1682297407406";

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(
			`CREATE TABLE "commentEvent" ("id_comentario" SERIAL NOT NULL, "texto_comentario" character varying(200) NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "id_usuario" integer, "id_actividad" integer, CONSTRAINT "PK_0e9d909bc150d7376a19282b88a" PRIMARY KEY ("id_comentario"))`,
		);
		await queryRunner.query(
			`CREATE TABLE "commentPlan" ("id_comentario" SERIAL NOT NULL, "texto_comentario" character varying(200) NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "id_usuario" integer, "id_actividad" integer, CONSTRAINT "PK_a9237f7439ad24b68c394d886e5" PRIMARY KEY ("id_comentario"))`,
		);
		await queryRunner.query(
			`ALTER TABLE "commentEvent" ADD CONSTRAINT "FK_e87239d996e33255bc2657087a3" FOREIGN KEY ("id_usuario") REFERENCES "bgp_user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
		);
		await queryRunner.query(
			`ALTER TABLE "commentEvent" ADD CONSTRAINT "FK_57f7258a521af61f868cd7a89b0" FOREIGN KEY ("id_actividad") REFERENCES "event"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
		);
		await queryRunner.query(
			`ALTER TABLE "commentPlan" ADD CONSTRAINT "FK_4cfb19c321380b54c41ee9b77b1" FOREIGN KEY ("id_usuario") REFERENCES "bgp_user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
		);
		await queryRunner.query(
			`ALTER TABLE "commentPlan" ADD CONSTRAINT "FK_4e8704272ef7bc88d3421a733cf" FOREIGN KEY ("id_actividad") REFERENCES "plan"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
		);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(
			`ALTER TABLE "commentPlan" DROP CONSTRAINT "FK_4e8704272ef7bc88d3421a733cf"`,
		);
		await queryRunner.query(
			`ALTER TABLE "commentPlan" DROP CONSTRAINT "FK_4cfb19c321380b54c41ee9b77b1"`,
		);
		await queryRunner.query(
			`ALTER TABLE "commentEvent" DROP CONSTRAINT "FK_57f7258a521af61f868cd7a89b0"`,
		);
		await queryRunner.query(
			`ALTER TABLE "commentEvent" DROP CONSTRAINT "FK_e87239d996e33255bc2657087a3"`,
		);
		await queryRunner.query(`DROP TABLE "commentPlan"`);
		await queryRunner.query(`DROP TABLE "commentEvent"`);
	}
}
