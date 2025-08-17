"use client";
import SectionFormat from "@/components/layout/SectionFormat";
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

export const sectionTheme: "light" | "dark" = "light";

type Column = {
  title: string;
  content: React.ReactNode;
};

export default function ContactSection({ columns }: { columns: Column[] }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, amount: 0.3 });
  return (
    <SectionFormat>
      <div
        ref={ref}
        className="flex flex-col justify-center items-center h-full"
      >
        <motion.h2
          initial={{ opacity: 0, y: -120 }}
          animate={
            isInView
              ? {
                  opacity: 1,
                  y: 0,
                  transition: {
                    duration: 0.6,
                    delay: 0.3,
                    ease: [0, 0, 0.2, 1],
                  },
                }
              : {
                  opacity: 0,
                  y: -120,
                  transition: { duration: 0 },
                }
          }
          className="text-5xl text-black md:text-8xl font-bold uppercase mb-16"
        >
          STORY
        </motion.h2>

        {/* Desktop: grid 4 cột | Mobile: horizontal scroll */}
        <motion.div
          initial={{ opacity: 0, x: -240 }}
          animate={
            isInView
              ? {
                  opacity: 1,
                  x: 0,
                  transition: {
                    duration: 0.6,
                    delay: 0.6,
                    ease: [0, 0, 0.2, 1],
                  },
                }
              : {
                  opacity: 0,
                  x: -240,
                  transition: { duration: 0 },
                }
          }
          className="
            w-full
            flex md:grid md:grid-cols-4 gap-6
            overflow-x-auto md:overflow-visible
            snap-x snap-mandatory md:snap-none
            scroll-smooth
          "
        >
          {columns.map((col, index) => (
            <div
              key={index}
              className="
                flex flex-col justify-center items-start mb-4
                min-w-[100%] sm:min-w-[50%] md:min-w-0
                snap-start
              "
            >
              <h3 className="text-4xl text-black font-bold mb-6">
                {col.title}
              </h3>

              <div className="bg-white/5 transition-all duration-300 relative group border-r min-h-96">
                <div className="pr-5 max-h-96 overflow-hidden group-hover:overflow-y-auto custom-scrollbar text-xs pt-12 leading-6">
                  {col.content}
                </div>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </SectionFormat>
  );
}
