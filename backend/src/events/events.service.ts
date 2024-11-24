import { Injectable } from '@nestjs/common';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { PrismaService } from "../db/prisma.service";

@Injectable()
export class EventsService {
  constructor(private readonly prismaService: PrismaService) {}

  create(createEventDto: CreateEventDto) {
    return this.prismaService.events.create({
      data:createEventDto
    });
  }

  findAll() {
    return this.prismaService.events.findMany();
  }

  findOne(id: number) {
    return this.prismaService.events.findUnique({
        where: {event_id:id}
    });
  }

  update(id: number, updateEventDto: UpdateEventDto) {
    return this.prismaService.events.update({
        where:{event_id:id},
        data:updateEventDto
    });
  }

  remove(id: number) {
    return this.prismaService.events.delete({
        where:{event_id:id}
    });
  }
}
