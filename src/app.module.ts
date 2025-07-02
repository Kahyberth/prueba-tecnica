import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { MessagesModule } from './messages/messages.module';
import { ConfigModule } from '@nestjs/config';
import { appConfigSchema } from './common/config/env-config';
import { CommonModule } from './common/common.module';

@Module({
  imports: [
    UsersModule,
    MessagesModule,
    CommonModule,
    ConfigModule.forRoot({
      validationSchema: appConfigSchema,
    }),
  ],
  controllers: [],
})
export class AppModule {}
