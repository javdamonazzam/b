import {
  ArgumentsHost,
  Catch,
  ForbiddenException,
  HttpStatus,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';
import { EntityPropertyNotFoundError, QueryFailedError } from 'typeorm';
import { BaseExceptionFilter } from '@nestjs/core';

@Catch()
export class ExceptionsFilter extends BaseExceptionFilter {
  formatErrorData(data: any[]) {
    const formattedData = {};
    for (const item of data) {
      formattedData[item.property] = Object.values(item.constraints);
    }
    return formattedData;
  }
  catch(exception: any, host: ArgumentsHost) {
    try {
      const ctx = host.switchToHttp();
      const response = ctx.getResponse();
      const errorResponse = {
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        error: true,
        errorData: exception?.message,
        data: null,
      };
      //typeOrm error
      if (exception instanceof QueryFailedError) {
        errorResponse.statusCode = HttpStatus.BAD_REQUEST;
      } else if (exception instanceof UnauthorizedException) {
        errorResponse.errorData = exception.message;
        errorResponse.statusCode = HttpStatus.UNAUTHORIZED;
      } else if (exception instanceof ForbiddenException) {
        if (exception.message === 'Forbidden resource')
          errorResponse.errorData = exception.message;
        else errorResponse.errorData = exception.message;
        errorResponse.statusCode = HttpStatus.FORBIDDEN;
      } else {
        if (exception.code === 'ENOENT') {
          errorResponse.errorData = exception.message;
          errorResponse.statusCode = 404;
        } else {
          const ArrayRes = {};
          if (Array.isArray(exception.getResponse().message)) {
            exception.getResponse().message.forEach((item) => {
              const key = item.split(' ')[0];
              if (!ArrayRes[key]) {
                ArrayRes[key] = [];
              }
              ArrayRes[key].push(item);
            });
            errorResponse.statusCode =
              exception.getResponse()?.statusCode ?? 400;
            errorResponse.errorData = ArrayRes ?? exception.getResponse();
          }
        }
      }
      response.status(errorResponse.statusCode).json(errorResponse);
      return response.send();
    } catch (e) {
      Logger.error('>>>>>>>>>>>CATCH');
      try {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse();
        response.send({
          statusCode: 500,
          error: true,
          errorData: 'Internal Server Error',
          data: null,
        });
      } catch (e) {
        super.catch(exception, host);
      }
    }
  }
}
