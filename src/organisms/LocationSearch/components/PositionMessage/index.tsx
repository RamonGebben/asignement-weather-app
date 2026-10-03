'use client';

import type { RefObject } from 'react';
import { useEffect, useState } from 'react';
import { Caption } from '~/atoms/Typography';
import { VisuallyHidden } from '~/atoms/VisuallyHidden';
import type { PositionStatus } from '~/hooks/useBrowserPosition';
import { Tooltip } from '~/molecules/Tooltip';
import { statusTone } from './statusTone';

export { statusTone } from './statusTone';
export type { StatusTone } from './statusTone';

const FLASH_MS = 4000;

const messages = {
  idle: '',
  locating: 'Finding your location…',
  located: 'Found your location.',
  denied: 'Location access was denied. Search for a place instead.',
  unavailable: 'Your location is unavailable right now.',
  unsupported: 'This browser can’t share its location.',
} as const satisfies Record<PositionStatus, string>;

export interface PositionMessageProps {
  status: PositionStatus;
  /** The locate button this message explains - floats above it. */
  anchorRef: RefObject<HTMLElement | null>;
}

/**
 * Floats above the locate button as a brief, auto-hiding flash. A
 * persistent `VisuallyHidden` live region carries the actual announcement,
 * separate from the (purely visual) floating `Caption`.
 */
export const PositionMessage = ({
  status,
  anchorRef,
}: PositionMessageProps) => {
  const message = messages[status];
  const isProblem = statusTone(status) === 'problem';

  // Re-arm the flash whenever a new status comes in, adjusting state during
  // render (https://react.dev/learn/you-might-not-need-an-effect) rather
  // than in an effect.
  const [syncedStatus, setSyncedStatus] = useState(status);
  const [visible, setVisible] = useState(message !== '');
  if (status !== syncedStatus) {
    setSyncedStatus(status);
    setVisible(message !== '');
  }

  useEffect(() => {
    if (!visible) return;
    const timer = setTimeout(() => setVisible(false), FLASH_MS);
    return () => clearTimeout(timer);
  }, [visible, syncedStatus]);

  return (
    <>
      <VisuallyHidden role={isProblem ? 'alert' : 'status'}>
        {message}
      </VisuallyHidden>
      {visible && message && (
        <Tooltip anchorRef={anchorRef}>
          <Caption $tone={isProblem ? 'error' : 'muted'}>{message}</Caption>
        </Tooltip>
      )}
    </>
  );
};
