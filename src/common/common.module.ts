import { Global, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { WinstonModule } from 'nest-winston';
import * as winston from 'winston';

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
})
export class CommonModule {}
