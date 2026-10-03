import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { COLOR_MODE_META, setColorMode } from '@pindakaasman/design-system';
import { expect } from 'storybook/test';
import { ColorModeToggle } from '.';

const meta = {
  title: 'Molecules/ColorModeToggle',
  component: ColorModeToggle,
} satisfies Meta<typeof ColorModeToggle>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  play: async ({ canvas, userEvent }) => {
    // Known baseline: no override saved, so no meta tag yet.
    setColorMode('system');
    const metaSelector = `meta[name='${COLOR_MODE_META}']`;
    const button = canvas.getByRole('button', { name: 'Toggle color mode' });

    await userEvent.click(button);
    expect(document.head.querySelector(metaSelector)).not.toBeNull();

    await userEvent.click(button);
    expect(document.head.querySelector(metaSelector)).toBeNull();
  },
};
