import { createClient, SupabaseClient } from "@supabase/supabase-js";
import "dotenv/config";

// Explicitly check for necessary environment variables
const supabaseUrl: string | undefined = process.env.SUPABASE_URL;
const supabaseAnonKey: string | undefined = process.env.SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error(
    "Supabase URL or Anon Key is missing. Check your environment variables."
  );
}

export const supabase: SupabaseClient = createClient(
  supabaseUrl,
  supabaseAnonKey
);
