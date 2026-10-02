import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { Button } from '.';

const meta = {
  title: 'Atoms/Button',
  component: Button,
  args: {
    $variant: 'primary',
    children: 'Search',
  },
  argTypes: {
    $variant: { control: 'inline-radio', options: ['primary', 'secondary'] },
  },
} satisfies Meta<typeof Button>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {};

export const Disabled: Story = {
  args: { disabled: true },
};

export const Secondary: Story = {
  args: { $variant: 'secondary', children: 'Use my location' },
};
