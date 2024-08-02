import { HttpStatus, Injectable, Logger } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from '../prisma/prisma.service';
import { SecurityService } from '../security/security.service';
import { Response } from 'express';

@Injectable()
export class UsersService {
  constructor(
    private primaService: PrismaService,
    private securityService : SecurityService
  ) {}

  async create(createUserDto: CreateUserDto, res: Response) {

   const user = await this.primaService.users.create({
      data: {
        nama : createUserDto.nama,
        email: createUserDto.email,
        password: await this.securityService.hashPassword(createUserDto.password),
        profile_picture : createUserDto.profile_picture,
        username : createUserDto.username
      }
   })

    if (user) {
      return res.status(HttpStatus.OK).json({msg: `Berhasil membuat user ${createUserDto.nama} dengan username ${createUserDto.username}`})
    }

    return res.status(500).json({msg: 'Internal server error'})
  }

  findAll() {
    return `This action returns all users`;
  }

  async findOne(username: string, res: Response) {
    const user = await this.primaService.users.findUnique({
      where: { username : username }
    })

    if (user) {
      return res.status(200).json({
        msg: 'Ok',
        data : user
      })
    }

    return res.status(400).json({msg: 'Ada kesalahan'})
  }

  async update(username: string, data: any, res: Response) {
    Logger.debug(username)

    const user = await this.primaService.users.update({
      where: {
        username : username
      },
      data : {
        username : data.username,
        email : data.email,
        nama: data.nama,
      }
    })

    if (!user) {
      return res.status(404).json({
        msg: 'User tidak ditemukan',
        data : null
      })
    }

    return res.status(200).json({
      msg: 'Berhasil memperbarui data',
      data : user
    })
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
