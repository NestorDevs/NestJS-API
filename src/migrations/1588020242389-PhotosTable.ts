import {
  MigrationInterface,
  QueryRunner,
} from 'typeorm';

export class PhotosTable1588020242389 implements MigrationInterface {
  name = 'PhotosTable1588020242389'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('CREATE TABLE "photos" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "title" character varying NOT NULL, "filename" character varying NOT NULL, "authorId" integer, "articleId" integer, CONSTRAINT "PK_5220c45b8e32d49d767b9b3d725" PRIMARY KEY ("id"))', undefined);
    await queryRunner.query('ALTER TABLE "photos" ADD CONSTRAINT "FK_47b931c02dee822d03130697cf3" FOREIGN KEY ("authorId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION', undefined);
    await queryRunner.query('ALTER TABLE "photos" ADD CONSTRAINT "FK_f91bff6c49e43f9e4a5f6401c50" FOREIGN KEY ("articleId") REFERENCES "articles"("id") ON DELETE NO ACTION ON UPDATE NO ACTION', undefined);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('ALTER TABLE "photos" DROP CONSTRAINT "FK_f91bff6c49e43f9e4a5f6401c50"', undefined);
    await queryRunner.query('ALTER TABLE "photos" DROP CONSTRAINT "FK_47b931c02dee822d03130697cf3"', undefined);
    await queryRunner.query('DROP TABLE "photos"', undefined);
  }
}
