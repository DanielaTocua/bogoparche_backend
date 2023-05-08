import { MigrationInterface, QueryRunner } from "typeorm";

export class DropEsPlan1683557702123 implements MigrationInterface {
    name = 'DropEsPlan1683557702123'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "attendance" DROP COLUMN "es_plan"`);
        await queryRunner.query(`ALTER TABLE "favorite" DROP COLUMN "es_plan"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "favorite" ADD "es_plan" boolean NOT NULL`);
        await queryRunner.query(`ALTER TABLE "attendance" ADD "es_plan" boolean NOT NULL`);
    }

}
