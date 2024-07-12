import { Body, Controller, Delete, Get, Param, Patch, Post, Res } from '@nestjs/common';
import { CodeSnippetsService } from './code-snippets.service';
import { Response } from 'express';
import { UpdateUsefullLinkDto } from '../usefull-link/dto/update-usefull-link.dto';

@Controller('code-snippets')
export class CodeSnippetsController {
  constructor(private readonly codeSnippetsService: CodeSnippetsService) {}

  @Post()
  create(@Body() data : any, @Res() res: Response) {
    return this.codeSnippetsService.create(data, res)
  }

  @Get()
  getAll(@Res() res: Response) {
    return this.codeSnippetsService.getAll(res)
  }

  @Get('search/:keywords')
  search(@Param('keywords') keywords: string, @Res() res: Response) {
    return this.codeSnippetsService.search(keywords, res);
  }

  @Get(':id')
  findOne(@Param('id') id: string, @Res() res:Response) {
    return this.codeSnippetsService.findOne(+id, res);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() data: any, @Res() res:Response) {
    return this.codeSnippetsService.update(+id, data, res);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @Res() res:Response) {
    return this.codeSnippetsService.remove(+id, res);
  }
}
