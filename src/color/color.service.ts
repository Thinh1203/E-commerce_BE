import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Color } from './entities/color.entity';
import { Repository } from 'typeorm';
import { ColorDto } from './dto/color.dto';

@Injectable()
export class ColorService {
    constructor (
        @InjectRepository(Color)
        private colorsRepository : Repository<Color>
    ) {}

    async addColor (colorDto : ColorDto) {
        const checkColor = await this.colorsRepository.findOne({    
            where: {
                name: colorDto.name
            }
        });
        if (checkColor) {
            throw new HttpException("Color already exists", HttpStatus.CONFLICT);
        }
        return await this.colorsRepository.save(colorDto);
    }

    async getAllColor () {
        return await this.colorsRepository.find({
            select: ['id', 'name']
        });
    }
}
