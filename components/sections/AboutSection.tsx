"use client";
import SectionFormat from "@/components/layout/SectionFormat";
import bgImage from "@/assets/images/banner-black.png";
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

export const sectionTheme: "light" | "dark" = "dark";

export default function AboutSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, amount: 0.3 });
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
            1. <span className="text-[#FF9933]">Self-produced</span>{" "}
            semiconductors &nbsp; 2. Production and Sales of{" "}
            <span className="text-[#FF9933]">H</span>igh-
            <span className="text-[#FF9933]">P</span>erformance{" "}
            <span className="text-[#FF9933]">P</span>ervers with
            self-manufactured semiconductors &nbsp; 3. Construction of operative{" "}
            <span className="text-[#FF9933]">Blockchain IDC</span> based on
            high-performance servers &nbsp; 4. Establish solution relating to
            Blockchain <span className="text-[#FF9933]">(IPFS)</span>
          </p>
        </motion.div>
      </div>
    </SectionFormat>
  );
}
