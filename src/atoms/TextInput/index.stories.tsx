import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { TextInput } from '.';

const meta = {
  title: 'Atoms/TextInput',
  component: TextInput,
  args: {
    'aria-label': 'Place',
    placeholder: 'e.g. Amsterdam',
  },
} satisfies Meta<typeof TextInput>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Empty: Story = {};

export const Filled: Story = {
  args: { defaultValue: 'Utrecht' },
};
