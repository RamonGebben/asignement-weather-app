import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { skies } from '~/theme/skies';
import { SkyBackdrop } from '.';

const options = Object.fromEntries(
  Object.entries(skies).flatMap(([condition, { day, night }]) => [
    [`${condition} (day)`, day],
    [`${condition} (night)`, night],
  ]),
);

const meta = {
  title: 'Atoms/SkyBackdrop',
  component: SkyBackdrop,
  parameters: { layout: 'fullscreen' },
  args: { $sky: skies.clear.day },
  argTypes: {
    $sky: {
      control: 'select',
      options: Object.keys(options),
      mapping: options,
    },
  },
} satisfies Meta<typeof SkyBackdrop>;

export default meta;

type Story = StoryObj<typeof meta>;

export const ClearDay: Story = {};

export const ClearNight: Story = { args: { $sky: skies.clear.night } };

export const Rain: Story = { args: { $sky: skies.rain.day } };

export const Storm: Story = { args: { $sky: skies.storm.night } };
