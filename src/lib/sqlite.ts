/**
 * SQLite in the browser via sql.js, persisted to IndexedDB.
 * Tables: approved_businesses, pending_businesses, user_reviews, favorites.
 */

import type { Database } from 'sql.js';
import type { Business } from '@/data/businessData';
import type { PendingBusiness, UserReview } from '@/types/db';

const IDB_NAME = 'locallink_sqlite';
const IDB_STORE = 'db';
const DEBOUNCE_MS = 500;

let db: Database | null = null;
let persistTimer: ReturnType<typeof setTimeout> | null = null;

async function getSqlJs() {
  const initSqlJs = (await import('sql.js')).default;
  return initSqlJs({
    locateFile: (file: string) => (file.endsWith('.wasm') ? '/sql-wasm.wasm' : file),
  });
}

function runSchema(database: Database) {
  database.run(`
    CREATE TABLE IF NOT EXISTS approved_businesses (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      category TEXT NOT NULL,
      rating REAL DEFAULT 0,
      reviewCount INTEGER DEFAULT 0,
      address TEXT NOT NULL,
      description TEXT,
      image TEXT,
      priceRange TEXT,
      isOpen INTEGER DEFAULT 1,
      lat REAL,
      lng REAL,
      phone TEXT,
      data TEXT
    )
  `);
  database.run(`
    CREATE TABLE IF NOT EXISTS pending_businesses (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      category TEXT NOT NULL,
      address TEXT NOT NULL,
      phone TEXT,
      website TEXT,
      priceRange TEXT NOT NULL,
      description TEXT,
      ownerName TEXT NOT NULL,
      ownerEmail TEXT NOT NULL,
      hours TEXT,
      submittedAt TEXT NOT NULL,
      data TEXT
    )
  `);
  database.run(`
    CREATE TABLE IF NOT EXISTS user_reviews (
      id TEXT PRIMARY KEY,
      businessId TEXT NOT NULL,
      userId TEXT NOT NULL,
      author TEXT NOT NULL,
      initials TEXT,
      rating INTEGER NOT NULL,
      text TEXT NOT NULL,
      date TEXT NOT NULL,
      data TEXT
    )
  `);
  database.run(`
    CREATE TABLE IF NOT EXISTS favorites (
      userId TEXT NOT NULL,
      businessId TEXT NOT NULL,
      PRIMARY KEY (userId, businessId)
    )
  `);
}

function saveToIndexedDB() {
  if (!db) return;
  const data = db.export();
  const request = indexedDB.open(IDB_NAME, 1);
  request.onupgradeneeded = () => request.result.createObjectStore(IDB_STORE);
  request.onsuccess = () => {
    const idb = request.result;
    const tx = idb.transaction(IDB_STORE, 'readwrite');
    const store = tx.objectStore(IDB_STORE);
    store.put({ id: 'main', data }, 'main');
  };
}

function loadFromIndexedDB(): Promise<Uint8Array | null> {
  return new Promise((resolve) => {
    const request = indexedDB.open(IDB_NAME, 1);
    request.onupgradeneeded = () => request.result.createObjectStore(IDB_STORE);
  request.onsuccess = () => {
    const idb = request.result;
    const tx = idb.transaction(IDB_STORE, 'readonly');
    const store = tx.objectStore(IDB_STORE);
    const getReq = store.get('main');
    getReq.onsuccess = () => resolve(getReq.result?.data ?? null);
    getReq.onerror = () => resolve(null);
  };
    request.onerror = () => resolve(null);
  });
}

function schedulePersist() {
  if (persistTimer) clearTimeout(persistTimer);
  persistTimer = setTimeout(() => {
    persistTimer = null;
    saveToIndexedDB();
  }, DEBOUNCE_MS);
}

// --- Approved businesses ---
function rowToBusiness(row: (string | number | null)[]): Business {
  const data = row[13] ? JSON.parse(row[13] as string) : {};
  return {
    id: String(row[0]),
    name: String(row[1]),
    category: String(row[2]),
    rating: Number(row[3]) || 0,
    reviewCount: Number(row[4]) || 0,
    address: String(row[5]),
    description: String(row[6] ?? ''),
    image: String(row[7] ?? ''),
    priceRange: String(row[8] ?? ''),
    isOpen: row[9] ? 1 === row[9] : true,
    lat: Number(row[10]) || 0,
    lng: Number(row[11]) || 0,
    phone: row[12] ? String(row[12]) : undefined,
    ...data,
  };
}

export function getApprovedBusinesses(): Business[] {
  if (!db) return [];
  const stmt = db.prepare('SELECT * FROM approved_businesses');
  const out: Business[] = [];
  while (stmt.step()) out.push(rowToBusiness(stmt.get()));
  stmt.free();
  return out;
}

export function addApprovedBusiness(b: Business) {
  if (!db) return;
  db.run(
    `INSERT OR REPLACE INTO approved_businesses (id, name, category, rating, reviewCount, address, description, image, priceRange, isOpen, lat, lng, phone, data)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [
      b.id,
      b.name,
      b.category,
      b.rating,
      b.reviewCount,
      b.address,
      b.description ?? '',
      b.image ?? '',
      b.priceRange ?? '',
      b.isOpen ? 1 : 0,
      b.lat,
      b.lng,
      b.phone ?? null,
      JSON.stringify({}),
    ]
  );
  schedulePersist();
}

export function setApprovedBusinesses(list: Business[]) {
  if (!db) return;
  db.run('DELETE FROM approved_businesses');
  list.forEach((b) => addApprovedBusiness(b));
}

export function updateApprovedBusiness(id: string, updates: Partial<Business>) {
  const list = getApprovedBusinesses();
  const idx = list.findIndex((b) => b.id === id);
  if (idx === -1) return;
  addApprovedBusiness({ ...list[idx], ...updates });
}

export function removeApprovedBusiness(id: string) {
  if (!db) return;
  db.run('DELETE FROM approved_businesses WHERE id = ?', [id]);
  schedulePersist();
}

// --- Pending businesses ---
function rowToPending(row: (string | number | null)[]): PendingBusiness {
  return {
    id: String(row[0]),
    name: String(row[1]),
    category: String(row[2]),
    address: String(row[3]),
    phone: row[4] ? String(row[4]) : undefined,
    website: row[5] ? String(row[5]) : undefined,
    priceRange: String(row[6]),
    description: String(row[7] ?? ''),
    ownerName: String(row[8]),
    ownerEmail: String(row[9]),
    hours: row[10] ? String(row[10]) : undefined,
    submittedAt: String(row[11]),
  };
}

export function getPendingBusinesses(): PendingBusiness[] {
  if (!db) return [];
  const stmt = db.prepare('SELECT id, name, category, address, phone, website, priceRange, description, ownerName, ownerEmail, hours, submittedAt FROM pending_businesses');
  const out: PendingBusiness[] = [];
  while (stmt.step()) out.push(rowToPending(stmt.get()));
  stmt.free();
  return out;
}

export function addPendingBusiness(p: PendingBusiness) {
  if (!db) return;
  db.run(
    `INSERT INTO pending_businesses (id, name, category, address, phone, website, priceRange, description, ownerName, ownerEmail, hours, submittedAt, data)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [
      p.id,
      p.name,
      p.category,
      p.address,
      p.phone ?? null,
      p.website ?? null,
      p.priceRange,
      p.description,
      p.ownerName,
      p.ownerEmail,
      p.hours ?? null,
      p.submittedAt,
      '',
    ]
  );
  schedulePersist();
}

export function removePendingBusiness(id: string) {
  if (!db) return;
  db.run('DELETE FROM pending_businesses WHERE id = ?', [id]);
  schedulePersist();
}

// --- User reviews ---
function rowToReview(row: (string | number | null)[]): UserReview {
  return {
    id: String(row[0]),
    businessId: String(row[1]),
    userId: String(row[2]),
    author: String(row[3]),
    initials: String(row[4] ?? ''),
    rating: Number(row[5]),
    text: String(row[6]),
    date: String(row[7]),
  };
}

export function getAllReviewsFromDb(): UserReview[] {
  if (!db) return [];
  const stmt = db.prepare('SELECT * FROM user_reviews');
  const out: UserReview[] = [];
  while (stmt.step()) out.push(rowToReview(stmt.get()));
  stmt.free();
  return out;
}

export function getReviewsByBusinessId(businessId: string): UserReview[] {
  if (!db) return [];
  const stmt = db.prepare('SELECT * FROM user_reviews WHERE businessId = ?');
  stmt.bind([businessId]);
  const out: UserReview[] = [];
  while (stmt.step()) out.push(rowToReview(stmt.get()));
  stmt.free();
  return out;
}

export function addReview(r: UserReview) {
  if (!db) return;
  db.run(
    `INSERT INTO user_reviews (id, businessId, userId, author, initials, rating, text, date, data) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [r.id, r.businessId, r.userId, r.author, r.initials, r.rating, r.text, r.date, '']
  );
  syncApprovedBusinessReviewCount(r.businessId);
  schedulePersist();
}

/** Update approved business's reviewCount and rating from user_reviews (only for user-submitted businesses). */
function syncApprovedBusinessReviewCount(businessId: string) {
  if (!db) return;
  const reviews = getReviewsByBusinessId(businessId);
  const count = reviews.length;
  const avgRating = count > 0
    ? reviews.reduce((sum, r) => sum + r.rating, 0) / count
    : 0;
  const stmt = db.prepare('UPDATE approved_businesses SET reviewCount = ?, rating = ? WHERE id = ?');
  stmt.run([count, Math.round(avgRating * 10) / 10, businessId]);
  stmt.free();
}

export function removeReviewById(reviewId: string) {
  if (!db) return;
  const getStmt = db.prepare('SELECT businessId FROM user_reviews WHERE id = ?');
  getStmt.bind([reviewId]);
  let businessId: string | null = null;
  if (getStmt.step()) businessId = String(getStmt.get()[0]);
  getStmt.free();
  db.run('DELETE FROM user_reviews WHERE id = ?', [reviewId]);
  if (businessId) syncApprovedBusinessReviewCount(businessId);
  schedulePersist();
}

// --- Favorites ---
export function getFavorites(userId: string): string[] {
  if (!db) return [];
  const stmt = db.prepare('SELECT businessId FROM favorites WHERE userId = ?');
  stmt.bind([userId]);
  const out: string[] = [];
  while (stmt.step()) out.push(String(stmt.get()[0]));
  stmt.free();
  return out;
}

export function setFavorites(userId: string, businessIds: string[]) {
  if (!db) return;
  db.run('DELETE FROM favorites WHERE userId = ?', [userId]);
  const stmt = db.prepare('INSERT INTO favorites (userId, businessId) VALUES (?, ?)');
  businessIds.forEach((bid) => {
    stmt.run([userId, bid]);
  });
  stmt.free();
  schedulePersist();
}

export function toggleFavorite(userId: string, businessId: string): string[] {
  const current = getFavorites(userId);
  const next = current.includes(businessId)
    ? current.filter((id) => id !== businessId)
    : [...current, businessId];
  setFavorites(userId, next);
  return next;
}

// --- Init ---
const MIGRATION_KEY = 'locallink_sqlite_migrated';

function migrateFromLocalStorage() {
  if (!db || typeof localStorage === 'undefined') return;
  try {
    const raw = localStorage.getItem(MIGRATION_KEY);
    if (raw === '1') return; // already migrated
  } catch {
    return;
  }
  try {
    const approvedRaw = localStorage.getItem('locallink_approved_businesses');
    if (approvedRaw) {
      const list = JSON.parse(approvedRaw);
      if (Array.isArray(list)) list.forEach((b: Business) => addApprovedBusiness(b));
    }
    const pendingRaw = localStorage.getItem('locallink_pending_businesses');
    if (pendingRaw) {
      const list = JSON.parse(pendingRaw);
      if (Array.isArray(list)) list.forEach((p: PendingBusiness) => addPendingBusiness(p));
    }
    const reviewsRaw = localStorage.getItem('locallink_user_reviews');
    if (reviewsRaw) {
      const list = JSON.parse(reviewsRaw);
      if (Array.isArray(list)) list.forEach((r: UserReview) => addReview(r));
    }
    const favPrefix = 'locallink_favorites_';
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key?.startsWith(favPrefix)) {
        const userId = key.slice(favPrefix.length);
        const ids = JSON.parse(localStorage.getItem(key) || '[]');
        if (Array.isArray(ids)) setFavorites(userId, ids);
      }
    }
    localStorage.setItem(MIGRATION_KEY, '1');
    saveToIndexedDB();
  } catch {
    // ignore migration errors
  }
}

export async function initDb(): Promise<void> {
  const SQL = await getSqlJs();
  const saved = await loadFromIndexedDB();
  if (saved && saved.length > 0) {
    db = new SQL.Database(saved);
  } else {
    db = new SQL.Database();
  }
  runSchema(db);
  migrateFromLocalStorage();
  if (!saved || saved.length === 0) saveToIndexedDB();
}

export function isDbReady(): boolean {
  return db !== null;
}
