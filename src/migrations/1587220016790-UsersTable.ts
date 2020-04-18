import {
  MigrationInterface,
  QueryRunner,
} from "typeorm";

export class UsersTable1587220016790 implements MigrationInterface {
  name = 'UsersTable1587220016790'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE TABLE "users" ("id" SERIAL NOT NULL, "username" character varying NOT NULL, "email" character varying NOT NULL, "isEmailVerified" boolean NOT NULL DEFAULT false, "password" character varying NOT NULL, "phoneNumber" character varying, "isActive" boolean NOT NULL DEFAULT false, "isBlocked" boolean NOT NULL DEFAULT false, "resetPasswordToken" character varying, "resetPasswordTokenExpire" TIMESTAMP WITH TIME ZONE, "requestEmailChangeToken" character varying, "requestEmailChangeTokenExpire" TIMESTAMP WITH TIME ZONE, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_fe0bb3f6520ee0469504521e710" UNIQUE ("username"), CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "UQ_1e3d0240b49c40521aaeb953293" UNIQUE ("phoneNumber"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`, undefined);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "users"`, undefined);
  }
}
