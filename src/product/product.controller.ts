import { Body, Controller, Get, HttpStatus, Param, Post, Put, Res } from '@nestjs/common';

import { Response } from 'express';
import { ProductService } from './product.service';
import { ProductDto } from './dto/product.dto';

@Controller('product')
export class ProductController {
    constructor(
        private productService: ProductService
    ){}


    @Post()
    async addProduct(
        @Body() productDto : ProductDto,
        @Res() res: Response
    ) {
        try { 
            const newProduct = await this.productService.addProduct(productDto);
            return res.status(HttpStatus.CREATED).json({
                code: HttpStatus.CREATED,
                message: 'Added product successfully',
                data: newProduct
            });
        } catch (error) {
        return res.status(HttpStatus.BAD_REQUEST).json({
                code: HttpStatus.BAD_REQUEST,
                message: error.message,
            });  
        }
    }

    @Put(':id')
    async updateProduct (
        @Body() productDto : ProductDto,
        @Res() res: Response,
        @Param('id') id: string
    ) {
        try {
            const updateProduct = await this.productService.updateProduct(Number(id), productDto);
    
            return res.status(HttpStatus.CREATED).json({
                code: HttpStatus.CREATED,
                message: 'Update successful',
                data: updateProduct
            });
        } catch (error) {
            return res.status(HttpStatus.BAD_REQUEST).json({
                code: HttpStatus.BAD_REQUEST,
                message: error.message,
            });  
        }
    }

    @Get()
    async getAllProduct( @Res() res: Response) {
        const listProduct = await this.productService.getAllProduct();
        return res.status(HttpStatus.CREATED).json({
            code: HttpStatus.CREATED,
            message: 'List product',
            data: listProduct
        });
    }
    
    @Get(':id')
    async getOneProduct(
        @Param('id') id: string,
        @Res() res: Response
    ) {
        try {
        const productDetail = await this.productService.getOneProduct(Number(id));
        return res.status(HttpStatus.CREATED).json({
            code: HttpStatus.CREATED,
            message: 'Product detail: ',
            data: productDetail
        });
        } catch (error) {
            return res.status(HttpStatus.BAD_REQUEST).json({
                code: HttpStatus.BAD_REQUEST,
                message: error.message,
            }); 
        }
    }

    
}
