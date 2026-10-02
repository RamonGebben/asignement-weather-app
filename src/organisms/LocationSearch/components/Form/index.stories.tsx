import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { Form } from '.';

const meta = {
  title: 'Organisms/LocationSearch/Form',
  component: Form,
  args: { children: 'Form content', 'aria-label': 'Example form' },
} satisfies Meta<typeof Form>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
