import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { GlassPanel } from '../GlassPanel';
import { Stack } from '../Stack';
import { Skeleton } from '.';

const meta = {
  title: 'Atoms/Skeleton',
  component: Skeleton,
  args: { $width: '12rem', $height: '1rem' },
} satisfies Meta<typeof Skeleton>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Group: Story = {
  render: () => (
    <GlassPanel $gap="m" style={{ maxWidth: '20rem' }}>
      <Stack $gap="xs">
        <Skeleton $width="60%" $height="1.5rem" />
        <Skeleton $width="40%" $height="1.25rem" />
        <Skeleton $width="90%" />
      </Stack>
      <Skeleton $width="8rem" $height="3.5rem" />
    </GlassPanel>
  ),
};
