import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { In, Repository } from 'typeorm';
import { ProductDto } from './dto/product.dto';
import { Tag } from './entities/tag.entity';

@Injectable()
export class ProductService {
    constructor(
        @InjectRepository(Product)
        private productsRepository: Repository<Product>,
        @InjectRepository(Tag)
        private tagsRepository: Repository<Tag>
    ) {}

    async addProduct(productDto: ProductDto) : Promise<Product> {
        const checkProduct = await this.productsRepository.findOne({
            where:{
                name:productDto.name
                }
            });
        if (checkProduct) {
            throw new HttpException("Product's name already exists", HttpStatus.CONFLICT);
        }
        
        const tags = await this.tagsRepository.findBy({id: In([productDto.tagId])});
        
        
        if (tags.length !== productDto.tagId.length) {
            throw new HttpException("Tags not found!", HttpStatus.NOT_FOUND);
        }
        const newProduct = this.productsRepository.create({
            ...productDto,
            tags: tags 
        });
        
        await this.productsRepository.save(newProduct);
    
        return newProduct;
    }

    async updateProduct(id: number, productDto: ProductDto) : Promise<Product> {
        const checkProduct = await this.productsRepository.findOne({ where: {id}, relations: ['tags']});
       
        if (!checkProduct) {
            throw new HttpException("Product not found!", HttpStatus.NOT_FOUND);
        }
        
        let newTags = [];
        if (productDto.tagId && productDto.tagId.length > 0) {
            newTags = await this.tagsRepository.findBy({id: In([productDto.tagId])});
        }

        checkProduct.name = productDto.name;
        checkProduct.description = productDto.description;
        checkProduct.user_gender = productDto.user_gender;
        checkProduct.category = productDto.category;
        checkProduct.tags = newTags;
        
        await this.productsRepository.save(checkProduct);

    return checkProduct;
    }

    async getAllProduct() {
        return await this.productsRepository.find({relations: ['tags', 'variant', 'variant.thumbnail']});
    } 

    async getOneProduct(id: number) {
        return await this.productsRepository.findOne(
            {
                where: {id},
                relations: ['tags']
            }
        );
    } 
}
