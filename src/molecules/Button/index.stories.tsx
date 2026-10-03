import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { Button } from '.';

const meta = {
  title: 'Molecules/Button',
  component: Button,
  args: {
    $variant: 'primary',
    children: 'Search',
  },
  argTypes: {
    $variant: {
      control: 'inline-radio',
      options: ['primary', 'secondary', 'quaternary', 'error'],
    },
    icon: { control: 'select', options: ['locate', 'sun', 'moon'] },
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

export const WithIcon: Story = {
  args: { $variant: 'secondary', icon: 'locate', children: 'Use my location' },
};

export const IconOnly: Story = {
  args: {
    $variant: 'secondary',
    icon: 'locate',
    $iconOnly: true,
    children: 'Use my location',
  },
};

// quaternary/error stand in for a status color - see `Button`'s `ButtonVariant`.
export const Positive: Story = {
  args: {
    $variant: 'quaternary',
    icon: 'locate',
    $iconOnly: true,
    children: 'Found your location',
  },
};

export const Problem: Story = {
  args: {
    $variant: 'error',
    icon: 'locate',
    $iconOnly: true,
    children: 'Location access was denied',
  },
};
