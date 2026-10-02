import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { Area } from '../Area';
import { Layout } from '.';

const meta = {
  title: 'Templates/WeatherDashboard/Layout',
  component: Layout,
  parameters: { layout: 'fullscreen' },
  args: {
    children: [
      <Area key="hero" $area="hero">
        Hero
      </Area>,
      <Area key="side" $area="side">
        Side
      </Area>,
      <Area key="forecast" $area="forecast">
        Forecast
      </Area>,
    ],
  },
} satisfies Meta<typeof Layout>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
