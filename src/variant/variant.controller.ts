import { Body, Controller, HttpStatus, Param, Post, Put, Query, Res, UploadedFile, UploadedFiles, UseInterceptors  } from '@nestjs/common';
import { VariantService } from './variant.service';
import { VariantDto } from './dto/variant.dto';
import { Response } from 'express';
import { FilesInterceptor } from '@nestjs/platform-express';


@Controller('variant')
export class VariantController {
    constructor(
        private variantService: VariantService
    ){}

    @Post()
    @UseInterceptors(FilesInterceptor('files', 5))
    async addProduct(
        @UploadedFiles() files: Express.Multer.File[],
        @Body() variantDto: VariantDto,
        @Res() res: Response
    ){
        try {
            const newProductVariant = await this.variantService.addProductVariant(variantDto, files);
            return res.status(HttpStatus.CREATED).json({
                code: HttpStatus.CREATED,
                message: 'Added successfully',
                data: newProductVariant
            });
        } catch (error) {
            return res.status(HttpStatus.BAD_REQUEST).json({
                code: HttpStatus.BAD_REQUEST,
                message: error.message,
            });    
        }
    }

    @Put(':id')
    // @UseInterceptors(FilesInterceptor('files', 5))
    async updateProductVariant(
        // @UploadedFiles() files: Express.Multer.File[],
        @Param('id') id: string, 
        @Body() variantDto: VariantDto,
        @Res() res: Response
    ) {
        try {
            const result = await this.variantService.updateProductVariant(Number(id), variantDto);
                return res.status(HttpStatus.OK).json({
                    code: HttpStatus.CREATED,
                    message: 'Updated successfully',
                    data: result
                });
        } catch (error) {
            return res.status(HttpStatus.BAD_REQUEST).json({
                code: HttpStatus.BAD_REQUEST,
                message: error.message,
            });  
        }
    }
}
