import { ColorService } from './color.service';
import { Response } from 'express';
import { ColorDto } from './dto/color.dto';
import { ProductColorFilterDto } from './dto/color-filter.dto';
export declare class ColorController {
    private colorService;
    constructor(colorService: ColorService);
    addColor(colorDto: ColorDto, res: Response): Promise<Response<any, Record<string, any>>>;
    getAllColor(res: Response): Promise<Response<any, Record<string, any>>>;
    getOneColor(res: Response, id: string, query: ProductColorFilterDto): Promise<Response<any, Record<string, any>>>;
}
