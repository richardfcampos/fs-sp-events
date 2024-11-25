import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthLoginDto } from './dtos/auth.login.dto';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import {PrismaService} from "../db/prisma.service";

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser({ username, password }: AuthLoginDto) {
    const findUser = await this.usersService.findOneByEmail(username);

    if (!findUser) {
      return null;
    }
    if (await bcrypt.compare(password, findUser.password)) {
      const { password, ...user } = findUser;
      return this.jwtService.sign(user);
    }
    return null;
  }
}
