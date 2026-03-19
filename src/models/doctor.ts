export type Doctor = {
  id: string;
  full_name: string;
  slug: string;
  specialization_id: string | null;
  photo_url: string | null;
  short_bio_ru: string | null;
  short_bio_kk: string | null;
  short_bio_en: string | null;
  experience_years: number | null;
  category: string | null;
  phone: string | null;
  email: string | null;
  is_active: boolean;
  created_at: string;
};

export type DoctorWithSpecialization = Doctor & {
  specialization: {
    id: string;
    name_ru: string;
    name_kk: string | null;
    name_en: string | null;
  } | null;
};
