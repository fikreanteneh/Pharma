import { PostgrestSingleResponse } from "@supabase/supabase-js";

export type BaseResponseType<T = unknown> = {
  success: boolean;
  message?: T | null;
  error?: string | null;
  statusCode: number;
};


export type SupabaseResponse<T = unknown> = PostgrestSingleResponse<T>