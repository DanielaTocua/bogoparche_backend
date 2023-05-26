import { MigrationInterface, QueryRunner } from "typeorm";

export class CommentFix1683650325826 implements MigrationInterface {
	name = "CommentFix1683650325826";

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(
			`CREATE TABLE "comment" ("id_comentario" SERIAL NOT NULL, "texto_comentario" character varying(200) NOT NULL, "calificacion" integer NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "id_usuario" integer, "id_actividad" integer, CONSTRAINT "PK_be9415e32c8929d2e9ae656c3f2" PRIMARY KEY ("id_comentario"))`,
		);
		await queryRunner.query(
			`ALTER TABLE "comment" ADD CONSTRAINT "FK_bd96247c802a52b93ae7842bbb7" FOREIGN KEY ("id_usuario") REFERENCES "bgp_user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
		);
		await queryRunner.query(
			`ALTER TABLE "comment" ADD CONSTRAINT "FK_60dc85715f6804d29af0ec381ff" FOREIGN KEY ("id_actividad") REFERENCES "activity"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
		);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(
			`ALTER TABLE "comment" DROP CONSTRAINT "FK_60dc85715f6804d29af0ec381ff"`,
		);
		await queryRunner.query(
			`ALTER TABLE "comment" DROP CONSTRAINT "FK_bd96247c802a52b93ae7842bbb7"`,
		);
		await queryRunner.query(`DROP TABLE "comment"`);
	}
}
