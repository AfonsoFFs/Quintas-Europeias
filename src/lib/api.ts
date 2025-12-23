const API_BASE_URL = "http://127.0.0.1:8000/api";

export async function getJogadores() {
  const res = await fetch(`${API_BASE_URL}/jogadores/`);
  if (!res.ok) throw new Error("Erro ao carregar jogadores");
  return res.json();
}

export async function getJogos() {
  const res = await fetch(`${API_BASE_URL}/jogos/`);
  if (!res.ok) throw new Error("Erro ao carregar jogos");
  return res.json();
}
