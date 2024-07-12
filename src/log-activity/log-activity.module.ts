import { Module } from '@nestjs/common';
import { LogActivityService } from './log-activity.service';
import { LogActivityController } from './log-activity.controller';
import { PrismaService } from '../prisma/prisma.service';

@Module({
  controllers: [LogActivityController],
  providers: [LogActivityService, PrismaService],
})
export class LogActivityModule {}
