import { Body, Controller, Get, HttpStatus, Param, Patch, Post, Put, Query, Res, UseGuards } from '@nestjs/common';

import { Response } from 'express';
import { ProductService } from './product.service';
import { ProductDto } from './dto/product.dto';
import { ProductFilterDto } from './dto/product-filter.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { AdminGuard } from 'src/auth/auth.admin.guard';

@Controller('product')
export class ProductController {
    constructor(
        private productService: ProductService
    ){}


    @Post()
    // @UseGuards(AuthGuard, AdminGuard)
    async addProduct(
        @Body() productDto : ProductDto,
        @Res() res: Response
    ) {
        try { 
            const newProduct = await this.productService.addProduct(productDto);
            return res.status(HttpStatus.CREATED).json({
                code: HttpStatus.CREATED,
                message: 'Product added successfully',
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
                message: 'Update successfully',
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
    async getAllProduct( @Res() res: Response, @Query() query: ProductFilterDto) {
        try {
            const listProduct = await this.productService.getAllProduct(query);
            return res.status(HttpStatus.OK).json({
                code: HttpStatus.OK,
                message: 'List product',
                data: listProduct
            });
        } catch (error) {
            return res.status(HttpStatus.BAD_REQUEST).json({
                code: HttpStatus.BAD_GATEWAY,
                message: error.message
            });
        }
       
    }
    
    @Get(':id')
    async getOneProduct(
        @Param('id') id: string,
        @Res() res: Response
    ) {
        try {
        const productDetail = await this.productService.getOneProduct(Number(id));
        return res.status(HttpStatus.OK).json({
            code: HttpStatus.OK,
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

    @Patch(':id')
    async deleteOneProduct(
        @Res() res: Response,
        @Param('id') id: string,
    ) {
        try {
            const is_Delete = await this.productService.deleteOneProduct(Number(id));
            return res.status(HttpStatus.OK).json({
                code: HttpStatus.NO_CONTENT,
                message: 'Delete successfully ',
                data: is_Delete
            });
            } catch (error) {
                return res.status(HttpStatus.BAD_REQUEST).json({
                    code: HttpStatus.BAD_REQUEST,
                    message: error.message,
                }); 
            }
    }
    
}
