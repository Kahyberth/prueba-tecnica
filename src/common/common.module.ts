import { Module } from '@nestjs/common';
import { LoggerService } from 'src/common/logger/logger.service';
import { ValidatorsService } from './validators/validators.service';
import { PrismaService } from 'src/common/db/prisma.service';
import { HandleServiceError } from './handler/error-handler.service';

@Module({
  providers: [LoggerService, ValidatorsService, PrismaService, HandleServiceError],
  exports: [LoggerService, ValidatorsService, PrismaService, HandleServiceError],
})
export class CommonModule {}

