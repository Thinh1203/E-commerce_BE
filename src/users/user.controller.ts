import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './entities/user.entity';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('user')
export class UserController {
    
    constructor(private userService: UserService){}

    @UseGuards(AuthGuard)
    @Get()
    getAllUser(): Promise<User[]> {
        return this.userService.getAllUser();
    }
    
    @UseGuards(AuthGuard)
    @Get(':id')
    getOneCustomer(@Param('id') id: string): Promise<User> {
        return this.userService.getOneUser(Number(id));
    }
}
