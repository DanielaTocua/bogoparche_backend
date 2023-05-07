import { MigrationInterface, QueryRunner } from "typeorm";

export class AlterPrimaryKeyEventPlan1683469132901
	implements MigrationInterface
{
	name = "AlterPrimaryKeyEventPlan1683469132901";

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(
			`ALTER TABLE "plan" DROP CONSTRAINT "FK_8571b60e98a56b1748c504b5d22"`,
		);
		await queryRunner.query(
			`ALTER TABLE "event" DROP CONSTRAINT "FK_83df56334180c296ed425545bc7"`,
		);
		await queryRunner.query(
			`ALTER TABLE "plan" DROP CONSTRAINT "UQ_8571b60e98a56b1748c504b5d22"`,
		);
		await queryRunner.query(`ALTER TABLE "plan" DROP COLUMN "id_actividad"`);
		await queryRunner.query(
			`ALTER TABLE "event" DROP CONSTRAINT "UQ_83df56334180c296ed425545bc7"`,
		);
		await queryRunner.query(`ALTER TABLE "event" DROP COLUMN "id_actividad"`);
		await queryRunner.query(
			`ALTER TABLE "commentPlan" DROP CONSTRAINT "FK_4e8704272ef7bc88d3421a733cf"`,
		);
		await queryRunner.query(
			`ALTER TABLE "activity" DROP CONSTRAINT "FK_ccab3cfce9d3f1f834a3494b271"`,
		);
		await queryRunner.query(
			`ALTER TABLE "plan" ALTER COLUMN "id" DROP DEFAULT`,
		);
		await queryRunner.query(`DROP SEQUENCE "plan_id_seq"`);
		await queryRunner.query(
			`ALTER TABLE "commentEvent" DROP CONSTRAINT "FK_57f7258a521af61f868cd7a89b0"`,
		);
		await queryRunner.query(
			`ALTER TABLE "activity" DROP CONSTRAINT "FK_12c101cb84aae626b8f4cd30f5b"`,
		);
		await queryRunner.query(
			`ALTER TABLE "event" ALTER COLUMN "id" DROP DEFAULT`,
		);
		await queryRunner.query(`DROP SEQUENCE "event_id_seq"`);
		await queryRunner.query(
			`ALTER TABLE "plan" ADD CONSTRAINT "FK_54a2b686aed3b637654bf7ddbb3" FOREIGN KEY ("id") REFERENCES "activity"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
		);
		await queryRunner.query(
			`ALTER TABLE "event" ADD CONSTRAINT "FK_30c2f3bbaf6d34a55f8ae6e4614" FOREIGN KEY ("id") REFERENCES "activity"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
		);
		await queryRunner.query(
			`ALTER TABLE "activity" ADD CONSTRAINT "FK_12c101cb84aae626b8f4cd30f5b" FOREIGN KEY ("eventId") REFERENCES "event"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
		);
		await queryRunner.query(
			`ALTER TABLE "activity" ADD CONSTRAINT "FK_ccab3cfce9d3f1f834a3494b271" FOREIGN KEY ("planId") REFERENCES "plan"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
		);
		await queryRunner.query(
			`ALTER TABLE "commentEvent" ADD CONSTRAINT "FK_57f7258a521af61f868cd7a89b0" FOREIGN KEY ("id_actividad") REFERENCES "event"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
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
			`ALTER TABLE "commentEvent" DROP CONSTRAINT "FK_57f7258a521af61f868cd7a89b0"`,
		);
		await queryRunner.query(
			`ALTER TABLE "activity" DROP CONSTRAINT "FK_ccab3cfce9d3f1f834a3494b271"`,
		);
		await queryRunner.query(
			`ALTER TABLE "activity" DROP CONSTRAINT "FK_12c101cb84aae626b8f4cd30f5b"`,
		);
		await queryRunner.query(
			`ALTER TABLE "event" DROP CONSTRAINT "FK_30c2f3bbaf6d34a55f8ae6e4614"`,
		);
		await queryRunner.query(
			`ALTER TABLE "plan" DROP CONSTRAINT "FK_54a2b686aed3b637654bf7ddbb3"`,
		);
		await queryRunner.query(
			`CREATE SEQUENCE IF NOT EXISTS "event_id_seq" OWNED BY "event"."id"`,
		);
		await queryRunner.query(
			`ALTER TABLE "event" ALTER COLUMN "id" SET DEFAULT nextval('"event_id_seq"')`,
		);
		await queryRunner.query(
			`ALTER TABLE "activity" ADD CONSTRAINT "FK_12c101cb84aae626b8f4cd30f5b" FOREIGN KEY ("eventId") REFERENCES "event"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
		);
		await queryRunner.query(
			`ALTER TABLE "commentEvent" ADD CONSTRAINT "FK_57f7258a521af61f868cd7a89b0" FOREIGN KEY ("id_actividad") REFERENCES "event"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
		);
		await queryRunner.query(
			`CREATE SEQUENCE IF NOT EXISTS "plan_id_seq" OWNED BY "plan"."id"`,
		);
		await queryRunner.query(
			`ALTER TABLE "plan" ALTER COLUMN "id" SET DEFAULT nextval('"plan_id_seq"')`,
		);
		await queryRunner.query(
			`ALTER TABLE "activity" ADD CONSTRAINT "FK_ccab3cfce9d3f1f834a3494b271" FOREIGN KEY ("planId") REFERENCES "plan"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
		);
		await queryRunner.query(
			`ALTER TABLE "commentPlan" ADD CONSTRAINT "FK_4e8704272ef7bc88d3421a733cf" FOREIGN KEY ("id_actividad") REFERENCES "plan"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
		);
		await queryRunner.query(`ALTER TABLE "event" ADD "id_actividad" integer`);
		await queryRunner.query(
			`ALTER TABLE "event" ADD CONSTRAINT "UQ_83df56334180c296ed425545bc7" UNIQUE ("id_actividad")`,
		);
		await queryRunner.query(`ALTER TABLE "plan" ADD "id_actividad" integer`);
		await queryRunner.query(
			`ALTER TABLE "plan" ADD CONSTRAINT "UQ_8571b60e98a56b1748c504b5d22" UNIQUE ("id_actividad")`,
		);
		await queryRunner.query(
			`ALTER TABLE "event" ADD CONSTRAINT "FK_83df56334180c296ed425545bc7" FOREIGN KEY ("id_actividad") REFERENCES "activity"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
		);
		await queryRunner.query(
			`ALTER TABLE "plan" ADD CONSTRAINT "FK_8571b60e98a56b1748c504b5d22" FOREIGN KEY ("id_actividad") REFERENCES "activity"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
		);
	}
}
