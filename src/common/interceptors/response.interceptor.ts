import {
  CallHandler,
  ExecutionContext,
  HttpStatus,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Response } from 'express';
import { map, Observable } from 'rxjs';
import { ApiResponse } from 'src/model/response.model';
import { MESSAGE_KEY } from '../decorators/message.decorator';

@Injectable()
export class ResponseInterceptor<T> implements NestInterceptor<
  ApiResponse<T>,
  any
> {
  constructor(private reflector: Reflector) {}

  intercept(
    context: ExecutionContext,
    next: CallHandler<ApiResponse<T>>,
  ): Observable<any> {
    const response = context.switchToHttp().getResponse<Response>();

    const customMessage = this.reflector.getAllAndOverride<string>(
      MESSAGE_KEY,
      [context.getHandler(), context.getClass()],
    );

    const message = customMessage || 'Success';

    return next.handle().pipe(
      map((res) => {
        if (res === undefined) return res;

        const isRedirect = [301, 302, 307, 308].includes(response.statusCode);
        if (isRedirect) return res;

        return {
          code: response.statusCode,
          status: HttpStatus[response.statusCode],
          message: res.message ? res.message : message,
          data: res.data,
          meta: res.meta,
        };
      }),
    );
  }
}
