import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get(':id/messages')
  loadMessages(
    @Param('id') userId: string,
    @Query('limit') limit: number,
    @Query('page') page: number,
  ) {
    return this.usersService.loadMessages({ page, limit }, userId);
  }
}
