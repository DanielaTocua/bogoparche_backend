import { MigrationInterface, QueryRunner } from "typeorm";

export class RelatedActivity1684721603227 implements MigrationInterface {
	name = "RelatedActivity1684721603227";

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(
			`CREATE TABLE "relatedactivity" ("id" SERIAL NOT NULL, "id_actividad_privada" integer NOT NULL, "id_actividad_publica" integer NOT NULL, CONSTRAINT "PK_a9cdd03b87984986d844ad575f9" PRIMARY KEY ("id"))`,
		);
		await queryRunner.query(
			`ALTER TABLE "activity" DROP CONSTRAINT "FK_0bf33bb41206dbb0a08efc4ca08"`,
		);
		await queryRunner.query(
			`ALTER TABLE "activity" ALTER COLUMN "id_usuario" SET NOT NULL`,
		);
		await queryRunner.query(
			`ALTER TABLE "activity" ADD CONSTRAINT "FK_0bf33bb41206dbb0a08efc4ca08" FOREIGN KEY ("id_usuario") REFERENCES "bgp_user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
		);
		await queryRunner.query(
			`ALTER TABLE "relatedactivity" ADD CONSTRAINT "FK_09c2a44dd57897458c0af6606bd" FOREIGN KEY ("id_actividad_privada") REFERENCES "activity"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
		);
		await queryRunner.query(
			`ALTER TABLE "relatedactivity" ADD CONSTRAINT "FK_05be557b2e8e139453d72eb0eee" FOREIGN KEY ("id_actividad_publica") REFERENCES "activity"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
		);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(
			`ALTER TABLE "relatedactivity" DROP CONSTRAINT "FK_05be557b2e8e139453d72eb0eee"`,
		);
		await queryRunner.query(
			`ALTER TABLE "relatedactivity" DROP CONSTRAINT "FK_09c2a44dd57897458c0af6606bd"`,
		);
		await queryRunner.query(
			`ALTER TABLE "activity" DROP CONSTRAINT "FK_0bf33bb41206dbb0a08efc4ca08"`,
		);
		await queryRunner.query(
			`ALTER TABLE "activity" ALTER COLUMN "id_usuario" DROP NOT NULL`,
		);
		await queryRunner.query(
			`ALTER TABLE "activity" ADD CONSTRAINT "FK_0bf33bb41206dbb0a08efc4ca08" FOREIGN KEY ("id_usuario") REFERENCES "bgp_user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
		);
		await queryRunner.query(`DROP TABLE "relatedactivity"`);
	}
}
