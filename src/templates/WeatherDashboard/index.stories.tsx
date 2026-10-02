import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { fn } from 'storybook/test';
import { defaultLocation } from '~/weather/defaultLocation';
import { sampleSearchResults, sampleWeatherReport } from '~/weather/samples';
import { WeatherDashboard } from '.';

const search = {
  query: '',
  onQueryChange: fn(),
  onSubmit: fn(),
  isSearching: false,
  onSelect: fn(),
  positionStatus: 'idle',
  onUseMyLocation: fn(),
} as const;

const meta = {
  title: 'Templates/WeatherDashboard',
  component: WeatherDashboard,
  parameters: { layout: 'fullscreen' },
  args: {
    location: defaultLocation,
    search,
    report: sampleWeatherReport,
    fetchedAt: new Date('2026-10-02T14:24:20.000Z'),
    isLoading: false,
  },
} satisfies Meta<typeof WeatherDashboard>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Loaded: Story = {};

/** After sunset the sky turns to its night gradient. */
export const Night: Story = {
  args: { fetchedAt: new Date('2026-10-02T21:00:00.000Z') },
};

export const Rain: Story = {
  args: {
    report: {
      ...sampleWeatherReport,
      current: {
        ...sampleWeatherReport.current,
        condition: 'rain',
        description: 'moderate rain',
      },
    },
  },
};

export const Searching: Story = {
  args: {
    search: { ...search, query: 'Amsterdam', results: sampleSearchResults },
  },
};

export const Loading: Story = {
  args: { report: undefined, fetchedAt: undefined, isLoading: true },
};

export const Failed: Story = {
  args: {
    report: undefined,
    fetchedAt: undefined,
    error: new Error('The weather service is unavailable'),
  },
};
