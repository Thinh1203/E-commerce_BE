import { CategoryService } from './category.service';
import { CategoryDto } from './dto/category.dto';
import { Response } from 'express';
export declare class CategoryController {
    private categoryService;
    constructor(categoryService: CategoryService);
    addCategory(categoryDto: CategoryDto, res: Response): Promise<Response<any, Record<string, any>>>;
    updateCategory(categoryDto: CategoryDto, res: Response, id: string): Promise<Response<any, Record<string, any>>>;
    getAllCategory(res: Response): Promise<Response<any, Record<string, any>>>;
}
