"use client";

import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { useTheme } from "@/contexts/ThemeContext";
import DotNavigation from "../ui/DotNavigation";
import { useSidebar } from "@/contexts/SidebarContext";
import { usePathname } from "next/navigation";

export type Theme = "light" | "dark";

type HomeClientProps = {
  themes: Theme[];
  children: React.ReactNode; // server-rendered sections
};

export default function HomeClient({ themes, children }: HomeClientProps) {
  // Convert children -> array để dễ map/đếm
  const items = React.Children.toArray(children);
  const total = items.length;

  const { current, navigate } = useSidebar(); // 👈 lấy từ context

  const activeTheme = themes[current] ?? "light";
  const dotColor = activeTheme === "dark" ? "#fff" : "#000";
  const activeDotColor = "#f97316";

  const { setTheme } = useTheme(); // lấy từ context

  useEffect(() => {
    setTheme(activeTheme);
  }, [activeTheme, setTheme]);
  const pathname = usePathname();

  useEffect(() => {
    if (pathname === "/") {
      navigate(0); // 👈 reset khi quay về home
    }
  }, [pathname, navigate]);

  return (
    <div id="hero" className="h-screen overflow-hidden relative">
      {/* Wrapper animate theo current */}
      <motion.div
        animate={{ y: `-${current * 100}vh` }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
      >
        {items.map((node, i) => (
          <React.Fragment key={i}>{node}</React.Fragment>
        ))}
      </motion.div>

      <DotNavigation
        current={current}
        total={total}
        onJump={navigate}
        dotColor={dotColor}
        activeDotColor={activeDotColor}
      />
    </div>
  );
}
