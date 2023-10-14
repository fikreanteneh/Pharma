import { createClient } from "@supabase/supabase-js";
import Database from "../models/Database";

const supabase = createClient<Database>(
  import.meta.env.VITE_APP_SUPABASE_PROJECT_URL,
  import.meta.env.VITE_APP_SUPABASE_PUBLIC_KEY
);

export default supabase;
