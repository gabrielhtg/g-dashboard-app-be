import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Res,
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
  saveOcrData(@Body() ocrData: any, @Res() res: Response) {
    return this.gOcrBankService.saveOcrData(ocrData, res);
  }

  @Get('get-ocr-data/:username')
  getOcrData(@Param('username') username: string, @Res() res: Response) {
    return this.gOcrBankService.getAllOcrData(username, res);
  }

  @Get('get-ocr-data-by-id/:id')
  getOcrDataById(@Param('id') id: string, @Res() res: Response) {
    return this.gOcrBankService.getOcrDataById(+id, res);
  }
}
