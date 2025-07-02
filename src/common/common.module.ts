import { Module } from '@nestjs/common';
import { LoggerService } from './logger/logger.service';
import { ValidatorsService } from './validators/validators.service';
import { PrismaService } from './db/prisma.service';
import { HandleServiceError } from './handler/error-handler.service';

@Module({
  providers: [LoggerService, ValidatorsService, PrismaService, HandleServiceError],
  exports: [LoggerService, ValidatorsService, PrismaService, HandleServiceError],
})
export class CommonModule {}

