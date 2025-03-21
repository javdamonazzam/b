import { Controller, Post, UseGuards, Request, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Public } from './decorators/public.decorator';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  @Public()
  // @(AuthGuard('local'))
  @Post('login')
  async login(@Body() Body) {
     
    return await this.authService.login(Body);
  }
}
