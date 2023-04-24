import { MigrationInterface, QueryRunner } from "typeorm";

export class Deletetimestamp1682307217710 implements MigrationInterface {
    name = 'Deletetimestamp1682307217710'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "favorite" DROP COLUMN "createdAt"`);
        await queryRunner.query(`ALTER TABLE "event" DROP CONSTRAINT "FK_3a25760b6ef85d1973120e00d52"`);
        await queryRunner.query(`ALTER TABLE "event" ALTER COLUMN "id_categoria" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "plan" DROP CONSTRAINT "FK_e1b47f4ecb9fe568f6f1a22e056"`);
        await queryRunner.query(`ALTER TABLE "plan" ALTER COLUMN "id_categoria" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "favorite" DROP CONSTRAINT "FK_79e8391e2c4a04596532c59578d"`);
        await queryRunner.query(`ALTER TABLE "favorite" ALTER COLUMN "id_usuario" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "event" ADD CONSTRAINT "FK_3a25760b6ef85d1973120e00d52" FOREIGN KEY ("id_categoria") REFERENCES "category"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "plan" ADD CONSTRAINT "FK_e1b47f4ecb9fe568f6f1a22e056" FOREIGN KEY ("id_categoria") REFERENCES "category"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "favorite" ADD CONSTRAINT "FK_79e8391e2c4a04596532c59578d" FOREIGN KEY ("id_usuario") REFERENCES "bgp_user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "favorite" DROP CONSTRAINT "FK_79e8391e2c4a04596532c59578d"`);
        await queryRunner.query(`ALTER TABLE "plan" DROP CONSTRAINT "FK_e1b47f4ecb9fe568f6f1a22e056"`);
        await queryRunner.query(`ALTER TABLE "event" DROP CONSTRAINT "FK_3a25760b6ef85d1973120e00d52"`);
        await queryRunner.query(`ALTER TABLE "favorite" ALTER COLUMN "id_usuario" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "favorite" ADD CONSTRAINT "FK_79e8391e2c4a04596532c59578d" FOREIGN KEY ("id_usuario") REFERENCES "bgp_user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "plan" ALTER COLUMN "id_categoria" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "plan" ADD CONSTRAINT "FK_e1b47f4ecb9fe568f6f1a22e056" FOREIGN KEY ("id_categoria") REFERENCES "category"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "event" ALTER COLUMN "id_categoria" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "event" ADD CONSTRAINT "FK_3a25760b6ef85d1973120e00d52" FOREIGN KEY ("id_categoria") REFERENCES "category"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "favorite" ADD "createdAt" TIMESTAMP NOT NULL DEFAULT now()`);
    }

}
