import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';
import { VariantDto } from './dto/variant.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Variant } from 'src/product/entities/variant.entity';
import { Repository } from 'typeorm';
import { Thumbnail } from 'src/product/entities/thumbnail.entity';
import { Product } from 'src/product/entities/product.entity';


@Injectable()
export class VariantService {
    constructor(
        private cloudinaryService: CloudinaryService,
        @InjectRepository(Variant)
        private variantRepository: Repository<Variant>,
        @InjectRepository(Thumbnail)
        private thumbnailRepository: Repository<Thumbnail>,
        @InjectRepository(Product)
        private productRepository: Repository<Product>
    ){}

    
    async addProductVariant(variantDto: VariantDto, files: Express.Multer.File[]) {
        const product = await this.productRepository.findOne({
            where: { id: variantDto.productId }
        });

        if (!product) {
            throw new HttpException("Product not found!", HttpStatus.NOT_FOUND);
        }
    
        const imagesUpload = files.map((file, index) => {
            if (index === 0) {
                return this.cloudinaryService.uploadFile(file, 800, 800);
            } else {
                return this.cloudinaryService.uploadFile(file, 300, 300);
            }
        });
        const uploadResults = await Promise.all(imagesUpload);

        const imageUrls = uploadResults.map(result => result.url);

        const newVariant = this.variantRepository.create({
            ...variantDto,
            images: JSON.stringify(imageUrls[0]),
            product
        });
        const newVariantProduct = await this.variantRepository.save(newVariant);
        // console.log(newVariantProduct);
        
        const thumbnails = imageUrls.slice(1).map(url => {
            const thumbnail = this.thumbnailRepository.create({
                thumbnail: url,
                variant: newVariantProduct 
            });
            return thumbnail;
        });

        await this.thumbnailRepository.save(thumbnails);

        return newVariantProduct;
    }
}
