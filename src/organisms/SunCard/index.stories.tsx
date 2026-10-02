import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { sampleWeatherReport } from '~/weather/samples';
import { SunCard } from '.';

const meta = {
  title: 'Organisms/SunCard',
  component: SunCard,
  args: {
    sun: sampleWeatherReport.current.sun,
    timezoneOffset: sampleWeatherReport.timezoneOffset,
    now: new Date('2026-10-02T14:24:20.000Z'),
  },
} satisfies Meta<typeof SunCard>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Afternoon: Story = {};

export const BeforeSunrise: Story = {
  args: { now: new Date('2026-10-02T03:00:00.000Z') },
};

export const AfterSunset: Story = {
  args: { now: new Date('2026-10-02T20:00:00.000Z') },
};
