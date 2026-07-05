import Image from "next/image";

import { brandLogoTextClass } from "@/lib/marketing-nav-layout";

type BrandLogoProps = {
  showWordmark?: boolean;
};

export function BrandLogo({ showWordmark = true }: BrandLogoProps) {
  return (
    <>
      <Image
        src="/logo.png"
        alt={showWordmark ? "" : "Meecanico"}
        width={36}
        height={36}
        className="size-8 shrink-0 sm:size-9"
        priority
      />
      {showWordmark ? (
        <span className={brandLogoTextClass}>Meecanico</span>
      ) : null}
    </>
  );
}
