import { HttpStatus, Injectable } from '@nestjs/common';
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

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
