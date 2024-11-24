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

  async findAll(page: number = 1, limit: number = 5) {
    const skip = (page - 1) * limit;
    const [events, totalCount] = await this.prismaService.$transaction([
      this.prismaService.events.findMany({
        skip,
        take: +limit,
      }),
      this.prismaService.events.count(),
    ]);

    return {
      data: events,
      totalCount,
      currentPage: page,
      totalPages: Math.ceil(totalCount / limit),
    };
  }

  async findOne(id: number) {
    const event = await this.prismaService.events.findUnique({
      where: { event_id: id },
    });

    return {data: event};
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
