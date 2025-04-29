import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';  // اضافه کردن ConfigService
import { config } from 'dotenv';
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, "jwt") {
    constructor(private configService: ConfigService) {
        const secret = configService.get<string>('JWT_SECRET');  // استفاده از ConfigService برای خواندن متغیر

        console.log('JWT_SECRET:', secret);
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: '@!!!jjjj',  // استفاده از ConfigService
        });
    }

    async validate(payload: any) {
        return { username: payload.username, role: payload.role };
    }
}
