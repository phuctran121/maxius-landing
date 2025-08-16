// app/page.tsx
import HomeClient, { type Theme } from "../components/layout/HomeClient";

import HeroSection, {
  sectionTheme as heroTheme,
} from "@/components/sections/HeroSection";
import AboutSection, {
  sectionTheme as aboutTheme,
} from "@/components/sections/AboutSection";
import FeaturesSection, {
  sectionTheme as featuresTheme,
} from "@/components/sections/FeaturesSection";
import ContactSection, {
  sectionTheme as contactTheme,
} from "@/components/sections/ContactSection";
import FooterSection, {
  sectionTheme as footerTheme,
} from "@/components/sections/FooterSection";

import { heroData } from "@/constants/hero.data";
import { featuresData } from "@/constants/features.data";
import { ContactData } from "@/constants/Contact.data";

export default function Page() {
  const themes: Theme[] = [
    heroTheme,
    aboutTheme,
    featuresTheme,
    contactTheme,
    footerTheme,
  ];

  return (
    <HomeClient themes={themes}>
      <HeroSection {...heroData} />
      <AboutSection />
      <FeaturesSection {...featuresData} />
      <ContactSection columns={ContactData} />
      <FooterSection />
    </HomeClient>
  );
}
