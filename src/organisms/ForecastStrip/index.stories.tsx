import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { sampleWeatherReport } from '~/weather/samples';
import { ForecastStrip } from '.';

const meta = {
  title: 'Organisms/ForecastStrip',
  component: ForecastStrip,
  args: {
    days: [sampleWeatherReport.today, ...sampleWeatherReport.forecast],
  },
} satisfies Meta<typeof ForecastStrip>;

export default meta;

type Story = StoryObj<typeof meta>;

export const SixDays: Story = {};

export const ShortForecast: Story = {
  args: { days: [sampleWeatherReport.today, sampleWeatherReport.forecast[0]!] },
};
