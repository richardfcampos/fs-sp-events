import { IsNotEmpty, IsString, IsDecimal } from 'class-validator';

export class CreateEventDto {

    @IsString()
    @IsNotEmpty()
    event_name: string;

    @IsNotEmpty()
    @IsDecimal({ decimal_digits: '0,2' })
    odds: number;
}
