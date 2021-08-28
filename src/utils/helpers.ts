/**
 * Checks if process NODE_ENV in 'development' mode
 */
import { env } from 'process';

// eslint-disable-next-line import/prefer-default-export
export function inDev(): boolean {
  return String(env.NODE_ENV) === 'development';
}
