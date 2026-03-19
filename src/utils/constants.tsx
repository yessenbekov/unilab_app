import React from "react";
export const whatsAppNumber = "+77024325253";
export const SKELETON_COUNT = 6;
export const ITEMS_PER_PAGE = 6;

export const socialLinks = [
  {
    href: "https://instagram.com/unilab.medical",
    label: "Instagram",
    icon: (
      <img
        src="/icons/instagram.svg"
        alt="instagram"
        className="w-25 h-20 mb-2"
      />
    ),
    bg: "bg-gradient-to-br from-yellow-400 via-pink-500 to-purple-600",
  },
  {
    href: "https://www.tiktok.com/@unilab.medical",
    label: "TikTok",
    icon: (
      <img src="/icons/tiktok.svg" alt="tiktok" className="w-25 h-20 mb-2" />
    ),
    bg: "bg-black",
  },
  {
    href: `https://wa.me/${whatsAppNumber}`,
    label: "WhatsApp",
    icon: (
      <img
        src="/icons/whatsapp.svg"
        alt="WhatsApp"
        className="w-25 h-20 mb-2"
      />
    ),
    bg: "bg-green-500",
  },
  {
    href: "https://t.me/unilab_medical",
    label: "Telegram",
    icon: (
      <img
        src="/icons/telegram.svg"
        alt="Telegram"
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
