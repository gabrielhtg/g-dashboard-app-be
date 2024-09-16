import { Controller, Post, Res, UploadedFile, UseInterceptors } from '@nestjs/common';
import { GOcrService } from './g-ocr.service';
import { Express, Response } from 'express';
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

  @Post('export')
  @UseInterceptors(FileInterceptor('file'))
  proceedOcrPDF(@UploadedFile() file: Express.Multer.File, @Res() res: Response) {
    return this.gOcrService.exportPDF(file, res);
  }
}
