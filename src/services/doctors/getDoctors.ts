import { supabase } from "@/lib/supabaseClient";
import { DoctorWithSpecialization } from "@/models/doctor";

export async function getDoctors(): Promise<DoctorWithSpecialization[]> {
  const { data, error } = await supabase
    .from("doctors")
    .select(
      `
      *,
      specialization:specializations (
        id,
        name_ru,
        name_kk,
        name_en
      )
    `,
    )
    .eq("is_active", true)
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error loading doctors:", error.message);
    return [];
  }

  return (data || []) as DoctorWithSpecialization[];
}
