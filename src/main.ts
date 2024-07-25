import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  dotenv.config();
  const app = await NestFactory.create(AppModule);
  const config = new DocumentBuilder()
    .setTitle('E-commerce Api')
    .setDescription('List APIs')
    .setVersion('1.0')
    .addTag('auth')
    .addTag('category')
    .addTag('color')
    .addTag('size')
    .addTag('tag')
    .addTag('user')
    .addTag('product')
    .addTag('order')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  await app.listen(4001);
}
bootstrap();
