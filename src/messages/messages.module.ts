import { Module } from '@nestjs/common';
import { MessagesService } from './messages.service';
import { MessagesController } from './messages.controller';
import { CommonModule } from 'src/common/common.module';

@Module({
  controllers: [MessagesController],
  imports: [CommonModule],
  providers: [MessagesService]
})
export class MessagesModule {}
