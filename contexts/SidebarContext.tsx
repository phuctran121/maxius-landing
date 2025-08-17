"use client";

import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useCallback,
} from "react";
import { useSectionNavigation } from "@/hooks/useSectionNavigation";

type SidebarContextType = {
  // sidebar
  isOpen: boolean;
  toggle: () => void;
  close: () => void;
  openMenu: string | null;
  setOpenMenu: (menu: string | null) => void;

  // section navigation
  current: number;
  navigate: (index: number) => void;
};

const SidebarContext = createContext<SidebarContextType | undefined>(undefined);

export function SidebarProvider({
  children,
  totalSections,
}: {
  children: ReactNode;
  totalSections: number; // 👈 truyền số section vào
}) {
  // sidebar state
  const [isOpen, setIsOpen] = useState(false);
  const [openMenu, setOpenMenu] = useState<string | null>(null);

  const toggle = useCallback(() => setIsOpen((prev) => !prev), []);
  const close = useCallback(() => {
    setIsOpen(false);
    setOpenMenu(null);
  }, []);

  // section navigation state
  const { current, navigate } = useSectionNavigation(totalSections, 600);

  return (
    <SidebarContext.Provider
      value={{
        isOpen,
        toggle,
        close,
        openMenu,
        setOpenMenu,
        current,
        navigate,
      }}
    >
      {children}
    </SidebarContext.Provider>
  );
}

export const useSidebar = () => {
  const ctx = useContext(SidebarContext);
  if (!ctx) throw new Error("useSidebar must be used inside SidebarProvider");
  return ctx;
};
