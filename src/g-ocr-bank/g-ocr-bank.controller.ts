import { Controller, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { GOcrBankService } from './g-ocr-bank.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { Express } from 'express';

@Controller('g-ocr-bank')
export class GOcrBankController {
  constructor(private readonly gOcrBankService: GOcrBankService) {}

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  proceedOcr(@UploadedFile() file: Express.Multer.File) {
    return this.gOcrBankService.proceedOcr(file);
  }

  @Post('all')
  @UseInterceptors(FileInterceptor('file'))
  proceedOcrAll(@UploadedFile() file: Express.Multer.File) {
    return this.gOcrBankService.proceedOcrAll(file);
  }
}
