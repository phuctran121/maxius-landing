"use client";
import SectionFormat from "@/components/layout/SectionFormat";
import bgImage from "@/assets/images/banner-black.png";
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { useTranslations } from "next-intl";

export const sectionTheme: "light" | "dark" = "dark";

export default function AboutSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, amount: 0.3 });
  const t = useTranslations("about");

  return (
    <SectionFormat backgroundImage={bgImage}>
      <div
        ref={ref}
        className="flex flex-col items-center justify-center h-full"
      >
        <motion.div
          initial={{ opacity: 0, x: -1200 }}
          animate={
            isInView
              ? {
                  opacity: 1,
                  x: 0,
                  transition: {
                    duration: 0.8,
                    delay: 0.3,
                    ease: [0, 0, 0.2, 1],
                  },
                }
              : {
                  opacity: 0,
                  x: -1200,
                  transition: { duration: 0 },
                }
          }
          className="
            max-w-7xl mx-auto 
            px-4 sm:px-6 lg:px-12 
            text-white
          "
        >
          <p
            className="
              text-base sm:text-lg md:text-2xl lg:text-3xl xl:text-5xl 
              font-semibold 
              leading-relaxed sm:leading-snug lg:leading-tight
              tracking-wide
              text-left sm:text-justify
            "
          >
            {t.rich("content", {
              hl: (chunks) => <span className="text-[#FF9933]">{chunks}</span>,
            })}
          </p>
        </motion.div>
      </div>
    </SectionFormat>
  );
}
