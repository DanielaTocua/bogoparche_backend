import { MigrationInterface, QueryRunner } from "typeorm";

export class CommentCreatedAtFixed1684687508868 implements MigrationInterface {
	name = "CommentCreatedAtFixed1684687508868";

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(
			`ALTER TABLE "comment" RENAME COLUMN "createdAt" TO "created_at"`,
		);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(
			`ALTER TABLE "comment" RENAME COLUMN "created_at" TO "createdAt"`,
		);
	}
}
