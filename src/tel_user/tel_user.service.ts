import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Telegraf, Markup } from 'telegraf';
import { User } from '@/user/entities/user.entity';
import { CreateTelUserDto } from './dto/create-tel_user.dto';
import { WalletService } from '@/wallet/wallet.service';
import { ServiceService } from '@/service/service.service';
import * as QRCode from 'qrcode';

@Injectable()
export class TelUserService implements OnModuleInit {
  private bot: Telegraf;

  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private walletService: WalletService,
    private readonly serviceService: ServiceService,
  ) {
    this.bot = new Telegraf('7897182934:AAFR8JohENrZaEaPo9jv5XO_fcTJ7pLf5zI');
  }

  async onModuleInit() {
    this.bot.start(async (ctx) => {
      const chatId = ctx.message.chat.id;
      let user = await this.userRepository.findOneBy({ username: `${chatId}` });
  
      if (!user) {
        user = this.userRepository.create({
          username: `${chatId}`,
          password: 'jkadjkgkjhlkgsk23423',
          account_price: 45000,
        });
      }
        await this.userRepository.save(user);
  
      let user_wallet = await this.walletService.findOneBy({ user_id: user.id });
  
      await ctx.reply(
        'یکی از گزینه‌های زیر را انتخاب کنید:',
        Markup.keyboard([
          [`💰 ${user_wallet.wallet_balance.toLocaleString('fa-IR')} هزارتومان`],
          ['🔄 تمدید سرویس', '🛒 خرید سرویس'],
          ['تعویض سرویس']
        ]).resize()
      );
    });
  
    // ✅ پردازش خرید سرویس (خارج از this.bot.start)
    this.bot.hears('🛒 خرید سرویس', async (ctx) => {
      const chatId = ctx.message.chat.id;
      let user = await this.userRepository.findOneBy({ username: `${chatId}` });

  
      await ctx.reply(
        "⏳ لطفاً مدت زمان اشتراک را انتخاب کنید:",
        Markup.keyboard([
          [ "2️⃣ دوماهه","1️⃣ یک‌ماهه"],
          [ "6️⃣ شش‌ماهه","3️⃣ سه‌ماهه"],
          ["❌ لغو"]
        ]).resize()
      );
    });
  
    // ✅ پردازش انتخاب مدت زمان اشتراک
    this.bot.hears(["1️⃣ یک‌ماهه", "2️⃣ دوماهه", "3️⃣ سه‌ماهه", "6️⃣ شش‌ماهه"], async (ctx) => {
      const chatId = ctx.message.chat.id;
      let user = await this.userRepository.findOneBy({ username: `${chatId}` });
      let user_wallet = await this.walletService.findOneBy({ user_id: user.id });
  
      let months = 1;
      switch (ctx.message.text) {
        case "2️⃣ دوماهه": months = 2; break;
        case "3️⃣ سه‌ماهه": months = 3; break;
        case "6️⃣ شش‌ماهه": months = 6; break;
        case "9️⃣ نه‌ماهه": months = 9; break;
        case "1️⃣2️⃣ دوازده‌ماهه": months = 12; break;
      }
      if (user_wallet.wallet_balance < 50000) {
        await ctx.reply("❌ موجودی کیف پول شما کافی نیست. لطفاً ابتدا موجودی خود را افزایش دهید.");
        return;
      }
      await ctx.reply("⏳ لطفاً منتظر بمانید، در حال ساخت کانفیگ...");
  
      const res = await this.serviceService.create_account({ ip: '213.159.73.194', id: user.id, month: months, title: "b" });
  
      const buffer = Buffer.from(res.server_info, 'utf-8');
      await ctx.replyWithDocument({ source: buffer, filename: `${res.title}.conf` });
  
      const qrBuffer = await QRCode.toBuffer(res.server_info);
      await ctx.replyWithPhoto({ source: qrBuffer });
  
      await ctx.reply("✅ کانفیگ شما ساخته شد! برای اطلاعات بیشتر به پشتیبانی پیام دهید.");
    });
    this.bot.hears("❌ لغو", async (ctx) => {
      const chatId = ctx.message.chat.id;
      let user = await this.userRepository.findOneBy({ username: `${chatId}` });
      let user_wallet = await this.walletService.findOneBy({ user_id: user.id });
    
      await ctx.reply(
        'یکی از گزینه‌های زیر را انتخاب کنید:',
        Markup.keyboard([
          [`💰 ${user_wallet.wallet_balance.toLocaleString('fa-IR')} هزارتومان`],
          ['🔄 تمدید سرویس', '🛒 خرید سرویس'],
          ['تعویض سرویس']
        ]).resize()
      );
    });
    // ✅ پردازش تمدید سرویس
    this.bot.hears('🔄 تمدید سرویس', async (ctx) => {
      await ctx.reply('🔄 لطفاً اطلاعات تمدید را وارد کنید.');
    });
  
    await this.bot.launch();
    console.log('🤖 ربات تلگرام راه‌اندازی شد.');
  }
  

  async createUser(createUserDto: CreateTelUserDto) {

  }
}
