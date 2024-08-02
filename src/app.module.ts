import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { LogActivityModule } from './log-activity/log-activity.module';
import { CodeSnippetsModule } from './code-snippets/code-snippets.module';
import { UsefullLinkModule } from './usefull-link/usefull-link.module';
import { GOcrModule } from './g-ocr/g-ocr.module';

@Module({
  imports: [AuthModule, UsersModule, LogActivityModule, CodeSnippetsModule, UsefullLinkModule, GOcrModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
