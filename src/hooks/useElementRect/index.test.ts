import { describe, expect, it } from 'vitest';
import { toDocumentRect } from '.';

describe('toDocumentRect', () => {
  it('shifts a viewport-relative rect by the scroll offset', () => {
    expect(
      toDocumentRect(
        { top: 10, bottom: 30, left: 5, right: 105, width: 100 },
        { x: 20, y: 200 },
      ),
    ).toEqual({ top: 210, bottom: 230, left: 25, right: 125, width: 100 });
  });

  it('leaves the rect unchanged at zero scroll', () => {
    const box = { top: 10, bottom: 30, left: 5, right: 105, width: 100 };
    expect(toDocumentRect(box, { x: 0, y: 0 })).toEqual(box);
  });
});
