import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async updateFcmToken(userId: string, fcmToken: string) {
    let user = await this.userRepository.findOne({ where: { id: userId } });

    if (!user) {
      user = this.userRepository.create({ id: userId, fcmToken });
    } else {
      user.fcmToken = fcmToken;
    }

    await this.userRepository.save(user);
    return { message: 'FCM Token updated successfully' };
  }
}
