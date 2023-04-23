import { MigrationInterface, QueryRunner } from "typeorm";

export class CategoryIdForeignKey1682277506553 implements MigrationInterface {
	name = "CategoryIdForeignKey1682277506553";

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(
			`ALTER TABLE "event" RENAME COLUMN "id_categoria" TO "idCategoriaId"`,
		);
		await queryRunner.query(
			`ALTER TABLE "plan" RENAME COLUMN "id_categoria" TO "idCategoriaId"`,
		);
		await queryRunner.query(
			`ALTER TABLE "event" ALTER COLUMN "idCategoriaId" DROP NOT NULL`,
		);
		await queryRunner.query(
			`ALTER TABLE "plan" ALTER COLUMN "idCategoriaId" DROP NOT NULL`,
		);
		await queryRunner.query(
			`ALTER TABLE "event" ADD CONSTRAINT "FK_beb9f7fe2605bc6ff3fcc5e0a58" FOREIGN KEY ("idCategoriaId") REFERENCES "category"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
		);
		await queryRunner.query(
			`ALTER TABLE "plan" ADD CONSTRAINT "FK_19adf39605072fee0273d675f0d" FOREIGN KEY ("idCategoriaId") REFERENCES "category"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
		);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(
			`ALTER TABLE "plan" DROP CONSTRAINT "FK_19adf39605072fee0273d675f0d"`,
		);
		await queryRunner.query(
			`ALTER TABLE "event" DROP CONSTRAINT "FK_beb9f7fe2605bc6ff3fcc5e0a58"`,
		);
		await queryRunner.query(
			`ALTER TABLE "plan" ALTER COLUMN "idCategoriaId" SET NOT NULL`,
		);
		await queryRunner.query(
			`ALTER TABLE "event" ALTER COLUMN "idCategoriaId" SET NOT NULL`,
		);
		await queryRunner.query(
			`ALTER TABLE "plan" RENAME COLUMN "idCategoriaId" TO "id_categoria"`,
		);
		await queryRunner.query(
			`ALTER TABLE "event" RENAME COLUMN "idCategoriaId" TO "id_categoria"`,
		);
	}
}
