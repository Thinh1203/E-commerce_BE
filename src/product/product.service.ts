import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { In, IsNull, Like, Not, Repository } from 'typeorm';
import { ProductDto } from './dto/product.dto';
import { Tag } from './entities/tag.entity';
import { ProductFilterDto } from './dto/product-filter.dto';

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

    async getAllProduct(query: ProductFilterDto) {
        const items_per_page = query.items_per_page || 10;
        const page = Number(query.page) || 1;
        const skip = (page - 1) * items_per_page;
        const [res, total] = await this.productsRepository.findAndCount(
            {
                take: items_per_page,
                skip: skip,

                where: {
                    is_delete: false,
                    ...(query.search && {
                        name: Like(`%${query.search}%`),
                    })
                },
                relations: ['tags', 'variant', 'variant.thumbnail']
            });
        const last_page = Math.ceil(total/items_per_page);
        const prev_page = page - 1 < 1 ? null : page - 1;
        const next_page = page + 1 > last_page ? null : page + 1;
        return {
            total,
            data: res,
            prev_page,
            next_page,
            last_page
        }
    } 

    async getOneProduct(id: number) {
        return await this.productsRepository.findOne(
            {
                where: {id},
                relations: ['tags']
            }
        );
    } 

    async deleteOneProduct(id: number) {
        const checkProduct = await this.productsRepository.findOne({where: {id}});
        if(!checkProduct) {
            throw new HttpException("Product not found!", HttpStatus.NOT_FOUND);
        }
        return await this.productsRepository.createQueryBuilder()
            .update(Product)
            .set({ is_delete: true })
            .where("id = :id", {id})
            .execute();
    }
}
