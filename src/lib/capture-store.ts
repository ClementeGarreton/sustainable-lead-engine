const KEY = "mas:captured";
const CONTACT_KEY = "mas:contact";

export interface CapturedContact {
  name: string;
  email: string;
  phone: string;
}

export function getContact(): CapturedContact | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(CONTACT_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch { return null; }
}

export function setContact(c: CapturedContact) {
  localStorage.setItem(CONTACT_KEY, JSON.stringify(c));
}

export function getUnlocked(): string[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? JSON.parse(raw) : [];
  } catch { return []; }
}

export function isUnlocked(offerId: string) {
  return getUnlocked().includes(offerId);
}

export function unlockAll(offerId: string) {
  const list = getUnlocked();
  if (!list.includes(offerId)) {
    list.push(offerId);
    localStorage.setItem(KEY, JSON.stringify(list));
  }
}
