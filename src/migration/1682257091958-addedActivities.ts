import { MigrationInterface, QueryRunner } from "typeorm";

export class AddedActivities1682257091958 implements MigrationInterface {
    name = 'AddedActivities1682257091958'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "event" ("id" SERIAL NOT NULL, "titulo_actividad" character varying(200) NOT NULL, "ubicacion" character varying(200) NOT NULL, "rango_precio" character varying(30) NOT NULL, "description" character varying(200) NOT NULL, "restriccion_edad" boolean NOT NULL DEFAULT false, "medio_contacto" boolean NOT NULL DEFAULT false, "es_privada" boolean NOT NULL DEFAULT false, "id_categoria" integer NOT NULL, "es_aprobado" boolean NOT NULL DEFAULT false, "fecha_inicio" TIMESTAMP NOT NULL, "fecha_fin" TIMESTAMP NOT NULL, "hora_inicio" TIMESTAMP NOT NULL, "hora_fin" TIMESTAMP NOT NULL, CONSTRAINT "PK_30c2f3bbaf6d34a55f8ae6e4614" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "plan" ("id" SERIAL NOT NULL, "titulo_actividad" character varying(200) NOT NULL, "ubicacion" character varying(200) NOT NULL, "rango_precio" character varying(30) NOT NULL, "description" character varying(200) NOT NULL, "restriccion_edad" boolean NOT NULL DEFAULT false, "medio_contacto" boolean NOT NULL DEFAULT false, "es_privada" boolean NOT NULL DEFAULT false, "id_categoria" integer NOT NULL, "es_aprobado" boolean NOT NULL DEFAULT false, "horario_plan" character varying(100) NOT NULL, CONSTRAINT "PK_54a2b686aed3b637654bf7ddbb3" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "bgp_user" ("id" SERIAL NOT NULL, "username" character varying(200) NOT NULL, "email" character varying(200) NOT NULL, "password" character varying(200) NOT NULL, "isAdmin" boolean NOT NULL DEFAULT false, CONSTRAINT "UQ_1175168a9ece796c9c779ec6f29" UNIQUE ("username"), CONSTRAINT "UQ_559a9558f05d77f9a855baaddfe" UNIQUE ("email"), CONSTRAINT "PK_3424cddedfa8f005d9886e53924" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "bgp_user"`);
        await queryRunner.query(`DROP TABLE "plan"`);
        await queryRunner.query(`DROP TABLE "event"`);
    }

}
