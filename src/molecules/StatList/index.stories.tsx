import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { StatList } from '.';

const meta = {
  title: 'Molecules/StatList',
  component: StatList,
  args: {
    stats: [
      { label: 'Direction', value: 'SSW (192°)' },
      { label: 'Gusts', value: '19.3 km/h' },
      { label: 'Beaufort', value: 'Force 2' },
    ],
  },
} satisfies Meta<typeof StatList>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
