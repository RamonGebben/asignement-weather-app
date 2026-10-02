import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { Meter } from '.';

const meta = {
  title: 'Atoms/Meter',
  component: Meter,
  args: { min: 0, max: 1, value: 0.8, 'aria-label': 'Daylight passed' },
} satisfies Meta<typeof Meter>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
