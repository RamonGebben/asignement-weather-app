import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { Controls } from '.';

const meta = {
  title: 'Organisms/LocationSearch/Controls',
  component: Controls,
  args: { children: 'Controls content' },
} satisfies Meta<typeof Controls>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
