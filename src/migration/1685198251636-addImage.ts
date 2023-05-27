import { MigrationInterface, QueryRunner } from "typeorm";

export class AddImage1685198251636 implements MigrationInterface {
    name = 'AddImage1685198251636'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "activity" ADD "image" character varying(100) NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "activity" DROP COLUMN "image"`);
    }

}
