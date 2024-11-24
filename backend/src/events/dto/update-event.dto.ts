import { PartialType } from '@nestjs/mapped-types';
import { CreateEventDto } from './create-event.dto';

export interface UpdateEventDto extends Partial<CreateEventDto> {
    event_id: number;
}
