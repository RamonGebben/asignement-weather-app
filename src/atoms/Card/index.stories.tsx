import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { Card } from '.';

const meta = {
  title: 'Atoms/Card',
  component: Card,
  args: {
    $gap: 's',
    children: [<strong key="a">Card title</strong>, <p key="b">Card body</p>],
  },
} satisfies Meta<typeof Card>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
