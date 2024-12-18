import { Module } from '@nestjs/common';
import { GOcrBankService } from './g-ocr-bank.service';
import { GOcrBankController } from './g-ocr-bank.controller';
import { PrismaService } from '../prisma/prisma.service';

@Module({
  controllers: [GOcrBankController],
  providers: [GOcrBankService, PrismaService],
})
export class GOcrBankModule {}
