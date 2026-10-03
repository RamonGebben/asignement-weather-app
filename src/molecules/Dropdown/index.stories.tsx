import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { useRef } from 'react';
import { Caption } from '~/atoms/Typography';
import { Dropdown } from '.';

/** Just enough to give `Dropdown` something to float below. */
const Anchor = () => {
  const anchorRef = useRef<HTMLButtonElement>(null);
  return (
    <>
      <button ref={anchorRef} type="button">
        Anchor
      </button>
      <Dropdown anchorRef={anchorRef}>
        <Caption $tone="muted">Floating below the anchor.</Caption>
      </Dropdown>
    </>
  );
};

const meta = {
  title: 'Molecules/Dropdown',
  component: Dropdown,
  // Real positioning needs a real anchor element, so `Anchor` builds its
  // own ref rather than taking one through args.
  args: { anchorRef: { current: null }, children: null },
  render: () => <Anchor />,
} satisfies Meta<typeof Dropdown>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
