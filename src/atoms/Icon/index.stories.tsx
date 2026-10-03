import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { icons } from './icons';
import { Icon } from '.';

const meta = {
  title: 'Atoms/Icon',
  component: Icon,
  args: { name: 'sun' },
  argTypes: {
    name: { control: 'select', options: Object.keys(icons) },
    size: {
      control: 'select',
      options: ['xxs', 'xs', 's', 'base', 'm', 'l', 'xl'],
    },
  },
} satisfies Meta<typeof Icon>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Large: Story = {
  args: { size: 'xl' },
};

export const CustomColor: Story = {
  args: { color: ['tertiary', 'base'] },
};
