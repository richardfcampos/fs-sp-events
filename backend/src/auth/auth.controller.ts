import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { AuthLoginDto } from "./dtos/auth.login.dto";
import { AuthService } from "./auth.service";
import { LocalGuard } from "./guards/local.guard";
import { Request } from "express";
import { JwtAuthGuard } from "./guards/jwt.guard";

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  @UseGuards(LocalGuard)
  async login(@Body() authPayload: AuthLoginDto) {
    const user = await this.authService.validateUser(authPayload);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }
    return user;
  }

  @Get('status')
  @UseGuards(JwtAuthGuard)
  status(@Req() req: Request) {
    // @ts-ignore
    return req.user;
  }
}
