import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { Observable } from "rxjs";
import { Request } from "express";
import { JwtService } from "@nestjs/jwt";


@Injectable()
export class AuthGuard implements CanActivate {

    constructor(private readonly jwtService: JwtService) {}

    extractAuthorizationToken(request: Request): string | undefined {
        const [tokenType, token] = request.headers.authorization?.split(' ') || []
        if(tokenType.toLowerCase() !== 'bearer') {
            return undefined
        }
        return token
    }
    
    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const request = context.switchToHttp().getRequest() as Request
        const token = this.extractAuthorizationToken(request)

        if(!token) {
            throw new UnauthorizedException('Credenciais inválidas.')
        }

        try {
            const payload = this.jwtService.verify(token)
            request['user'] = payload
            return true
        } catch (e) {
            throw new UnauthorizedException("Credenciais inválidas.")
        }

    }


}