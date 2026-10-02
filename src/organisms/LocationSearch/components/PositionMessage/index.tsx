'use client';

import { Caption } from '~/atoms/Typography';
import type { PositionStatus } from '~/hooks/useBrowserPosition';

const messages = {
  idle: '',
  locating: 'Finding your location…',
  located: 'Found your location.',
  denied: 'Location access was denied. Search for a place instead.',
  unavailable: 'Your location is unavailable right now.',
  unsupported: 'This browser can’t share its location.',
} as const satisfies Record<PositionStatus, string>;

const isProblem = (status: PositionStatus) =>
  status === 'denied' || status === 'unavailable' || status === 'unsupported';

/** Always rendered, so screen readers announce changes to it. */
export const PositionMessage = ({ status }: { status: PositionStatus }) => (
  <Caption $tone={isProblem(status) ? 'error' : 'muted'} role="status">
    {messages[status]}
  </Caption>
);
