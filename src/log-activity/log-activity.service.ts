import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Response } from 'express';

@Injectable()
export class LogActivityService {
  constructor(private prismaService: PrismaService) {
  }

  async create (username: string, msg: string) {
    await this.prismaService.logActivity.create({
      data: {
        username: username,
        log_data: msg,
      }
    })
  }

  async getAll (res: Response, data: any) {
    const logActivities = await this.prismaService.logActivity.findMany({
      orderBy: {
        created_at: 'desc'
      },
      skip: data.skip,
      take: data.take,
    })

    return res.status(200).json({data: logActivities})
  }
}
