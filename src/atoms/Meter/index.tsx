'use client';

import styled from 'styled-components';

/** A native `<meter>`: a value within a known range, announced as such. */
export const Meter = styled.meter`
  width: 100%;
  height: ${({ theme }) => theme.spacing('s')};
`;
