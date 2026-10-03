import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { ResultButton } from '.';

const meta = {
  title: 'Organisms/LocationSearch/Results/ResultButton',
  component: ResultButton,
  args: { children: 'Amsterdam, North Holland, NL' },
  // role="option" requires a listbox (or group) parent - see `Results`.
  decorators: [
    Story => (
      <ul role="listbox" aria-label="Search results">
        <Story />
      </ul>
    ),
  ],
} satisfies Meta<typeof ResultButton>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
