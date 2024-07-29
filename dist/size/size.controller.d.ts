import { Response } from 'express';
import { SizeService } from './size.service';
import { SizeDto } from './dto/size.dto';
export declare class SizeController {
    private sizeService;
    constructor(sizeService: SizeService);
    addTag(sizeDto: SizeDto, res: Response): Promise<Response<any, Record<string, any>>>;
    getAllTag(res: Response): Promise<Response<any, Record<string, any>>>;
}
