import { Body, Controller, HttpStatus, Post, Res, UsePipes, ValidationPipe } from '@nestjs/common';
import { RegisterUserDto } from './dto/register-user.dto';
import { Response } from 'express';
import { AuthService } from './auth.service';
import { User } from 'src/users/entities/user.entity';
import { LoginUserDto } from './dto/login-user.dto';

@Controller('auth')
export class AuthController {
    
    constructor(private authService: AuthService){}

    @Post('register')
    @UsePipes(ValidationPipe)
    async register(@Body() registerUserDto: RegisterUserDto, @Res() res: Response) {
        try {
            const user: User = await this.authService.register(registerUserDto);
            return res.status(HttpStatus.CREATED).json({
                statusCode: HttpStatus.CREATED,
                message: 'User registered successfully',
                data: user
            })
        } catch (error) {           
            return res.status(HttpStatus.BAD_REQUEST).json({
                statusCode: error.status,
                message: 'Registration failed',
                error: error.message
            });
        }
    }
    
    @Post('login')
    @UsePipes(ValidationPipe)
    async login(@Body() loginUserDto: LoginUserDto): Promise<string> {
        return await this.authService.login(loginUserDto);
    }
}