import { HttpStatus, Injectable, Logger } from '@nestjs/common';
import { Response, Request } from 'express';
import { PrismaService } from '../prisma/prisma.service';
import { SecurityService } from '../security/security.service';
import { LogActivityService } from '../log-activity/log-activity.service';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class AuthService {
  private logger: Logger;
  private user: any;

  constructor(
    private prismaService: PrismaService,
    private securityService: SecurityService,
    private logService: LogActivityService,
  ) {
    this.logger = new Logger(AuthService.name);
  }

  async isSameIp(username: string, ip: string, req: Request, res: Response) {
    const user = await this.prismaService.users.findUnique({
      where: { username: username },
    });

    if (user.last_ip == ip) {
      return res.status(HttpStatus.OK).json({
        data: 'IP Address Sama',
      });
    } else {
      return res.status(HttpStatus.UNAUTHORIZED).json({
        data: 'Anda sudah login dari perangkat lain.',
      });
    }
  }

  async signIn(
    username: string,
    pass: string,
    token: string,
    res: Response,
  ): Promise<any> {
    this.user = await this.prismaService.users.findUnique({
      where: { username: username },
    });

    if (this.user == null) {
      return res.status(HttpStatus.UNAUTHORIZED).json({
        msg: 'Make sure your username and password are correct!',
      });
    }

    if (!(await this.securityService.isMatch(this.user.password, pass))) {
      return res.status(HttpStatus.UNAUTHORIZED).json({
        msg: 'Make sure your username and password are correct!',
      });
    }

    const newToken = uuidv4();

    if (this.user.login_token == null) {
      await this.prismaService.users.update({
        where: { username: this.user.username },
        data: {
          login_token: newToken,
        },
      });
    } else if (this.user.login_token == token) {
      await this.prismaService.users.update({
        where: { username: this.user.username },
        data: {
          login_token: newToken,
        },
      });
    } else {
      return res.status(HttpStatus.UNAUTHORIZED).json({
        msg: 'Another active session detected. Please logour from that session first!',
      });
    }

    await this.logService.create(username, 'Login');

    // Hapus password dari respons sebelum mengirimkan ke klien
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...result } = this.user;

    return res.status(HttpStatus.OK).json({
      msg: 'Login success!',
      data: {
        user: result,
        login_token: newToken,
      },
    });
  }

  async signOut(username: string, res: Response): Promise<any> {
    this.user = await this.prismaService.users.findUnique({
      where: { username: username },
    });

    if (this.user == null) {
      return res.status(HttpStatus.UNAUTHORIZED).json({
        msg: 'User not found!',
      });
    }

    await this.prismaService.users.update({
      where: { username: this.user.username },
      data: {
        login_token: null,
      },
    });

    await this.logService.create(username, 'Logout');

    // Hapus password dari respons sebelum mengirimkan ke klien
    // eslint-disable-next-line @typescript-eslint/no-unused-vars

    return res.status(HttpStatus.OK).json({
      msg: 'Logout success!',
    });
  }
}
