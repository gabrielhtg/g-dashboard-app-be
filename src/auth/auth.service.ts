import { HttpStatus, Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { Response } from 'express';
import { PrismaService } from '../prisma/prisma.service';
import { SecurityService } from '../security/security.service';
import { LogActivityService } from '../log-activity/log-activity.service';

@Injectable()
export class AuthService {
  private logger: Logger
  private user: any

  constructor(
    private prismaService: PrismaService,
    private securityService: SecurityService,
    private logService: LogActivityService
  ) {
    this.logger = new Logger(AuthService.name);
  }

  async signIn(username: string, pass: string, res: Response): Promise<any> {
    this.user = await this.prismaService.users.findUnique({where: { username: username }})

    if (!   await this.securityService.isMatch(this.user.password, pass)) {
      throw new UnauthorizedException();
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...result } = this.user;
    // TODO: Generate a JWT and return it here
    // instead of the user object

    await this.logService.create(username, 'Login')
    return res.status(HttpStatus.OK).json(
      {
        msg : 'Berhasil login'
      }
    );
  }

  authGetUsername () {
    return this.user.username;
  }
}
