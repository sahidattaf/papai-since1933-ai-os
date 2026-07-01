import { hasSupabaseConfig, supabase } from './supabase';

export type ReservationRecord = {
  id: string;
  customerName: string;
  phone: string;
  reservationDate: string;
  reservationTime: string;
  guestCount: number;
  specialRequest?: string;
  createdAt: string;
};

export type ReviewRecord = {
  id: string;
  customerName: string;
  phone: string;
  visitDate: string;
  rating: number;
  feedback: string;
  createdAt: string;
};

export type ContentItemRecord = {
  day: string;
  theme: string;
  caption: string;
  status: 'Draft' | 'Scheduled' | 'Published';
};

export type ApplicantRecord = {
  id: string;
  fullName: string;
  phone: string;
  role: string;
  experience?: string;
  availability?: string;
  notes?: string;
  createdAt: string;
};

const STORAGE_KEYS = {
  reservations: 'papai:reservations',
  reviews: 'papai:reviews',
  content: 'papai:content-planner',
  applicants: 'papai:applicants',
} as const;

function readStorage<T>(key: string, fallback: T): T {
  if (typeof window === 'undefined') return fallback;

  try {
    const raw = window.localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

function writeStorage<T>(key: string, value: T) {
  if (typeof window === 'undefined') return;

  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // Ignore storage write errors in private or restricted browsers.
  }
}

function clearStorage(key: string) {
  if (typeof window === 'undefined') return;

  try {
    window.localStorage.removeItem(key);
  } catch {
    // Ignore cleanup failures.
  }
}

// Supabase mode: use live tables when NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY are present.
// Local fallback mode: use localStorage so the MVP works without any real API keys.
// To enable Supabase later, add the env vars and the app will automatically switch over.

async function loadFromSupabase<T>(table: string, mapper: (row: any) => T): Promise<T[]> {
  if (!hasSupabaseConfig || !supabase) return [];

  try {
    const { data, error } = await supabase.from(table).select('*').order('created_at', { ascending: false });
    if (error || !data) return [];
    return data.map(mapper);
  } catch {
    return [];
  }
}

async function saveToSupabase<T>(table: string, payload: Record<string, unknown>): Promise<T | null> {
  if (!hasSupabaseConfig || !supabase) return null;

  try {
    const { data, error } = await supabase.from(table).insert(payload).select().single();
    if (error || !data) return null;
    return data as T;
  } catch {
    return null;
  }
}

function mapReservation(row: any): ReservationRecord {
  return {
    id: row.id,
    customerName: row.customer_name ?? '',
    phone: row.phone ?? '',
    reservationDate: row.reservation_date ?? '',
    reservationTime: row.reservation_time ?? '',
    guestCount: row.guest_count ?? 1,
    specialRequest: row.special_request ?? '',
    createdAt: row.created_at ?? new Date().toISOString(),
  };
}

function mapReview(row: any): ReviewRecord {
  return {
    id: row.id,
    customerName: row.customer_name ?? '',
    phone: row.phone ?? '',
    visitDate: row.visit_date ?? '',
    rating: row.rating ?? 5,
    feedback: row.feedback ?? '',
    createdAt: row.created_at ?? new Date().toISOString(),
  };
}

function mapContentItem(row: any): ContentItemRecord {
  return {
    day: row.title ?? 'Day',
    theme: row.content_pillar ?? '',
    caption: row.caption ?? '',
    status: (row.status as ContentItemRecord['status']) ?? 'Draft',
  };
}

function mapApplicant(row: any): ApplicantRecord {
  return {
    id: row.id,
    fullName: row.full_name ?? '',
    phone: row.phone ?? '',
    role: row.role ?? '',
    experience: row.experience ?? '',
    availability: row.availability ?? '',
    notes: row.notes ?? '',
    createdAt: row.created_at ?? new Date().toISOString(),
  };
}

export async function loadReservations(): Promise<ReservationRecord[]> {
  const fromSupabase = await loadFromSupabase('reservations', mapReservation);
  if (fromSupabase.length > 0) return fromSupabase;

  return readStorage<ReservationRecord[]>(STORAGE_KEYS.reservations, []);
}

export async function saveReservation(input: ReservationRecord): Promise<ReservationRecord[]> {
  const next = [input, ...(await loadReservations())];

  const supabaseRecord = await saveToSupabase<any>('reservations', {
    customer_name: input.customerName,
    phone: input.phone,
    reservation_date: input.reservationDate,
    reservation_time: input.reservationTime,
    guest_count: input.guestCount,
    special_request: input.specialRequest ?? '',
    source: 'whatsapp',
    status: 'pending',
  });

  if (supabaseRecord) {
    writeStorage(STORAGE_KEYS.reservations, [mapReservation(supabaseRecord), ...next.filter(item => item.id !== supabaseRecord.id)]);
    return [mapReservation(supabaseRecord), ...next.filter(item => item.id !== supabaseRecord.id)];
  }

  writeStorage(STORAGE_KEYS.reservations, next);
  return next;
}

export async function clearReservations() {
  clearStorage(STORAGE_KEYS.reservations);
}

export async function loadReviews(): Promise<ReviewRecord[]> {
  try {
    const fromSupabase = await loadFromSupabase('customer_feedback', mapReview);
    if (fromSupabase.length > 0) return fromSupabase;
  } catch {
    // Fall back to local storage if Supabase is misconfigured or offline.
  }

  return readStorage<ReviewRecord[]>(STORAGE_KEYS.reviews, []);
}

export async function saveReview(input: ReviewRecord): Promise<ReviewRecord[]> {
  const next = [input, ...(await loadReviews())];

  try {
    const supabaseRecord = await saveToSupabase<any>('customer_feedback', {
      customer_name: input.customerName,
      phone: input.phone,
      feedback: input.feedback,
      rating: input.rating,
      status: 'open',
    });

    if (supabaseRecord) {
      const updated = [mapReview(supabaseRecord), ...next.filter(item => item.id !== supabaseRecord.id)];
      writeStorage(STORAGE_KEYS.reviews, updated);
      return updated;
    }
  } catch {
    // If Supabase throws, continue using localStorage.
  }

  writeStorage(STORAGE_KEYS.reviews, next);
  return next;
}

export async function clearReviews() {
  clearStorage(STORAGE_KEYS.reviews);
}

export async function loadContentPlanner(initial: Record<string, string>): Promise<ContentItemRecord[]> {
  const fromSupabase = await loadFromSupabase('content_posts', mapContentItem);
  if (fromSupabase.length > 0) return fromSupabase;

  const local = readStorage<ContentItemRecord[]>(STORAGE_KEYS.content, []);
  if (local.length > 0) return local;

  return Object.keys(initial).map(day => ({
    day,
    theme: initial[day],
    caption: '',
    status: 'Draft',
  }));
}

export async function saveContentPlanner(items: ContentItemRecord[]): Promise<ContentItemRecord[]> {
  writeStorage(STORAGE_KEYS.content, items);

  if (!hasSupabaseConfig || !supabase) return items;

  // Supabase can be enabled later by adding the env vars and the schema above.
  return items;
}

export async function clearContentPlanner() {
  clearStorage(STORAGE_KEYS.content);
}

export async function loadApplicants(): Promise<ApplicantRecord[]> {
  const fromSupabase = await loadFromSupabase('applicants', mapApplicant);
  if (fromSupabase.length > 0) return fromSupabase;

  return readStorage<ApplicantRecord[]>(STORAGE_KEYS.applicants, []);
}

export async function saveApplicant(input: ApplicantRecord): Promise<ApplicantRecord[]> {
  const next = [input, ...(await loadApplicants())];

  const supabaseRecord = await saveToSupabase<any>('applicants', {
    full_name: input.fullName,
    phone: input.phone,
    role: input.role,
    experience: input.experience ?? '',
    availability: input.availability ?? '',
    notes: input.notes ?? '',
    status: 'new',
  });

  if (supabaseRecord) {
    writeStorage(STORAGE_KEYS.applicants, [mapApplicant(supabaseRecord), ...next.filter(item => item.id !== supabaseRecord.id)]);
    return [mapApplicant(supabaseRecord), ...next.filter(item => item.id !== supabaseRecord.id)];
  }

  writeStorage(STORAGE_KEYS.applicants, next);
  return next;
}

export async function clearApplicants() {
  clearStorage(STORAGE_KEYS.applicants);
}
