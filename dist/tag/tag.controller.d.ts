import { TagService } from './tag.service';
import { Response } from 'express';
import { TagDto } from './dto/tag.dto';
export declare class TagController {
    private tagService;
    constructor(tagService: TagService);
    addTag(tagDto: TagDto, res: Response): Promise<Response<any, Record<string, any>>>;
    getAllTag(res: Response): Promise<Response<any, Record<string, any>>>;
}
