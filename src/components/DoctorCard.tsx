import Image from "next/image";
import { Doctor } from "@/types/medical";

export default function DoctorCard({ doctor }: { doctor: Doctor }) {
  return (
    <div className="flex gap-4 rounded-3xl bg-white/90 p-4 shadow-md">
      <div className="relative h-20 w-20 overflow-hidden rounded-2xl">
        <Image
          src={doctor.photo}
          alt={doctor.name}
          fill
          className="object-cover"
        />
      </div>

      <div className="flex flex-col justify-center">
        <h3 className="font-semibold text-gray-900">{doctor.name}</h3>
        <p className="text-sm text-gray-600">{doctor.specialization}</p>
        <p className="text-xs text-gray-500">{doctor.experience}</p>
      </div>
    </div>
  );
}
