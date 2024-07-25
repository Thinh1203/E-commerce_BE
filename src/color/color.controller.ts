import { Body, Controller, Get, HttpStatus, Post, Res, UseGuards } from '@nestjs/common';
import { ColorService } from './color.service';
import { Response } from 'express';
import { ColorDto } from './dto/color.dto';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/auth.guard';
import { AdminGuard } from 'src/auth/auth.admin.guard';


@ApiTags('color')
@Controller('color')
export class ColorController {
    constructor(
        private colorService: ColorService
    ){}

    @ApiBearerAuth()
    @Post()
    @ApiResponse({status: 201, description: 'add successfully'})
    @ApiResponse({status: 409, description: 'Color already exists'})
    @ApiResponse({status: 400, description: 'error'})
    @UseGuards(AuthGuard, AdminGuard)
    async addColor(@Body() colorDto: ColorDto, @Res() res: Response) {
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
    @ApiResponse({status: 200, description: 'Successfully'})
    @ApiResponse({status: 400, description: 'error'})
    async getAllTag(@Res() res: Response) {
        const listColors = await this.colorService.getAllColor();
        return res.status(HttpStatus.OK).json({
            code: HttpStatus.OK,
            message: 'Successfully!',
            data: listColors
        });
    }
}
