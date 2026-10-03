import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { Icon } from '~/atoms/Icon';
import { Button } from '~/molecules/Button';
import { ToggleButton } from '.';

const meta = {
  title: 'Molecules/ColorModeToggle/ToggleButton',
  component: ToggleButton,
  render: () => (
    <ToggleButton>
      <Button
        $variant="secondary"
        $iconOnly
        iconSlot={
          <>
            <Icon name="sun" />
            <Icon name="moon" />
          </>
        }
      >
        Toggle color mode
      </Button>
    </ToggleButton>
  ),
} satisfies Meta<typeof ToggleButton>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
