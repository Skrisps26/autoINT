const API_BASE = "http://localhost:8000";

export async function getState() {
  const res = await fetch(`${API_BASE}/state`);
  return res.json();
}

export async function simulate() {
  const res = await fetch(`${API_BASE}/simulate`, { method: "POST" });
  return res.json();
}
