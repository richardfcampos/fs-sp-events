import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from "bcrypt";
import { CreateUserDto } from "./dtos/create.user.dto";
import { UpdateUserDto } from "./dtos/update.user.dto";
import { PrismaService } from "../db/prisma.service";

@Injectable()
export class UsersService {
  constructor(
    private readonly prismaService: PrismaService,
    private configService: ConfigService,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const saltOrRounds = this.configService.get('SALT_OR_ROUNDS');
    createUserDto.password = await bcrypt.hash(
      createUserDto.password,
      +saltOrRounds,
    );
    return this.prismaService.users.create({
      omit: { password: true },
      data: createUserDto,
    });
  }

  findAll() {
    return this.prismaService.users.findMany();
  }

  findOne(id: number) {
    return this.prismaService.users.findUnique({
      omit: { password: true },
      where: { id },
    });
  }

  async findOneByEmail(email: string) {
    return this.prismaService.users.findUnique({ where: { email } });
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    delete updateUserDto.id;
    if (updateUserDto.password) {
      const saltOrRounds = this.configService.get('SALT_OR_ROUNDS');
      updateUserDto.password = await bcrypt.hash(
        updateUserDto.password,
        +saltOrRounds,
      );
    }

    return this.prismaService.users.update({
      omit: { password: true },
      where: { id },
      data: updateUserDto,
    });
  }

  remove(id: number) {
    return this.prismaService.users.delete({ where: { id } });
  }
}
