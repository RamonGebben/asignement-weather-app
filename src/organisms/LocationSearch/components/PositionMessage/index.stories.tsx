import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { useRef } from 'react';
import type { PositionStatus } from '~/hooks/useBrowserPosition';
import { PositionMessage } from '.';

/** Just enough to give the floating message something to anchor to. */
const Anchor = ({ status }: { status: PositionStatus }) => {
  const anchorRef = useRef<HTMLButtonElement>(null);
  return (
    <div style={{ marginTop: '4rem' }}>
      <button ref={anchorRef} type="button">
        Use my location
      </button>
      <PositionMessage status={status} anchorRef={anchorRef} />
    </div>
  );
};

const meta = {
  title: 'Organisms/LocationSearch/PositionMessage',
  component: PositionMessage,
  args: { status: 'locating', anchorRef: { current: null } },
  render: args => <Anchor status={args.status} />,
} satisfies Meta<typeof PositionMessage>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Denied: Story = {
  args: { status: 'denied' },
};
