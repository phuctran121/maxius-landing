"use client";

import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { useSidebar } from "@/contexts/SidebarContext";
import { usePathname } from "next/navigation";
import { stripLocale } from "@/utils/utils";

const navLinks = [
  { name: "Home", path: "/" },
  {
    name: "Brochure",
    path: "/brochure",
    sublinks: [
      {
        name: "HJS 2224",
        path: "http://maxius.io/static/media/HJS2224.0c5cf3f7e8107d58642e.pdf",
      },
      {
        name: "TJS 2125G",
        path: "http://maxius.io/static/media/HJS2224.0c5cf3f7e8107d58642e.pdf",
      },
      {
        name: "HGS 4024",
        path: "http://maxius.io/static/media/HJS2224.0c5cf3f7e8107d58642e.pdf",
      },
      {
        name: "TJS 104S",
        path: "http://maxius.io/static/media/HJS2224.0c5cf3f7e8107d58642e.pdf",
      },
      {
        name: "TJS 212S+",
        path: "http://maxius.io/static/media/HJS2224.0c5cf3f7e8107d58642e.pdf",
      },
      {
        name: "HSS 2224",
        path: "http://maxius.io/static/media/HJS2224.0c5cf3f7e8107d58642e.pdf",
      },
    ],
  },
  {
    name: "Proposal",
    path: "/proposal",
    sublinks: [
      {
        name: "IPFS Data Center Development & Operation Consulting",
        path: "http://maxius.io/static/media/HJS2224.0c5cf3f7e8107d58642e.pdf",
      },
      {
        name: "IPFS Data Center Build Vision",
        path: "http://maxius.io/static/media/HJS2224.0c5cf3f7e8107d58642e.pdf",
      },
      {
        name: "Technology Application",
        path: "http://maxius.io/static/media/HJS2224.0c5cf3f7e8107d58642e.pdf",
      },
    ],
  },
  { name: "Contact", path: "/contact" },
];

export default function Sidebar() {
  const { isOpen, openMenu, setOpenMenu, close, navigate } = useSidebar();
  const pathname = usePathname();

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay */}
          <motion.div
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={close}
          />

          {/* Sidebar */}
          <motion.aside
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="
              fixed top-0 right-0 h-screen 
              w-full sm:w-2/3 lg:w-[28%]
              bg-gradient-to-b from-[#0B1438] to-[#162551] 
              text-white shadow-lg z-50 
              overflow-y-auto flex flex-col 
              pt-[20vh] no-scrollbar
            "
          >
            {/* Nav */}
            <nav className="px-6 sm:px-8 space-y-6">
              {navLinks.map((link) => {
                const isActive = pathname === link.path;

                return (
                  <div key={link.name}>
                    {link.sublinks ? (
                      <button
                        onClick={() =>
                          setOpenMenu(openMenu === link.name ? null : link.name)
                        }
                        className={`block w-full text-left cursor-pointer text-2xl sm:text-3xl lg:text-4xl font-light hover:text-[#f93] transition ${
                          openMenu === link.name ? "text-[#f93]" : ""
                        }`}
                      >
                        {link.name}
                      </button>
                    ) : link.name === "Home" &&
                      (pathname === "/en" || pathname === "/ko") ? (
                      <a
                        href="#"
                        onClick={(e) => {
                          e.preventDefault();
                          navigate(0);
                          close();
                        }}
                        className={`block text-2xl sm:text-3xl lg:text-4xl font-light hover:text-[#f93] transition ${
                          isActive ? "text-[#f93]" : ""
                        }`}
                      >
                        {link.name}
                      </a>
                    ) : (
                      <Link
                        href={`${link.path}`}
                        className={`block text-2xl sm:text-3xl lg:text-4xl font-light hover:text-[#f93] transition ${
                          isActive ? "text-[#f93]" : ""
                        }`}
                        onClick={() => {
                          navigate(0);
                          close();
                        }}
                      >
                        {link.name}
                      </Link>
                    )}

                    {/* Sublinks */}
                    <AnimatePresence>
                      {link.sublinks && openMenu === link.name && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.5 }}
                          className="ml-4 mt-2 flex flex-col space-y-2 font-light text-base sm:text-lg"
                        >
                          {link.sublinks.map((sub) => (
                            <a
                              key={sub.name}
                              href={sub.path}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="hover:text-orange-400 transition"
                              onClick={close}
                            >
                              {sub.name}
                            </a>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </nav>

            {/* Footer */}
            <div className="mt-10 px-6 sm:px-8 space-y-4 pt-16 sm:pt-20">
              <div className="border-t border-white pt-8 sm:pt-12 flex flex-col space-y-6 font-light text-white text-xs sm:text-sm leading-relaxed">
                <p>
                  5F 12-30, Simin-daero 327beon-gil, Dongan-gu, Anyang-si,
                  Gyeonggi-do, Republic of Korea
                  <br />
                  Tel 02. 851. 2662 / Fax 02. 851. 2655
                </p>
                <p className="underline cursor-pointer">View Map</p>
                <p>
                  Company. <br />
                  <a
                    href="mailto:support@maxius.io"
                    className="hover:text-orange-400"
                  >
                    support@maxius.io
                  </a>
                </p>
                <p>
                  Technical support <br />
                  <a
                    href="mailto:support@maxius.io"
                    className="hover:text-orange-400"
                  >
                    support@maxius.io
                  </a>
                </p>
                <p>
                  Hotline. <br />
                  <span>Tel 02. 851. 2662 / Fax 02. 851. 2655</span>
                </p>

                <p>
                  Footer. <br />
                  <span>To the World!!!</span>
                </p>
              </div>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
