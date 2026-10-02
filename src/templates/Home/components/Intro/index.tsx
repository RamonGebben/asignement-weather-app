import type { ReactNode } from 'react';
import { Lead } from './components/Lead';
import { Title } from './components/Title';
import { Wrapper } from './components/Wrapper';

interface IntroProps {
  title: ReactNode;
  lead: ReactNode;
}

export const Intro = ({ title, lead }: IntroProps) => {
  return (
    <Wrapper>
      <Title>{title}</Title>
      <Lead>{lead}</Lead>
    </Wrapper>
  );
};
