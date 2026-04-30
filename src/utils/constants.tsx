import React from "react";
import Image from "next/image";
export const whatsAppNumber = "+77024325253";
export const SKELETON_COUNT = 6;
export const ITEMS_PER_PAGE = 6;

export const socialLinks = [
  {
    href: "https://instagram.com/unilab.medical",
    label: "Instagram",
    icon: (
      <Image
        src="/icons/instagram.svg"
        alt="instagram"
        width={100}
        height={80}
        className="w-25 h-20 mb-2"
      />
    ),
    bg: "bg-gradient-to-br from-yellow-400 via-pink-500 to-purple-600",
  },
  {
    href: "https://www.tiktok.com/@unilab.medical",
    label: "TikTok",
    icon: (
      <Image
        src="/icons/tiktok.svg"
        alt="tiktok"
        width={100}
        height={80}
        className="w-25 h-20 mb-2"
      />
    ),
    bg: "bg-black",
  },
  {
    href: `https://wa.me/${whatsAppNumber}`,
    label: "WhatsApp",
    icon: (
      <Image
        src="/icons/whatsapp.svg"
        alt="WhatsApp"
        width={100}
        height={80}
        className="w-25 h-20 mb-2"
      />
    ),
    bg: "bg-green-500",
  },
  {
    href: "https://t.me/unilab_medical",
    label: "Telegram",
    icon: (
      <Image
        src="/icons/telegram.svg"
        alt="Telegram"
        width={100}
        height={80}
        className="w-25 h-20 mb-2"
      />
    ),
    bg: "bg-blue-500",
  },
];

export const clinicInfo = {
  name: "UniLab",
  address: {
    ru: "г. Алматы, ...",
    kk: "Алматы қ., ...",
    en: "Almaty, ...",
  },
  phone: "+7 xxx xxx xx xx",
  whatsapp: "+7 xxx xxx xx xx",
  email: "info@unilab.kz",
};
