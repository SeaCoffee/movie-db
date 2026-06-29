export type RequestStatus = 'idle' | 'loading' | 'succeeded' | 'failed';

export const requestStatus = {
  idle: 'idle',
  loading: 'loading',
  succeeded: 'succeeded',
  failed: 'failed',
} as const;