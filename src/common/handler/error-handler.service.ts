import {
  HttpException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { LoggerService } from '../logger/logger.service';

@Injectable()
export class HandleServiceError {
  constructor(private readonly loggerService: LoggerService) {}

  handleError(error: any): never {
    this.loggerService.logError(error);
    if (error instanceof HttpException) {
      throw error;
    }
    throw new InternalServerErrorException(error);
  }
}
