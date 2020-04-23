import {
  MigrationInterface,
  QueryRunner,
} from 'typeorm';

export class UserTabeleRefactoring1587675473839 implements MigrationInterface {
  name = 'UserTabeleRefactoring1587675473839'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('ALTER TABLE "users" DROP COLUMN "isActive"', undefined);
    await queryRunner.query('ALTER TABLE "users" DROP COLUMN "resetPasswordToken"', undefined);
    await queryRunner.query('ALTER TABLE "users" DROP COLUMN "resetPasswordTokenExpire"', undefined);
    await queryRunner.query('ALTER TABLE "users" DROP COLUMN "requestEmailChangeToken"', undefined);
    await queryRunner.query('ALTER TABLE "users" DROP COLUMN "requestEmailChangeTokenExpire"', undefined);
    await queryRunner.query('ALTER TABLE "users" ADD "firstName" character varying', undefined);
    await queryRunner.query('ALTER TABLE "users" ADD "lastName" character varying', undefined);
    await queryRunner.query('CREATE TYPE "users_role_enum" AS ENUM(\'admin\', \'author\', \'user\')', undefined);
    await queryRunner.query('ALTER TABLE "users" ADD "role" "users_role_enum" NOT NULL DEFAULT \'user\'', undefined);
    await queryRunner.query('CREATE TYPE "users_status_enum" AS ENUM(\'active\', \'inactive\', \'pending\')', undefined);
    await queryRunner.query('ALTER TABLE "users" ADD "status" "users_status_enum" NOT NULL DEFAULT \'inactive\'', undefined);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('ALTER TABLE "users" DROP COLUMN "status"', undefined);
    await queryRunner.query('DROP TYPE "users_status_enum"', undefined);
    await queryRunner.query('ALTER TABLE "users" DROP COLUMN "role"', undefined);
    await queryRunner.query('DROP TYPE "users_role_enum"', undefined);
    await queryRunner.query('ALTER TABLE "users" DROP COLUMN "lastName"', undefined);
    await queryRunner.query('ALTER TABLE "users" DROP COLUMN "firstName"', undefined);
    await queryRunner.query('ALTER TABLE "users" ADD "requestEmailChangeTokenExpire" TIMESTAMP WITH TIME ZONE', undefined);
    await queryRunner.query('ALTER TABLE "users" ADD "requestEmailChangeToken" character varying', undefined);
    await queryRunner.query('ALTER TABLE "users" ADD "resetPasswordTokenExpire" TIMESTAMP WITH TIME ZONE', undefined);
    await queryRunner.query('ALTER TABLE "users" ADD "resetPasswordToken" character varying', undefined);
    await queryRunner.query('ALTER TABLE "users" ADD "isActive" boolean NOT NULL DEFAULT false', undefined);
  }
}
