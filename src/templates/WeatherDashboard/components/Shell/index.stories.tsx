import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { fn } from 'storybook/test';
import { Shell } from '.';

const meta = {
  title: 'Templates/WeatherDashboard/Shell',
  component: Shell,
  parameters: { layout: 'fullscreen' },
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
    children: 'Page content',
  },
} satisfies Meta<typeof Shell>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
