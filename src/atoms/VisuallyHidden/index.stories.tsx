import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { VisuallyHidden } from '.';

const meta = {
  title: 'Atoms/VisuallyHidden',
  component: VisuallyHidden,
  args: { children: 'Only screen readers announce this' },
  render: args => (
    <p>
      21°
      <VisuallyHidden {...args} />
    </p>
  ),
} satisfies Meta<typeof VisuallyHidden>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
