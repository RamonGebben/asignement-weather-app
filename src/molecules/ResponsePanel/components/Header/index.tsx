'use client';

import { Code } from '~/atoms/Code';
import { Request } from './components/Request';
import { Title } from './components/Title';

export interface HeaderProps {
  /** Id of the heading, for the panel's `aria-labelledby`. */
  id: string;
  title: string;
  procedure: string;
  input?: unknown;
}

export const Header = ({ id, title, procedure, input }: HeaderProps) => (
  <header>
    <Title id={id}>{title}</Title>
    <Request>
      <Code>{procedure}</Code>
      {input === undefined ? ' not called' : ' with '}
      {input === undefined ? null : <Code>{JSON.stringify(input)}</Code>}
    </Request>
  </header>
);
