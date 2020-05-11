import {
  MigrationInterface,
  QueryRunner,
} from 'typeorm';

export class ProductsTable1589230250560 implements MigrationInterface {
  name = 'ProductsTable1589230250560'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('CREATE TABLE "products" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "title" character varying NOT NULL, "slug" character varying NOT NULL, "content" character varying, "authorId" integer, CONSTRAINT "UQ_464f927ae360106b783ed0b4106" UNIQUE ("slug"), CONSTRAINT "PK_0806c755e0aca124e67c0cf6d7d" PRIMARY KEY ("id"))', undefined);
    await queryRunner.query('CREATE TABLE "products_tags_tags" ("productsId" integer NOT NULL, "tagsId" integer NOT NULL, CONSTRAINT "PK_b06c7e3d7d74a176b4d936bcd73" PRIMARY KEY ("productsId", "tagsId"))', undefined);
    await queryRunner.query('CREATE INDEX "IDX_88687975db5205fdbdb10969fc" ON "products_tags_tags" ("productsId") ', undefined);
    await queryRunner.query('CREATE INDEX "IDX_72fa6ba0f176a89a2e9d90274c" ON "products_tags_tags" ("tagsId") ', undefined);
    await queryRunner.query('ALTER TABLE "products" ADD CONSTRAINT "FK_76ec85a3cf5734a18f3fecda246" FOREIGN KEY ("authorId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION', undefined);
    await queryRunner.query('ALTER TABLE "products_tags_tags" ADD CONSTRAINT "FK_88687975db5205fdbdb10969fc4" FOREIGN KEY ("productsId") REFERENCES "products"("id") ON DELETE CASCADE ON UPDATE NO ACTION', undefined);
    await queryRunner.query('ALTER TABLE "products_tags_tags" ADD CONSTRAINT "FK_72fa6ba0f176a89a2e9d90274c5" FOREIGN KEY ("tagsId") REFERENCES "tags"("id") ON DELETE CASCADE ON UPDATE NO ACTION', undefined);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('ALTER TABLE "products_tags_tags" DROP CONSTRAINT "FK_72fa6ba0f176a89a2e9d90274c5"', undefined);
    await queryRunner.query('ALTER TABLE "products_tags_tags" DROP CONSTRAINT "FK_88687975db5205fdbdb10969fc4"', undefined);
    await queryRunner.query('ALTER TABLE "products" DROP CONSTRAINT "FK_76ec85a3cf5734a18f3fecda246"', undefined);
    await queryRunner.query('DROP INDEX "IDX_72fa6ba0f176a89a2e9d90274c"', undefined);
    await queryRunner.query('DROP INDEX "IDX_88687975db5205fdbdb10969fc"', undefined);
    await queryRunner.query('DROP TABLE "products_tags_tags"', undefined);
    await queryRunner.query('DROP TABLE "products"', undefined);
  }
}
