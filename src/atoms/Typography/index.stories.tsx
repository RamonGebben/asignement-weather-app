import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { Caption, H1, H2, Label, Lead, P } from '.';

const meta = {
  title: 'Atoms/Typography',
  component: P,
  args: { $tone: 'default', children: 'Partly cloudy, 20°' },
  argTypes: {
    $tone: { control: 'inline-radio', options: ['default', 'muted', 'error'] },
  },
} satisfies Meta<typeof P>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Scale: Story = {
  render: ({ $tone }) => (
    <>
      <H1 $tone={$tone}>H1 · Weather Explorer</H1>
      <H2 $tone={$tone}>H2 · Weather</H2>
      <Lead $tone={$tone}>Lead · Showing Utrecht, Utrecht, NL</Lead>
      <P $tone={$tone}>P · Partly cloudy, 20°</P>
      <Label $tone={$tone} as="span">
        Label · Search for a place
      </Label>
      <Caption $tone={$tone}>Caption · Loaded.</Caption>
    </>
  ),
};

export const Paragraph: Story = {};

export const Muted: Story = {
  render: () => <Caption $tone="muted">Loaded.</Caption>,
};

export const ErrorTone: Story = {
  render: () => (
    <Caption $tone="error">Error: The weather service is unavailable</Caption>
  ),
};

export const H2AsH3: Story = {
  render: () => <H2 as="h3">Styled as H2, rendered as h3</H2>,
};
