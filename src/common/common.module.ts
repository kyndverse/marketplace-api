import { Global, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { WinstonModule } from 'nest-winston';
import * as winston from 'winston';
import { PrismaService } from './prisma/prisma.service';

@Global()
@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    WinstonModule.forRoot({
      level: process.env.NODE_ENV === 'production' ? 'warn' : 'debug',
      format: winston.format.json(),
      transports: [new winston.transports.Console()],
    }),
  ],
  providers: [PrismaService],
  exports: [PrismaService],
})
export class CommonModule {}
