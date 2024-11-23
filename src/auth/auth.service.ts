import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import { AuthDTO } from './dto/auth.dto';
import { User } from '../user/data/user.entity';
import { access } from 'fs';

@Injectable()
export class AuthService {

    constructor(
        private readonly userService: UserService,
        private readonly jwtService: JwtService
    ) {}

    async login(body: AuthDTO) {
        const user = await this.userService.getUserByEmail(body.email);
        if(user?.password !== body.password) {
            throw new UnauthorizedException("Credenciais inválidas")
        }

        const payload = {email: user.email, sub: user.id}
        return {
            access_token: this.jwtService.sign(payload, {
                expiresIn: '7d'
            })
        }
    }

    getProfile(userId: number) {
        return this.userService.getUserById(userId)
    }
}
