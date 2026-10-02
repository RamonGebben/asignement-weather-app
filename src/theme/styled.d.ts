import 'styled-components';
import type DesignSystem from '@pindakaasman/design-system';

declare module 'styled-components' {
  // Declaration merging needs an interface; the empty body is the point.
  // eslint-disable-next-line @typescript-eslint/no-empty-object-type
  export interface DefaultTheme extends DesignSystem {}
}
