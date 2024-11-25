import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
} from '@nestjs/common';
import { UsersService } from "./users.service";
import { CreateUserDto } from "./dtos/create.user.dto";
import { UpdateUserDto } from "./dtos/update.user.dto";
import { InjectParamIntoDto } from "src/decorators/inject-param-into-dto.decorator";
import { JwtAuthGuard } from "../auth/guards/jwt.guard";
import { UserUpdateGuard } from "./guards/user.update.guard";
import { UserRoles } from "../acl/decorators/roles.decorator";
import { UserRole } from "../acl/enums/user.role.enum";
import { AclGuard } from "../acl/guards/acl.guard";
import { Request } from "express";

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @UseGuards(JwtAuthGuard, AclGuard)
  @UserRoles(UserRole.ADMIN, UserRole.USER)
  @Get(':id')
  findOne(@Param('id') id: string, @Req() req: Request) {
    return this.usersService.findOne(+id);
  }

  @UseGuards(JwtAuthGuard, UserUpdateGuard)
  @Patch(':id')
  update(
    @InjectParamIntoDto({ param: 'id', dtoKey: 'id' }) id: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.usersService.update(+id, updateUserDto);
  }

  @UseGuards(JwtAuthGuard, UserUpdateGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}
