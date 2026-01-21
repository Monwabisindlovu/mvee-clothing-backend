import { Request, Response, NextFunction } from 'express';

/**
 * Global error-handling middleware
 * Must be registered LAST in app.ts
 */
export const errorHandler = (
  err: unknown,
  _req: Request,
  res: Response,
  _next: NextFunction
): void => {
  const error = err as {
    status?: number;
    message?: string;
    errors?: unknown;
  };

  console.error('❌ Error caught:', error);

  const statusCode = error.status ?? 500;
  const message = error.message ?? 'Internal Server Error';

  res.status(statusCode).json({
    success: false,
    status: statusCode,
    message,
    errors: error.errors ?? null,
    timestamp: new Date().toISOString(),
  });
};
