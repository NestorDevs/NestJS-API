import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './components/auth/auth.module';
import { UserModule } from './components/user/user.module';
import { ArticleModule } from './components/article/article.module';
import { CommentModule } from './components/comment/comment.module';

@Module({
  controllers: [AppController],
  imports: [
    ArticleModule,
    AuthModule,
    CommentModule,
    UserModule,
  ],
  providers: [AppService],
})
export class AppModule {}
