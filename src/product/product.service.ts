import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { Repository } from 'typeorm';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';
import { Variant } from './entities/variant.entity';
import { ProductDto } from './dto/product.dto';

@Injectable()
export class ProductService {
    // constructor(
        // @InjectRepository(Product)
        // private productRepository: Repository<Product>,
        // @InjectRepository(Variant)
        // private variantRepository: Repository<Variant>,
        // private cloudinaryService: CloudinaryService
    // ){}

    // async addProduct(productDto:any, variantDto: any, files: Express.Multer.File[]) {
       
    //     const imagesUpload = files.map((file, index) => {
    //         if (index === 0) {
    //             return this.cloudinaryService.uploadFile(file, 800, 800);
    //         } else {
    //             return this.cloudinaryService.uploadFile(file, 300, 300);
    //         }
    //     });
    //     const uploadResults = await Promise.all(imagesUpload);

    // }

    // async addProduct(productDto: ProductDto) : Promise<Product> {
    //     const checkProduct = await this.productRepository.findOne({
    //         where:{
    //             name:productDto.name
    //             }
    //         });
    //     if (checkProduct) {
    //         throw new HttpException("Product's name already exists", HttpStatus.CONFLICT);
    //     }
    //     return this.productRepository.save(productDto);
    // }
}
