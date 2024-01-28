import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { map, Observable } from 'rxjs';
import { ResponseMessageKey } from '../decorators/response.decorator';

export interface Response<T> {
  data: T;
}

@Injectable()
export class TransformationInterceptor<T>
  implements NestInterceptor<T, Response<T>>
{
  constructor(private reflector: Reflector) {}
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<Response<T>> {
    const responseMessage =
      this.reflector.get<string>(ResponseMessageKey, context.getHandler()) ??
      '';
    return next.handle().pipe(
      map((data) => ({
        statusCode: [201, 200].includes(
          context.switchToHttp().getResponse().statusCode,
        )
          ? 200
          : [400].includes(context.switchToHttp().getResponse().statusCode)
          ? 400
          : 500,
        message: responseMessage,
        data,
      })),
    );
  }
}
