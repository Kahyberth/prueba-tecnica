import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { PrismaService } from '../common/db/prisma.service';
import { LoggerService } from '../common/logger/logger.service';
import { ValidatorsService } from '../common/validators/validators.service';
import { PaginateMessageDto } from './dto/paginate-messages.dto';
import { HandleServiceError } from '../common/handler/error-handler.service';

@Injectable()
export class UsersService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly loggerService: LoggerService,
    private readonly validatorService: ValidatorsService,
    private readonly handleServiceError: HandleServiceError,
  ) {}

  async create(createUserDto: CreateUserDto) {
    try {
      const user = await this.validatorService.findUserByEmail(
        createUserDto.email,
      );

      if (user) {
        throw new BadRequestException('User already created!');
      }

      await this.prismaService.users.create({ data: createUserDto });
      this.loggerService.log('User is created!');
      return;
    } catch (error: any) {
      throw this.handleServiceError.handleError(error);
    }
  }

  async loadMessages(paginateDto: PaginateMessageDto, userId: string) {
    try {
      const user = await this.validatorService.findUserById(userId);
      if (!user) {
        throw new NotFoundException(`User with ID ${userId} not found!`);
      }

      const page =
        paginateDto.page && paginateDto.page > 0 ? paginateDto.page : 1;
      const limit =
        paginateDto.limit && paginateDto.limit > 0 ? paginateDto.limit : 5;

      const skip = (page! - 1) * limit!;
      const totalCount = await this.prismaService.messages.count({
        where: { userId },
      });

      const messages = await this.prismaService.messages.findMany({
        where: {
          userId,
        },
        skip,
        take: limit,
      });

      return {
        messages,
        page,
        limit,
        totalCount,
      };
    } catch (error: any) {
      throw this.handleServiceError.handleError(error);
    }
  }
}
