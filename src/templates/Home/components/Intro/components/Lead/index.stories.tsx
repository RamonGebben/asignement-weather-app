import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { Lead } from '.';

const meta = {
  title: 'Templates/Home/Intro/Lead',
  component: Lead,
  args: {
    children:
      'Looking for a starting point or more instructions? Head over to Templates or the Learning center.',
  },
} satisfies Meta<typeof Lead>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
