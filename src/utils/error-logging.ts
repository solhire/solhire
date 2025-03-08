interface ErrorWithMessage {
  message: string;
  stack?: string;
}

function toErrorWithMessage(maybeError: unknown): ErrorWithMessage {
  if (maybeError instanceof Error) {
    return maybeError;
  }

  try {
    return new Error(JSON.stringify(maybeError));
  } catch {
    return new Error(String(maybeError));
  }
}

export function getErrorMessage(error: unknown) {
  return toErrorWithMessage(error).message;
}

export function logError(error: unknown, context?: string) {
  const errorMessage = getErrorMessage(error);
  const errorWithStack = toErrorWithMessage(error);
  
  // Log to console in development
  if (process.env.NODE_ENV === 'development') {
    console.error(`🔴 Error${context ? ` [${context}]` : ''}: ${errorMessage}`);
    if (errorWithStack.stack) {
      console.error(errorWithStack.stack);
    }
  }

  // In production, you might want to send this to a logging service
  if (process.env.NODE_ENV === 'production') {
    // TODO: Implement production error logging service
    // Example: Sentry, LogRocket, etc.
  }
}

export function handleApiError(error: unknown, context?: string) {
  logError(error, context);
  
  if (error instanceof Error) {
    if (error.message.includes('not found')) {
      return { status: 404, message: 'Resource not found' };
    }
    if (error.message.includes('unauthorized') || error.message.includes('not authenticated')) {
      return { status: 401, message: 'Unauthorized' };
    }
    if (error.message.includes('forbidden')) {
      return { status: 403, message: 'Forbidden' };
    }
    if (error.message.includes('validation')) {
      return { status: 400, message: 'Invalid request' };
    }
  }
  
  return { status: 500, message: 'Internal server error' };
} 