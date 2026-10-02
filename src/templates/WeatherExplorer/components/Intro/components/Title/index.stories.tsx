import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { Title } from '.';

const meta = {
  title: 'Templates/WeatherExplorer/Intro/Title',
  component: Title,
  args: { children: 'Weather Explorer' },
} satisfies Meta<typeof Title>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
