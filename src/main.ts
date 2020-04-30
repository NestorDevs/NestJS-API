import 'dotenv/config';
import {
  NestFactory,
} from '@nestjs/core';
import {
  DocumentBuilder,
  SwaggerModule,
} from '@nestjs/swagger';
import { AppModule } from './app.module';
// import { AllExceptionsFilter } from './filters/all-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api/v1');
  // app.useGlobalFilters(new AllExceptionsFilter());

  const options = new DocumentBuilder()
    .setContact('Łukasz Skowroń', 'https://egocentryk.pl', 'kontakt@egocentryk.pl')
    .setTitle('NestJS API / PostgreSQL / TypeORM')
    .setDescription('API description')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, options);

  SwaggerModule.setup('api/docs', app, document);

  await app.listen(3000);
}
bootstrap();
