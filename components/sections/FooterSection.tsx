"use client";

import SectionFormat from "@/components/layout/SectionFormat";
import bgImage from "@/assets/images/banner-black-with-logo.png";
import FooterItem from "../ui/FooterItem";
import { motion } from "framer-motion";

export const sectionTheme: "light" | "dark" = "dark";

// Animation container cho title
const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.2, // mỗi title xuất hiện cách nhau 0.2s
    },
  },
};

export default function FooterSection() {
  return (
    <SectionFormat backgroundImage={bgImage}>
      <div className="flex justify-start items-center h-full">
        <motion.div
          className="flex flex-col mt-[25vh] gap-12"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.3 }}
          variants={containerVariants}
        >
          <FooterItem title="Company." content="support@maxius.io" isEmail />
          <FooterItem title="Warranty." content="Learn more >" />
          <FooterItem
            title="Technical support."
            content="support@maxius.io"
            isEmail
          />
        </motion.div>
      </div>
    </SectionFormat>
  );
}
