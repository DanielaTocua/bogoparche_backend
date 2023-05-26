import { MigrationInterface, QueryRunner } from "typeorm";

export class AddedCascadeFavAttendance1683602955543
	implements MigrationInterface
{
	name = "AddedCascadeFavAttendance1683602955543";

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(
			`ALTER TABLE "attendance" DROP CONSTRAINT "FK_a9e61c8b999abf376e1a9cb4770"`,
		);
		await queryRunner.query(
			`ALTER TABLE "favorite" DROP CONSTRAINT "FK_79e8391e2c4a04596532c59578d"`,
		);
		await queryRunner.query(
			`ALTER TABLE "attendance" ADD CONSTRAINT "FK_a9e61c8b999abf376e1a9cb4770" FOREIGN KEY ("id_usuario") REFERENCES "bgp_user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
		);
		await queryRunner.query(
			`ALTER TABLE "favorite" ADD CONSTRAINT "FK_79e8391e2c4a04596532c59578d" FOREIGN KEY ("id_usuario") REFERENCES "bgp_user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
		);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(
			`ALTER TABLE "favorite" DROP CONSTRAINT "FK_79e8391e2c4a04596532c59578d"`,
		);
		await queryRunner.query(
			`ALTER TABLE "attendance" DROP CONSTRAINT "FK_a9e61c8b999abf376e1a9cb4770"`,
		);
		await queryRunner.query(
			`ALTER TABLE "favorite" ADD CONSTRAINT "FK_79e8391e2c4a04596532c59578d" FOREIGN KEY ("id_usuario") REFERENCES "bgp_user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
		);
		await queryRunner.query(
			`ALTER TABLE "attendance" ADD CONSTRAINT "FK_a9e61c8b999abf376e1a9cb4770" FOREIGN KEY ("id_usuario") REFERENCES "bgp_user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
		);
	}
}
