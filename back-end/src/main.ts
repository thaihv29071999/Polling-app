import { HttpAdapterHost, NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { TransformationInterceptor } from './interceptor/transformation.interceptor';
import { ValidationPipe } from '@nestjs/common';
import { ErrorExceptionFilter } from './common/exceptions';
import { JwtAuthGuard } from './auth/auth.guard';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  const reflector = app.get(Reflector);
  const httpAdapter = app.get(HttpAdapterHost);
  app.useGlobalFilters(new ErrorExceptionFilter(httpAdapter));
  app.useGlobalInterceptors(new TransformationInterceptor(reflector));
  app.useGlobalGuards(new JwtAuthGuard(reflector));
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(Number(process.env.PORT)).then((what) => {
    console.log(what._connectionKey);
  });
}
bootstrap();
