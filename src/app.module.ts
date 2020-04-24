import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './components/auth/auth.module';
import { UserModule } from './components/user/user.module';

@Module({
  controllers: [AppController],
  imports: [
    AuthModule,
    UserModule,
  ],
  providers: [AppService],
})
export class AppModule {}
