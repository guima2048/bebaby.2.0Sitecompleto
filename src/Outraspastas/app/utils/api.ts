export async function apiGet(url: string) {
  const res = await fetch(url);
  if (!res.ok) throw new Error("Erro ao buscar dados");
  return res.json();
}

export async function apiPost(url: string, data: any) {
  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Erro ao enviar dados");
  return res.json();
} 