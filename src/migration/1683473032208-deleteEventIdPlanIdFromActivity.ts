import { MigrationInterface, QueryRunner } from "typeorm";

export class DeleteEventIdPlanIdFromActivity1683473032208 implements MigrationInterface {
    name = 'DeleteEventIdPlanIdFromActivity1683473032208'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "activity" DROP CONSTRAINT "FK_12c101cb84aae626b8f4cd30f5b"`);
        await queryRunner.query(`ALTER TABLE "activity" DROP CONSTRAINT "FK_ccab3cfce9d3f1f834a3494b271"`);
        await queryRunner.query(`ALTER TABLE "activity" DROP CONSTRAINT "REL_12c101cb84aae626b8f4cd30f5"`);
        await queryRunner.query(`ALTER TABLE "activity" DROP COLUMN "eventId"`);
        await queryRunner.query(`ALTER TABLE "activity" DROP CONSTRAINT "REL_ccab3cfce9d3f1f834a3494b27"`);
        await queryRunner.query(`ALTER TABLE "activity" DROP COLUMN "planId"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "activity" ADD "planId" integer`);
        await queryRunner.query(`ALTER TABLE "activity" ADD CONSTRAINT "REL_ccab3cfce9d3f1f834a3494b27" UNIQUE ("planId")`);
        await queryRunner.query(`ALTER TABLE "activity" ADD "eventId" integer`);
        await queryRunner.query(`ALTER TABLE "activity" ADD CONSTRAINT "REL_12c101cb84aae626b8f4cd30f5" UNIQUE ("eventId")`);
        await queryRunner.query(`ALTER TABLE "activity" ADD CONSTRAINT "FK_ccab3cfce9d3f1f834a3494b271" FOREIGN KEY ("planId") REFERENCES "plan"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "activity" ADD CONSTRAINT "FK_12c101cb84aae626b8f4cd30f5b" FOREIGN KEY ("eventId") REFERENCES "event"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
