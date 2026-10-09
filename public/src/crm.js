// API base URL - empty string if served from the same domain
const API_BASE = '/api';

export async function getLeads() {
  const res = await fetch(`${API_BASE}/leads`);
  if (!res.ok) {
    if (res.status === 401 || res.status === 403) {
      throw new Error("Unauthorized");
    }
    throw new Error("Failed to fetch leads");
  }
  return res.json();
}

export async function saveLead(data) {
  const res = await fetch(`${API_BASE}/leads`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });
  if (!res.ok) throw new Error("Failed to save lead");
  return res.json();
}

export async function updateStatus(id, status) {
  const res = await fetch(`${API_BASE}/leads/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ status })
  });
  if (!res.ok) throw new Error("Failed to update status");
  return res.json();
}

export async function login(username, password) {
  const res = await fetch(`${API_BASE}/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password })
  });
  if (!res.ok) throw new Error("Login failed");
  return res.json();
}

export async function logout() {
  await fetch(`${API_BASE}/logout`, { method: 'POST' });
}

export async function checkAuth() {
  try {
    const res = await fetch(`${API_BASE}/check-auth`);
    if (!res.ok) return false;
    const data = await res.json();
    return data.authenticated;
  } catch (e) {
    return false;
  }
}
