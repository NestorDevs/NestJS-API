import {
  MigrationInterface,
  QueryRunner,
} from 'typeorm';

export class TokensTable1589323145904 implements MigrationInterface {
  name = 'TokensTable1589323145904'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('CREATE TYPE "tokens_type_enum" AS ENUM(\'emailVerificationToken\', \'emailChangeToken\', \'passwordChangeToken\', \'passwordForgotToken\', \'passwordResetToken\')', undefined);
    await queryRunner.query('CREATE TABLE "tokens" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "token" character varying NOT NULL, "type" "tokens_type_enum", "validTo" TIMESTAMP NOT NULL, "userId" integer, CONSTRAINT "PK_3001e89ada36263dabf1fb6210a" PRIMARY KEY ("id"))', undefined);
    await queryRunner.query('ALTER TABLE "tokens" ADD CONSTRAINT "FK_d417e5d35f2434afc4bd48cb4d2" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION', undefined);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('ALTER TABLE "tokens" DROP CONSTRAINT "FK_d417e5d35f2434afc4bd48cb4d2"', undefined);
    await queryRunner.query('DROP TABLE "tokens"', undefined);
    await queryRunner.query('DROP TYPE "tokens_type_enum"', undefined);
  }
}
