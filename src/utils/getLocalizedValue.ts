export type LocalizedFields = {
  ru?: string | null;
  kk?: string | null;
  en?: string | null;
};

export function getLocalizedValue(
  locale: string,
  values: LocalizedFields,
): string {
  if (locale === "kk") {
    return values.kk || values.ru || values.en || "";
  }

  if (locale === "en") {
    return values.en || values.ru || values.kk || "";
  }

  return values.ru || values.kk || values.en || "";
}
