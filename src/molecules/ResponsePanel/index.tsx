'use client';

import { useId } from 'react';
import { Card } from '~/atoms/Card';
import { CodeBlock } from '~/atoms/CodeBlock';
import { Caption } from '~/atoms/Typography';
import { Header } from './components/Header';

export interface ResponsePanelProps {
  title: string;
  /** The tRPC procedure or helper that produced the data, e.g. `weather.get`. */
  procedure: string;
  /** What the procedure was called with; omitted when it hasn't been called. */
  input?: unknown;
  data?: unknown;
  isLoading: boolean;
  /** Only the message is shown, so any error-like value will do. */
  error?: { message: string } | null;
}

/** Shows one response raw, as formatted JSON, with its request and status. */
export const ResponsePanel = ({
  title,
  procedure,
  input,
  data,
  isLoading,
  error,
}: ResponsePanelProps) => {
  const headingId = useId();
  const header = { id: headingId, title, procedure, input };

  if (isLoading) {
    return (
      <Card as="section" $gap="s" aria-labelledby={headingId} aria-busy="true">
        <Header {...header} />
        <Caption $tone="muted" role="status">
          Loading…
        </Caption>
      </Card>
    );
  }

  if (error) {
    return (
      <Card as="section" $gap="s" aria-labelledby={headingId}>
        <Header {...header} />
        <Caption $tone="error" role="alert">
          Error: {error.message}
        </Caption>
      </Card>
    );
  }

  if (data === undefined) {
    return (
      <Card as="section" $gap="s" aria-labelledby={headingId}>
        <Header {...header} />
        <Caption $tone="muted" role="status">
          No data yet.
        </Caption>
      </Card>
    );
  }

  return (
    <Card as="section" $gap="s" aria-labelledby={headingId}>
      <Header {...header} />
      <Caption $tone="muted" role="status">
        Loaded.
      </Caption>
      <CodeBlock aria-label={`${procedure} response`}>
        <code>{JSON.stringify(data, null, 2)}</code>
      </CodeBlock>
    </Card>
  );
};
