import { Module } from '@nestjs/common';
import { GOcrBankService } from './g-ocr-bank.service';
import { GOcrBankController } from './g-ocr-bank.controller';

@Module({
  controllers: [GOcrBankController],
  providers: [GOcrBankService],
})
export class GOcrBankModule {}
