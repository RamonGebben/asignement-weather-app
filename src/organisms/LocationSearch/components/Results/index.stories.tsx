import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { fn } from 'storybook/test';
import { sampleSearchResults } from '~/weather/samples';
import { Results } from '.';

const meta = {
  title: 'Organisms/LocationSearch/Results',
  component: Results,
  args: {
    listboxId: 'results',
    results: sampleSearchResults,
    isSearching: false,
    activeIndex: null,
    onSelect: fn(),
  },
} satisfies Meta<typeof Results>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const ActiveOption: Story = {
  args: { activeIndex: 0 },
};

export const Searching: Story = {
  args: { results: undefined, isSearching: true },
};

export const NoResults: Story = {
  args: { results: [] },
};

export const Failed: Story = {
  args: {
    results: undefined,
    error: new Error('The weather service is unavailable'),
  },
};

export const NotSearched: Story = {
  args: { results: undefined },
};
