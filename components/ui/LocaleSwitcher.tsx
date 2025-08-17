"use client";

import { usePathname, useRouter } from "@/i18n/navigation";
import { useLocale } from "next-intl";

export default function LocaleSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const switchLocale = (newLocale: string) => {
    if (newLocale !== locale) {
      router.replace(pathname, { locale: newLocale });
      router.refresh();
    }
  };

  return (
    <div className="flex">
      <button
        onClick={() => switchLocale("en")}
        className={`px-2 py-0.5 cursor-pointer sm:text-xl text-sm rounded-md ${
          locale === "en"
            ? "bg-orange-400 text-white"
            : "bg-transparent text-gray-500"
        }`}
      >
        EN
      </button>
      <button
        onClick={() => switchLocale("ko")}
        className={`px-2 py-0.5 cursor-pointer sm:text-xl text-sm rounded-md ${
          locale === "ko"
            ? "bg-orange-400 text-white"
            : "bg-transparent text-gray-500"
        }`}
      >
        KR
      </button>
    </div>
  );
}
