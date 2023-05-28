import { MigrationInterface, QueryRunner } from "typeorm";

export class ImageLenFixed1685226014601 implements MigrationInterface {
    name = 'ImageLenFixed1685226014601'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "activity" DROP COLUMN "image"`);
        await queryRunner.query(`ALTER TABLE "activity" ADD "image" character varying(200) NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "activity" DROP COLUMN "image"`);
        await queryRunner.query(`ALTER TABLE "activity" ADD "image" character varying(100) NOT NULL`);
    }

}
