import type { PositionStatus } from '~/hooks/useBrowserPosition';
import { statusTone } from '../components/PositionMessage';

// quaternary/error double as a status color - see `Button`'s `ButtonVariant`.
export const locateButtonVariant = (status: PositionStatus) => {
  const tone = statusTone(status);
  if (tone === 'positive') return 'quaternary';
  if (tone === 'problem') return 'error';
  return 'secondary';
};
