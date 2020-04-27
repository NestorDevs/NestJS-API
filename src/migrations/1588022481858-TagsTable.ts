import {
  MigrationInterface,
  QueryRunner,
} from 'typeorm';

export class TagsTable1588022481858 implements MigrationInterface {
  name = 'TagsTable1588022481858'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('CREATE TABLE "tags" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "title" character varying NOT NULL, "slug" character varying NOT NULL, CONSTRAINT "PK_e7dc17249a1148a1970748eda99" PRIMARY KEY ("id"))', undefined);
    await queryRunner.query('CREATE TABLE "articles_tags_tags" ("articlesId" integer NOT NULL, "tagsId" integer NOT NULL, CONSTRAINT "PK_bee9492f5e2157b6dc27fd510bd" PRIMARY KEY ("articlesId", "tagsId"))', undefined);
    await queryRunner.query('CREATE INDEX "IDX_0adb8d108330d74e4a7f7d29de" ON "articles_tags_tags" ("articlesId") ', undefined);
    await queryRunner.query('CREATE INDEX "IDX_dcd523dc6473a35e6cb0cbf9f2" ON "articles_tags_tags" ("tagsId") ', undefined);
    await queryRunner.query('ALTER TABLE "articles_tags_tags" ADD CONSTRAINT "FK_0adb8d108330d74e4a7f7d29de2" FOREIGN KEY ("articlesId") REFERENCES "articles"("id") ON DELETE CASCADE ON UPDATE NO ACTION', undefined);
    await queryRunner.query('ALTER TABLE "articles_tags_tags" ADD CONSTRAINT "FK_dcd523dc6473a35e6cb0cbf9f2d" FOREIGN KEY ("tagsId") REFERENCES "tags"("id") ON DELETE CASCADE ON UPDATE NO ACTION', undefined);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('ALTER TABLE "articles_tags_tags" DROP CONSTRAINT "FK_dcd523dc6473a35e6cb0cbf9f2d"', undefined);
    await queryRunner.query('ALTER TABLE "articles_tags_tags" DROP CONSTRAINT "FK_0adb8d108330d74e4a7f7d29de2"', undefined);
    await queryRunner.query('DROP INDEX "IDX_dcd523dc6473a35e6cb0cbf9f2"', undefined);
    await queryRunner.query('DROP INDEX "IDX_0adb8d108330d74e4a7f7d29de"', undefined);
    await queryRunner.query('DROP TABLE "articles_tags_tags"', undefined);
    await queryRunner.query('DROP TABLE "tags"', undefined);
  }
}
