import type { Wish, WishInput } from "./wishApi";

const SCRIPT_URL = import.meta.env.VITE_GOOGLE_SHEET_SCRIPT_URL ?? "";

export async function fetchWishesFromSheet(): Promise<Wish[]> {
  if (!SCRIPT_URL) {
    console.warn("VITE_GOOGLE_SHEET_SCRIPT_URL is not set");
    return [];
  }
  const res = await fetch(SCRIPT_URL, { redirect: "follow" });
  if (!res.ok) throw new Error(`Google Sheet GET failed: ${res.status}`);
  return res.json();
}

export async function createWishInSheet(data: WishInput): Promise<Wish> {
  if (!SCRIPT_URL) throw new Error("VITE_GOOGLE_SHEET_SCRIPT_URL is not set");
  const res = await fetch(SCRIPT_URL, {
    method: "POST",
    redirect: "follow",
    headers: { "Content-Type": "text/plain" }, // Apps Script reads postData.contents regardless of content-type
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error(`Google Sheet POST failed: ${res.status}`);
  return res.json();
}
