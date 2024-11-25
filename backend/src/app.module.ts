import { Module } from '@nestjs/common';
import { EventsModule } from './events/events.module';
import { AuthModule } from './auth/auth.module'
import { UsersModule } from './users/users.module';

@Module({
  imports: [EventsModule, AuthModule, UsersModule],
})
export class AppModule {}
