import { DoctorWithSpecialization } from "@/models/doctor";
import { DoctorCard } from "./DoctorCard";

type Props = {
  doctors: DoctorWithSpecialization[];
  locale: string;
};

export function DoctorList({ doctors, locale }: Props) {
  if (!doctors.length) {
    return (
      <div className="rounded-2xl border border-dashed border-gray-300 p-10 text-center text-gray-500">
        No doctors found
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
      {doctors.map((doctor) => (
        <DoctorCard key={doctor.id} doctor={doctor} locale={locale} />
      ))}
    </div>
  );
}
