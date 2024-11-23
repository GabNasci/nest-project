import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AppConfigService {
    
    constructor(private readonly configService: ConfigService) {
    }

    get serverPort(): number {
        return this.configService.get<number>('SERVER_PORT') ?? 3000
    }

    get databaseSynchronize(): boolean {
        return this.configService.get<boolean>('DATABASE_SYNCHRONIZE') ?? false
    }

    get jwtKey(): string | undefined {
        return this.configService.get<string>('JWT_KEY')
    }

}
