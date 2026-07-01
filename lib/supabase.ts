import { createClient } from "@supabase/supabase-js";

const rawUrl = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "";
const rawAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "";

function isValidSupabaseUrl(value: string) {
  try {
    const parsed = new URL(value);
    return parsed.protocol === 'https:' || parsed.protocol === 'http:';
  } catch {
    return false;
  }
}

function createSupabaseClient(url: string, anonKey: string) {
  try {
    return createClient(url, anonKey);
  } catch {
    return null;
  }
}

const supabaseClient =
  isValidSupabaseUrl(rawUrl) && rawAnonKey.trim().length > 0
    ? createSupabaseClient(rawUrl, rawAnonKey)
    : null;

export const hasSupabaseConfig = Boolean(supabaseClient);
export const supabase = supabaseClient;
