"use client";

import DoctorCard from "@/components/DoctorCard";
import { doctors } from "@/data/mockData";

export default function DoctorsPage() {
  return (
    <main className="min-h-screen bg-gray-50 px-4 py-10">
      <div className="mx-auto max-w-md">
        <h1 className="mb-6 text-2xl font-bold">Doctors</h1>

        <div className="space-y-4">
          {doctors.map((doctor) => (
            <DoctorCard key={doctor.id} doctor={doctor} />
          ))}
        </div>
      </div>
    </main>
  );
}
