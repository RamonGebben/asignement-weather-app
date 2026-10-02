import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { Status } from '.';

const meta = {
  title: 'Molecules/ResponsePanel/Status',
  component: Status,
  args: { children: 'Loaded.', $tone: 'neutral' },
  argTypes: {
    $tone: { control: 'inline-radio', options: ['neutral', 'error'] },
  },
} satisfies Meta<typeof Status>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Neutral: Story = {};

export const ErrorTone: Story = {
  args: {
    children: 'Error: The weather service is unavailable',
    $tone: 'error',
  },
};
