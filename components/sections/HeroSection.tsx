"use client";
// import Section1Text from "./Section1Text";
import SectionFormat from "@/components/layout/SectionFormat";
import type { HeroProps } from "@/types/sections.types";
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

export const sectionTheme: "light" | "dark" = "light";

export default function HeroSection({
  backgroundImage,
  title,
  description,
}: HeroProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, amount: 0.3 });
  return (
    <SectionFormat backgroundImage={backgroundImage}>
      <div
        ref={ref}
        className="
          flex flex-col justify-center h-full 
          gap-4 sm:gap-6 md:gap-8 
          pt-24 sm:pt-32 lg:pt-40
          items-center text-center
          lg:items-start lg:text-left
        "
      >
        {/* Title */}
        <div>
          <motion.h1
            initial={{ opacity: 1, y: -700 }}
            animate={
              isInView
                ? {
                    opacity: 1,
                    y: 0,
                    transition: { duration: 0.5, ease: "easeOut" },
                  }
                : {
                    opacity: 1,
                    y: -700,
                    transition: { duration: 0, ease: "easeOut" },
                  }
            }
            className="
            text-[#1A2A59] font-bold 
            text-4xl sm:text-6xl lg:text-8xl 
            leading-tight bg-white/10 backdrop-blur-sm rounded-3xl lg:bg-transparent
          "
          >
            {title}
          </motion.h1>
        </div>

        {/* Description */}
        {description.map((desc, index) => (
          <motion.p
            key={index}
            initial={{ opacity: 1, x: -1200 }}
            animate={
              isInView
                ? {
                    opacity: 1,
                    x: 0,
                    transition: {
                      duration: 0.6,
                      delay: 0.4 + index * 0.3,
                      ease: [0, 0, 0.2, 1],
                    },
                  }
                : {
                    opacity: 1,
                    x: -1200,
                    transition: { duration: 0 },
                  }
            }
            className={`
              text-black font-light tracking-wider leading-relaxed bg-white/10 lg:bg-transparent lg:backdrop-blur-none backdrop-blur-xl rounded-xl
              text-base sm:text-lg lg:text-xl 
              max-w-md sm:max-w-2xl lg:max-w-2xl
              ${index === 1 ? "mt-6 sm:mt-10 lg:mt-12" : ""}
            `}
          >
            {desc}
          </motion.p>
        ))}
      </div>
    </SectionFormat>
  );
}
