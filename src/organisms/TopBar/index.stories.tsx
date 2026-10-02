import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { fn } from 'storybook/test';
import { sampleWeatherReport } from '~/weather/samples';
import { TopBar } from '.';

const meta = {
  title: 'Organisms/TopBar',
  component: TopBar,
  args: {
    search: {
      query: '',
      onQueryChange: fn(),
      onSubmit: fn(),
      isSearching: false,
      onSelect: fn(),
      positionStatus: 'idle',
      onUseMyLocation: fn(),
    },
    observed: {
      at: sampleWeatherReport.current.observedAt,
      timezoneOffset: sampleWeatherReport.timezoneOffset,
    },
  },
} satisfies Meta<typeof TopBar>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Loading: Story = {
  args: { observed: undefined },
};
