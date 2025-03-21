import { IS_PUBLIC_KEY } from 'src/auth/decorators/public.decorator';
import { ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

//checks if a route is decorated with @Public()
export function isPublic(context: ExecutionContext, reflector: Reflector) {
  return reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
    context.getHandler(),
    context.getClass(),
  ]);
}
