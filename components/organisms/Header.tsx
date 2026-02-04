"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";

export function Header() {
  const scrollToForm = () => {
    const formSection = document.getElementById("registration-form");
    formSection?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-200 shadow-sm">
      <div className="container mx-auto px-2 sm:px-4">
        <div className="flex items-center justify-between h-14 sm:h-20 gap-1 sm:gap-4">
          {/* Logo */}
          <div className="flex items-center flex-shrink min-w-0">
            <Image
              src="/images/logo.png"
              alt="Elektroroller Futura Logo"
              width={180}
              height={60}
              className="h-7 sm:h-12 w-auto max-w-[140px] sm:max-w-none"
              priority
            />
          </div>

          {/* CTA Button */}
          <Button
            onClick={scrollToForm}
            className="bg-brand-orange hover:bg-brand-orange/90 text-white px-2 py-2 sm:px-6 sm:py-3 text-[11px] sm:text-sm whitespace-nowrap flex-shrink-0"
          >
            <span className="hidden sm:inline">Preisliste anfordern</span>
            <span className="sm:hidden">Preisliste</span>
          </Button>
        </div>
      </div>
    </header>
  );
}
