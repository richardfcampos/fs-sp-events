import {IsNotEmpty, IsString, IsNumber} from 'class-validator';

export class CreateEventDto {

    @IsString()
    @IsNotEmpty()
    event_name: string;

    @IsNotEmpty()
    @IsNumber()
    odds: number;
}
