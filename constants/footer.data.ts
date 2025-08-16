import type { FooterProps } from "@/types/sections.types";
import footerBg from "@/assets/images/footer-bg.png";
import { IoMdMail } from "react-icons/io";
export const footerData: FooterProps = {
  theme: "dark",
  backgroundImage: footerBg,
  columns: [
    {
      title: "Company.",
      links: [{ label: "support@maxius.io", icon: IoMdMail }],
    },
    {
      title: "Warranty.",
      links: [{ label: "Learn more >", href: "#" }],
    },
    {
      title: "Technical support.",
      links: [{ label: "support@maxius.io", icon: IoMdMail }],
    },
  ],
};
