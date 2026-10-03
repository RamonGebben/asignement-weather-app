import type { PositionStatus } from '~/hooks/useBrowserPosition';

export type StatusTone = 'positive' | 'problem' | 'neutral';

/** How a position status should read - shared by the message and the locate button's color. */
export const statusTone = (status: PositionStatus): StatusTone => {
  if (status === 'located') return 'positive';
  if (
    status === 'denied' ||
    status === 'unavailable' ||
    status === 'unsupported'
  ) {
    return 'problem';
  }
  return 'neutral';
};
