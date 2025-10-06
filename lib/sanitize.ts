/**
 * Sanitize text content for use in email bodies to prevent header injection
 * and ensure safe rendering.
 *
 * @param text - The text to sanitize
 * @param maxLength - Maximum length to truncate to (default: 500)
 * @returns Sanitized text safe for email content
 */
export function sanitizeEmailContent(text: string, maxLength = 500): string {
  return (
    text
      // Normalize line breaks to prevent header injection
      .replace(/[\r\n]+/g, " ")
      // Remove potentially dangerous characters
      .replace(/[<>]/g, "")
      // Trim whitespace
      .trim()
      // Limit length to prevent abuse
      .slice(0, maxLength)
  );
}
