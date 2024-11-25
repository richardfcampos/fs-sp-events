import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users.service';

@Injectable()
export class UserUpdateGuard implements CanActivate {
  constructor(
    private usersService: UsersService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const user = request.user; // This is the user object from the JWT token
    const userIdToUpdate = request.params.id; // Assuming you pass the user ID in the route

    // Ensure the logged-in user is only updating their own record
    if (user.id !== +userIdToUpdate) {
      throw new UnauthorizedException('You can only update your own profile.');
    }

    return true;
  }
}
