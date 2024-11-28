import { Body, Controller, Get, Param, Post, Req, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Request, Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  signIn(@Body() signInDto: any, @Req() req: Request, @Res() res: Response) {
    return this.authService.signIn(
      signInDto.username,
      signInDto.password,
      req,
      res,
    );
  }

  @Get('checkIp/:username')
  isSameIp(
    @Param('username') username: string,
    @Req() req: Request,
    @Res() res: Response,
  ) {
    return this.authService.isSameIp(username, req, res);
  }
}
