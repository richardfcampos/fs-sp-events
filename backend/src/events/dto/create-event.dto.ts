import {IsNotEmpty, IsNumber, IsString} from 'class-validator';

export class CreateEventDto {

    @IsString()
    @IsNotEmpty()
    event_name: string;

    @IsNotEmpty()
    @IsNumber({ maxDecimalPlaces: 2 })
    odds: number;
}
