import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from '../decorator/roles.decorator';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    // Route se required roles lo
    const requiredRoles = this.reflector.getAllAndOverride<string[]>(
      ROLES_KEY,
      [context.getHandler(), context.getClass()],
    );

    // Agar route pe role defined hi nahi → allow
    if (!requiredRoles) return true;

    // Logged-in user
    const { user } = context.switchToHttp().getRequest();

    // Check role
    return requiredRoles.includes(user.role);
  }
}
