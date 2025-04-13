import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { BaseCrudService } from 'src/base';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { allConfig as Config } from '../../config/config';
import { RoleEnum } from '@/types/enum/role.enum';
import { WalletService } from '@/wallet/wallet.service';
@Injectable()
export class UserService extends BaseCrudService<User> {
  constructor(
    @InjectRepository(User)
    protected userRepository: Repository<User>,
    private walletService: WalletService,
  ) {
    super(userRepository);
  }
  async create_user(body: CreateUserDto) {
    
    const user = await this.userRepository.findOneBy({
      username: body.username,
    });
    if (user) {
      throw new NotFoundException('چنین کاربری وجود دارد');
    }
    const model_user = await this.userRepository.create(body);
    const savedUser = await this.userRepository.save(model_user);
    const user_wallet = await this.walletService.create({
      wallet_balance: 0,
      user_id: savedUser.id,
    });
    return user_wallet;
  }

  async find(body: CreateUserDto) {
    const user = await this.userRepository.findOne({
      where: {
        username: body.username,
      },
    });
    return user;
  }

  async findOneWithPw(username: string) {
      const user = await this.userRepository.findOne({
        where: { username },
        select: ['id', 'username', 'password', 'role'],
      });
    if (!user)
      throw new UnauthorizedException('نام کاربری یا رمز عبور اشتباه است!');
    return user;
  }
  async initialize() {
    const admin = await this.userRepository.findOneBy({ role: RoleEnum.ADMIN });
    if (!admin) {
      await this.create({
        username: "javad",
        password: "2348",
        account_price: 0,
        role: [RoleEnum.ADMIN],
      });
    }
  }
}
