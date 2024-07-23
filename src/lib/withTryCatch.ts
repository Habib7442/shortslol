/* eslint-disable @typescript-eslint/no-explicit-any */
// utils/withTryCatch.ts
import { toast } from 'react-hot-toast';

type AsyncFunction<T extends any[]> = (...args: T) => Promise<void>;

export function withTryCatch<T extends any[]>(
  fn: AsyncFunction<T>,
  onFinally?: () => void
) {
  return async (...args: T) => {
    try {
      await fn(...args);
    } catch (error: unknown) {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error('An unknown error occurred.');
      }
    } finally {
      if (onFinally) {
        onFinally();
      }
    }
  };
}
