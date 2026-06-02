import Link from "next/link";
import { getTranslations } from "next-intl/server";
import {
  AlertTriangle,
  Bell,
  ClipboardCheck,
  FileText,
  Flame,
  Stethoscope,
  Thermometer,
  UserRound,
  UsersRound,
} from "lucide-react";

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function AdminDashboardPage({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({
    locale,
    namespace: "adminDashboard",
  });

  const quickActions = [
    {
      label: t("activeAppointments"),
      value: "12",
      description: t("activeAppointmentsDescription"),
      icon: Stethoscope,
    },
    {
      label: t("labResults"),
      value: "8",
      description: t("labResultsDescription"),
      icon: ClipboardCheck,
    },
    {
      label: t("patients"),
      value: "34",
      description: t("patientsDescription"),
      icon: UsersRound,
    },
  ];

  const alerts = [
    {
      title: t("fireAlarm"),
      description: t("fireAlarmDescription"),
      badge: t("urgent"),
      tone: "border-red-200 bg-red-50 text-red-700",
      icon: Flame,
    },
    {
      title: t("ignitionRisk"),
      description: t("ignitionRiskDescription"),
      badge: t("check"),
      tone: "border-orange-200 bg-orange-50 text-orange-700",
      icon: AlertTriangle,
    },
    {
      title: t("temperatureHigh"),
      description: t("temperatureHighDescription"),
      badge: "+38.7°C",
      tone: "border-amber-200 bg-amber-50 text-amber-700",
      icon: Thermometer,
    },
  ];

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-8 text-slate-950 md:px-8">
      <div className="mx-auto max-w-7xl">
        <section className="overflow-hidden rounded-[28px] bg-slate-950 text-white shadow-xl">
          <div className="grid gap-8 px-5 py-7 md:grid-cols-[minmax(0,1fr)_360px] md:px-8 md:py-9">
            <div className="min-w-0">
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-cyan-500/20 text-cyan-200">
                  <Bell className="h-6 w-6" />
                </div>
                <div>
                  <p className="text-sm font-medium text-cyan-100">
                    {t("staffPanel")}
                  </p>
                  <h1 className="text-3xl font-bold tracking-tight md:text-4xl">
                    Unilab Medical
                  </h1>
                </div>
              </div>

              <p className="mt-5 max-w-2xl text-base leading-7 text-slate-200">
                {t("description")}
              </p>
            </div>

            <div className="rounded-3xl border border-white/10 bg-white/10 p-5 backdrop-blur">
              <p className="text-sm text-slate-300">{t("todayStatus")}</p>
              <div className="mt-4 grid grid-cols-3 gap-3">
                <div>
                  <p className="text-2xl font-bold">3</p>
                  <p className="mt-1 text-xs text-slate-300">{t("alerts")}</p>
                </div>
                <div>
                  <p className="text-2xl font-bold">12</p>
                  <p className="mt-1 text-xs text-slate-300">
                    {t("appointments")}
                  </p>
                </div>
                <div>
                  <p className="text-2xl font-bold">8</p>
                  <p className="mt-1 text-xs text-slate-300">{t("results")}</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="mt-6 grid gap-4 md:grid-cols-3">
          {quickActions.map(({ label, value, description, icon: Icon }) => (
            <div
              key={label}
              className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-cyan-50 text-cyan-700">
                  <Icon className="h-6 w-6" />
                </div>
                <span className="rounded-full bg-slate-100 px-3 py-1 text-sm font-semibold text-slate-700">
                  {value}
                </span>
              </div>
              <h2 className="mt-4 text-lg font-semibold">{label}</h2>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                {description}
              </p>
            </div>
          ))}
        </section>

        <section className="mt-6 grid gap-6 lg:grid-cols-[minmax(0,1fr)_360px]">
          <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm md:p-6">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-sm font-medium text-red-600">
                  {t("security")}
                </p>
                <h2 className="mt-1 text-2xl font-bold">
                  {t("securityNotifications")}
                </h2>
              </div>
              <span className="inline-flex w-fit items-center rounded-full bg-red-50 px-3 py-1 text-sm font-semibold text-red-700">
                {t("requiresAttention")}
              </span>
            </div>

            <div className="mt-5 space-y-3">
              {alerts.map(({ title, description, badge, tone, icon: Icon }) => (
                <div
                  key={title}
                  className={`flex flex-col gap-4 rounded-2xl border p-4 sm:flex-row sm:items-center sm:justify-between ${tone}`}
                >
                  <div className="flex min-w-0 items-start gap-3">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-white/70">
                      <Icon className="h-6 w-6" />
                    </div>
                    <div className="min-w-0">
                      <h3 className="font-semibold">{title}</h3>
                      <p className="mt-1 text-sm leading-5 opacity-80">
                        {description}
                      </p>
                    </div>
                  </div>
                  <span className="w-fit shrink-0 rounded-full bg-white/80 px-3 py-1 text-sm font-semibold">
                    {badge}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <aside className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm md:p-6">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-100 text-slate-700">
              <UserRound className="h-6 w-6" />
            </div>
            <h2 className="mt-4 text-xl font-semibold">{t("adminTools")}</h2>
            <p className="mt-2 text-sm leading-6 text-slate-600">
              {t("adminToolsDescription")}
            </p>

            <div className="mt-5 space-y-3">
              <Link
                href={`/${locale}/admin/doctors`}
                className="flex items-center justify-between rounded-2xl border border-slate-200 px-4 py-3 text-sm font-semibold transition hover:border-slate-300 hover:bg-slate-50"
              >
                <span>{t("manageDoctors")}</span>
                <FileText className="h-4 w-4" />
              </Link>
            </div>
          </aside>
        </section>
      </div>
    </main>
  );
}
