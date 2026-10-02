import { describe, expect, it } from 'vitest';
import { createFakeFetch } from '.';

describe('createFakeFetch', () => {
  it('answers a routed path with its body and status', async () => {
    const { fetch } = createFakeFetch({
      '/a': { status: 201, body: { ok: true } },
    });

    const response = await fetch('https://example.test/a?x=1');

    expect(response.status).toBe(201);
    expect(await response.json()).toEqual({ ok: true });
  });

  it('answers 404 for unrouted paths', async () => {
    const { fetch } = createFakeFetch({});

    expect((await fetch('https://example.test/b')).status).toBe(404);
  });

  it('rejects with the configured error', async () => {
    const { fetch } = createFakeFetch({ '/c': { error: new Error('boom') } });

    await expect(fetch('https://example.test/c')).rejects.toThrow('boom');
  });

  it('records requested URLs', async () => {
    const { fetch, requests } = createFakeFetch({ '/d': { body: null } });

    await fetch(new URL('https://example.test/d?q=1'));

    expect(requests.map(String)).toEqual(['https://example.test/d?q=1']);
  });
});
