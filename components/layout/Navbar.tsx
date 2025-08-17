"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { Example } from "../ui/AnimatedHamburgerButton";
import { useTheme } from "@/contexts/ThemeContext";
import { useSidebar } from "@/contexts/SidebarContext";
import LocaleSwitcher from "../ui/LocaleSwitcher";
import { Link } from "@/i18n/navigation";

const Navbar = () => {
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);

  const { theme } = useTheme();
  const { isOpen, toggle, close, navigate } = useSidebar();

  const textColor = theme === "dark" ? "text-white" : "text-black";

  useEffect(() => setMounted(true), []);

  useEffect(() => close(), [pathname, close]);

  if (!mounted) return null;

  return (
    <motion.nav
      initial={{ scale: 0.98, filter: "blur(2px)" }}
      animate={{ scale: 1, filter: "blur(0px)" }}
      transition={{ duration: 0.6 }}
      className="fixed top-0 w-full z-[97] bg-transparent"
    >
      <div className="container mx-auto px-6">
        <div className="flex h-28 items-center justify-between relative">
          {pathname === "/en" || pathname === "/ko" ? (
            <a
              href="#"
              onClick={() => navigate(0)} // click vào logo sẽ về section 0
              className={`text-xl font-semibold tracking-wide ${textColor} transition-colors duration-300 cursor-pointer`}
            >
              MAXIUS
            </a>
          ) : (
            <Link
              href="/"
              onClick={() => navigate(0)}
              className={`text-xl font-semibold tracking-wide ${textColor} transition-colors duration-300 cursor-pointer`}
            >
              MAXIUS
            </Link>
          )}

          <Example active={isOpen} onToggle={toggle} />
          <div className="absolute right-0 bottom-0 ">
            <LocaleSwitcher />
          </div>
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;
