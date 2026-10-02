import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { Grid } from '.';

const meta = {
  title: 'Atoms/Grid',
  component: Grid,
  args: {
    $minColumnWidth: '12rem',
    $gap: 'base',
    children: Array.from({ length: 6 }, (_, index) => (
      <div key={index}>Cell {index + 1}</div>
    )),
  },
} satisfies Meta<typeof Grid>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WideColumns: Story = {
  args: { $minColumnWidth: '28rem' },
};
