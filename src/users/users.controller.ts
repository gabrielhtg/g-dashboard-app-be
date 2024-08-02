import { Controller, Get, Post, Body, Patch, Param, Delete, Res, Logger } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Response } from 'express';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {
  }

  @Post()
  create(@Body() createUserDto: CreateUserDto, @Res() res: Response) {
    return this.usersService.create(createUserDto, res)
  }

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') username: string, @Res() res: Response) {
    return this.usersService.findOne(username, res);
  }

  @Patch(':username')
  update(@Param('username') username: string, @Body() data: any, @Res() httpResponse: Response) {
    Logger.debug('Update user dieksekusi!')
    return this.usersService.update(username, data, httpResponse);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}
