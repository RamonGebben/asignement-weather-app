import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { Panels } from '.';

const meta = {
  title: 'Templates/WeatherExplorer/Panels',
  component: Panels,
  args: { children: 'Panel grid content' },
} satisfies Meta<typeof Panels>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
