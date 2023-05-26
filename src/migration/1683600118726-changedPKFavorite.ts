import { MigrationInterface, QueryRunner } from "typeorm";

export class ChangedPKFavorite1683600118726 implements MigrationInterface {
	name = "ChangedPKFavorite1683600118726";

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(
			`ALTER TABLE "attendance" DROP CONSTRAINT "PK_ee0ffe42c1f1a01e72b725c0cb2"`,
		);
		await queryRunner.query(`ALTER TABLE "attendance" DROP COLUMN "id"`);
		await queryRunner.query(
			`ALTER TABLE "favorite" DROP CONSTRAINT "PK_495675cec4fb09666704e4f610f"`,
		);
		await queryRunner.query(`ALTER TABLE "favorite" DROP COLUMN "id"`);
		await queryRunner.query(
			`ALTER TABLE "attendance" ADD CONSTRAINT "PK_e721dd07cdd5e67a16d898d630b" PRIMARY KEY ("id_usuario", "id_actividad")`,
		);
		await queryRunner.query(
			`ALTER TABLE "favorite" ADD CONSTRAINT "PK_720d2412060c9e99cdd48adf89e" PRIMARY KEY ("id_usuario", "id_actividad")`,
		);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(
			`ALTER TABLE "favorite" DROP CONSTRAINT "PK_720d2412060c9e99cdd48adf89e"`,
		);
		await queryRunner.query(
			`ALTER TABLE "attendance" DROP CONSTRAINT "PK_e721dd07cdd5e67a16d898d630b"`,
		);
		await queryRunner.query(`ALTER TABLE "favorite" ADD "id" SERIAL NOT NULL`);
		await queryRunner.query(
			`ALTER TABLE "favorite" ADD CONSTRAINT "PK_495675cec4fb09666704e4f610f" PRIMARY KEY ("id")`,
		);
		await queryRunner.query(
			`ALTER TABLE "attendance" ADD "id" SERIAL NOT NULL`,
		);
		await queryRunner.query(
			`ALTER TABLE "attendance" ADD CONSTRAINT "PK_ee0ffe42c1f1a01e72b725c0cb2" PRIMARY KEY ("id")`,
		);
	}
}
