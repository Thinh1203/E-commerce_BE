import { RegisterUserDto } from './dto/register-user.dto';
import { Response } from 'express';
import { AuthService } from './auth.service';
import { LoginUserDto } from './dto/login-user.dto';
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    register(registerUserDto: RegisterUserDto, res: Response): Promise<Response<any, Record<string, any>>>;
    login(loginUserDto: LoginUserDto): Promise<string>;
}
