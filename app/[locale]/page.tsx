// app/page.tsx
import dynamic from "next/dynamic";
import HomeClient, { type Theme } from "../../components/layout/HomeClient";

import { getHeroData } from "@/constants/hero.data";
import { featuresData } from "@/constants/features.data";
import { ContactData } from "@/constants/Contact.data";

import HeroSection, {
  sectionTheme as heroTheme,
} from "@/components/sections/HeroSection";

const AboutSection = dynamic(() =>
  import("@/components/sections/AboutSection").then((mod) => mod.default)
);

const FeaturesSection = dynamic(() =>
  import("@/components/sections/FeaturesSection").then((mod) => mod.default)
);

const ContactSection = dynamic(() =>
  import("@/components/sections/ContactSection").then((mod) => mod.default)
);

const FooterSection = dynamic(() =>
  import("@/components/sections/FooterSection").then((mod) => mod.default)
);

export default async function Page({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  const heroData = await getHeroData(locale);

  // Import themes (server side, không ảnh hưởng đến client bundle)
  const [
    { sectionTheme: aboutTheme },
    { sectionTheme: featuresTheme },
    { sectionTheme: contactTheme },
    { sectionTheme: footerTheme },
  ] = await Promise.all([
    import("@/components/sections/AboutSection"),
    import("@/components/sections/FeaturesSection"),
    import("@/components/sections/ContactSection"),
    import("@/components/sections/FooterSection"),
  ]);

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
