export type FakeResponse =
  { status?: number; body: unknown } | { error: Error };

/**
 * A `fetch` stand-in that answers by URL pathname and records every
 * requested URL. Unrouted paths answer 404, so nothing reaches the network.
 */
export const createFakeFetch = (routes: Record<string, FakeResponse>) => {
  const requests: Array<URL> = [];

  const fetch: typeof globalThis.fetch = async input => {
    const url = new URL(input instanceof Request ? input.url : input);
    requests.push(url);

    const route = routes[url.pathname];

    if (!route) return Response.json({ message: 'Not found' }, { status: 404 });
    if ('error' in route) throw route.error;

    return Response.json(route.body, { status: route.status ?? 200 });
  };

  return { fetch, requests };
};
