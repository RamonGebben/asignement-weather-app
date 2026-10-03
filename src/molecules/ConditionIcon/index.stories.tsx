import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { conditionIcons } from './conditionIcons';
import { ConditionIcon } from '.';

const meta = {
  title: 'Molecules/ConditionIcon',
  component: ConditionIcon,
  args: { condition: 'clear' },
  argTypes: {
    condition: { control: 'select', options: Object.keys(conditionIcons) },
    size: {
      control: 'select',
      options: ['xxs', 'xs', 's', 'base', 'm', 'l', 'xl'],
    },
  },
} satisfies Meta<typeof ConditionIcon>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Large: Story = {
  args: { size: 'xl' },
};

export const Storm: Story = {
  args: { condition: 'storm' },
};
