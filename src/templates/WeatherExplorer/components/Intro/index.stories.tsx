import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { defaultLocation } from '~/weather/defaultLocation';
import { Intro } from '.';

const meta = {
  title: 'Templates/WeatherExplorer/Intro',
  component: Intro,
  args: { location: defaultLocation },
} satisfies Meta<typeof Intro>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
