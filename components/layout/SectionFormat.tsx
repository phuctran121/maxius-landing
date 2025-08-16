import Image, { StaticImageData } from "next/image";
import { ReactNode } from "react";

type SectionProps = {
  children: ReactNode;
  backgroundImage?: StaticImageData; // nhận ảnh
  backgroundGradient?: string; // nhận gradient (class tailwind)
};

export default function SectionFormat({
  children,
  backgroundImage,
  backgroundGradient,
}: SectionProps) {
  return (
    <section className="relative w-full h-screen ">
      {/* Background */}
      {backgroundImage ? (
        <Image
          src={backgroundImage}
          alt="Background"
          fill
          priority
          sizes="100vw" // giúp nextjs chọn ảnh đúng size
          className="
            object-cover 
            sm:object-center 
            object-[center_top] 
            z-0
          "
        />
      ) : backgroundGradient ? (
        <div className={`absolute inset-0 z-0 ${backgroundGradient}`} />
      ) : null}

      <div className="relative z-20 container mx-auto w-full h-full px-6">
        {children}
      </div>
    </section>
  );
}
