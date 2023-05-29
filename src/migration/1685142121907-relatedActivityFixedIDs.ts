import { MigrationInterface, QueryRunner } from "typeorm";

export class RelatedActivityFixedIDs1685142121907
	implements MigrationInterface
{
	name = "RelatedActivityFixedIDs1685142121907";

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(
			`ALTER TABLE "relatedactivity" DROP CONSTRAINT "PK_a9cdd03b87984986d844ad575f9"`,
		);
		await queryRunner.query(`ALTER TABLE "relatedactivity" DROP COLUMN "id"`);
		await queryRunner.query(
			`ALTER TABLE "relatedactivity" ADD CONSTRAINT "PK_8ea3fcd1d5833235dd6faa69cbd" PRIMARY KEY ("id_actividad_privada", "id_actividad_publica")`,
		);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(
			`ALTER TABLE "relatedactivity" DROP CONSTRAINT "PK_8ea3fcd1d5833235dd6faa69cbd"`,
		);
		await queryRunner.query(
			`ALTER TABLE "relatedactivity" ADD "id" SERIAL NOT NULL`,
		);
		await queryRunner.query(
			`ALTER TABLE "relatedactivity" ADD CONSTRAINT "PK_a9cdd03b87984986d844ad575f9" PRIMARY KEY ("id")`,
		);
	}
}
