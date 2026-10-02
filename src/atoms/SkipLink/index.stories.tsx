import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { expect } from 'storybook/test';
import { SkipLink } from '.';

const meta = {
  title: 'Atoms/SkipLink',
  component: SkipLink,
  args: { href: '#main', children: 'Skip to the weather' },
} satisfies Meta<typeof SkipLink>;

export default meta;

type Story = StoryObj<typeof meta>;

export const AppearsOnFocus: Story = {
  play: async ({ canvas, userEvent }) => {
    await userEvent.tab();
    await expect(
      canvas.getByRole('link', { name: 'Skip to the weather' }),
    ).toHaveFocus();
  },
};
