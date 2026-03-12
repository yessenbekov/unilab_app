"use client";

import ServiceCard from "@/components/ServiceCard";
import { services } from "@/data/mockData";

export default function ServicesPage() {
  return (
    <main className="min-h-screen bg-gray-50 px-4 py-10">
      <div className="mx-auto max-w-md">
        <h1 className="mb-6 text-2xl font-bold">Services</h1>

        <div className="space-y-4">
          {services.map((service) => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </div>
      </div>
    </main>
  );
}
