import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { Icon } from '~/atoms/Icon';
import { ToggleButton } from '.';

const meta = {
  title: 'Molecules/ColorModeToggle/ToggleButton',
  component: ToggleButton,
  render: () => (
    <ToggleButton>
      <Icon name="sun" />
      <Icon name="moon" />
    </ToggleButton>
  ),
} satisfies Meta<typeof ToggleButton>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
