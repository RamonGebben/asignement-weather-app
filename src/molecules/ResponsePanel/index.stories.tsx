import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { sampleWeatherReport } from '~/weather/samples';
import { ResponsePanel } from '.';

const meta = {
  title: 'Molecules/ResponsePanel',
  component: ResponsePanel,
  args: {
    title: 'Weather',
    procedure: 'weather.get',
    input: { lat: 52.09, lon: 5.12 },
    isLoading: false,
  },
} satisfies Meta<typeof ResponsePanel>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Loaded: Story = {
  args: { data: sampleWeatherReport },
};

export const Loading: Story = {
  args: { isLoading: true },
};

export const Failed: Story = {
  args: { error: new Error('The weather service is unavailable') },
};

export const Empty: Story = {
  args: { input: undefined },
};

export const NullResponse: Story = {
  args: { title: 'Place here', procedure: 'location.reverse', data: null },
};
