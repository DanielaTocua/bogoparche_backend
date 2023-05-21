import { MigrationInterface, QueryRunner } from "typeorm";

export class IdUsuarioFixedOnActivity1684707506530 implements MigrationInterface {
    name = 'IdUsuarioFixedOnActivity1684707506530'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "activity" DROP CONSTRAINT "FK_0bf33bb41206dbb0a08efc4ca08"`);
        await queryRunner.query(`ALTER TABLE "activity" ALTER COLUMN "id_usuario" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "activity" ADD CONSTRAINT "FK_0bf33bb41206dbb0a08efc4ca08" FOREIGN KEY ("id_usuario") REFERENCES "bgp_user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "activity" DROP CONSTRAINT "FK_0bf33bb41206dbb0a08efc4ca08"`);
        await queryRunner.query(`ALTER TABLE "activity" ALTER COLUMN "id_usuario" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "activity" ADD CONSTRAINT "FK_0bf33bb41206dbb0a08efc4ca08" FOREIGN KEY ("id_usuario") REFERENCES "bgp_user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
