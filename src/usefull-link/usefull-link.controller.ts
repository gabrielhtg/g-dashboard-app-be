import { Controller, Get, Post, Body, Patch, Param, Delete, Res } from '@nestjs/common';
import { UsefullLinkService } from './usefull-link.service';
import { CreateUsefullLinkDto } from './dto/create-usefull-link.dto';
import { UpdateUsefullLinkDto } from './dto/update-usefull-link.dto';
import { Response } from 'express';

@Controller('usefull-link')
export class UsefullLinkController {
  constructor(private readonly usefullLinkService: UsefullLinkService) {}

  @Post()
  create(@Body() createUsefullLinkDto: CreateUsefullLinkDto, @Res() res: Response) {
    return this.usefullLinkService.create(createUsefullLinkDto, res);
  }

  @Get('search/:keywords')
  search(@Param('keywords') keywords: string, @Res() res: Response) {
    return this.usefullLinkService.search(keywords, res);
  }

  @Get()
  findAll(@Res() res: Response) {
    return this.usefullLinkService.findAll(res);
  }

  @Get(':id')
  findOne(@Param('id') id: string, @Res() res:Response) {
    return this.usefullLinkService.findOne(+id, res);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUsefullLinkDto: UpdateUsefullLinkDto, @Res() res:Response) {
    return this.usefullLinkService.update(+id, updateUsefullLinkDto, res);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @Res() res:Response) {
    return this.usefullLinkService.remove(+id, res);
  }
}
