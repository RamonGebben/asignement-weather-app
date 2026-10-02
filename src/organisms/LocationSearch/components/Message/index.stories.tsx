import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { Message } from '.';

const meta = {
  title: 'Organisms/LocationSearch/Message',
  component: Message,
  args: { children: 'No places found.', $tone: 'neutral' },
} satisfies Meta<typeof Message>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const ErrorTone: Story = {
  args: { children: 'Search failed: try again', $tone: 'error' },
};
