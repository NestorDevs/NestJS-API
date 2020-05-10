import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DatabaseConnectionService } from './database.service';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './components/auth/auth.module';
import { UserModule } from './components/user/user.module';
import { ArticleModule } from './components/article/article.module';
import { CommentModule } from './components/comment/comment.module';

@Module({
  controllers: [AppController],
  imports: [
    TypeOrmModule.forRootAsync({
      useClass: DatabaseConnectionService,
    }),
    ArticleModule,
    AuthModule,
    CommentModule,
    MulterModule.register({
      dest: './src/files',
    }),
    UserModule,
  ],
  providers: [AppService],
})
export class AppModule {}
