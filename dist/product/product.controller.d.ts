import { Response } from 'express';
import { ProductService } from './product.service';
import { ProductDto } from './dto/product.dto';
import { ProductFilterDto } from './dto/product-filter.dto';
export declare class ProductController {
    private productService;
    constructor(productService: ProductService);
    addProduct(productDto: ProductDto, res: Response): Promise<Response<any, Record<string, any>>>;
    updateProduct(productDto: ProductDto, res: Response, id: string): Promise<Response<any, Record<string, any>>>;
    getAllProduct(res: Response, query: ProductFilterDto): Promise<Response<any, Record<string, any>>>;
    getOneProduct(id: string, res: Response): Promise<Response<any, Record<string, any>>>;
    deleteOneProduct(res: Response, id: string): Promise<Response<any, Record<string, any>>>;
}
