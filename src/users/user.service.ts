import { Injectable } from '@nestjs/common';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>  
    ){}

    async getAllUser(): Promise<User[]> {
        return await this.userRepository.find({
            select:['id', 'firstName', 'lastName', 'email', 'isActive','createdAt','updatedAt', 'role', 'points'],
            where: {role: 'customer'}
        })
    }

    async getOneUser(id: number): Promise<User> {   
        return await this.userRepository.findOne({
            select:['id', 'firstName', 'lastName', 'email', 'isActive','createdAt','updatedAt', 'role', 'points'],
            where: {id}
        });
    }
}
