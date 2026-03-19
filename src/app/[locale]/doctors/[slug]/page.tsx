"use client";

import { useEffect, useState } from "react";
import { useLocale } from "next-intl";
import { useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

import { Doctor } from "@/models/doctor";
import { getDoctorBySlug } from "@/services/doctors/getDoctorBySlug";

function getDoctorBio(doctor: Doctor, locale: string) {
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

export default function DoctorPage() {
  const locale = useLocale();
  const params = useParams<{ slug: string }>();
  const slug = params?.slug;

  const [doctor, setDoctor] = useState<Doctor | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!slug) return;

    const fetchDoctor = async () => {
      const data = await getDoctorBySlug(slug);
      setDoctor(data);
      setLoading(false);
    };

    fetchDoctor();
  }, [slug]);

  if (loading) {
    return (
      <main className="min-h-screen bg-white px-4 py-10 md:px-8">
        <div className="mx-auto max-w-6xl">
          <p className="text-gray-500">Loading...</p>
        </div>
      </main>
    );
  }

  if (!doctor) {
    return (
      <main className="min-h-screen bg-white px-4 py-10 md:px-8">
        <div className="mx-auto max-w-6xl">
          <Link
            href={`/${locale}/doctors`}
            className="mb-6 inline-block text-sm text-gray-500 hover:text-black"
          >
            ← Back to doctors
          </Link>

          <div className="rounded-2xl border border-dashed border-gray-300 p-10 text-center text-gray-500">
            Doctor not found
          </div>
        </div>
      </main>
    );
  }

  const bio = getDoctorBio(doctor, locale);

  return (
    <main className="min-h-screen bg-white px-4 py-10 md:px-8">
      <div className="mx-auto max-w-6xl">
        <Link
          href={`/${locale}/doctors`}
          className="mb-6 inline-block text-sm text-gray-500 hover:text-black"
        >
          ← Back to doctors
        </Link>

        <div className="grid gap-8 md:grid-cols-[380px_minmax(0,1fr)]">
          <div className="relative h-[420px] overflow-hidden rounded-3xl bg-gray-100">
            {doctor.photo_url ? (
              <Image
                src={doctor.photo_url}
                alt={doctor.full_name}
                fill
                className="object-cover"
              />
            ) : (
              <div className="flex h-full items-center justify-center text-sm text-gray-400">
                No photo
              </div>
            )}
          </div>

          <div className="flex flex-col justify-center">
            <h1 className="text-3xl font-bold text-black md:text-4xl">
              {doctor.full_name}
            </h1>

            {doctor.category && (
              <p className="mt-3 text-lg text-gray-600">{doctor.category}</p>
            )}

            {doctor.experience_years ? (
              <p className="mt-2 text-sm text-gray-500">
                {doctor.experience_years} years experience
              </p>
            ) : null}

            {bio ? (
              <div className="mt-6">
                <p className="text-base leading-7 text-gray-700">{bio}</p>
              </div>
            ) : null}

            {(doctor.phone || doctor.email) && (
              <div className="mt-8 space-y-2 rounded-2xl border border-gray-200 p-5">
                {doctor.phone ? (
                  <p className="text-sm text-gray-700">
                    <span className="font-medium text-black">Phone:</span>{" "}
                    {doctor.phone}
                  </p>
                ) : null}

                {doctor.email ? (
                  <p className="text-sm text-gray-700">
                    <span className="font-medium text-black">Email:</span>{" "}
                    {doctor.email}
                  </p>
                ) : null}
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
