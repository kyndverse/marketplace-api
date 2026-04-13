import { Global, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { WinstonModule } from 'nest-winston';
import * as winston from 'winston';
import { RolesGuard } from './guards/roles.guard';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { ResponseInterceptor } from './interceptors/response.interceptor';

@Global()
@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    WinstonModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (ConfigService: ConfigService) => ({
        level: ConfigService.get('app.env') === 'production' ? 'warn' : 'debug',
        format: winston.format.json(),
        transports: [new winston.transports.Console()],
      }),
    }),
  ],
  providers: [
    RolesGuard,
    { provide: APP_INTERCEPTOR, useClass: ResponseInterceptor },
  ],
  exports: [RolesGuard],
})
export class CommonModule {}
