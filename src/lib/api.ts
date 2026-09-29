const apiBaseUrl = (import.meta.env.VITE_API_BASE_URL || '').replace(/\/$/, '');

export async function apiFetch<T>(path: string, init: RequestInit = {}): Promise<T> {
  const headers = new Headers(init.headers);
  if (init.body && !headers.has('Content-Type')) {
    headers.set('Content-Type', 'application/json');
  }

  const response = await fetch(`${apiBaseUrl}${path}`, {
    ...init,
    headers,
    credentials: 'include',
  });
  const body = await response.text();
  let result: (T & { error?: string }) | undefined;

  if (body) {
    try {
      result = JSON.parse(body) as T & { error?: string };
    } catch {
      throw new Error('The server returned an invalid response.');
    }
  }

  if (!response.ok) {
    throw new Error(result?.error || `Request failed (${response.status}).`);
  }
  if (!result) throw new Error('The server returned an empty response.');
  return result;
}