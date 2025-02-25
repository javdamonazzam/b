import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { isPublic } from 'src/auth/utils/auth-utils';

@Injectable()
export class PermissionGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const permissions = this.reflector.get<string[]>(
      'permissions',
      context.getHandler(),
    );
    if (!permissions || isPublic(context, this.reflector)) {
      // No permissions specified or route is public allow access by default
      return true;
    }

    const userPermissions = context.switchToHttp().getRequest()
      .user?.permissions;

    return userPermissions.some((permission) =>
      permissions.includes(permission),
    );
  }
}
