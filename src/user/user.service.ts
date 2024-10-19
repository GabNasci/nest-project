import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDTO } from './dto/create-user.dto';
import { UpdateUserDTO } from './dto/update-user.dto';

@Injectable()
export class UserService {

    private lastId: number = 3;
    private users = [
        {
            id: 1,
            name: "Lal",
            age: 24
        },
        {
            id: 2,
            name: "Lel",
            age: 24
        },
        {
            id: 3,
            name: "Lil",
            age: 24
        }
    ]

    updateUser(userId: number, user: UpdateUserDTO) {
        const userIndex = this.users.findIndex(user => user.id === userId)
        if(userIndex === -1) {
            throw new NotFoundException('Usuário não encontrado.')
        }
        const userToUpdate = this.users[userIndex];
        const updatedUser = {
            ...userToUpdate,
            ...user
        }
    }

    createUser(user: CreateUserDTO) {
        const newUser = {
            ...user,
            id: ++this.lastId
        }
        this.users.push(newUser)
        return newUser
    }

    getUserById(userId: number) {
        const user = this.users.find(user => userId === user.id)
        if (!user) {
            throw new NotFoundException('Usuário não encontrado')
        }
        return user
    }

    getUsers() {
        return this.users
    }
}
