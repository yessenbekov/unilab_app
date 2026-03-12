"use client";

import Image from "next/image";
import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { LocaleSwitcher } from "./LocaleSwitcher";
import { usePathname } from "next/navigation";
import { AdminAccessSetter } from "./AdminAccessSetter";

export function Navbar() {
  const t = useTranslations("navbar");
  const locale = useLocale();
  const pathname = usePathname();

  const isHome = pathname === `/${locale}`;
  const isDoctors = pathname.startsWith(`/${locale}/doctors`);
  const isServices = pathname.startsWith(`/${locale}/services`);
  const isAdminPage = pathname.startsWith(`/${locale}/admin/doctors`);

  const [menuOpen, setMenuOpen] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const flag = localStorage.getItem("isAdminUnilab");
    setIsAdmin(flag === "true");
  }, []);

  const handleNavClick = () => setMenuOpen(false);

  const navItemClass =
    "flex items-center gap-2 text-sm font-medium transition-opacity duration-200";

  return (
    <>
      <AdminAccessSetter />

      <nav className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-black text-white shadow-md">
        <div className="mx-auto flex h-[72px] w-full max-w-7xl items-center justify-between px-4">
          <Link
            href={`/${locale}`}
            className="flex min-w-0 items-center gap-3"
            onClick={handleNavClick}
          >
            <Image
              src="/icons/unilab-logo.png"
              alt="Unilab Medical"
              width={40}
              height={40}
              className="rounded-full bg-white object-contain p-1"
            />

            <span className="truncate text-xl font-bold font-serif tracking-wide">
              Unilab Medical
            </span>
          </Link>

          <div className="hidden items-center gap-6 md:flex">
            <Link href={`/${locale}`} className={navItemClass}>
              <span
                className={
                  isHome
                    ? "font-semibold underline underline-offset-4"
                    : "hover:opacity-70"
                }
              >
                {t("home")}
              </span>
            </Link>

            <Link href={`/${locale}/doctors`} className={navItemClass}>
              <span
                className={
                  isDoctors
                    ? "font-semibold underline underline-offset-4"
                    : "hover:opacity-70"
                }
              >
                {t("doctors")}
              </span>
            </Link>

            <Link href={`/${locale}/services`} className={navItemClass}>
              <span
                className={
                  isServices
                    ? "font-semibold underline underline-offset-4"
                    : "hover:opacity-70"
                }
              >
                {t("services")}
              </span>
            </Link>

            {isAdmin && (
              <Link href={`/${locale}/admin/doctors`} className={navItemClass}>
                <span
                  className={
                    isAdminPage
                      ? "font-semibold underline underline-offset-4"
                      : "hover:opacity-70"
                  }
                >
                  Admin
                </span>
              </Link>
            )}

            <LocaleSwitcher />
          </div>

          <button
            className="ml-auto md:hidden"
            onClick={() => setMenuOpen((prev) => !prev)}
            aria-label="Toggle menu"
          >
            {menuOpen ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>

        {menuOpen && (
          <div className="border-t border-white/10 bg-black/95 px-4 py-4 text-white backdrop-blur-md md:hidden">
            <div className="space-y-3">
              <Link
                href={`/${locale}`}
                onClick={handleNavClick}
                className={navItemClass}
              >
                <span
                  className={
                    isHome ? "font-semibold underline underline-offset-4" : ""
                  }
                >
                  {t("home")}
                </span>
              </Link>

              <Link
                href={`/${locale}/doctors`}
                onClick={handleNavClick}
                className={navItemClass}
              >
                <span
                  className={
                    isDoctors
                      ? "font-semibold underline underline-offset-4"
                      : ""
                  }
                >
                  {t("doctors")}
                </span>
              </Link>

              <Link
                href={`/${locale}/services`}
                onClick={handleNavClick}
                className={navItemClass}
              >
                <span
                  className={
                    isServices
                      ? "font-semibold underline underline-offset-4"
                      : ""
                  }
                >
                  {t("services")}
                </span>
              </Link>

              {isAdmin && (
                <Link
                  href={`/${locale}/admin/doctors`}
                  onClick={handleNavClick}
                  className={navItemClass}
                >
                  <span
                    className={
                      isAdminPage
                        ? "font-semibold underline underline-offset-4"
                        : ""
                    }
                  >
                    Admin
                  </span>
                </Link>
              )}

              <div className="pt-2">
                <LocaleSwitcher />
              </div>
            </div>
          </div>
        )}
      </nav>
    </>
  );
}

export default Navbar;
