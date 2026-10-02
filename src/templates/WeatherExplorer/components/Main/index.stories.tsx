import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { Main } from '.';

const meta = {
  title: 'Templates/WeatherExplorer/Main',
  component: Main,
  args: { children: 'Page content' },
} satisfies Meta<typeof Main>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
