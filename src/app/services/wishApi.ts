export interface Wish {
  id: string;
  name: string;
  message: string;
  attending: string;
  timestamp: string;
}

export type WishInput = Pick<Wish, "name" | "message" | "attending">;

const BASE = `${import.meta.env.API_BASE_URL ?? "https://api.wedding.com"}/api`;

export async function fetchWishes(): Promise<Wish[]> {
  const res = await fetch(`${BASE}/wishes`);
  if (!res.ok) throw new Error(`GET /api/wishes failed: ${res.status}`);
  return res.json();
}

export async function createWish(data: WishInput): Promise<Wish> {
  const res = await fetch(`${BASE}/wishes`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error(`POST /api/wishes failed: ${res.status}`);
  return res.json();
}
