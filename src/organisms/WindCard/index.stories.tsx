import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { WindCard } from '.';

const meta = {
  title: 'Organisms/WindCard',
  component: WindCard,
  args: { wind: { speed: 3.13, direction: 192, gust: 5.36 } },
} satisfies Meta<typeof WindCard>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Breezy: Story = {};

export const WithoutGusts: Story = {
  args: { wind: { speed: 0.45, direction: 185 } },
};

export const Gale: Story = {
  args: { wind: { speed: 19.2, direction: 250, gust: 27.4 } },
};
