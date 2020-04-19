import {
  NestFactory,
} from '@nestjs/core';
import { AppModule } from './app.module';
import 'dotenv/config';
// import { AllExceptionsFilter } from './filters/all-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api/v1');
  // app.useGlobalFilters(new AllExceptionsFilter());
  await app.listen(3000);
}
bootstrap();
