import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { fn } from 'storybook/test';
import { defaultLocation } from '~/weather/defaultLocation';
import {
  sampleReverseLocation,
  sampleSearchResults,
  sampleWeatherReport,
} from '~/weather/samples';
import { WeatherExplorer } from '.';

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
  title: 'Templates/WeatherExplorer',
  component: WeatherExplorer,
  parameters: { layout: 'fullscreen' },
  args: {
    location: defaultLocation,
    search,
    panels: [
      {
        title: 'Weather',
        procedure: 'weather.get',
        input: defaultLocation.coordinates,
        data: sampleWeatherReport,
        isLoading: false,
      },
      {
        title: 'Search results',
        procedure: 'location.search',
        input: { query: 'Amsterdam' },
        data: sampleSearchResults,
        isLoading: false,
      },
      {
        title: 'Place at my position',
        procedure: 'location.reverse',
        input: sampleReverseLocation.coordinates,
        data: sampleReverseLocation,
        isLoading: false,
      },
    ],
  },
} satisfies Meta<typeof WeatherExplorer>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Loaded: Story = {
  args: {
    search: { ...search, query: 'Amsterdam', results: sampleSearchResults },
  },
};

export const Loading: Story = {
  args: {
    panels: [
      {
        title: 'Weather',
        procedure: 'weather.get',
        input: defaultLocation.coordinates,
        isLoading: true,
      },
      {
        title: 'Search results',
        procedure: 'location.search',
        isLoading: false,
      },
    ],
  },
};

export const Failed: Story = {
  args: {
    panels: [
      {
        title: 'Weather',
        procedure: 'weather.get',
        input: defaultLocation.coordinates,
        isLoading: false,
        error: new Error('The weather service is unavailable'),
      },
    ],
  },
};
