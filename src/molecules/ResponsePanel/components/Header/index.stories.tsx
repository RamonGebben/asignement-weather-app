import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { Header } from '.';

const meta = {
  title: 'Molecules/ResponsePanel/Header',
  component: Header,
  args: {
    id: 'header-story',
    title: 'Weather',
    procedure: 'weather.get',
    input: { lat: 52.09, lon: 5.12 },
  },
} satisfies Meta<typeof Header>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Called: Story = {};

export const NotCalled: Story = {
  args: { input: undefined },
};
