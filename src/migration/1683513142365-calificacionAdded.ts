import { MigrationInterface, QueryRunner } from "typeorm";

export class CalificacionAdded1683513142365 implements MigrationInterface {
    name = 'CalificacionAdded1683513142365'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "commentEvent" ADD "calificacion" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "commentPlan" ADD "calificacion" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "favorite" ADD CONSTRAINT "FK_c3a5cd5ac934a3eec68ae483ce5" FOREIGN KEY ("id_actividad") REFERENCES "activity"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "favorite" DROP CONSTRAINT "FK_c3a5cd5ac934a3eec68ae483ce5"`);
        await queryRunner.query(`ALTER TABLE "commentPlan" DROP COLUMN "calificacion"`);
        await queryRunner.query(`ALTER TABLE "commentEvent" DROP COLUMN "calificacion"`);
    }

}
