import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateMessageDto } from './dto/create-message.dto';
import { PrismaService } from 'src/common/db/prisma.service';
import { LoggerService } from 'src/common/logger/logger.service';
import { ValidatorsService } from 'src/common/validators/validators.service';
import { HandleServiceError } from 'src/common/handler/error-handler.service';

@Injectable()
export class MessagesService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly loggerService: LoggerService,
    private readonly validatorService: ValidatorsService,
    private readonly handleServiceError: HandleServiceError,
  ) {}

  async create(createMessageDto: CreateMessageDto) {
    try {
      const user = await this.validatorService.findUserById(
        createMessageDto.userId,
      );


      if (!user) throw new NotFoundException('User not found!');

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
      this.handleServiceError.handleError(error);
    }
  }
}
