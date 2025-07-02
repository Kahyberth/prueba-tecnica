import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { PrismaService } from '../db/prisma.service';
import { LoggerService } from '../logger/logger.service';

@Injectable()
export class ValidatorsService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly loggerService: LoggerService,
  ) {}

  async findUserByEmail(email: string) {
    try {
      const user = await this.prismaService.users.findFirst({
        where: {
          email,
        },
      });

      if (!user) {
        return null;
      }

      return user;
    } catch (error: any) {
      this.loggerService.logError(error);
      throw new InternalServerErrorException('Error validating user email!');
    }
  }

  async findUserById(userId: string) {
    try {
      const user = await this.prismaService.users.findFirst({
        where: { id: userId },
      });

      if (!user) {
        return null;
      }

      return user;
    } catch (error: any) {
      this.loggerService.logError(error);
      throw new InternalServerErrorException('Error validating user!');
    }
  }
}
