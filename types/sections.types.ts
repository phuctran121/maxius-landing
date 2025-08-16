import type { StaticImageData } from "next/image";
import type { IconType } from "react-icons";

export type Theme = "light" | "dark";

/** ---------- Hero ---------- */
export interface HeroProps {
  theme: Theme;
  backgroundImage: StaticImageData;
  title: string;
  description: string[]; // mỗi phần tử là 1 <p>
}

/** ---------- Features ---------- */
export interface FeaturesParagraph {
  text: string; // đoạn văn thuần text
  highlights?: string[]; // các cụm cần highlight bằng <span class="text-orange-400">
}

export interface FeaturesItem {
  title: string;
  paragraphs: FeaturesParagraph[];
}

export interface FeaturesProps {
  theme: Theme;
  backgroundGradient?: string; // ví dụ "bg-gradient-to-b from-[#0B1438] to-[#162551]"
  items: FeaturesItem[];
}

/** ---------- Footer ---------- */
export interface FooterLink {
  label: string;
  href?: string;
  icon?: IconType;
}

export interface FooterColumn {
  title: string;
  links: FooterLink[];
}

export interface FooterProps {
  theme: Theme;
  backgroundImage: StaticImageData;
  columns: FooterColumn[];
}
