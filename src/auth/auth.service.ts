import {
  HttpStatus,
  Injectable,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';
import { Response, Request } from 'express';
import { PrismaService } from '../prisma/prisma.service';
import { SecurityService } from '../security/security.service';
import { LogActivityService } from '../log-activity/log-activity.service';

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

  async isSameIp(username: string, req: Request, res: Response) {
    const user = await this.prismaService.users.findUnique({
      where: { username: username },
    });

    if (user.last_ip == req.ip) {
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
    req: Request,
    res: Response,
  ): Promise<any> {
    const ip = String(
      req.headers['x-forwarded-for'] || req.socket.remoteAddress,
    ).split(':')[0];

    this.user = await this.prismaService.users.findUnique({
      where: { username: username },
    });

    if (this.user == null) {
      return res.status(HttpStatus.UNAUTHORIZED).json({
        msg: 'Pastikan username dan password kamu sudah tepat!',
      });
    }

    if (!(await this.securityService.isMatch(this.user.password, pass))) {
      throw new UnauthorizedException('Password salah');
    }

    // Update IP address di database setelah berhasil login
    await this.prismaService.users.update({
      where: { username: this.user.username },
      data: { last_ip: ip },
    });

    // Log aktivitas login
    await this.logService.create(username, 'Login');

    // Hapus password dari respons sebelum mengirimkan ke klien
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...result } = this.user;

    return res.status(HttpStatus.OK).json({
      msg: 'Berhasil login',
      data: result,
    });
  }
}
