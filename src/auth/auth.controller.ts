import { Body, Controller, Post, Req, Res } from '@nestjs/common';
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
      signInDto.ip_address,
      req,
      res,
    );
  }

  @Post('checkIp')
  isSameIp(@Body() checkIpDto: any, @Req() req: Request, @Res() res: Response) {
    return this.authService.isSameIp(
      checkIpDto.username,
      checkIpDto.ip_address,
      req,
      res,
    );
  }
}
