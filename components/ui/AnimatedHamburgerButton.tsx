"use client";

import { MotionConfig, motion } from "framer-motion";
import { useTheme } from "@/contexts/ThemeContext";
import { useSidebar } from "@/contexts/SidebarContext";

export const Example = ({
  active,
  onToggle,
}: {
  active: boolean;
  onToggle: () => void;
}) => {
  return <AnimatedHamburgerButton active={active} onToggle={onToggle} />;
};

const AnimatedHamburgerButton = ({
  active,
  onToggle,
}: {
  active: boolean;
  onToggle: () => void;
}) => {
  const { theme } = useTheme();
  const { isOpen } = useSidebar();
  const textColor = theme === "dark" ? "bg-white" : "bg-black";

  return (
    <MotionConfig transition={{ duration: 0.45, ease: "easeInOut" }}>
      <motion.button
        aria-label="Toggle menu"
        initial={false}
        animate={active ? "open" : "closed"}
        onClick={onToggle}
        className="relative h-14 w-14 z-99 rounded-full hover:bg-white/15 cursor-pointer"
      >
        <motion.span
          variants={VARIANTS.top}
          className={`absolute h-[2px] w-8 ${
            isOpen ? "bg-white" : textColor
          } transition-colors duration-300`}
          style={{ y: "-50%", left: "50%", x: "-50%", top: "40%" }}
        />
        <motion.span
          variants={VARIANTS.middle}
          className={`absolute h-[2px] w-8 ${
            isOpen ? "bg-white" : textColor
          } transition-colors duration-300`}
          style={{ left: "50%", x: "-50%", top: "50%", y: "-50%" }}
        />
        <motion.span
          variants={VARIANTS.bottom}
          className={`absolute h-[2px] w-6 ${
            isOpen ? "bg-white" : textColor
          } transition-colors duration-300`}
          style={{
            x: "-50%",
            y: "50%",
            bottom: "35%",
            left: "calc(50% + 8px)",
          }}
        />
      </motion.button>
    </MotionConfig>
  );
};

const VARIANTS = {
  top: {
    open: { rotate: ["0deg", "0deg", "45deg"], top: ["40%", "50%", "50%"] },
    closed: { rotate: ["45deg", "0deg", "0deg"], top: ["50%", "50%", "40%"] },
  },
  middle: {
    open: { rotate: ["0deg", "0deg", "-45deg"] },
    closed: { rotate: ["-45deg", "0deg", "0deg"] },
  },
  bottom: {
    open: {
      rotate: ["0deg", "0deg", "45deg"],
      bottom: ["35%", "50%", "50%"],
      left: "50%",
    },
    closed: {
      rotate: ["45deg", "0deg", "0deg"],
      bottom: ["50%", "50%", "35%"],
      left: "calc(50% + 8px)",
    },
  },
};
