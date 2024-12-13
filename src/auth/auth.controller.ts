import { Body, Controller, Post, Req, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Request, Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async signIn(@Body() signInDto: any, @Res() res: Response) {
    return await this.authService.signIn(
      signInDto.username,
      signInDto.password,
      signInDto.token,
      res,
    );
  }

  @Post('logout')
  async logout(@Body() signInDto: any, @Res() res: Response) {
    return await this.authService.signOut(signInDto.username, res);
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
