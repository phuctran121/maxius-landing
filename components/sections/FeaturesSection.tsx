"use client";

import { useState, useMemo } from "react";
import SectionFormat from "@/components/layout/SectionFormat";
import type { FeaturesProps } from "@/types/sections.types";
import { motion, type Variants } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

/** escape để build regex an toàn cho highlights */
const escapeRegExp = (s: string) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

function ParagraphWithHighlights({
  text,
  highlights = [],
}: {
  text: string;
  highlights?: string[];
}) {
  const { regex, setLC } = useMemo(() => {
    if (!highlights.length)
      return { regex: null as RegExp | null, setLC: new Set<string>() };
    const set = new Set(highlights.map((h) => h.toLowerCase()));
    const pattern = highlights.map(escapeRegExp).join("|");
    return { regex: new RegExp(`(${pattern})`, "gi"), setLC: set };
  }, [highlights]);

  if (!regex) return <>{text}</>;

  const parts = text.split(regex);
  return (
    <>
      {parts.map((part, i) => {
        const isHit = setLC.has(part.toLowerCase());
        return isHit ? (
          <span key={i} className="text-orange-400">
            {part}
          </span>
        ) : (
          <span key={i}>{part}</span>
        );
      })}
    </>
  );
}

export const sectionTheme: "light" | "dark" = "dark";

export default function FeaturesSection({
  backgroundGradient = "bg-gradient-to-b from-[#0B1438] to-[#162551]",
  items,
}: FeaturesProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [isAnimating, setIsAnimating] = useState(true); // ban đầu true để animation chạy
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, amount: 0.3 });

  // Title animation variants
  const titleVariants: Variants = {
    hidden: (i: number) => ({
      opacity: 0,
      y: i % 2 === 0 ? 500 : -500,
    }),
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        delay: i * 0.25,
        ease: "easeOut",
      },
    }),
  };

  return (
    <SectionFormat backgroundGradient={backgroundGradient}>
      <div
        ref={ref}
        className="flex flex-col justify-center items-center md:justify-normal md:items-stretch md:flex-row w-full h-full min-h-[500px]"
      >
        {items.map((item, i) => (
          <div
            key={item.title}
            className={`flex flex-col px-6 py-8 cursor-pointer rounded-xl transition-all duration-300 overflow-hidden 
              border-b md:border-b-0 md:border-r border-white/35 
              last:border-b-0 md:last:border-r-0 
              ${activeIndex === i ? "md:flex-[2] bg-white/10" : "md:flex-1"}`}
            // Hover chỉ khi animation xong
            onMouseEnter={() =>
              window.innerWidth >= 768 && !isAnimating && setActiveIndex(i)
            }
            onMouseLeave={() =>
              window.innerWidth >= 768 && !isAnimating && setActiveIndex(null)
            }
            onClick={() =>
              window.innerWidth < 768 &&
              !isAnimating &&
              setActiveIndex(activeIndex === i ? null : i)
            }
          >
            {/* Title */}
            <motion.h2
              custom={i}
              variants={titleVariants}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              onAnimationStart={() => setIsAnimating(true)}
              onAnimationComplete={() => setIsAnimating(false)}
              className={`text-xl md:text-3xl text-white font-bold transition-colors duration-300 
                md:mt-[25vh] flex justify-between items-center`}
            >
              {item.title}
              <span className="md:hidden text-white/70">
                {activeIndex === i ? "−" : "+"}
              </span>
            </motion.h2>

            {/* Content */}
            <div
              className={`transition-all duration-500 mt-4 md:mt-8 ${
                activeIndex === i
                  ? "opacity-100 max-h-[600px]"
                  : "opacity-0 max-h-0"
              } overflow-hidden text-white text-justify leading-relaxed`}
            >
              <div className="space-y-3 text-sm md:text-base font-light text-white/90">
                {item.paragraphs.map((p, index) => (
                  <p key={index}>
                    <ParagraphWithHighlights
                      text={p.text}
                      highlights={p.highlights}
                    />
                  </p>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </SectionFormat>
  );
}
