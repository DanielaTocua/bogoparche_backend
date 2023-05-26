import { MigrationInterface, QueryRunner } from "typeorm";

export class AlterEventPlan1683465496857 implements MigrationInterface {
	name = "AlterEventPlan1683465496857";

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(
			`ALTER TABLE "plan" DROP CONSTRAINT "FK_e1b47f4ecb9fe568f6f1a22e056"`,
		);
		await queryRunner.query(
			`ALTER TABLE "event" DROP CONSTRAINT "FK_3a25760b6ef85d1973120e00d52"`,
		);
		await queryRunner.query(
			`CREATE TABLE "activity" ("id" SERIAL NOT NULL, "titulo_actividad" character varying(200) NOT NULL, "ubicacion" character varying(200) NOT NULL, "rango_precio" character varying(30) NOT NULL, "descripcion" character varying(200) NOT NULL, "restriccion_edad" boolean NOT NULL DEFAULT false, "medio_contacto" character varying(200) NOT NULL, "es_privada" boolean NOT NULL DEFAULT false, "id_categoria" integer NOT NULL, "es_aprobado" boolean NOT NULL DEFAULT false, "es_plan" boolean NOT NULL DEFAULT false, "eventId" integer, "planId" integer, CONSTRAINT "REL_12c101cb84aae626b8f4cd30f5" UNIQUE ("eventId"), CONSTRAINT "REL_ccab3cfce9d3f1f834a3494b27" UNIQUE ("planId"), CONSTRAINT "PK_24625a1d6b1b089c8ae206fe467" PRIMARY KEY ("id"))`,
		);
		await queryRunner.query(
			`ALTER TABLE "plan" DROP COLUMN "titulo_actividad"`,
		);
		await queryRunner.query(`ALTER TABLE "plan" DROP COLUMN "ubicacion"`);
		await queryRunner.query(`ALTER TABLE "plan" DROP COLUMN "rango_precio"`);
		await queryRunner.query(`ALTER TABLE "plan" DROP COLUMN "descripcion"`);
		await queryRunner.query(
			`ALTER TABLE "plan" DROP COLUMN "restriccion_edad"`,
		);
		await queryRunner.query(`ALTER TABLE "plan" DROP COLUMN "es_privada"`);
		await queryRunner.query(`ALTER TABLE "plan" DROP COLUMN "id_categoria"`);
		await queryRunner.query(`ALTER TABLE "plan" DROP COLUMN "es_aprobado"`);
		await queryRunner.query(`ALTER TABLE "plan" DROP COLUMN "medio_contacto"`);
		await queryRunner.query(
			`ALTER TABLE "event" DROP COLUMN "titulo_actividad"`,
		);
		await queryRunner.query(`ALTER TABLE "event" DROP COLUMN "ubicacion"`);
		await queryRunner.query(`ALTER TABLE "event" DROP COLUMN "rango_precio"`);
		await queryRunner.query(`ALTER TABLE "event" DROP COLUMN "descripcion"`);
		await queryRunner.query(
			`ALTER TABLE "event" DROP COLUMN "restriccion_edad"`,
		);
		await queryRunner.query(`ALTER TABLE "event" DROP COLUMN "es_privada"`);
		await queryRunner.query(`ALTER TABLE "event" DROP COLUMN "id_categoria"`);
		await queryRunner.query(`ALTER TABLE "event" DROP COLUMN "es_aprobado"`);
		await queryRunner.query(`ALTER TABLE "event" DROP COLUMN "medio_contacto"`);
		await queryRunner.query(`ALTER TABLE "plan" ADD "id_actividad" integer`);
		await queryRunner.query(
			`ALTER TABLE "plan" ADD CONSTRAINT "UQ_8571b60e98a56b1748c504b5d22" UNIQUE ("id_actividad")`,
		);
		await queryRunner.query(`ALTER TABLE "event" ADD "id_actividad" integer`);
		await queryRunner.query(
			`ALTER TABLE "event" ADD CONSTRAINT "UQ_83df56334180c296ed425545bc7" UNIQUE ("id_actividad")`,
		);
		await queryRunner.query(
			`ALTER TABLE "plan" ADD CONSTRAINT "FK_8571b60e98a56b1748c504b5d22" FOREIGN KEY ("id_actividad") REFERENCES "activity"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
		);
		await queryRunner.query(
			`ALTER TABLE "event" ADD CONSTRAINT "FK_83df56334180c296ed425545bc7" FOREIGN KEY ("id_actividad") REFERENCES "activity"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
		);
		await queryRunner.query(
			`ALTER TABLE "activity" ADD CONSTRAINT "FK_8f6516fc5d063a0378252c784d4" FOREIGN KEY ("id_categoria") REFERENCES "category"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
		);
		await queryRunner.query(
			`ALTER TABLE "activity" ADD CONSTRAINT "FK_12c101cb84aae626b8f4cd30f5b" FOREIGN KEY ("eventId") REFERENCES "event"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
		);
		await queryRunner.query(
			`ALTER TABLE "activity" ADD CONSTRAINT "FK_ccab3cfce9d3f1f834a3494b271" FOREIGN KEY ("planId") REFERENCES "plan"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
		);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(
			`ALTER TABLE "activity" DROP CONSTRAINT "FK_ccab3cfce9d3f1f834a3494b271"`,
		);
		await queryRunner.query(
			`ALTER TABLE "activity" DROP CONSTRAINT "FK_12c101cb84aae626b8f4cd30f5b"`,
		);
		await queryRunner.query(
			`ALTER TABLE "activity" DROP CONSTRAINT "FK_8f6516fc5d063a0378252c784d4"`,
		);
		await queryRunner.query(
			`ALTER TABLE "event" DROP CONSTRAINT "FK_83df56334180c296ed425545bc7"`,
		);
		await queryRunner.query(
			`ALTER TABLE "plan" DROP CONSTRAINT "FK_8571b60e98a56b1748c504b5d22"`,
		);
		await queryRunner.query(
			`ALTER TABLE "event" DROP CONSTRAINT "UQ_83df56334180c296ed425545bc7"`,
		);
		await queryRunner.query(`ALTER TABLE "event" DROP COLUMN "id_actividad"`);
		await queryRunner.query(
			`ALTER TABLE "plan" DROP CONSTRAINT "UQ_8571b60e98a56b1748c504b5d22"`,
		);
		await queryRunner.query(`ALTER TABLE "plan" DROP COLUMN "id_actividad"`);
		await queryRunner.query(
			`ALTER TABLE "event" ADD "medio_contacto" character varying(200) NOT NULL`,
		);
		await queryRunner.query(
			`ALTER TABLE "event" ADD "es_aprobado" boolean NOT NULL DEFAULT false`,
		);
		await queryRunner.query(
			`ALTER TABLE "event" ADD "id_categoria" integer NOT NULL`,
		);
		await queryRunner.query(
			`ALTER TABLE "event" ADD "es_privada" boolean NOT NULL DEFAULT false`,
		);
		await queryRunner.query(
			`ALTER TABLE "event" ADD "restriccion_edad" boolean NOT NULL DEFAULT false`,
		);
		await queryRunner.query(
			`ALTER TABLE "event" ADD "descripcion" character varying(200) NOT NULL`,
		);
		await queryRunner.query(
			`ALTER TABLE "event" ADD "rango_precio" character varying(30) NOT NULL`,
		);
		await queryRunner.query(
			`ALTER TABLE "event" ADD "ubicacion" character varying(200) NOT NULL`,
		);
		await queryRunner.query(
			`ALTER TABLE "event" ADD "titulo_actividad" character varying(200) NOT NULL`,
		);
		await queryRunner.query(
			`ALTER TABLE "plan" ADD "medio_contacto" character varying(200) NOT NULL`,
		);
		await queryRunner.query(
			`ALTER TABLE "plan" ADD "es_aprobado" boolean NOT NULL DEFAULT false`,
		);
		await queryRunner.query(
			`ALTER TABLE "plan" ADD "id_categoria" integer NOT NULL`,
		);
		await queryRunner.query(
			`ALTER TABLE "plan" ADD "es_privada" boolean NOT NULL DEFAULT false`,
		);
		await queryRunner.query(
			`ALTER TABLE "plan" ADD "restriccion_edad" boolean NOT NULL DEFAULT false`,
		);
		await queryRunner.query(
			`ALTER TABLE "plan" ADD "descripcion" character varying(200) NOT NULL`,
		);
		await queryRunner.query(
			`ALTER TABLE "plan" ADD "rango_precio" character varying(30) NOT NULL`,
		);
		await queryRunner.query(
			`ALTER TABLE "plan" ADD "ubicacion" character varying(200) NOT NULL`,
		);
		await queryRunner.query(
			`ALTER TABLE "plan" ADD "titulo_actividad" character varying(200) NOT NULL`,
		);
		await queryRunner.query(`DROP TABLE "activity"`);
		await queryRunner.query(
			`ALTER TABLE "event" ADD CONSTRAINT "FK_3a25760b6ef85d1973120e00d52" FOREIGN KEY ("id_categoria") REFERENCES "category"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
		);
		await queryRunner.query(
			`ALTER TABLE "plan" ADD CONSTRAINT "FK_e1b47f4ecb9fe568f6f1a22e056" FOREIGN KEY ("id_categoria") REFERENCES "category"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
		);
	}
}
