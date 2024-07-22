import { Body, Controller, Get, HttpStatus, Post, Res } from '@nestjs/common';
import { TagService } from './tag.service';
import { Response } from 'express';
import { TagDto } from './dto/tag.dto';

@Controller('tag')
export class TagController {
    constructor(
        private tagService: TagService
    ){}

    @Post()
    async addTag(@Body() tagDto: TagDto, @Res() res: Response) {
        try {
            const newTag = await this.tagService.addTag(tagDto);

            return res.status(HttpStatus.CREATED).json({
                code: HttpStatus.CREATED,
                message: 'Add tag successfully',
                data: newTag
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
        const listTags = await this.tagService.getAllTag();
        return res.status(HttpStatus.OK).json({
            code: HttpStatus.OK,
            message: 'Successfully!',
            data: listTags
        });
    }
    
}
