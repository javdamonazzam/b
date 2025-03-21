import { Injectable } from '@nestjs/common';
import { CreateTelUserDto } from './dto/create-tel_user.dto';
import { BaseCrudService } from '@/base';
import { TelUser } from '@/tel_user/entities/tel_user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '@/user/entities/user.entity';
import { Repository } from 'typeorm';
import axios from 'axios';

@Injectable()
export class TelUserService extends BaseCrudService<TelUser> {
  constructor(
    @InjectRepository(User)
    protected userRepository: Repository<User>,
  ) {
    super(userRepository);
  }
  async createuser(createuser: CreateTelUserDto) {
    console.log(createuser.chatId);
    // await super.create(createuser);
    function modifyConfig(config: any) {
      // Split the config into lines
      let lines = config.split('\n');

      // Find the index for each section
      let interfaceIndex = lines.findIndex((line) =>
        line.startsWith('[Interface]'),
      );
      let peerIndex = lines.findIndex((line) => line.startsWith('[Peer]'));

      // Add MTU
      let mtuLine = 'MTU = 1280';
      if (!lines.includes(mtuLine)) {
        lines.splice(interfaceIndex + 4, 0, mtuLine); // Insert after DNS line
      }

      let keepaliveLine = 'PersistentKeepalive = 21';
      if (!lines.includes(keepaliveLine)) {
        lines.splice(peerIndex + 4, 0, keepaliveLine); // Insert after Endpoint line
      }

      // Join the lines back into a single string
      return lines.join('\n');
    }
    const res = await axios.get(
      `http://213.159.73.194:7199/create?publicKey=${createuser.chatId}`,
    );
    const config = res.data.replace('213.159.73.194', 'ping1.jettingwire.xyz');
    return modifyConfig(config);
  }
}
