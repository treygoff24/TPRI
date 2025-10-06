/**
 * Production-safe error logger that prevents sensitive data exposure
 *
 * In production: Logs only safe error metadata
 * In development: Logs full error details for debugging
 */
export function logError(message: string, error: unknown): void {
  if (process.env.NODE_ENV === "production") {
    // In production, log only safe error information
    console.error(message, {
      name: error instanceof Error ? error.name : "Unknown",
      message: error instanceof Error ? error.message : "An error occurred",
      timestamp: new Date().toISOString(),
    });
  } else {
    // In development, log full error for debugging
    console.error(message, error);
  }
}
