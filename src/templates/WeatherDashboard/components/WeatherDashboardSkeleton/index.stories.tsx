import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { defaultLocation } from '~/weather/defaultLocation';
import { WeatherDashboardSkeleton } from '.';

const meta = {
  title: 'Templates/WeatherDashboard/WeatherDashboardSkeleton',
  component: WeatherDashboardSkeleton,
  parameters: { layout: 'fullscreen' },
  args: { location: defaultLocation },
} satisfies Meta<typeof WeatherDashboardSkeleton>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
