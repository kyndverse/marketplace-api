import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Response } from 'express';

type ExeptionResponse =
  | string
  | {
      message?: string | string[];
      errors?: Record<string, string[]>;
    };

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    const status = exception.getStatus();
    const exceptionResponse = exception.getResponse() as ExeptionResponse;

    let errors: unknown;
    if (typeof exceptionResponse === 'string') {
      errors = exceptionResponse;
    } else if ('errors' in exceptionResponse) {
      errors = exceptionResponse.errors;
    } else {
      errors = exceptionResponse.message;
    }

    response.status(status).json({
      code: status,
      status: HttpStatus[status],
      errors,
    });
  }
}
