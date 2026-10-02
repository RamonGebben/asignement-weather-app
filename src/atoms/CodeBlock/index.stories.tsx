import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { CodeBlock } from '.';

const meta = {
  title: 'Atoms/CodeBlock',
  component: CodeBlock,
  args: {
    children: JSON.stringify(
      { condition: 'partly-cloudy', temperature: 20.3, humidity: 63 },
      null,
      2,
    ),
  },
} satisfies Meta<typeof CodeBlock>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Overflowing: Story = {
  args: {
    children: JSON.stringify({ description: 'x'.repeat(240) }, null, 2),
  },
};
