import { Module } from '@nestjs/common';
import { CodeSnippetsService } from './code-snippets.service';
import { CodeSnippetsController } from './code-snippets.controller';
import { PrismaService } from '../prisma/prisma.service';

@Module({
  controllers: [CodeSnippetsController],
  providers: [CodeSnippetsService, PrismaService],
})
export class CodeSnippetsModule {}
