import { DoctorWithRelations } from "@/models/doctorWithRel";
import { getLocalizedValue } from "@/utils/getLocalizedValue";
import Image from "next/image";
import Link from "next/link";

type Props = {
  doctor: DoctorWithRelations;
  locale: string;
};

export function DoctorCard({ doctor, locale }: Props) {
  const specialization = doctor.specialization
    ? getLocalizedValue(locale, {
        ru: doctor.specialization.name_ru,
        kk: doctor.specialization.name_kk,
        en: doctor.specialization.name_en,
      })
    : "";

  const bio = getLocalizedValue(locale, {
    ru: doctor.short_bio_ru,
    kk: doctor.short_bio_kk,
    en: doctor.short_bio_en,
  });

  return (
    <Link
      href={`/${locale}/doctors/${doctor.slug}`}
      className="group overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-md"
    >
      <div className="relative h-72 w-full bg-gray-100">
        {doctor.photo_url ? (
          <Image
            src={doctor.photo_url}
            alt={doctor.full_name}
            fill
            className="object-cover transition duration-300 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-sm text-gray-400">
            No photo
          </div>
        )}
      </div>

      <div className="space-y-3 p-5">
        <div>
          <h3 className="text-xl font-semibold text-black">
            {doctor.full_name}
          </h3>
          {specialization && (
            <p className="mt-1 text-sm text-gray-600">{specialization}</p>
          )}
        </div>

        {bio && (
          <p className="line-clamp-3 text-sm leading-6 text-gray-700">{bio}</p>
        )}

        <div className="flex items-center justify-between text-sm text-gray-500">
          <span>
            {doctor.experience_years
              ? `${doctor.experience_years} years experience`
              : ""}
          </span>
          {doctor.category && <span>{doctor.category}</span>}
        </div>
      </div>
    </Link>
  );
}
