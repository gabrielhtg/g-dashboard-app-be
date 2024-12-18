import {
  Body,
  Controller,
  Post, Res,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { GOcrBankService } from './g-ocr-bank.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { Express, Response } from 'express';

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

  @Post('save-ocr-data')
  saveOcrData(@Body() ocrData:any, @Res() res: Response) {
    return this.gOcrBankService.saveOcrData(ocrData, res);
  }
}
