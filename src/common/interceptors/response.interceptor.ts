import {
  CallHandler,
  ExecutionContext,
  HttpStatus,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Response } from 'express';
import { map, Observable } from 'rxjs';
import { ApiResponse } from 'src/model/response.model';

@Injectable()
export class ResponseInterceptor<T> implements NestInterceptor<
  ApiResponse<T>,
  any
> {
  intercept(
    context: ExecutionContext,
    next: CallHandler<ApiResponse<T>>,
  ): Observable<any> {
    const response = context.switchToHttp().getResponse<Response>();
    return next.handle().pipe(
      map((res) => {
        if (res === undefined) {
          return res;
        }

        const isRedirect =
          [301, 302, 307, 308].includes(response.statusCode) ||
          (res && res.url);
        if (isRedirect) {
          return res;
        }

        return {
          code: response.statusCode,
          status: HttpStatus[response.statusCode],
          message: res.message,
          data: res.data,
          meta: res.meta,
        };
      }),
    );
  }
}
