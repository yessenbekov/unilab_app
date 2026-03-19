import { supabase } from "@/lib/supabaseClient";
import { Specialization } from "@/models/specialization";

export async function getSpecializations(): Promise<Specialization[]> {
  const { data, error } = await supabase
    .from("specializations")
    .select("*")
    .order("name_ru", { ascending: true });

  if (error) {
    console.error("Error loading specializations:", error.message);
    return [];
  }

  return (data || []) as Specialization[];
}
