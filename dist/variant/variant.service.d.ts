import { CloudinaryService } from 'src/cloudinary/cloudinary.service';
import { VariantDto } from './dto/variant.dto';
import { Variant } from 'src/product/entities/variant.entity';
import { Repository } from 'typeorm';
import { Thumbnail } from 'src/product/entities/thumbnail.entity';
import { Product } from 'src/product/entities/product.entity';
import { Size } from 'src/size/entities/size.entity';
import { Color } from 'src/color/entities/color.entity';
export declare class VariantService {
    private cloudinaryService;
    private variantRepository;
    private thumbnailRepository;
    private productRepository;
    private sizeRepository;
    private colorRepository;
    constructor(cloudinaryService: CloudinaryService, variantRepository: Repository<Variant>, thumbnailRepository: Repository<Thumbnail>, productRepository: Repository<Product>, sizeRepository: Repository<Size>, colorRepository: Repository<Color>);
    addProductVariant(variantDto: VariantDto, files: Express.Multer.File[]): Promise<{
        images: any;
        material: string;
        price: number;
        stock_quantity: number;
        SKU: string;
        product: Product;
        colors: Color[];
        sizes: Size[];
    } & Variant>;
    updateProductVariant(id: number, data: VariantDto): Promise<import("typeorm").UpdateResult>;
}
