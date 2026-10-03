import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { useRef } from 'react';
import { Caption } from '~/atoms/Typography';
import { Tooltip } from '.';

/** Just enough to give `Tooltip` something to float above. */
const Anchor = () => {
  const anchorRef = useRef<HTMLButtonElement>(null);
  return (
    <div style={{ marginTop: '4rem' }}>
      <button ref={anchorRef} type="button">
        Anchor
      </button>
      <Tooltip anchorRef={anchorRef}>
        <Caption $tone="muted">Floating above the anchor.</Caption>
      </Tooltip>
    </div>
  );
};

const meta = {
  title: 'Molecules/Tooltip',
  component: Tooltip,
  // Real positioning needs a real anchor element, so `Anchor` builds its
  // own ref rather than taking one through args.
  args: { anchorRef: { current: null }, children: null },
  render: () => <Anchor />,
} satisfies Meta<typeof Tooltip>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
