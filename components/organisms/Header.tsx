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
      <div className="container mx-auto px-3 sm:px-4">
        <div className="flex items-center justify-between h-16 sm:h-20 gap-2 sm:gap-4">
          {/* Logo */}
          <div className="flex items-center flex-shrink-0">
            <Image
              src="/images/logo.png"
              alt="Elektroroller Futura Logo"
              width={180}
              height={60}
              className="h-8 sm:h-12 w-auto"
              priority
            />
          </div>

          {/* CTA Button */}
          <Button
            onClick={scrollToForm}
            className="bg-brand-orange hover:bg-brand-orange/90 text-white px-3 sm:px-6 text-xs sm:text-sm whitespace-nowrap"
          >
            <span className="hidden sm:inline">Preisliste anfordern</span>
            <span className="sm:hidden">Preisliste</span>
          </Button>
        </div>
      </div>
    </header>
  );
}
