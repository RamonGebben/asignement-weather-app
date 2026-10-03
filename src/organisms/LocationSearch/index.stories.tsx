import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { expect, fn, screen } from 'storybook/test';
import { sampleSearchResults } from '~/weather/samples';
import { LocationSearch } from '.';

const meta = {
  title: 'Organisms/LocationSearch',
  component: LocationSearch,
  args: {
    query: '',
    onQueryChange: fn(),
    onSubmit: fn(),
    isSearching: false,
    onSelect: fn(),
    positionStatus: 'idle',
    onUseMyLocation: fn(),
  },
  argTypes: {
    positionStatus: {
      control: 'select',
      options: [
        'idle',
        'locating',
        'located',
        'denied',
        'unavailable',
        'unsupported',
      ],
    },
  },
} satisfies Meta<typeof LocationSearch>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Idle: Story = {
  play: async ({ args, canvas, userEvent }) => {
    await userEvent.type(
      canvas.getByRole('searchbox', { name: 'Search for a place' }),
      'A',
    );
    await expect(args.onQueryChange).toHaveBeenCalledWith('A');
  },
};

export const SubmitsTheQuery: Story = {
  args: { query: '  Amsterdam ' },
  play: async ({ args, canvas, userEvent }) => {
    await userEvent.click(canvas.getByRole('button', { name: 'Search' }));
    await expect(args.onSubmit).toHaveBeenCalledWith('Amsterdam');
  },
};

export const SubmitsWithEnter: Story = {
  args: { query: 'Utrecht' },
  play: async ({ args, canvas, userEvent }) => {
    await userEvent.type(canvas.getByRole('searchbox'), '{Enter}');
    await expect(args.onSubmit).toHaveBeenCalledWith('Utrecht');
  },
};

export const Searching: Story = {
  args: { query: 'Amsterdam', isSearching: true },
};

export const WithResults: Story = {
  args: { query: 'Amsterdam', results: sampleSearchResults },
  play: async ({ args, canvas, userEvent }) => {
    // The results float in a portal at the end of <body>, outside the
    // story's own canvas, so they're queried from the document instead.
    await userEvent.click(
      screen.getByRole('option', { name: 'Amsterdam, North Holland, NL' }),
    );
    await expect(args.onSelect).toHaveBeenCalledWith(sampleSearchResults[0]);
    await expect(
      canvas.getByRole('searchbox', { name: 'Search for a place' }),
    ).toHaveFocus();
  },
};

export const NavigatesResultsWithArrowKeys: Story = {
  args: { query: 'Amsterdam', results: sampleSearchResults },
  play: async ({ args, canvas, userEvent }) => {
    const input = canvas.getByRole('searchbox', { name: 'Search for a place' });
    input.focus();

    await userEvent.keyboard('{ArrowDown}');
    await expect(input).toHaveAttribute(
      'aria-activedescendant',
      expect.stringContaining('option-0'),
    );

    await userEvent.keyboard('{ArrowDown}');
    await expect(input).toHaveAttribute(
      'aria-activedescendant',
      expect.stringContaining('option-1'),
    );

    await userEvent.keyboard('{Enter}');
    await expect(args.onSelect).toHaveBeenCalledWith(sampleSearchResults[1]);
  },
};

export const NoResults: Story = {
  args: { query: 'Qwxyz', results: [] },
};

export const SearchFailed: Story = {
  args: {
    query: 'Amsterdam',
    searchError: new Error('Too many weather requests, try again shortly'),
  },
};

export const UsesMyLocation: Story = {
  play: async ({ args, canvas, userEvent }) => {
    await userEvent.click(
      canvas.getByRole('button', { name: 'Use my location' }),
    );
    await expect(args.onUseMyLocation).toHaveBeenCalled();
  },
};

export const Locating: Story = {
  args: { positionStatus: 'locating' },
};

export const LocationDenied: Story = {
  args: { positionStatus: 'denied' },
};
