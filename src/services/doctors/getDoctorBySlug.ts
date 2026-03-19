
import { supabase } from "@/lib/supabaseClient";
import { Doctor } from "@/models/doctor";

export async function getDoctorBySlug(slug: string): Promise<Doctor | null> {
  const { data, error } = await supabase
    .from("doctors")
    .select("*")
    .eq("slug", slug)
    .eq("is_active", true)
    .maybeSingle();

  if (error) {
    console.error("Error loading doctor:", error.message);
    return null;
  }

  return data as Doctor | null;
}
