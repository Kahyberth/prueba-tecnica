import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { CommonModule } from 'src/common/common.module';

@Module({
  controllers: [UsersController],
  imports: [CommonModule],
  providers: [UsersService]
})
export class UsersModule {}
