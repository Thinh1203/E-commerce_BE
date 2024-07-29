import { Tag } from 'src/product/entities/tag.entity';
import { Repository } from 'typeorm';
import { TagDto } from './dto/tag.dto';
export declare class TagService {
    private tagRepository;
    constructor(tagRepository: Repository<Tag>);
    addTag(tagDto: TagDto): Promise<Tag>;
    getAllTag(): Promise<Tag[]>;
}
