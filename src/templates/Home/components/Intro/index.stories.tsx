import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { Intro } from '.';

const meta = {
  title: 'Templates/Home/Intro',
  component: Intro,
  args: {
    title: 'To get started, edit the page.tsx file.',
    lead: 'Looking for a starting point or more instructions? Head over to Templates or the Learning center.',
  },
} satisfies Meta<typeof Intro>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
