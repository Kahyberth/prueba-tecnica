import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateMessageDto } from './dto/create-message.dto';
import { PrismaService } from '../common/db/prisma.service';
import { LoggerService } from '../common/logger/logger.service';
import { ValidatorsService } from '../common/validators/validators.service';
import { HandleServiceError } from '../common/handler/error-handler.service';

@Injectable()
export class MessagesService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly loggerService: LoggerService,
    private readonly validatorService: ValidatorsService,
    private readonly handleServiceError: HandleServiceError,
  ) {}

  async create(createMessageDto: CreateMessageDto) {
    const user = await this.validatorService.findUserById(
      createMessageDto.userId,
    );

    if (!user) throw new NotFoundException('User not found!');
    try {
      await this.prismaService.messages.create({
        data: createMessageDto,
      });

      this.loggerService.log(
        `Message created: content="${createMessageDto.content}", userId=${createMessageDto.userId}`,
      );
      return {
        message: createMessageDto.content,
        userId: createMessageDto.userId,
        info: 'Message is created',
      };
    } catch (error: any) {
      throw this.handleServiceError.handleError(error);
    }
  }
}
