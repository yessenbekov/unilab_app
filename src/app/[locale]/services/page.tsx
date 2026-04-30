"use client";

import ServiceCard from "@/components/ServiceCard";
import { useTranslations } from "next-intl";

export default function ServicesPage() {
  const t = useTranslations("servicesPage");

  const services = [
    {
      id: "consultation",
      title: t("consultationTitle"),
      description: t("consultationDescription"),
      price: t("consultationPrice"),
    },
    {
      id: "bloodAnalysis",
      title: t("bloodAnalysisTitle"),
      description: t("bloodAnalysisDescription"),
      price: t("bloodAnalysisPrice"),
    },
  ];

  return (
    <main className="min-h-screen bg-gray-50 px-4 py-10">
      <div className="mx-auto max-w-md">
        <h1 className="text-2xl font-bold">{t("title")}</h1>
        <p className="mt-2 mb-6 text-sm text-gray-600">{t("subtitle")}</p>

        <div className="space-y-4">
          {services.map((service) => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </div>
      </div>
    </main>
  );
}
