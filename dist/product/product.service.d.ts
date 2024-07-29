import { Product } from './entities/product.entity';
import { Repository } from 'typeorm';
import { ProductDto } from './dto/product.dto';
import { Tag } from './entities/tag.entity';
import { ProductFilterDto } from './dto/product-filter.dto';
import { Category } from 'src/category/entities/category.entity';
export declare class ProductService {
    private productsRepository;
    private tagsRepository;
    private categoriesRepository;
    constructor(productsRepository: Repository<Product>, tagsRepository: Repository<Tag>, categoriesRepository: Repository<Category>);
    addProduct(productDto: ProductDto): Promise<Product>;
    updateProduct(id: number, productDto: ProductDto): Promise<Product>;
    getAllProduct(query: ProductFilterDto): Promise<{
        total: number;
        data: Product[];
        prev_page: number;
        next_page: number;
        last_page: number;
    }>;
    getOneProduct(id: number): Promise<Product>;
    deleteOneProduct(id: number): Promise<import("typeorm").UpdateResult>;
}
