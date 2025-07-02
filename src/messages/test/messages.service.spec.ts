import { Test, TestingModule } from '@nestjs/testing';
import { NotFoundException } from '@nestjs/common';

import { MessagesService } from '../messages.service';
import { PrismaService } from '../../common/db/prisma.service';
import { LoggerService } from '../../common/logger/logger.service';
import { ValidatorsService } from '../../common/validators/validators.service';
import { HandleServiceError } from '../../common/handler/error-handler.service';

describe('MessagesService', () => {
  let service: MessagesService;
  let prisma: PrismaService;
  let validator: ValidatorsService;

  beforeEach(async () => {
  const module: TestingModule = await Test.createTestingModule({
    providers: [
      MessagesService,
      PrismaService,
      LoggerService,
      ValidatorsService,
      {
        provide: HandleServiceError,
        useValue: {
          handleError: jest.fn(),
        },
      },
    ],
  }).compile();

  service = module.get(MessagesService);
  prisma = module.get(PrismaService);
  validator = module.get(ValidatorsService);
});

  it('should create a message if user exists', async () => {
    jest.spyOn(validator, 'findUserById').mockResolvedValue({ id: 'uuid' } as any);
    jest.spyOn(prisma.messages, 'create').mockResolvedValue({} as any);

    await expect(
      service.create({
        content: 'Hola desde el test :)',
        userId: 'uuid',
      }),
    ).resolves.not.toThrow();
  });

  it('should throw NotFoundException if user does not exist', async () => {
    jest.spyOn(validator, 'findUserById').mockResolvedValue(null);

    await expect(
      service.create({
        content: 'Mensaje invalido :(',
        userId: 'uuid inexistente',
      }),
    ).rejects.toThrow(NotFoundException);
  });
});
