const API_URL = '/api/leads';

export async function getLeads() {
  try {
    const res = await fetch(API_URL);
    if (res.status === 401) {
      throw new Error('UNAUTHORIZED');
    }
    if (!res.ok) throw new Error('Falha ao buscar leads');
    return await res.json();
  } catch (err) {
    if (err.message === 'UNAUTHORIZED') throw err;
    console.error('API offline, usando fallback', err);
    return JSON.parse(localStorage.getItem('turbonet_leads') || "[]");
  }
}

export async function saveLead(data) {
  try {
    const res = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    if (!res.ok) throw new Error('Falha ao salvar na API');
  } catch (err) {
    console.error('API offline, salvando localmente', err);
    const leads = JSON.parse(localStorage.getItem('turbonet_leads') || "[]");
    leads.unshift({ id: crypto.randomUUID(), status: "novo", createdAt: new Date().toISOString(), ...data });
    localStorage.setItem('turbonet_leads', JSON.stringify(leads));
  }
}

export async function updateStatus(id, status) {
  try {
    const res = await fetch(`${API_URL}/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status })
    });
    if (!res.ok) throw new Error('Falha ao atualizar na API');
  } catch (err) {
    console.error('API offline, atualizando localmente', err);
    const leads = JSON.parse(localStorage.getItem('turbonet_leads') || "[]");
    localStorage.setItem('turbonet_leads', JSON.stringify(leads.map((l) => (l.id === id ? { ...l, status } : l))));
  }
}
