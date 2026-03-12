"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  MapPin,
  Stethoscope,
  ClipboardList,
  MessageCircle,
} from "lucide-react";
import { useTranslations } from "next-intl";

import InstallPrompt from "@/components/InstallPrompt";
import { socialLinks, whatsAppNumber } from "@/utils/constants";

const quickActions = [
  {
    href: "/doctors",
    labelKey: "doctors",
    icon: <Stethoscope className="h-6 w-6" />,
  },
  {
    href: "/services",
    labelKey: "services",
    icon: <ClipboardList className="h-6 w-6" />,
  },
  {
    href: `https://wa.me/${whatsAppNumber}`,
    labelKey: "writeToWpp",
    icon: <MessageCircle className="h-6 w-6" />,
    external: true,
  },
];

export default function Home() {
  const t = useTranslations("homePage");

  return (
    <main className="relative min-h-screen w-full overflow-x-hidden bg-[url('/images/unilab1.png')] bg-cover bg-center bg-no-repeat">
      <div className="absolute inset-0 bg-gradient-to-b from-black/45 via-black/20 to-black/45" />

      <div className="relative z-10 mx-auto flex min-h-screen w-full max-w-md flex-col px-4 pb-6 pt-20">
        <motion.section
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full">
            <img
              src="./icon.svg"
              alt="Unilab Medical"
              className="h-20 w-20 object-contain"
            />
          </div>

          <h1
            className="text-3xl font-bold tracking-tight text-white"
            style={{ textShadow: "0 2px 8px rgba(0,0,0,0.45)" }}
          >
            Unilab Medical
          </h1>

          <p className="mx-auto mt-3 max-w-sm text-sm leading-6 text-white/85">
            {t("heroDescription")}
          </p>
        </motion.section>

        <motion.section
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.08 }}
          className="mt-6"
        >
          <div className="grid grid-cols-3 gap-3">
            {quickActions.map(({ href, labelKey, icon, external }) =>
              external ? (
                <a
                  key={labelKey}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex min-h-[110px] flex-col items-center justify-center rounded-3xl bg-white/15 px-3 py-4 text-white shadow-lg backdrop-blur-md transition active:scale-[0.98]"
                >
                  <div className="mb-2 flex h-12 w-12 items-center justify-center rounded-2xl bg-white/15">
                    {icon}
                  </div>
                  <span className="text-center text-sm font-semibold">
                    {t(labelKey)}
                  </span>
                </a>
              ) : (
                <Link
                  key={labelKey}
                  href={href}
                  className="flex min-h-[110px] flex-col items-center justify-center rounded-3xl bg-white/15 px-3 py-4 text-white shadow-lg backdrop-blur-md transition active:scale-[0.98]"
                >
                  <div className="mb-2 flex h-12 w-12 items-center justify-center rounded-2xl bg-white/15">
                    {icon}
                  </div>
                  <span className="text-center text-sm font-semibold">
                    {t(labelKey)}
                  </span>
                </Link>
              ),
            )}
          </div>
        </motion.section>

        <motion.section
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.16 }}
          className="mt-6"
        >
          <div className="rounded-3xl bg-black/40 p-4 text-white shadow-lg backdrop-blur-md">
            <div className="flex items-start gap-3">
              <div className="mt-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white/10">
                <MapPin className="h-5 w-5" />
              </div>

              <div className="min-w-0">
                <h2 className="text-lg font-semibold">{t("location")}</h2>
                <p className="mt-2 text-sm leading-6 text-white/90">
                  Almaty, Назарбаева 130
                </p>
                <p className="mt-1 text-sm text-white/80">🕒 09:00 – 18:00</p>
                <p className="mt-1 text-sm italic text-white/65">
                  {t("workTime")}
                </p>
              </div>
            </div>
          </div>

          <div className="mt-3 grid grid-cols-1 gap-3">
            <a
              href="https://go.2gis.com/Y45kg"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between rounded-3xl bg-black/40 px-4 py-4 text-white shadow-lg backdrop-blur-md transition active:scale-[0.99]"
            >
              <div className="flex items-center gap-3">
                <img src="/icons/2gis.svg" alt="2GIS" className="h-8 w-auto" />
                <span className="text-sm font-medium">2GIS</span>
              </div>
              <span className="text-2xl text-white/90">›</span>
            </a>

            <a
              href="https://maps.app.goo.gl/yDgemn1svCj2w9mx6"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between rounded-3xl bg-black/40 px-4 py-4 text-white shadow-lg backdrop-blur-md transition active:scale-[0.99]"
            >
              <div className="flex items-center gap-3">
                <img
                  src="/icons/google-maps.svg"
                  alt="Google Maps"
                  className="h-10 w-10 rounded-full bg-white object-contain"
                />
                <span className="text-sm font-medium">Google Maps</span>
              </div>
              <span className="text-2xl text-white/90">›</span>
            </a>
          </div>
        </motion.section>

        <motion.section
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.24 }}
          className="mt-6"
        >
          <h2
            className="mb-3 text-center text-xl font-semibold text-white"
            style={{ textShadow: "0 2px 8px rgba(0,0,0,0.45)" }}
          >
            {t("socialMedia")}
          </h2>

          <div className="grid grid-cols-2 gap-3">
            {socialLinks.map(({ href, label, icon }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex min-h-[120px] flex-col items-center justify-center rounded-3xl bg-white/15 px-4 py-4 text-white shadow-lg backdrop-blur-md transition active:scale-[0.98]"
              >
                <div className="flex h-14 w-14 items-center justify-center">
                  {icon}
                </div>
                <p className="mt-3 text-center text-sm font-semibold">
                  {label}
                </p>
              </a>
            ))}
          </div>
        </motion.section>

        <motion.section
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.32 }}
          className="mt-6"
        >
          <div className="rounded-3xl bg-white/12 p-5 text-center text-white shadow-lg backdrop-blur-md">
            <h3 className="text-lg font-semibold">{t("wannaKnowMore")}</h3>
            <p className="mt-2 text-sm text-white/80">
              {t("contactUsForMoreInfo")}
            </p>

            <a
              href={`https://wa.me/${whatsAppNumber}`}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-flex items-center justify-center rounded-full bg-green-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-green-700"
            >
              {t("writeToWpp")}
            </a>
          </div>
        </motion.section>

        <div className="mt-5">
          <InstallPrompt />
        </div>

        <footer className="mt-auto pt-6 text-center text-xs text-white/70">
          © {new Date().getFullYear()} | Developed by{" "}
          <a
            href="https://instagram.com/esenbekov.t"
            target="_blank"
            rel="noopener noreferrer"
            className="underline hover:text-white"
          >
            Talgat Yessenbekov
          </a>
        </footer>
      </div>
    </main>
  );
}
