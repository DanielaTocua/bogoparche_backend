import { MigrationInterface, QueryRunner } from "typeorm";

export class UserIdAddedToActivity1684536624284 implements MigrationInterface {
	name = "UserIdAddedToActivity1684536624284";

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`ALTER TABLE "activity" ADD "id_usuario" integer`);
		await queryRunner.query(
			`ALTER TABLE "activity" ADD CONSTRAINT "FK_0bf33bb41206dbb0a08efc4ca08" FOREIGN KEY ("id_usuario") REFERENCES "bgp_user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
		);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(
			`ALTER TABLE "activity" DROP CONSTRAINT "FK_0bf33bb41206dbb0a08efc4ca08"`,
		);
		await queryRunner.query(`ALTER TABLE "activity" DROP COLUMN "id_usuario"`);
	}
}
