import { Controller, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { GOcrService } from './g-ocr.service';
import { Express } from 'express'
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('g-ocr')
export class GOcrController {
  constructor(private readonly gOcrService: GOcrService) {}

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  proceedOcr(@UploadedFile() file: Express.Multer.File) {
    return this.gOcrService.proceedOcr(file);
  }

  @Post('all')
  @UseInterceptors(FileInterceptor('file'))
  proceedOcrAll(@UploadedFile() file: Express.Multer.File) {
    return this.gOcrService.proceedOcrAll(file);
  }
}
