import { Body, Controller, Get, HttpStatus, Post, Res } from '@nestjs/common';
import { Response } from 'express';
import { SizeService } from './size.service';
import { SizeDto } from './dto/size.dto';


@Controller('size')
export class SizeController {
    constructor(
        private sizeService: SizeService
    ){}

    @Post()
    async addTag(@Body() sizeDto: SizeDto, @Res() res: Response) {
        try {
            const newSize = await this.sizeService.addSize(sizeDto);

            return res.status(HttpStatus.CREATED).json({
                code: HttpStatus.CREATED,
                message: 'Size added successfully',
                data: newSize
            });
        } catch (error) {
            return res.status(HttpStatus.BAD_REQUEST).json({
                code: HttpStatus.BAD_REQUEST,
                message: error.message,
            });  
        }
    }

    @Get()
    async getAllTag(@Res() res: Response) {
        const listSizes = await this.sizeService.getAllSize();
        return res.status(HttpStatus.OK).json({
            code: HttpStatus.OK,
            message: 'Successfully!',
            data: listSizes
        });
    }
}


