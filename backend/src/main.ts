import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import morgan from 'morgan';
import { apiReference } from '@scalar/nestjs-api-reference';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Cors config
  app.enableCors({
    origin: ['http://frontend:8080', 'http://localhost:8080'],
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

  // Scalar config
  app.use(
    '/reference',
    apiReference({
      content: document,
      theme: 'kepler',
    }),
  );

  // Morgan config
  app.use(morgan('dev'));

  await app.listen(process.env.PORT ?? 3000, () => {
    console.log(
      `\n- 🚀 Server ready at http://localhost:${process.env.PORT ?? 3000}`,
    );
    console.log(
      `- 📖 Documentation available at http://localhost:${process.env.PORT ?? 3000}/reference`,
    );
  });
}
bootstrap();


// black
// #171717
// text
// #c7c7c7
// border
// #ffffff08
// light text
// #eeeeee
// selection
// #ffffff18
// button
// #1f1f1f
// inactive text
// #8e8e8e