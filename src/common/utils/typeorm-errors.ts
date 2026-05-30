import { QueryFailedError } from 'typeorm';

type PostgresDriverError = { code?: string };

export function getPostgresErrorCode(error: unknown): string | undefined {
  if (!(error instanceof QueryFailedError)) {
    return undefined;
  }

  const driverError = error.driverError as PostgresDriverError | undefined;
  return driverError?.code ?? (error as QueryFailedError & PostgresDriverError).code;
}

export function isUniqueViolation(error: unknown): boolean {
  return getPostgresErrorCode(error) === '23505';
}

export function isForeignKeyViolation(error: unknown): boolean {
  return getPostgresErrorCode(error) === '23503';
}
