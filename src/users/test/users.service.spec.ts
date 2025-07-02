import { Test, TestingModule } from '@nestjs/testing';
import { BadRequestException } from '@nestjs/common';

import { UsersService } from '../users.service';
import { PrismaService } from '../../common/db/prisma.service';
import { LoggerService } from '../../common/logger/logger.service';
import { ValidatorsService } from '../../common/validators/validators.service';
import { HandleServiceError } from '../../common/handler/error-handler.service';

describe('UsersService', () => {
  let service: UsersService;
  let prisma: PrismaService;
  let validator: ValidatorsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        LoggerService,
        PrismaService,
        ValidatorsService,
        {
          provide: HandleServiceError,
          useValue: {
            handleError: jest.fn((error) => {
              throw error;
            }),
          },
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
    prisma = module.get<PrismaService>(PrismaService);
    validator = module.get<ValidatorsService>(ValidatorsService);
  });

  it('should create a new user if email does not exist', async () => {
    jest.spyOn(validator, 'findUserByEmail').mockResolvedValue(null);
    jest.spyOn(prisma.users, 'create').mockResolvedValue({} as any);

    await expect(
      service.create({ name: 'Kahyberth', email: 'kahyberth@test.com' }),
    ).resolves.not.toThrow();
  });

  it('should throw BadRequestException if user already exists', async () => {
    jest
      .spyOn(validator, 'findUserByEmail')
      .mockResolvedValue({ id: 'f454bf39-c69b-4780-9721-21a0bd1bf0ed', email: 'kahyberth@test.com' } as any);

    await expect(
      service.create({ name: 'Kahyberth', email: 'kahyberth@test.com' }),
    ).rejects.toThrow(BadRequestException);
  });
});
