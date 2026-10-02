import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { Wrapper } from '.';

const meta = {
  title: 'Templates/Home/Intro/Wrapper',
  component: Wrapper,
  args: {
    children: 'Intro content',
  },
} satisfies Meta<typeof Wrapper>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
