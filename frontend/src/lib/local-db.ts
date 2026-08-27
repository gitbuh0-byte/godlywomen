type LocalRecord = Record<string, any>;

const seeds: Record<string, LocalRecord[]> = {
  articles: [
    { id: "local-1", title: "Finding your people in a busy city", slug: "finding-your-people", excerpt: "Small, genuine connections make a community feel like home.", author: "Forera Community", createdAt: "2026-08-20T10:00:00.000Z" },
    { id: "local-2", title: "A local guide to showing up well", slug: "showing-up-well", excerpt: "A few thoughtful habits can make every introduction more comfortable.", author: "Mia Clark", createdAt: "2026-08-18T10:00:00.000Z" },
  ],
  prayers: [
    { id: "local-1", title: "A prayer for new beginnings", content: "For courage, kindness, and the right people along the way.", author: "Forera Community", createdAt: "2026-08-19T10:00:00.000Z" },
  ],
  marketplace: [
    { id: "local-1", title: "Valencia welcome guide", description: "A curated local guide from our community.", price: 0, seller: "Forera Community", createdAt: "2026-08-17T10:00:00.000Z" },
  ],
  messages: [],
};

function storageKey(collection: string) {
  return `forera:${collection}`;
}

function read(collection: string): LocalRecord[] {
  if (typeof window === "undefined") return seeds[collection] || [];
  const stored = window.localStorage.getItem(storageKey(collection));
  if (!stored) {
    const initial = seeds[collection] || [];
    window.localStorage.setItem(storageKey(collection), JSON.stringify(initial));
    return initial;
  }
  try {
    return JSON.parse(stored);
  } catch {
    return seeds[collection] || [];
  }
}

function write(collection: string, records: LocalRecord[]) {
  if (typeof window !== "undefined") window.localStorage.setItem(storageKey(collection), JSON.stringify(records));
}

export function localApiCall(endpoint: string, method = "GET", data?: LocalRecord) {
  const parts = endpoint.replace(/^\//, "").split("/");
  const collection = parts[1] || "";
  const id = parts[2];
  const records = read(collection);

  if (method === "GET") return id ? records.find((record) => record.id === id || record.slug === id) || null : records;

  if (method === "POST") {
    const record = { ...data, id: `local-${Date.now()}`, createdAt: new Date().toISOString() };
    write(collection, [record, ...records]);
    return record;
  }

  if (method === "PUT" && id) {
    const updated = records.map((record) => record.id === id ? { ...record, ...data, updatedAt: new Date().toISOString() } : record);
    write(collection, updated);
    return updated.find((record) => record.id === id) || null;
  }

  if (method === "DELETE" && id) {
    write(collection, records.filter((record) => record.id !== id));
    return { success: true };
  }

  return records;
}
