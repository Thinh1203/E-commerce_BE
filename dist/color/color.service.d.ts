import { Color } from './entities/color.entity';
import { Repository } from 'typeorm';
import { ColorDto } from './dto/color.dto';
import { ProductColorFilterDto } from './dto/color-filter.dto';
export declare class ColorService {
    private colorsRepository;
    constructor(colorsRepository: Repository<Color>);
    addColor(colorDto: ColorDto): Promise<ColorDto & Color>;
    getAllColor(): Promise<Color[]>;
    getOneColor(id: number, query: ProductColorFilterDto): Promise<{
        id: number;
        name: string;
        variant: {
            id: number;
            SKU: string;
            price: number;
            images: string;
            stock_quantity: number;
            material: string;
            discount: number;
            thumbnail: {
                id: number;
                thumb: string;
            }[];
            size: {
                id: number;
                name: string;
            }[];
        }[];
    }>;
}
