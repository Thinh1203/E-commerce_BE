import { UserService } from './user.service';
import { UserFilterDto } from './dto/user-filter.dto';
import { Response } from 'express';
export declare class UserController {
    private userService;
    constructor(userService: UserService);
    getAllUser(res: Response, query: UserFilterDto): Promise<Response<any, Record<string, any>>>;
    getOneCustomer(id: string, res: Response, req: Request): Promise<any>;
}
