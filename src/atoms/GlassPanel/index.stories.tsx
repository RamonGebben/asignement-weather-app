import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import type { ComponentProps, ReactNode } from 'react';
import { Caption, H2, P } from '../Typography';
import { GlassPanel } from '.';

/**
 * What the panel floats over in each story. The contrast guarantee is proven
 * in `theme/glass.test.ts`; these show what it looks like over the extremes
 * and over real skies.
 */
const backdrops = {
  black: '#000000',
  white: '#ffffff',
  daySky: 'linear-gradient(to bottom, rgb(62 124 196), rgb(178 210 236))',
  sunsetSky: 'linear-gradient(to bottom, rgb(66 76 138), rgb(238 148 98))',
  nightSky: 'linear-gradient(to bottom, rgb(10 15 36), rgb(34 44 74))',
  /** Hard edges show off the blur. */
  stripes:
    'repeating-linear-gradient(45deg, #000 0 12px, #fff 12px 24px, #e5484d 24px 36px, #3b82f6 36px 48px)',
} as const;

const Backdrop = ({
  background,
  children,
}: {
  background: string;
  children: ReactNode;
}) => (
  <div style={{ background, padding: '3rem', minHeight: '18rem' }}>
    {children}
  </div>
);

/** The panel's props, plus the backdrop to render it over. */
type GlassPanelStoryArgs = ComponentProps<typeof GlassPanel> & {
  backdrop: keyof typeof backdrops;
};

const meta = {
  title: 'Atoms/GlassPanel',
  component: GlassPanel,
  parameters: { layout: 'fullscreen' },
  args: {
    backdrop: 'daySky',
    $gap: 's',
    children: [
      <H2 key="title">Wind status</H2>,
      <P key="body">11.3 km/h from the SSW, gusting to 14.5 km/h.</P>,
      <P key="muted" $tone="muted">
        Feels like 20°. Little chance of rain today.
      </P>,
      <Caption key="error" $tone="error">
        Couldn’t load the weather.
      </Caption>,
    ],
  },
  argTypes: {
    // Not a prop: picks the backdrop the story renders behind the panel.
    backdrop: { control: 'select', options: Object.keys(backdrops) },
  },
  render: ({ backdrop, ...args }) => (
    <Backdrop background={backdrops[backdrop]}>
      <GlassPanel {...args} />
    </Backdrop>
  ),
} satisfies Meta<GlassPanelStoryArgs>;

export default meta;

type Story = StoryObj<typeof meta>;

export const OverDaySky: Story = {};

export const OverSunsetSky: Story = { args: { backdrop: 'sunsetSky' } };

export const OverNightSky: Story = { args: { backdrop: 'nightSky' } };

export const OverBlack: Story = { args: { backdrop: 'black' } };

export const OverWhite: Story = { args: { backdrop: 'white' } };

export const OverHardEdges: Story = { args: { backdrop: 'stripes' } };
