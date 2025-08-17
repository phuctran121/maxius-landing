// constants/hero.data.ts
import type { HeroProps } from "@/types/sections.types";
import heroBg from "@/assets/images/hero-white-with-logo.png";
import { getTranslations } from "next-intl/server";

export async function getHeroData(locale: string): Promise<HeroProps> {
  const t = await getTranslations({ locale, namespace: "hero" });

  return {
    theme: "light",
    backgroundImage: heroBg,
    title: t("title"),
    description: [t("description1"), t("description2")],
  };
}
