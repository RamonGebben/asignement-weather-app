import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { List } from '.';

const meta = {
  title: 'Organisms/LocationSearch/Results/List',
  component: List,
  args: {
    children: <li>Amsterdam, North Holland, NL</li>,
    'aria-label': 'Example results',
  },
} satisfies Meta<typeof List>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
