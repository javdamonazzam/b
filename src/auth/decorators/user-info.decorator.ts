import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import * as jwtDecode from 'jwt-decode';

export const UserInfo = createParamDecorator(
  (data: any, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const token = request.headers.authorization.split(' ')[1];
    const decodedToken = jwtDecode.jwtDecode(token);
    return decodedToken;
  },
);