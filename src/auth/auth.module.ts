import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersService } from '../users/users.service';
import { PrismaService } from '../prisma/prisma.service';
import { SecurityService } from '../security/security.service';
import { LogActivityService } from '../log-activity/log-activity.service';

@Module({
  imports: [],
  controllers: [AuthController],
  providers: [AuthService, UsersService, PrismaService, SecurityService, LogActivityService],
})
export class AuthModule {}
