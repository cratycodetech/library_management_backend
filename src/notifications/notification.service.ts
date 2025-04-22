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
    console.log('📥 Input userIds:', userIds);
    const ids = Array.isArray(userIds) ? userIds : [userIds];
    console.log('📝 Normalized userIds array:', ids);

    // 🔹 Fetch users from DB
    const users = await this.userRepository.find({
      where: { id: In(ids) },
    });
    console.log('👥 Fetched users:', users);

    if (users.length === 0) {
      console.log('🚨 No users found for IDs:', ids);
    }

    // 🔹 Extract FCM tokens
    const tokens = users
      .map(user => {
        console.log(`🔍 User: ${user.id}, FCM Token: ${user.fcmToken}`);
        return user.fcmToken;
      })
      .filter(token => !!token);

    console.log('🎯 Extracted tokens:', tokens);

    if (tokens.length === 0) {
      console.log('🚫 No valid FCM tokens found for users:', ids);
      return { success: false, message: 'No valid FCM tokens found for users' };
    }

    // 🔹 Prepare messages
    const messages = tokens.map(token => ({
      notification: { title, body },
      token,
    }));

    console.log('📨 Prepared messages:', messages);

    try {
      const responses = await Promise.all(
        messages.map(msg => {
          console.log('🚀 Sending message to token:', msg.token);
          return admin.messaging().send(msg);
        })
      );
      console.log('✅ Successfully sent notifications:', responses);
      return { success: true, message: 'Notifications sent successfully', responses };
    } catch (error) {
      console.error('❌ Error sending push notifications:', error);
      return { success: false, message: 'Failed to send notifications' };
    }
  }
}
