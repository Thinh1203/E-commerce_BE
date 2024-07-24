import { IsNotEmpty } from "class-validator";

export class ColorDto {
    @IsNotEmpty()
    name: string;
}