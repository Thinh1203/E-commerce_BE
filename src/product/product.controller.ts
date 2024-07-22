import { Body, Controller, HttpStatus, Post, Res, UploadedFile, UploadedFiles, UseInterceptors } from '@nestjs/common';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { Response } from 'express';
import { ProductService } from './product.service';
import { ProductDto } from './dto/product.dto';

@Controller('product')
export class ProductController {
    // constructor(
    //     private productService: ProductService
    // ){}

    // @Post()
    // async addProduct(
    //     @Body() productDto : ProductDto,
    //     @Res() res: Response
    // ) {
    //     try {
    //         const newProduct = await this.productService.addProduct(productDto);
    //         return res.status(HttpStatus.CREATED).json({
    //             code: HttpStatus.CREATED,
    //             message: 'Add product successfully',
    //             data: newProduct
    //         });
    //     } catch (error) {
    //     return res.status(HttpStatus.BAD_REQUEST).json({
    //             code: HttpStatus.BAD_REQUEST,
    //             message: error.message,
    //         });  
    //     }
    // }

    // @Post()
    // @UseInterceptors(FilesInterceptor('files', 5))
    // async addProduct(
    //     @UploadedFiles() files: Express.Multer.File[],
    //     // @Body('product') productData: string,
    //     // @Body('variants') variantsData: string,
    //     @Res() res: Response
    // ){
    //     try {
    //         // const newProduct = await this.productService.addProduct(product, variants, files);
    //         return res.status(HttpStatus.CREATED).json({
    //             code: HttpStatus.CREATED,
    //             message: 'Add product seccessfully',
    //             data: ''
    //         });
    //     } catch (error) {
    //         return res.status(HttpStatus.BAD_REQUEST).json({
    //             code: HttpStatus.BAD_REQUEST,
    //             message: error.message,
    //         });    
    //     }
      
    // }
}
