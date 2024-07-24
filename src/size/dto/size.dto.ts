import { IsNotEmpty } from "class-validator";

export class SizeDto {
    @IsNotEmpty()
    name: string;
}