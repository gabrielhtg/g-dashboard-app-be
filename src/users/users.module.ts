import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { PrismaService } from '../prisma/prisma.service';
import { SecurityService } from '../security/security.service';

@Module({
  imports: [],
  controllers: [UsersController],
  providers: [UsersService, PrismaService, SecurityService],
})
export class UsersModule {}
