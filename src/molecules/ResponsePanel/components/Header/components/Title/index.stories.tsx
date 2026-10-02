import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { Title } from '.';

const meta = {
  title: 'Molecules/ResponsePanel/Header/Title',
  component: Title,
  args: { children: 'Weather' },
} satisfies Meta<typeof Title>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
