import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDTO } from './dto/create-user.dto';
import { UpdateUserDTO } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './data/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {

    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>
    ) {}

    async updateUser(userId: number, user: UpdateUserDTO) {
        const usersCount = await this.userRepository.countBy({
            id: userId
        })
        if (!usersCount) {
            throw new NotFoundException('Usuário não encontrado');
        }
        const userForUpdate = this.userRepository.create({
            ...user,
            id: userId
        })
        return this.userRepository.save(userForUpdate)
    }

    async createUser(user: CreateUserDTO) {
        const newUser = this.userRepository.create(user);
        return this.userRepository.save(newUser)
    }

    getUserById(userId: number) {
        const user = this.userRepository.findOne({
            where: {
                id: userId
            },
            select: ['id', 'name', 'age', 'email']
        });
        if (!user) {
            throw new NotFoundException('Usuário não encontrado');
        }
        return user
    }

    async getUsers() {
        const users = await this.userRepository.find({
            select: ['id', 'name', 'age', 'email']
        });
        return users;
    }

    getUserByEmail(email: string): Promise<User | undefined> {
        return this.userRepository.findOne({
            where: {
                email
            }
        })
    }
}
