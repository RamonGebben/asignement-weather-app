import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { Stack } from '.';

const items = ['One', 'Two', 'Three'].map(label => (
  <span key={label}>{label}</span>
));

const meta = {
  title: 'Atoms/Stack',
  component: Stack,
  args: {
    $direction: 'column',
    $gap: 'base',
    $wrap: false,
    children: items,
  },
  argTypes: {
    $direction: { control: 'inline-radio', options: ['column', 'row'] },
    $gap: {
      control: 'select',
      options: ['xxs', 'xs', 's', 'base', 'm', 'l', 'xl'],
    },
  },
} satisfies Meta<typeof Stack>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Column: Story = {};

export const Row: Story = {
  args: { $direction: 'row', $gap: 'xs', $align: 'center' },
};

export const Wrapping: Story = {
  args: {
    $direction: 'row',
    $wrap: true,
    $gap: 's',
    children: Array.from({ length: 24 }, (_, index) => (
      <span key={index}>Item {index + 1}</span>
    )),
  },
};
