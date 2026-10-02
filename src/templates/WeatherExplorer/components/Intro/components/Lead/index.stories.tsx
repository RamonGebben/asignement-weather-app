import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { Lead } from '.';

const meta = {
  title: 'Templates/WeatherExplorer/Intro/Lead',
  component: Lead,
  args: { children: 'Showing Utrecht, Utrecht, NL' },
} satisfies Meta<typeof Lead>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
