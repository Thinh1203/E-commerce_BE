import { Body, Controller, Get, HttpStatus, Post, Res } from '@nestjs/common';
import { ColorService } from './color.service';
import { Response } from 'express';
import { ColorDto } from './dto/color.dto';

@Controller('color')
export class ColorController {
    constructor(
        private colorService: ColorService
    ){}

    @Post()
    async addTag(@Body() colorDto: ColorDto, @Res() res: Response) {
        try {
            const newColor = await this.colorService.addColor(colorDto);

            return res.status(HttpStatus.CREATED).json({
                code: HttpStatus.CREATED,
                message: 'Color added successfully',
                data: newColor
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
        const listColors = await this.colorService.getAllColor();
        return res.status(HttpStatus.OK).json({
            code: HttpStatus.OK,
            message: 'Successfully!',
            data: listColors
        });
    }
}
