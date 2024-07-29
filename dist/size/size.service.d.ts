import { Size } from './entities/size.entity';
import { Repository } from 'typeorm';
import { SizeDto } from './dto/size.dto';
export declare class SizeService {
    private sizesRepository;
    constructor(sizesRepository: Repository<Size>);
    addSize(sizeDto: SizeDto): Promise<SizeDto & Size>;
    getAllSize(): Promise<Size[]>;
}
