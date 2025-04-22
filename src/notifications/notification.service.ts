import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In } from 'typeorm';
import { User } from '../users/user.entity';
import { admin } from '../config/firebase.config';

@Injectable()
export class NotificationService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async sendPushNotification(userIds: string[] | string, title: string, body: string) {
    const ids = Array.isArray(userIds) ? userIds : [userIds];

    const users = await this.userRepository.find({
      where: { id: In(ids) },  // 🔹 Updated this line
    });

    const tokens = users
      .map(user => user.fcmToken)
      .filter(token => !!token); 

    if (tokens.length === 0) {
      return { success: false, message: 'No valid FCM tokens found for users' };
    }

    const messages = tokens.map(token => ({
      notification: { title, body },
      token,
    }));

    try {
      const responses = await Promise.all(
        messages.map(msg => admin.messaging().send(msg))
      );
      return { success: true, message: 'Notifications sent successfully', responses };
    } catch (error) {
      console.error('Error sending push notifications:', error);
      return { success: false, message: 'Failed to send notifications' };
    }
  }
}
