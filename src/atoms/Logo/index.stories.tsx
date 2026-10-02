import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { Logo } from '.';

const meta = {
  title: 'Atoms/Logo',
  component: Logo,
  args: {
    $src: '/next.svg',
    $width: 100,
    $height: 20,
    'aria-label': 'Next.js logo',
  },
} satisfies Meta<typeof Logo>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
