import { Body, Controller, Post, Res } from '@nestjs/common';
import { LogActivityService } from './log-activity.service';
import { Response } from 'express';

@Controller('log-activity')
export class LogActivityController {
  constructor(private readonly logActivityService: LogActivityService) {}

  @Post('get-all')
  getAll(@Body() data: any, @Res() res: Response) {
    return this.logActivityService.getAll(res, data)
  }
}
