import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { UserFilterDto } from './dto/user-filter.dto';
export declare class UserService {
    private userRepository;
    constructor(userRepository: Repository<User>);
    getAllUser(query: UserFilterDto): Promise<{
        total: number;
        data: User[];
        prev_page: number;
        next_page: number;
        last_page: number;
    }>;
    getOneUser(id: number): Promise<User>;
}
