'use client';

import { useId } from 'react';
import { CodeBlock } from '~/atoms/CodeBlock';
import { Header } from './components/Header';
import { Section } from './components/Section';
import { Status } from './components/Status';

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
      <Section aria-labelledby={headingId} aria-busy="true">
        <Header {...header} />
        <Status role="status">Loading…</Status>
      </Section>
    );
  }

  if (error) {
    return (
      <Section aria-labelledby={headingId}>
        <Header {...header} />
        <Status role="alert" $tone="error">
          Error: {error.message}
        </Status>
      </Section>
    );
  }

  if (data === undefined) {
    return (
      <Section aria-labelledby={headingId}>
        <Header {...header} />
        <Status role="status">No data yet.</Status>
      </Section>
    );
  }

  return (
    <Section aria-labelledby={headingId}>
      <Header {...header} />
      <Status role="status">Loaded.</Status>
      <CodeBlock aria-label={`${procedure} response`}>
        <code>{JSON.stringify(data, null, 2)}</code>
      </CodeBlock>
    </Section>
  );
};
