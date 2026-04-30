import { ReactNode } from "react";
import Navbar from "@/components/Navbar";
import "@/styles/globals.css";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { Toaster } from "react-hot-toast";
import RegisterSW from "@/components/RegisterSW";
import { SpeedInsights } from "@vercel/speed-insights/next";

export const metadata = {
  title: "Unilab Medical",
  description:
    "Unilab Medical — это современное приложение для управления медицинскими данными, предоставляющее удобный интерфейс для пациентов и врачей. С помощью Unilab Medical вы можете легко отслеживать свои медицинские записи, назначать встречи и получать важные уведомления о здоровье.",
};

export default async function RootLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const detectedLocale = locale || "ru";
  const messages = await getMessages({ locale: detectedLocale });

  return (
    <html lang={detectedLocale}>
      <head>
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#ffffff" />
        <link rel="icon" href="/icons/icon.svg" />
        <meta name="mobile-web-app-capable" content="Unilab Medical" />
      </head>
      <body>
        <NextIntlClientProvider locale={detectedLocale} messages={messages}>
          <SpeedInsights />
          <Toaster position="top-right" />
          <Navbar />
          <div className="pt-[72px]">{children}</div>
        </NextIntlClientProvider>
        <RegisterSW />
      </body>
    </html>
  );
}
