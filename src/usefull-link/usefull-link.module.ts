import { Module } from '@nestjs/common';
import { UsefullLinkService } from './usefull-link.service';
import { UsefullLinkController } from './usefull-link.controller';
import { PrismaService } from '../prisma/prisma.service';
import { AuthService } from '../auth/auth.service';
import { LogActivityService } from '../log-activity/log-activity.service';
import { SecurityService } from '../security/security.service';

@Module({
  controllers: [UsefullLinkController],
  providers: [UsefullLinkService, PrismaService, AuthService, LogActivityService, SecurityService],
})
export class UsefullLinkModule {}
