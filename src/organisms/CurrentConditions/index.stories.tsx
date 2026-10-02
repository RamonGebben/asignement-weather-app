import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { defaultLocation } from '~/weather/defaultLocation';
import { sampleWeatherReport } from '~/weather/samples';
import { CurrentConditions } from '.';

const meta = {
  title: 'Organisms/CurrentConditions',
  component: CurrentConditions,
  args: {
    location: defaultLocation,
    current: sampleWeatherReport.current,
    today: sampleWeatherReport.today,
  },
} satisfies Meta<typeof CurrentConditions>;

export default meta;

type Story = StoryObj<typeof meta>;

export const PartlyCloudy: Story = {};

export const Storm: Story = {
  args: {
    current: {
      ...sampleWeatherReport.current,
      condition: 'storm',
      description: 'thunderstorm with heavy rain',
      temperature: 22.4,
    },
    today: { ...sampleWeatherReport.today, precipitationProbability: 0.9 },
  },
};
