import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { Section } from '.';

const meta = {
  title: 'Molecules/ResponsePanel/Section',
  component: Section,
  args: { children: 'Panel content', 'aria-label': 'Example panel' },
} satisfies Meta<typeof Section>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
