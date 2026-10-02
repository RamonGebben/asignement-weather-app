import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { Label } from '.';

const meta = {
  title: 'Atoms/Label',
  component: Label,
  args: {
    children: 'Search for a place',
  },
} satisfies Meta<typeof Label>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
