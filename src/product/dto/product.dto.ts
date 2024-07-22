import { IsNotEmpty } from "class-validator";

export class ProductDto {
    @IsNotEmpty()
    name: string;
    
    @IsNotEmpty()
    description: string;

    @IsNotEmpty()
    user_gender: string;

    @IsNotEmpty()
    category: string;
}