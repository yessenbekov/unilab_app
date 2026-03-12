import { Service } from "@/types/medical";

export default function ServiceCard({ service }: { service: Service }) {
  return (
    <div className="rounded-3xl bg-white/90 p-4 shadow-md">
      <h3 className="font-semibold text-gray-900">{service.title}</h3>

      {service.description && (
        <p className="mt-1 text-sm text-gray-600">{service.description}</p>
      )}

      {service.price && (
        <p className="mt-3 text-sm font-semibold text-blue-600">
          {service.price}
        </p>
      )}
    </div>
  );
}
