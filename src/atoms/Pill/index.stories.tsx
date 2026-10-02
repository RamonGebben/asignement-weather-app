import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { Pill } from '.';

const meta = {
  title: 'Atoms/Pill',
  component: Pill,
  args: { children: 'Utrecht, NL' },
} satisfies Meta<typeof Pill>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Muted: Story = {
  args: { $tone: 'muted', children: 'Humidity 63%' },
};
