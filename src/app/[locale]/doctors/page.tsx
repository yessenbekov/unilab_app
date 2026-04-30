"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";

import { DoctorWithSpecialization } from "@/models/doctor";
import { Specialization } from "@/models/specialization";
import { getDoctors } from "@/services/doctors/getDoctors";
import { getSpecializations } from "@/services/specializations/getSpecializations";

function getDoctorBio(
  doctor: {
    short_bio_ru: string | null;
    short_bio_kk: string | null;
    short_bio_en: string | null;
  },
  locale: string,
) {
  if (locale === "kk") {
    return (
      doctor.short_bio_kk || doctor.short_bio_ru || doctor.short_bio_en || ""
    );
  }

  if (locale === "en") {
    return (
      doctor.short_bio_en || doctor.short_bio_ru || doctor.short_bio_kk || ""
    );
  }

  return (
    doctor.short_bio_ru || doctor.short_bio_kk || doctor.short_bio_en || ""
  );
}

function getLocalizedSpecialization(
  locale: string,
  specialization?: {
    name_ru: string;
    name_kk: string | null;
    name_en: string | null;
  } | null,
) {
  if (!specialization) return "";

  if (locale === "kk") {
    return (
      specialization.name_kk ||
      specialization.name_ru ||
      specialization.name_en ||
      ""
    );
  }

  if (locale === "en") {
    return (
      specialization.name_en ||
      specialization.name_ru ||
      specialization.name_kk ||
      ""
    );
  }

  return (
    specialization.name_ru ||
    specialization.name_kk ||
    specialization.name_en ||
    ""
  );
}

export default function DoctorsPage() {
  const locale = useLocale();
  const t = useTranslations("doctorsPage");

  const [doctors, setDoctors] = useState<DoctorWithSpecialization[]>([]);
  const [specializations, setSpecializations] = useState<Specialization[]>([]);
  const [selectedSpecializationId, setSelectedSpecializationId] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const [doctorsData, specializationsData] = await Promise.all([
        getDoctors(),
        getSpecializations(),
      ]);

      setDoctors(doctorsData);
      setSpecializations(specializationsData);
      setLoading(false);
    };

    fetchData();
  }, []);

  const filteredDoctors = useMemo(() => {
    if (!selectedSpecializationId) return doctors;

    return doctors.filter(
      (doctor) => doctor.specialization_id === selectedSpecializationId,
    );
  }, [doctors, selectedSpecializationId]);

  if (loading) {
    return (
      <main className="min-h-screen bg-white px-4 py-10 md:px-8">
        <div className="mx-auto max-w-7xl">
          <h1 className="mb-6 text-3xl font-bold text-black">Doctors</h1>
          <p className="text-gray-500">{t("loading")}</p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-white px-4 py-10 md:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-black">{t("title")}</h1>
            <p className="mt-2 text-gray-600">
              {t("subtitle")}
            </p>
          </div>

          <div className="w-full md:w-[320px]">
            <label className="mb-2 block text-sm font-medium text-gray-700">
              {t("specialization")}
            </label>
            <select
              value={selectedSpecializationId}
              onChange={(e) => setSelectedSpecializationId(e.target.value)}
              className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none"
            >
              <option value="">{t("allSpecializations")}</option>
              {specializations.map((item) => (
                <option key={item.id} value={item.id}>
                  {locale === "kk"
                    ? item.name_kk || item.name_ru || item.name_en
                    : locale === "en"
                      ? item.name_en || item.name_ru || item.name_kk
                      : item.name_ru || item.name_kk || item.name_en}
                </option>
              ))}
            </select>
          </div>
        </div>

        {!filteredDoctors.length ? (
          <div className="rounded-2xl border border-dashed border-gray-300 p-10 text-center text-gray-500">
            {t("noDoctors")}
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
            {filteredDoctors.map((doctor) => {
              const bio = getDoctorBio(doctor, locale);
              const specializationLabel = getLocalizedSpecialization(
                locale,
                doctor.specialization,
              );

              return (
                <Link
                  key={doctor.id}
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

                      {specializationLabel && (
                        <p className="mt-1 text-sm text-gray-600">
                          {specializationLabel}
                        </p>
                      )}
                    </div>

                    {bio && (
                      <p className="line-clamp-3 text-sm leading-6 text-gray-700">
                        {bio}
                      </p>
                    )}

                    <div className="text-sm text-gray-500">
                      {doctor.experience_years
                        ? t("yearsExperience", {
                            count: doctor.experience_years,
                          })
                        : ""}
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </main>
  );
}
