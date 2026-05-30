import {
  ArgumentsHost,
  Catch,
  ConflictException,
  ExceptionFilter,
  HttpStatus,
  InternalServerErrorException,
} from '@nestjs/common';
import { Response } from 'express';
import { QueryFailedError } from 'typeorm';
import {
  getPostgresErrorCode,
  isForeignKeyViolation,
  isUniqueViolation,
} from '../utils/typeorm-errors';

@Catch(QueryFailedError)
export class TypeOrmExceptionFilter implements ExceptionFilter {
  catch(exception: QueryFailedError, host: ArgumentsHost): void {
    const response = host.switchToHttp().getResponse<Response>();

    if (isUniqueViolation(exception)) {
      const body = new ConflictException('Resource already exists').getResponse();
      response.status(HttpStatus.CONFLICT).json(body);
      return;
    }

    if (isForeignKeyViolation(exception)) {
      response.status(HttpStatus.BAD_REQUEST).json({
        statusCode: HttpStatus.BAD_REQUEST,
        message: 'Related resource does not exist',
        error: 'Bad Request',
      });
      return;
    }

    const code = getPostgresErrorCode(exception);
    const body = new InternalServerErrorException(
      code ? `Database error (${code})` : 'Database error',
    ).getResponse();
    response.status(HttpStatus.INTERNAL_SERVER_ERROR).json(body);
  }
}
