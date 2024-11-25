import {IsNotEmpty, IsNumber, IsString} from 'class-validator';

export class UpdateEventDto  {

    @IsNotEmpty()
    @IsNumber()
    event_id: number;

    @IsNotEmpty()
    @IsNumber({ maxDecimalPlaces: 2 })
    odds?: number;

    @IsNotEmpty()
    @IsString()
    event_name?: string;

}
