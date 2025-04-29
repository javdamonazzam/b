import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';  // اضافه کردن ConfigService

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, "jwt") {
  constructor(private configService: ConfigService) {
    console.log('POSTGRES_USER:', process.env.POSTGRES_USER);
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
