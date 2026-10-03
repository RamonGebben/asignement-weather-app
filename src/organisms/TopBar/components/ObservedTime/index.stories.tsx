import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { sampleWeatherReport } from '~/weather/samples';
import { ObservedTime } from '.';

const meta = {
  title: 'Organisms/TopBar/ObservedTime',
  component: ObservedTime,
  args: {
    observed: {
      at: sampleWeatherReport.current.observedAt,
      timezoneOffset: sampleWeatherReport.timezoneOffset,
    },
  },
} satisfies Meta<typeof ObservedTime>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Loading: Story = {
  args: { observed: undefined },
};
