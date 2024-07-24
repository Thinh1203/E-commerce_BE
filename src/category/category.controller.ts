import { Body, Controller, Get, HttpStatus, Param, Post, Put, Res } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CategoryDto } from './dto/category.dto';
import { Response } from 'express';

@Controller('category')
export class CategoryController {
    constructor (
        private categoryService : CategoryService
    ) {}

    @Post()
    async addCategory (@Body() categoryDto: CategoryDto, @Res() res: Response) {
        try {
            const newCategory = await this.categoryService.addCategory(categoryDto);

            return res.status(HttpStatus.CREATED).json({
                code: HttpStatus.CREATED,
                message: 'Category added successfully',
                data: newCategory
            });
        } catch (error) {
            return res.status(HttpStatus.BAD_REQUEST).json({
                code: HttpStatus.BAD_REQUEST,
                message: error.message,
            });  
        }
    }

    @Put(':id')
    async updateCategory ( 
        @Body() categoryDto: CategoryDto, 
        @Res() res: Response,
        @Param('id') id: string 
    ) {
        try {
            const newCategory = await this.categoryService.updateCategory(Number(id), categoryDto);

            return res.status(HttpStatus.CREATED).json({
                code: HttpStatus.CREATED,
                message: 'Category updated successfully',
                data: newCategory
            });
        } catch (error) {
            return res.status(HttpStatus.BAD_REQUEST).json({
                code: HttpStatus.BAD_REQUEST,
                message: error.message,
            });  
        }
    }

    @Get()
    async getAllCategory (@Res() res: Response) {
        const listCategories = await this.categoryService.getAllCategory();
        return res.status(HttpStatus.OK).json({
            code: HttpStatus.OK,
            message: 'Successfully!',
            data: listCategories
        });
    }
}
