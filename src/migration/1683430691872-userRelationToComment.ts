import { MigrationInterface, QueryRunner } from "typeorm";

export class UserRelationToComment1683430691872 implements MigrationInterface {
	name = "UserRelationToComment1683430691872";

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(
			`ALTER TABLE "commentPlan" DROP CONSTRAINT "FK_4cfb19c321380b54c41ee9b77b1"`,
		);
		await queryRunner.query(
			`ALTER TABLE "commentPlan" DROP CONSTRAINT "FK_4e8704272ef7bc88d3421a733cf"`,
		);
		await queryRunner.query(
			`ALTER TABLE "commentPlan" ALTER COLUMN "id_usuario" SET NOT NULL`,
		);
		await queryRunner.query(
			`ALTER TABLE "commentPlan" ALTER COLUMN "id_actividad" SET NOT NULL`,
		);
		await queryRunner.query(
			`CREATE INDEX "IDX_1175168a9ece796c9c779ec6f2" ON "bgp_user" ("username") `,
		);
		await queryRunner.query(
			`CREATE INDEX "IDX_559a9558f05d77f9a855baaddf" ON "bgp_user" ("email") `,
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
			`DROP INDEX "public"."IDX_559a9558f05d77f9a855baaddf"`,
		);
		await queryRunner.query(
			`DROP INDEX "public"."IDX_1175168a9ece796c9c779ec6f2"`,
		);
		await queryRunner.query(
			`ALTER TABLE "commentPlan" ALTER COLUMN "id_actividad" DROP NOT NULL`,
		);
		await queryRunner.query(
			`ALTER TABLE "commentPlan" ALTER COLUMN "id_usuario" DROP NOT NULL`,
		);
		await queryRunner.query(
			`ALTER TABLE "commentPlan" ADD CONSTRAINT "FK_4e8704272ef7bc88d3421a733cf" FOREIGN KEY ("id_actividad") REFERENCES "plan"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
		);
		await queryRunner.query(
			`ALTER TABLE "commentPlan" ADD CONSTRAINT "FK_4cfb19c321380b54c41ee9b77b1" FOREIGN KEY ("id_usuario") REFERENCES "bgp_user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
		);
	}
}
