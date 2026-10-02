import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { Container } from '.';

const meta = {
  title: 'Atoms/Container',
  component: Container,
  parameters: { layout: 'fullscreen' },
  args: {
    $gap: 'm',
    children: [<p key="a">Page section</p>, <p key="b">Another section</p>],
  },
} satisfies Meta<typeof Container>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
