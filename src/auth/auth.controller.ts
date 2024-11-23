import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDTO } from './dto/auth.dto';
import { AuthGuard } from './auth.guard';
import { Request } from 'express';

@Controller('auth')
export class AuthController {

    constructor(
        private readonly authService: AuthService
    ) {}

    @Post('/login')
    login(@Body() body: AuthDTO,) {
        return this.authService.login(body)
    }

    @UseGuards(AuthGuard)
    @Get('/profile')
    getprofile(@Req() request: Request) {
        return this.authService.getProfile(request['user'].sub)
    }
}
