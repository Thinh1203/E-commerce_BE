import { VariantService } from './variant.service';
import { VariantDto } from './dto/variant.dto';
import { Response } from 'express';
export declare class VariantController {
    private variantService;
    constructor(variantService: VariantService);
    addProduct(files: Express.Multer.File[], variantDto: VariantDto, res: Response): Promise<Response<any, Record<string, any>>>;
    updateProductVariant(id: string, variantDto: VariantDto, res: Response): Promise<Response<any, Record<string, any>>>;
}
