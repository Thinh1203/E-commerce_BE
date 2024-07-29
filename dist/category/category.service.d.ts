import { Repository } from 'typeorm';
import { Category } from './entities/category.entity';
import { CategoryDto } from './dto/category.dto';
export declare class CategoryService {
    private categoriesRepository;
    constructor(categoriesRepository: Repository<Category>);
    addCategory(categoryDto: CategoryDto): Promise<CategoryDto & Category>;
    updateCategory(id: number, categoryDto: CategoryDto): Promise<import("typeorm").UpdateResult>;
    getAllCategory(): Promise<Category[]>;
}
