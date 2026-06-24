const RAW_SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const SUPABASE_URL = RAW_SUPABASE_URL
  ? RAW_SUPABASE_URL.replace(/\/rest\/v1\/?$/, '').replace(/\/$/, '')
  : '';

export const SUPABASE_ANON_KEY_VALUE = SUPABASE_ANON_KEY || '';

export const isSupabaseConfigured = Boolean(SUPABASE_URL && SUPABASE_ANON_KEY_VALUE);

function assertConfigured() {
  if (!isSupabaseConfigured) {
    throw new Error('Supabase is not configured. Add VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY to your .env file.');
  }
}

export async function supabaseRest(path, options = {}) {
  assertConfigured();

  const headers = {
    apikey: SUPABASE_ANON_KEY_VALUE,
    'Content-Type': 'application/json',
    ...(options.accessToken ? { Authorization: `Bearer ${options.accessToken}` } : { Authorization: `Bearer ${SUPABASE_ANON_KEY_VALUE}` }),
    ...(options.headers || {})
  };

  const response = await fetch(`${SUPABASE_URL}/rest/v1/${path}`, {
    method: options.method || 'GET',
    headers,
    body: options.body === undefined ? undefined : JSON.stringify(options.body)
  });

  if (!response.ok) {
    const message = await response.text();
    let errorMessage = message || 'Supabase request failed.';

    try {
      const parsed = JSON.parse(message);
      if (parsed?.code === 'PGRST205') {
        errorMessage = 'Supabase table public.leads is missing. Run supabase/create_leads_table.sql in your Supabase SQL editor, then submit again.';
      } else if (parsed?.message) {
        errorMessage = parsed.message;
      }
    } catch {
      // Keep the original response text when it is not JSON.
    }

    throw new Error(errorMessage);
  }

  if (response.status === 204 || options.returnMinimal) {
    return null;
  }

  return response.json();
}

export async function supabaseAuth(path, body) {
  assertConfigured();

  const response = await fetch(`${SUPABASE_URL}/auth/v1/${path}`, {
    method: 'POST',
    headers: {
      apikey: SUPABASE_ANON_KEY_VALUE,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  });

  if (!response.ok) {
    const message = await response.text();
    throw new Error(message || 'Authentication failed.');
  }

  return response.json();
}
