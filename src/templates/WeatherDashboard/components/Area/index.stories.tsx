import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { Area } from '.';

const meta = {
  title: 'Templates/WeatherDashboard/Area',
  component: Area,
  args: { $area: 'hero', children: 'A named layout cell' },
} satisfies Meta<typeof Area>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
