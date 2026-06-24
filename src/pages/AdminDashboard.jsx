import React, { useEffect, useMemo, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, CheckCircle2, Download, Eye, LogOut, RefreshCw, Search, XCircle } from 'lucide-react';
import Logo from '../components/Logo';
import {
  clearAdminSession,
  fetchLeads,
  getAdminRecord,
  getAdminSession,
  LEAD_STATUSES,
  REQUIRED_SERVICE_OPTIONS,
  updateLead
} from '../utils/leadService';

const serviceFilterOptions = ['All', ...REQUIRED_SERVICE_OPTIONS];
const statusFilterOptions = ['All', ...LEAD_STATUSES];

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [leads, setLeads] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [serviceFilter, setServiceFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');
  const [selectedLead, setSelectedLead] = useState(null);
  const [notesDraft, setNotesDraft] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isAccessDenied, setIsAccessDenied] = useState(false);
  const [error, setError] = useState('');
  const [updatingLeadId, setUpdatingLeadId] = useState('');

  const loadLeads = async () => {
    const session = getAdminSession();

    if (!session?.access_token) {
      navigate('/admin-login', { replace: true });
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      const admin = await getAdminRecord(session);
      if (!admin || admin.role !== 'admin') {
        setIsAccessDenied(true);
        return;
      }

      const rows = await fetchLeads(session);
      setLeads(rows || []);
    } catch (loadError) {
      setError(loadError instanceof Error ? loadError.message : 'Unable to load leads.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadLeads();
  }, []);

  const filteredLeads = useMemo(() => {
    const query = searchTerm.trim().toLowerCase();

    return leads.filter(lead => {
      const matchesService = serviceFilter === 'All' || lead.required_service === serviceFilter;
      const matchesStatus = statusFilter === 'All' || lead.status === statusFilter;
      const searchableText = [lead.name, lead.email, lead.phone, lead.required_service, lead.business_type, lead.project_requirement]
        .filter(Boolean)
        .join(' ')
        .toLowerCase();

      return matchesService && matchesStatus && (!query || searchableText.includes(query));
    });
  }, [leads, searchTerm, serviceFilter, statusFilter]);

  const stats = useMemo(() => ([
    { label: 'Total Leads', value: leads.length },
    { label: 'New Leads', value: leads.filter(lead => lead.status === 'New').length },
    { label: 'Accepted', value: leads.filter(lead => lead.status === 'Accepted').length },
    { label: 'Declined', value: leads.filter(lead => lead.status === 'Declined').length }
  ]), [leads]);

  const handleLogout = () => {
    clearAdminSession();
    navigate('/admin-login', { replace: true });
  };

  const handleDecision = async (lead, status) => {
    setUpdatingLeadId(lead.id);
    setError('');

    try {
      const updatedRows = await updateLead(lead.id, {
        status,
        status_updated_at: new Date().toISOString()
      });
      const updatedLead = updatedRows?.[0] || { ...lead, status, status_updated_at: new Date().toISOString() };
      setLeads(current => current.map(item => item.id === lead.id ? updatedLead : item));
      setSelectedLead(current => current?.id === lead.id ? updatedLead : current);
    } catch (updateError) {
      setError(updateError instanceof Error ? updateError.message : 'Unable to update lead status.');
    } finally {
      setUpdatingLeadId('');
    }
  };

  const openLead = (lead) => {
    setSelectedLead(lead);
    setNotesDraft(lead.notes || '');
  };

  const saveNotes = async () => {
    if (!selectedLead) return;

    setUpdatingLeadId(selectedLead.id);
    try {
      const updatedRows = await updateLead(selectedLead.id, { notes: notesDraft });
      const updatedLead = updatedRows?.[0] || { ...selectedLead, notes: notesDraft };
      setLeads(current => current.map(lead => lead.id === selectedLead.id ? updatedLead : lead));
      setSelectedLead(updatedLead);
    } catch (notesError) {
      setError(notesError instanceof Error ? notesError.message : 'Unable to save notes.');
    } finally {
      setUpdatingLeadId('');
    }
  };

  const exportCsv = () => {
    const headers = ['Lead ID', 'Name', 'Email', 'Phone', 'Business Type', 'Required Service', 'Budget', 'Project Requirement', 'Date / Time', 'Status', 'Notes'];
    const rows = filteredLeads.map(lead => [
      lead.id,
      lead.name,
      lead.email || '',
      lead.phone,
      lead.business_type || '',
      lead.required_service,
      lead.budget || '',
      lead.project_requirement,
      formatDate(lead.created_at),
      lead.status,
      lead.notes || ''
    ]);

    const csv = [headers, ...rows]
      .map(row => row.map(value => `"${String(value).replace(/"/g, '""')}"`).join(','))
      .join('\n');

    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `cph-leads-${new Date().toISOString().slice(0, 10)}.csv`;
    link.click();
    URL.revokeObjectURL(url);
  };

  if (isAccessDenied) {
    return (
      <section className="admin-dashboard-page">
        <div className="container admin-denied">
          <Logo />
          <h1>Access denied</h1>
          <p>Your account is logged in, but it is not registered as a CPH admin.</p>
          <button className="btn btn-primary" onClick={handleLogout}>Logout</button>
        </div>
      </section>
    );
  }

  return (
    <section className="admin-dashboard-page">
      <div className="container">
        <header className="admin-dashboard-header">
          <div>
            <Logo />
            <h1>CPH Lead Admin Panel</h1>
            <p>Check website leads and mark each enquiry as accepted or declined.</p>
          </div>
          <div className="admin-header-actions">
            <Link className="btn btn-secondary" to="/"><ArrowLeft size={18} /> Back to Website</Link>
            <button className="btn btn-secondary" onClick={loadLeads}><RefreshCw size={18} /> Refresh</button>
            <button className="btn btn-primary" onClick={handleLogout}><LogOut size={18} /> Logout</button>
          </div>
        </header>

        <div className="admin-security-note">
          Leads are loaded from Supabase. Use Accept or Decline to update the lead status directly in the database.
        </div>

        {error && <div className="admin-error">{error}</div>}

        <div className="admin-stats-grid">
          {stats.map(stat => (
            <div className="glass-card admin-stat-card" key={stat.label}>
              <span>{stat.label}</span>
              <strong>{isLoading ? '-' : stat.value}</strong>
            </div>
          ))}
        </div>

        <div className="glass-card admin-controls admin-controls-4">
          <div className="admin-search-box">
            <Search size={18} className="glow-text" />
            <input
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
              placeholder="Search lead, phone, service, requirement"
            />
          </div>
          <select value={serviceFilter} onChange={(event) => setServiceFilter(event.target.value)}>
            {serviceFilterOptions.map(option => <option value={option} key={option}>{option}</option>)}
          </select>
          <select value={statusFilter} onChange={(event) => setStatusFilter(event.target.value)}>
            {statusFilterOptions.map(option => <option value={option} key={option}>{option}</option>)}
          </select>
          <button className="btn btn-primary" onClick={exportCsv} disabled={!filteredLeads.length}>
            <Download size={18} /> Export CSV
          </button>
        </div>

        <div className="glass-card admin-table-card">
          <div className="admin-table-wrap">
            <table className="admin-leads-table">
              <thead>
                <tr>
                  <th>Lead</th>
                  <th>Contact</th>
                  <th>Required Service</th>
                  <th>Budget</th>
                  <th>Project Requirement</th>
                  <th>Date / Time</th>
                  <th>Status</th>
                  <th>Decision</th>
                </tr>
              </thead>
              <tbody>
                {isLoading ? (
                  <tr><td colSpan="8">Loading leads...</td></tr>
                ) : filteredLeads.length ? filteredLeads.map(lead => (
                  <tr key={lead.id}>
                    <td>
                      <strong style={{ color: 'white' }}>{lead.name}</strong>
                      <div style={{ color: 'var(--text-muted)', fontSize: '0.82rem' }}>#{lead.id.slice(0, 8)}</div>
                    </td>
                    <td>
                      <div>{lead.phone}</div>
                      <div style={{ color: 'var(--text-muted)', fontSize: '0.82rem' }}>{lead.email || '-'}</div>
                    </td>
                    <td>{lead.required_service}</td>
                    <td>{lead.budget || '-'}</td>
                    <td className="admin-requirement-cell">{lead.project_requirement}</td>
                    <td>{formatDate(lead.created_at)}</td>
                    <td><StatusBadge status={lead.status} /></td>
                    <td>
                      <LeadActions
                        lead={lead}
                        updatingLeadId={updatingLeadId}
                        onOpen={openLead}
                        onAccept={() => handleDecision(lead, 'Accepted')}
                        onDecline={() => handleDecision(lead, 'Declined')}
                      />
                    </td>
                  </tr>
                )) : (
                  <tr><td colSpan="8">No leads found.</td></tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {selectedLead && (
        <div className="admin-modal-backdrop" onClick={() => setSelectedLead(null)}>
          <div className="glass-card admin-lead-modal" onClick={(event) => event.stopPropagation()}>
            <div className="admin-modal-header">
              <div>
                <span className="mini-label">Lead detail</span>
                <h2>{selectedLead.name}</h2>
              </div>
              <button className="btn btn-secondary" onClick={() => setSelectedLead(null)}>Close</button>
            </div>

            <div className="admin-detail-grid">
              <Detail label="Full name" value={selectedLead.name} />
              <Detail label="Email" value={selectedLead.email || '-'} />
              <Detail label="Phone" value={selectedLead.phone} />
              <Detail label="Business type" value={selectedLead.business_type || '-'} />
              <Detail label="Required service" value={selectedLead.required_service} />
              <Detail label="Budget" value={selectedLead.budget || '-'} />
              <Detail label="Submitted date" value={formatDate(selectedLead.created_at)} />
              <div className="admin-detail-item">
                <span>Status</span>
                <StatusBadge status={selectedLead.status} />
              </div>
            </div>

            <div className="admin-full-detail">
              <span>Project requirement</span>
              <p>{selectedLead.project_requirement}</p>
            </div>

            <label className="admin-notes-field">
              Notes
              <textarea value={notesDraft} onChange={(event) => setNotesDraft(event.target.value)} rows={5} placeholder="Add internal admin notes" />
            </label>

            <div className="admin-modal-actions">
              <button className="btn btn-primary" onClick={() => handleDecision(selectedLead, 'Accepted')} disabled={updatingLeadId === selectedLead.id}>
                <CheckCircle2 size={18} /> Accept
              </button>
              <button className="btn btn-secondary admin-decline-btn" onClick={() => handleDecision(selectedLead, 'Declined')} disabled={updatingLeadId === selectedLead.id}>
                <XCircle size={18} /> Decline
              </button>
              <button className="btn btn-secondary" onClick={saveNotes} disabled={updatingLeadId === selectedLead.id}>Save Notes</button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

const LeadActions = ({ lead, updatingLeadId, onOpen, onAccept, onDecline }) => {
  const isUpdating = updatingLeadId === lead.id;

  return (
    <div className="admin-decision-actions">
      <button onClick={() => onOpen(lead)} title="View lead" className="admin-icon-action"><Eye size={17} /></button>
      <button onClick={onAccept} disabled={isUpdating} className="admin-accept-action"><CheckCircle2 size={17} /> Accept</button>
      <button onClick={onDecline} disabled={isUpdating} className="admin-decline-action"><XCircle size={17} /> Decline</button>
    </div>
  );
};

const StatusBadge = ({ status }) => {
  const className = status === 'Accepted' ? 'accepted' : status === 'Declined' ? 'declined' : 'new';
  return <span className={`admin-status-badge ${className}`}>{status || 'New'}</span>;
};

const Detail = ({ label, value }) => (
  <div className="admin-detail-item">
    <span>{label}</span>
    <strong>{value}</strong>
  </div>
);

function formatDate(value) {
  if (!value) return '-';
  return new Intl.DateTimeFormat('en-IN', {
    dateStyle: 'medium',
    timeStyle: 'short'
  }).format(new Date(value));
}

export default AdminDashboard;
