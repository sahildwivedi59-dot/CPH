const RAW_SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY;
const CONTACT_TABLE = import.meta.env.VITE_SUPABASE_CONTACT_TABLE || 'contact_inquiries';

const SUPABASE_URL = RAW_SUPABASE_URL
  ? RAW_SUPABASE_URL.replace(/\/rest\/v1\/?$/, '').replace(/\/$/, '')
  : '';

export const isSupabaseConfigured = Boolean(SUPABASE_URL && SUPABASE_ANON_KEY);

export async function saveContactInquiry(inquiry) {
  if (!isSupabaseConfigured) {
    throw new Error('Supabase is not configured. Add VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY to your .env file.');
  }

  const response = await fetch(`${SUPABASE_URL}/rest/v1/${CONTACT_TABLE}`, {
    method: 'POST',
    headers: {
      apikey: SUPABASE_ANON_KEY,
      Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
      'Content-Type': 'application/json',
      Prefer: 'return=minimal'
    },
    body: JSON.stringify({ ...inquiry, status: 'new' })
  });

  if (!response.ok) {
    const message = await response.text();
    throw new Error(message || 'Unable to save inquiry in Supabase.');
  }
}