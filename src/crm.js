// Camada CRM. Hoje salva no localStorage (demo).
// TODO (Jules): trocar por POST para API/CRM real (RD Station, HubSpot, Supabase, Google Sheets...)
const KEY = "turbonet_leads";

export function getLeads() {
  return JSON.parse(localStorage.getItem(KEY) || "[]");
}

export async function saveLead(data) {
  const leads = getLeads();
  leads.unshift({ id: crypto.randomUUID(), status: "novo", createdAt: new Date().toISOString(), ...data });
  localStorage.setItem(KEY, JSON.stringify(leads));
}

export function updateStatus(id, status) {
  localStorage.setItem(KEY, JSON.stringify(getLeads().map((l) => (l.id === id ? { ...l, status } : l))));
}
