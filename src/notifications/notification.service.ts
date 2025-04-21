import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../users/user.entity'; // Ensure the correct path
import { admin } from '../config/firebase.config'; // ✅ Fix import

@Injectable()
export class NotificationService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async sendPushNotification(userId: string, title: string, body: string) {
    const user = await this.userRepository.findOne({ where: { id: userId } });

    if (!user || !user.fcmToken) {
      return { success: false, message: 'FCM Token not found for user' };
    }

    const message = {
      notification: {
        title,
        body,
      },
      token: user.fcmToken,
    };

    try {
      await admin.messaging().send(message);
      return { success: true, message: 'Notification sent successfully' };
    } catch (error) {
      console.error('Error sending push notification:', error);
      return { success: false, message: 'Failed to send notification' };
    }
  }
}
