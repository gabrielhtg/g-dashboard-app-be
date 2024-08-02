import { Module } from '@nestjs/common';
import { GOcrService } from './g-ocr.service';
import { GOcrController } from './g-ocr.controller';

@Module({
  controllers: [GOcrController],
  providers: [GOcrService],
})
export class GOcrModule {}
