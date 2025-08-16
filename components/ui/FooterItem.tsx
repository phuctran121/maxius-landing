"use client";

import { motion } from "framer-motion";
import { IoMdMail } from "react-icons/io";

type FooterItemProps = {
  title: string;
  content: string;
  isEmail?: boolean;
  linkText?: string;
  titleDelay?: number; // thêm delay tùy biến
  contentDelay?: number; // thêm delay tùy biến
};

export default function FooterItem({
  title,
  content,
  isEmail = false,
  linkText,
  titleDelay = 0,
  contentDelay = 0.3,
}: FooterItemProps) {
  return (
    <div className="flex flex-col text-white gap-3">
      <motion.h3
        initial={{ opacity: 0, y: 150 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, amount: 0.3 }}
        transition={{ duration: 0.6, ease: "easeOut", delay: titleDelay }}
        className="text-white text-xl sm:text-4xl font-semibold tracking-wide"
      >
        {title}
      </motion.h3>

      {isEmail ? (
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ duration: 0.6, ease: "easeOut", delay: contentDelay }}
          className="group px-2 flex justify-between items-center text-white/70 gap-4 hover:bg-white hover:text-black transition-all duration-300 cursor-pointer"
        >
          <p className="py-1 text-xs sm:text-sm tracking-wider leading-relaxed max-w-none sm:max-w-prose">
            {content}
          </p>
          <IoMdMail className="opacity-0 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0" />
        </motion.div>
      ) : (
        <motion.p
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ duration: 0.6, ease: "easeOut", delay: contentDelay }}
          className="py-1 cursor-pointer hover:bg-white hover:text-black transition-all duration-300 pl-2 text-sm text-white/70 tracking-wider leading-relaxed max-w-none sm:max-w-prose"
        >
          {linkText ?? content}
        </motion.p>
      )}
    </div>
  );
}
