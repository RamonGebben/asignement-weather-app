import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import type { ComponentProps } from 'react';
import { skies } from '~/theme/skies';
import type { WeatherCondition } from '~/weather/model';
import { SkyBackdrop } from '.';

/** The sky prop, plus the condition and time of day that pick it. */
type SkyBackdropStoryArgs = ComponentProps<typeof SkyBackdrop> & {
  condition: WeatherCondition;
  daytime: 'day' | 'night';
};

const meta = {
  title: 'Atoms/SkyBackdrop',
  component: SkyBackdrop,
  parameters: { layout: 'fullscreen' },
  args: { condition: 'clear', daytime: 'day' },
  argTypes: {
    // Not a prop: picks the condition half of the sky.
    condition: { control: 'select', options: Object.keys(skies) },
    // Not a prop: picks the day/night half of the sky.
    daytime: { control: 'select', options: ['day', 'night'] },
    // Derived from condition and daytime, not directly editable.
    $sky: { table: { disable: true } },
  },
  render: ({ condition, daytime }) => (
    <SkyBackdrop $sky={skies[condition][daytime]} />
  ),
} satisfies Meta<SkyBackdropStoryArgs>;

export default meta;

type Story = StoryObj<typeof meta>;

export const ClearDay: Story = {};

export const ClearNight: Story = { args: { daytime: 'night' } };

export const Rain: Story = { args: { condition: 'rain' } };

export const Storm: Story = { args: { condition: 'storm', daytime: 'night' } };
