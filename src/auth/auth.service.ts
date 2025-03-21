import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '../user/entities/user.entity';
import * as bcrypt from 'bcryptjs';
import { UserService } from 'src/user/user.service';
import { allConfig } from 'config/config';
@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UserService,
    private readonly jwtService: JwtService,
  ) { }
  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.usersService.findOneWithPw(username);

    if (user && user.password && bcrypt.compareSync(pass, user.password)) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }


  async login(users: User) {
    const { username, password } = users;
    if (username) {
      const user = await this.usersService.findOneBy({
        username: users.username,
      });
      const validate = await this.validateUser(username, password);
      if (validate == null) {
        throw new UnauthorizedException('Invalid username or password');
      }
      const payload = { sub: users.id, username: username, id: user.id, role: user.role };

      return {
        username,
        id: user.id,
        role: user.role,
        access_token: this.jwtService.sign(payload, {
          secret: allConfig.jwt.secret,
        }),
      };
    }
  }
}
