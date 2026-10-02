import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { Field } from '.';

const meta = {
  title: 'Organisms/LocationSearch/Field',
  component: Field,
  args: { children: 'Field content' },
} satisfies Meta<typeof Field>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
