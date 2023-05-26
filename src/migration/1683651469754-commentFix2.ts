import { MigrationInterface, QueryRunner } from "typeorm";

export class CommentFix21683651469754 implements MigrationInterface {
	name = "CommentFix21683651469754";

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(
			`ALTER TABLE "comment" DROP CONSTRAINT "FK_bd96247c802a52b93ae7842bbb7"`,
		);
		await queryRunner.query(
			`ALTER TABLE "comment" DROP CONSTRAINT "FK_60dc85715f6804d29af0ec381ff"`,
		);
		await queryRunner.query(
			`ALTER TABLE "comment" ALTER COLUMN "id_usuario" SET NOT NULL`,
		);
		await queryRunner.query(
			`ALTER TABLE "comment" ALTER COLUMN "id_actividad" SET NOT NULL`,
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
		await queryRunner.query(
			`ALTER TABLE "comment" ALTER COLUMN "id_actividad" DROP NOT NULL`,
		);
		await queryRunner.query(
			`ALTER TABLE "comment" ALTER COLUMN "id_usuario" DROP NOT NULL`,
		);
		await queryRunner.query(
			`ALTER TABLE "comment" ADD CONSTRAINT "FK_60dc85715f6804d29af0ec381ff" FOREIGN KEY ("id_actividad") REFERENCES "activity"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
		);
		await queryRunner.query(
			`ALTER TABLE "comment" ADD CONSTRAINT "FK_bd96247c802a52b93ae7842bbb7" FOREIGN KEY ("id_usuario") REFERENCES "bgp_user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
		);
	}
}
