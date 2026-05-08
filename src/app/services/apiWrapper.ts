import { fetchWishes, createWish } from "./wishApi";
import { fetchWishesFromSheet, createWishInSheet } from "./googleSheetApi";
import type { Wish, WishInput } from "./wishApi";

const USE_SHEET = import.meta.env.ENABLE_GOOGLE_SHEET === "true";

export async function getWishes(): Promise<Wish[]> {
  return USE_SHEET ? fetchWishesFromSheet() : fetchWishes();
}

export async function addWish(data: WishInput): Promise<Wish> {
  return USE_SHEET ? createWishInSheet(data) : createWish(data);
}

export type { Wish, WishInput };
