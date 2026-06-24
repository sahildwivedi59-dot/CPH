import { supabaseAuth, supabaseRest } from '../lib/supabaseClient';

const ADMIN_SESSION_KEY = 'cph_admin_session';

export const REQUIRED_SERVICE_OPTIONS = [
  'AI Automation Work',
  'Website Development',
  'App Building',
  'CRM Development',
  'SaaS Software Development',
  'Custom Software Development'
];

export const LEAD_STATUSES = ['New', 'Accepted', 'Declined'];

export function saveAdminSession(session) {
  sessionStorage.setItem(ADMIN_SESSION_KEY, JSON.stringify(session));
}

export function getAdminSession() {
  try {
    const rawSession = sessionStorage.getItem(ADMIN_SESSION_KEY);
    return rawSession ? JSON.parse(rawSession) : null;
  } catch {
    return null;
  }
}

export function clearAdminSession() {
  sessionStorage.removeItem(ADMIN_SESSION_KEY);
}

export async function signInAdmin(email, password) {
  const session = await supabaseAuth('token?grant_type=password', { email, password });
  saveAdminSession(session);
  return session;
}

export async function getAdminRecord(session = getAdminSession()) {
  if (!session?.access_token || !session?.user?.id) return null;

  const records = await supabaseRest(
    `admin_users?select=id,email,role,user_id&user_id=eq.${encodeURIComponent(session.user.id)}&limit=1`,
    { accessToken: session.access_token }
  );

  return records?.[0] || null;
}

export async function createLead(lead) {
  return supabaseRest('leads', {
    method: 'POST',
    headers: { Prefer: 'return=minimal' },
    body: {
      name: lead.name,
      email: lead.email || null,
      phone: lead.phone,
      business_type: lead.business_type || null,
      required_service: lead.required_service,
      budget: lead.budget || null,
      project_requirement: lead.project_requirement,
      status: 'New'
    },
    returnMinimal: true
  });
}

export async function fetchLeads(session = getAdminSession()) {
  if (!session?.access_token) throw new Error('Admin session is missing.');

  return supabaseRest(
    'leads?select=id,name,email,phone,business_type,required_service,budget,project_requirement,status,notes,created_at,status_updated_at&order=created_at.desc',
    { accessToken: session.access_token }
  );
}

export async function updateLead(leadId, patch, session = getAdminSession()) {
  if (!session?.access_token) throw new Error('Admin session is missing.');

  return supabaseRest(`leads?id=eq.${encodeURIComponent(leadId)}`, {
    method: 'PATCH',
    accessToken: session.access_token,
    headers: { Prefer: 'return=representation' },
    body: patch
  });
}
