import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { Request } from '.';

const meta = {
  title: 'Molecules/ResponsePanel/Header/Request',
  component: Request,
  args: { children: 'weather.get with {"lat":52.09,"lon":5.12}' },
} satisfies Meta<typeof Request>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
