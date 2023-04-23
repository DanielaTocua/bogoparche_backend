import { MigrationInterface, QueryRunner } from "typeorm";

export class CategoryIdForeignKey21682278156181 implements MigrationInterface {
	name = "CategoryIdForeignKey21682278156181";

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(
			`ALTER TABLE "plan" DROP CONSTRAINT "FK_19adf39605072fee0273d675f0d"`,
		);
		await queryRunner.query(
			`ALTER TABLE "event" DROP CONSTRAINT "FK_beb9f7fe2605bc6ff3fcc5e0a58"`,
		);
		await queryRunner.query(
			`ALTER TABLE "plan" RENAME COLUMN "idCategoriaId" TO "id_categoria"`,
		);
		await queryRunner.query(
			`ALTER TABLE "event" RENAME COLUMN "idCategoriaId" TO "id_categoria"`,
		);
		await queryRunner.query(
			`ALTER TABLE "plan" ADD CONSTRAINT "FK_e1b47f4ecb9fe568f6f1a22e056" FOREIGN KEY ("id_categoria") REFERENCES "category"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
		);
		await queryRunner.query(
			`ALTER TABLE "event" ADD CONSTRAINT "FK_3a25760b6ef85d1973120e00d52" FOREIGN KEY ("id_categoria") REFERENCES "category"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
		);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(
			`ALTER TABLE "event" DROP CONSTRAINT "FK_3a25760b6ef85d1973120e00d52"`,
		);
		await queryRunner.query(
			`ALTER TABLE "plan" DROP CONSTRAINT "FK_e1b47f4ecb9fe568f6f1a22e056"`,
		);
		await queryRunner.query(
			`ALTER TABLE "event" RENAME COLUMN "id_categoria" TO "idCategoriaId"`,
		);
		await queryRunner.query(
			`ALTER TABLE "plan" RENAME COLUMN "id_categoria" TO "idCategoriaId"`,
		);
		await queryRunner.query(
			`ALTER TABLE "event" ADD CONSTRAINT "FK_beb9f7fe2605bc6ff3fcc5e0a58" FOREIGN KEY ("idCategoriaId") REFERENCES "category"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
		);
		await queryRunner.query(
			`ALTER TABLE "plan" ADD CONSTRAINT "FK_19adf39605072fee0273d675f0d" FOREIGN KEY ("idCategoriaId") REFERENCES "category"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
		);
	}
}
