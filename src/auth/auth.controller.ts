import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDTO } from './dto/auth.dto';

@Controller('auth')
export class AuthController {

    constructor(
        private readonly authServide: AuthService
    ) {}

    @Post('/login')
    login(@Body() body: AuthDTO,) {
        return this.authServide.login(body)
    }
}
