import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UsePipes,
  ValidationPipe,
  UseGuards
} from '@nestjs/common';
import { EventsService } from './events.service';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import {JwtAuthGuard} from "../auth/guards/jwt.guard";
import {AclGuard} from "../acl/guards/acl.guard";
import {UserRoles} from "../acl/decorators/roles.decorator";
import {UserRole} from "../acl/enums/user.role.enum";

@Controller('events')
export class EventsController {
  constructor(private readonly eventsService: EventsService) {}


  @Post()
  @UsePipes(new ValidationPipe({ transform: true }))
  @UseGuards(JwtAuthGuard, AclGuard)
  @UserRoles(UserRole.ADMIN)
  create(@Body() createEventDto: CreateEventDto) {
    return this.eventsService.create(createEventDto);
  }

  @Get()
  findAll(
      @Query('page') page: number = 1,
      @Query('limit') limit: number = 5,
  ) {
    return this.eventsService.findAll(page, limit);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.eventsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateEventDto: UpdateEventDto) {
    return this.eventsService.update(+id, updateEventDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.eventsService.remove(+id);
  }
}
