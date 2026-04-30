"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { Doctor } from "@/models/doctor";
import { supabase } from "@/lib/supabaseClient";
import { Specialization } from "@/models/specialization";
import { getSpecializations } from "@/services/specializations/getSpecializations";

type DoctorPayload = {
  full_name: string;
  slug: string;
  specialization_id: string | null;
  short_bio_ru: string | null;
  short_bio_kk: string | null;
  short_bio_en: string | null;
  experience_years: number | null;
  category: string | null;
  phone: string | null;
  email: string | null;
  is_active: boolean;
  photo_url?: string | null;
};

function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "")
    .replace(/-+/g, "-");
}

const initialForm = {
  full_name: "",
  slug: "",
  specialization_id: "",
  short_bio_ru: "",
  short_bio_kk: "",
  short_bio_en: "",
  experience_years: "",
  category: "",
  phone: "",
  email: "",
  is_active: true,
};

export default function AdminDoctorsPage() {
  const [form, setForm] = useState(initialForm);
  const [photoFile, setPhotoFile] = useState<File | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingDoctorId, setEditingDoctorId] = useState<string | null>(null);
  const [specializations, setSpecializations] = useState<Specialization[]>([]);

  const generatedSlug = useMemo(() => {
    if (form.slug.trim()) return form.slug;
    return slugify(form.full_name);
  }, [form.full_name, form.slug]);

  const fetchDoctors = async () => {
    const { data, error } = await supabase
      .from("doctors")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error loading doctors:", error.message);
      setDoctors([]);
    } else {
      setDoctors((data || []) as Doctor[]);
    }

    setLoading(false);
  };

  useEffect(() => {
    fetchDoctors();

    const fetchSpecs = async () => {
      const data = await getSpecializations();
      setSpecializations(data);
    };

    fetchSpecs();
  }, []);

  const resetForm = () => {
    setForm(initialForm);
    setPhotoFile(null);
    setEditingDoctorId(null);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const target = e.target as HTMLInputElement;
    const { name, value, type } = target;

    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? target.checked : value,
    }));
  };

  const uploadPhoto = async () => {
    if (!photoFile) return null;

    const fileExt = photoFile.name.split(".").pop();
    const fileName = `${Date.now()}-${Math.random()
      .toString(36)
      .slice(2)}.${fileExt}`;
    const filePath = `photos/${fileName}`;

    const { error } = await supabase.storage
      .from("doctors")
      .upload(filePath, photoFile);

    if (error) {
      console.error("Upload error:", error.message);
      return null;
    }

    const { data } = supabase.storage.from("doctors").getPublicUrl(filePath);

    return data.publicUrl;
  };

  const handleEdit = (doctor: Doctor) => {
    setEditingDoctorId(doctor.id);
    setPhotoFile(null);

    setForm({
      full_name: doctor.full_name || "",
      slug: doctor.slug || "",
      specialization_id: doctor.specialization_id || "",
      short_bio_ru: doctor.short_bio_ru || "",
      short_bio_kk: doctor.short_bio_kk || "",
      short_bio_en: doctor.short_bio_en || "",
      experience_years: doctor.experience_years?.toString() || "",
      category: doctor.category || "",
      phone: doctor.phone || "",
      email: doctor.email || "",
      is_active: doctor.is_active,
    });

    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = async (doctor: Doctor) => {
    const confirmed = window.confirm(`Delete doctor "${doctor.full_name}"?`);

    if (!confirmed) return;

    const { error } = await supabase
      .from("doctors")
      .delete()
      .eq("id", doctor.id);

    if (error) {
      console.error("Delete error:", error.message);
      alert(error.message);
      return;
    }

    if (editingDoctorId === doctor.id) {
      resetForm();
    }

    await fetchDoctors();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!form.full_name.trim()) {
      alert("Full name is required");
      return;
    }

    if (!generatedSlug.trim()) {
      alert("Slug is required");
      return;
    }

    setSubmitting(true);

    let photo_url: string | null = null;

    if (photoFile) {
      photo_url = await uploadPhoto();
      console.log("NEW PHOTO URL:", photo_url);

      if (!photo_url) {
        setSubmitting(false);
        alert("Photo upload failed");
        return;
      }
    }

    const payload: DoctorPayload = {
      full_name: form.full_name.trim(),
      slug: generatedSlug.trim(),
      specialization_id: form.specialization_id || null,
      short_bio_ru: form.short_bio_ru.trim() || null,
      short_bio_kk: form.short_bio_kk.trim() || null,
      short_bio_en: form.short_bio_en.trim() || null,
      experience_years: form.experience_years
        ? Number(form.experience_years)
        : null,
      category: form.category.trim() || null,
      phone: form.phone.trim() || null,
      email: form.email.trim() || null,
      is_active: form.is_active,
    };

    if (photo_url) {
      payload.photo_url = photo_url;
    }

    if (editingDoctorId) {
      const updatePayload = {
        ...payload,
        ...(photo_url ? { photo_url } : {}),
      };

      console.log("UPDATE PAYLOAD:", updatePayload);
      console.log("EDITING ID:", editingDoctorId);

      const { error } = await supabase
        .from("doctors")
        .update(updatePayload)
        .eq("id", editingDoctorId);

      if (error) {
        console.error("Update error:", error.message);
        alert(error.message);
      } else {
        resetForm();
        await fetchDoctors();
      }
    } else {
      const insertPayload = {
        ...payload,
        photo_url,
      };

      const { error } = await supabase.from("doctors").insert(insertPayload);

      if (error) {
        console.error("Insert error:", error.message);
        alert(error.message);
      } else {
        resetForm();
        await fetchDoctors();
      }
    }

    setSubmitting(false);
  };

  return (
    <main className="min-h-screen bg-white px-4 py-10 md:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8 flex items-center justify-between gap-4">
          <h1 className="text-3xl font-bold text-black">
            {editingDoctorId ? "Edit Doctor" : "Admin Doctors"}
          </h1>

          {editingDoctorId ? (
            <button
              type="button"
              onClick={resetForm}
              className="rounded-2xl border border-gray-300 px-5 py-2 text-sm"
            >
              Cancel edit
            </button>
          ) : null}
        </div>

        <form
          onSubmit={handleSubmit}
          className="space-y-5 rounded-3xl border border-gray-200 p-6 shadow-sm"
        >
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm font-medium">
                Full name
              </label>
              <input
                name="full_name"
                value={form.full_name}
                onChange={handleChange}
                className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none"
                placeholder="Doctor full name"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium">Slug</label>
              <input
                name="slug"
                value={form.slug}
                onChange={handleChange}
                className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none"
                placeholder="auto-generated if empty"
              />
              <p className="mt-1 text-xs text-gray-500">
                Final slug: {generatedSlug || "—"}
              </p>
            </div>
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium">
              Specialization
            </label>
            <select
              name="specialization_id"
              value={form.specialization_id}
              onChange={(e) =>
                setForm((prev) => ({
                  ...prev,
                  specialization_id: e.target.value,
                }))
              }
              className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none"
            >
              <option value="">Select specialization</option>
              {specializations.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.name_ru}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium">
              {editingDoctorId ? "Replace photo" : "Photo"}
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setPhotoFile(e.target.files?.[0] || null)}
              className="w-full rounded-xl border border-gray-300 px-4 py-3"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium">Category</label>
            <input
              name="category"
              value={form.category}
              onChange={handleChange}
              className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none"
              placeholder="Therapist, Cardiologist..."
            />
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm font-medium">
                Experience years
              </label>
              <input
                name="experience_years"
                type="number"
                value={form.experience_years}
                onChange={handleChange}
                className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none"
                placeholder="10"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium">Phone</label>
              <input
                name="phone"
                value={form.phone}
                onChange={handleChange}
                className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none"
                placeholder="+7 ..."
              />
            </div>
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium">Email</label>
            <input
              name="email"
              value={form.email}
              onChange={handleChange}
              className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none"
              placeholder="doctor@unilab.kz"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium">Bio RU</label>
            <textarea
              name="short_bio_ru"
              value={form.short_bio_ru}
              onChange={handleChange}
              className="min-h-[120px] w-full rounded-xl border border-gray-300 px-4 py-3 outline-none"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium">Bio KK</label>
            <textarea
              name="short_bio_kk"
              value={form.short_bio_kk}
              onChange={handleChange}
              className="min-h-[120px] w-full rounded-xl border border-gray-300 px-4 py-3 outline-none"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium">Bio EN</label>
            <textarea
              name="short_bio_en"
              value={form.short_bio_en}
              onChange={handleChange}
              className="min-h-[120px] w-full rounded-xl border border-gray-300 px-4 py-3 outline-none"
            />
          </div>

          <label className="flex items-center gap-3 text-sm">
            <input
              type="checkbox"
              name="is_active"
              checked={form.is_active}
              onChange={handleChange}
            />
            Active doctor
          </label>

          <button
            type="submit"
            disabled={submitting}
            className="rounded-2xl bg-black px-6 py-3 text-white disabled:opacity-50"
          >
            {submitting
              ? editingDoctorId
                ? "Saving..."
                : "Adding..."
              : editingDoctorId
                ? "Save changes"
                : "Add doctor"}
          </button>
        </form>

        <div className="mt-10">
          <h2 className="mb-4 text-2xl font-semibold">Doctors list</h2>

          {loading ? (
            <p className="text-gray-500">Loading...</p>
          ) : !doctors.length ? (
            <div className="rounded-2xl border border-dashed border-gray-300 p-8 text-gray-500">
              No doctors yet
            </div>
          ) : (
            <div className="space-y-4">
              {doctors.map((doctor) => (
                <div
                  key={doctor.id}
                  className="flex flex-col gap-4 rounded-2xl border border-gray-200 p-4 md:flex-row md:items-center md:justify-between"
                >
                  <div className="flex items-center gap-4">
                    <div className="relative h-20 w-20 overflow-hidden rounded-2xl bg-gray-100">
                      {doctor.photo_url ? (
                        <Image
                          src={doctor.photo_url}
                          alt={doctor.full_name}
                          fill
                          className="object-cover"
                        />
                      ) : null}
                    </div>

                    <div>
                      <p className="font-semibold text-black">
                        {doctor.full_name}
                      </p>
                      <p className="text-sm text-gray-500">{doctor.slug}</p>
                      <p className="text-sm text-gray-500">
                        {doctor.is_active ? "Active" : "Inactive"}
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <button
                      type="button"
                      onClick={() => handleEdit(doctor)}
                      className="rounded-xl border border-gray-300 px-4 py-2 text-sm"
                    >
                      Edit
                    </button>

                    <button
                      type="button"
                      onClick={() => handleDelete(doctor)}
                      className="rounded-xl border border-red-300 px-4 py-2 text-sm text-red-600"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
