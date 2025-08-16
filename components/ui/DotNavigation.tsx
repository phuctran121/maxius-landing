"use client";

import React from "react";
import { motion } from "framer-motion";

type DotNavigationProps = {
  current: number;
  total: number;
  onJump: (index: number) => void;
  dotColor: string;
  activeDotColor: string;
};

const DotNavigation = React.memo(function DotNavigation({
  current,
  total,
  onJump,
  dotColor,
  activeDotColor,
}: DotNavigationProps) {
  return (
    <div className="absolute sm:right-12 sm:top-1/2 sm:bottom-auto sm:-translate-y-1/2 flex-row flex sm:flex-col items-end bottom-6 gap-2 left-1/2 ">
      {Array.from({ length: total }).map((_, i) => {
        const isActive = i === current;
        return (
          <motion.div
            key={i}
            onClick={() => onJump(i)}
            initial={false}
            whileHover={{ width: 28 }}
            animate={{
              width: isActive ? 28 : 8,
              height: 8,
              backgroundColor: isActive ? activeDotColor : dotColor,
            }}
            transition={{ duration: 0.3 }}
            className="rounded-full origin-right cursor-pointer"
          />
        );
      })}
    </div>
  );
});

export default DotNavigation;
