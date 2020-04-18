import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';

@Module({
  controllers: [AppController],
  imports: [AuthModule],
  providers: [AppService],
})
export class AppModule {}
