import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class LoggerService {
  private logger = new Logger('Logger Service');

  constructor() {}

  log(info: string) {
    return this.logger.log(info);
  }

  logError(info: string) {
    return this.logger.error(info);
  }
}
