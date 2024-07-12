import { Injectable, Logger } from '@nestjs/common';
import { CreateUsefullLinkDto } from './dto/create-usefull-link.dto';
import { UpdateUsefullLinkDto } from './dto/update-usefull-link.dto';
import { Response } from 'express';
import { PrismaService } from '../prisma/prisma.service';
import { AuthService } from '../auth/auth.service';
import { LogActivityService } from '../log-activity/log-activity.service';

@Injectable()
export class UsefullLinkService {
  constructor(
      private prismaService: PrismaService,
      private authService: AuthService,
      private logService: LogActivityService
    ) {
  }

  async create(createUsefullLinkDto: CreateUsefullLinkDto, res: Response) {
    const usefullLink = await this.prismaService.usefullLinks.create({
      data : {
        title: createUsefullLinkDto.title,
        description: createUsefullLinkDto.description,
        link: createUsefullLinkDto.link
      }
    })

    // await this.logService.create(this.authService.authGetUsername(), `Membuat data ${usefullLink.title} dari Usefull Link`)

    return res.status(201).json({data : usefullLink, msg: 'Berhasil dibuat!'})
  }

  async findAll(res: Response) {
    const allData = await this.prismaService.usefullLinks.findMany({
      orderBy: {
        title: 'asc'
      }
    })

    return res.status(200).json({data: allData, msg: 'Berhasil mendapatkan semua data usefull links.'})
  }

  async findOne(id: number, res: Response) {
    const data = await this.prismaService.usefullLinks.findUnique({
      where : {
        id: id
      }
    })

    return res.status(200).json({data: data, msg: `Berhasil mendapatkan data dengan id ${data.id}`})
  }

  async update(id: number, updateUsefullLinkDto: UpdateUsefullLinkDto, res: Response) {
    const data = await this.prismaService.usefullLinks.update({
      where : {
        id: id
      },
      data: {
        title: updateUsefullLinkDto.title,
        description: updateUsefullLinkDto.description,
        link: updateUsefullLinkDto.link
      }
    })

    // await this.logService.create(this.authService.authGetUsername(), `Mengupdate data ${data.title} dari Usefull Link`)


    return res.status(200).json({
      data: data,
      msg: 'Berhasil mengupdate data.'
    })
  }

  async remove(id: number, res: Response) {
    const data = await this.prismaService.usefullLinks.delete({
      where: {
        id: id
      }
    })

    // await this.logService.create(this.authService.authGetUsername(), `Menghapus data ${data.title} dari Usefull Link`)

    return res.status(200).json({
      msg: "Berhasil menghapus data!"
    })
  }

  async search(keywords: string, res: Response) {
    const data = await this.prismaService.usefullLinks.findMany({
      where: {
        OR: [
              {
                title: {
                  contains: keywords
                }
              },
              {
                description: {
                  contains: keywords
                }
              },
              {
                link: {
                  contains: keywords
                }
              }
        ]
      }
    })

    return res.status(200).json({data : data})
  }
}
