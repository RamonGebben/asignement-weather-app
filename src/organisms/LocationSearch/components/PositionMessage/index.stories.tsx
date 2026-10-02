import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { PositionMessage } from '.';

const meta = {
  title: 'Organisms/LocationSearch/PositionMessage',
  component: PositionMessage,
  args: { status: 'locating' },
} satisfies Meta<typeof PositionMessage>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Denied: Story = {
  args: { status: 'denied' },
};
