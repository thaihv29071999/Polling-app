import {
  ArgumentsHost,
  BadRequestException,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Response } from 'express';
import { ObjectLiteral } from 'typeorm';
import { ERROR_CODE } from './ultis';
import { HttpAdapterHost } from '@nestjs/core';

export class ErrorException extends BadRequestException {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  constructor(code: HttpStatus, message: any) {
    super({ code, message });
  }
}
 
@Catch()
export class ErrorExceptionFilter implements ExceptionFilter {
  constructor(
    private readonly httpAdapterHost: HttpAdapterHost,
  ) {}

  catch(exception: unknown, host: ArgumentsHost) {
    const { httpAdapter } = this.httpAdapterHost;
    const ctx = host.switchToHttp();
    const httpStatus =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;
    const payload =
      exception instanceof HttpException
        ? (exception.getResponse() as ErrorOutput)
        : {
            code: ERROR_CODE.INTERNAL_SERVER_ERROR,
            message: 'Some thing went wrong!',
            debug: exception,
          };
    Logger.error(exception);
    console.log('exception: ', exception);
    httpAdapter.reply(ctx.getResponse<Response>(), payload, httpStatus);
  }
}

export class ErrorOutput {
  code: number;

  debug?: {
    message: string;
    details: ObjectLiteral;
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
}
