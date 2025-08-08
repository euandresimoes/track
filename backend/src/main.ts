import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import morgan from 'morgan';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Cors config
  app.enableCors({
    origin: 'http://localhost:8080',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
  });

  // Swagger config
  const config = new DocumentBuilder()
    .setTitle('Track API')
    .setDescription('The Track API description')
    .setVersion('1.0')
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        name: 'Authorization',
        in: 'header',
      },
      'access-token',
    )
    .addTag('track')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  // Morgan config
  app.use(morgan('dev'));

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
