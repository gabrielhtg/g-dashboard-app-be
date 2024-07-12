import { Injectable, Logger } from '@nestjs/common';
import { Response } from 'express';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class CodeSnippetsService {
  constructor(
    private prismaService: PrismaService,
  ) {
  }

  async create(data: any, res: Response) {
    await this.prismaService.codeSnippets.create({
      data: {
        title : data.title,
        description : data.description,
        language : data.language,
        code_snippet : data.code
      }
    })

    return res.status(200).json({data : `Berhasil membuat code snippets!`})
  }

  async getAll (res: Response) {
    const codes = await this.prismaService.codeSnippets.findMany()

    return res.status(200).json({data: codes})
  }

  async search(keywords: string, res: Response) {
    Logger.debug(keywords)
    const data = await this.prismaService.codeSnippets.findMany({
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
        ]
      }
    })

    return res.status(200).json({data : data})
  }

  async findOne(id: number, res: Response) {
    const data = await this.prismaService.codeSnippets.findUnique({
      where : {
        id: id
      }
    })

    return res.status(200).json({data: data, msg: `Berhasil mendapatkan data dengan id ${data.id}`})
  }

  async update(id: number, updateCodeSnippets: any, res: Response) {
    const data = await this.prismaService.codeSnippets.update({
      where : {
        id: id
      },
      data: {
        title: updateCodeSnippets.title,
        description: updateCodeSnippets.description,
        code_snippet: updateCodeSnippets.code
      }
    })

    return res.status(200).json({
      data: data,
      msg: 'Berhasil mengupdate data.'
    })
  }

  async remove(id: number, res: Response) {
    await this.prismaService.codeSnippets.delete({
      where: {
        id: id
      }
    })

    return res.status(200).json({
      msg: "Berhasil menghapus data!"
    })
  }
}
