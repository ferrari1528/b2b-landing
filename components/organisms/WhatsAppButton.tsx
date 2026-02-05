"use client";

import { useState, useEffect } from "react";
import { X } from "lucide-react";
import Image from "next/image";

// WhatsApp SVG Logo Component
const WhatsAppIcon = ({ className }: { className?: string }) => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
  </svg>
);

export function WhatsAppButton() {
  const [showModal, setShowModal] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // WhatsApp Nummer
  const whatsappNumber = "4915224641889"; // +49-1522 4641889 ohne + und -
  const whatsappMessage = encodeURIComponent(
    "Hallo! Ich interessiere mich für Ihre Elektroroller und hätte gerne weitere Informationen zu den Händlerkonditionen."
  );
  const whatsappLink = `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`;

  // Check if mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const handleClick = () => {
    if (isMobile) {
      // Mobile: Direkt WhatsApp öffnen
      window.open(whatsappLink, "_blank");
    } else {
      // Desktop: Modal mit QR-Code öffnen
      setShowModal(true);
    }
  };

  return (
    <>
      {/* Floating WhatsApp Button */}
      <button
        onClick={handleClick}
        className="fixed bottom-6 right-6 z-40 flex items-center gap-3 bg-[#25D366] hover:bg-[#1da851] text-white px-4 md:px-6 py-3 md:py-4 rounded-full shadow-2xl hover:shadow-3xl transition-all transform hover:scale-105 group min-h-[56px] touch-manipulation"
        aria-label="WhatsApp Chat starten"
      >
        {/* Text (hidden on mobile) */}
        <span className="hidden md:block font-semibold text-base whitespace-nowrap">
          Kundenchat hier starten
        </span>

        {/* WhatsApp Icon */}
        <div className="bg-white rounded-full p-2 md:p-2.5 group-hover:rotate-12 transition-transform">
          <WhatsAppIcon className="h-6 w-6 md:h-7 md:w-7 text-[#25D366]" />
        </div>

        {/* Pulse Animation */}
        <span className="absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-20"></span>
      </button>

      {/* Desktop Modal with QR Code */}
      {showModal && !isMobile && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm px-4"
          onClick={() => setShowModal(false)}
        >
          <div
            className="bg-white rounded-2xl p-8 max-w-md w-full shadow-2xl relative animate-in fade-in zoom-in duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-full transition-colors"
              aria-label="Schließen"
            >
              <X className="h-6 w-6 text-gray-600" />
            </button>

            {/* Header */}
            <div className="text-center mb-6">
              <h3 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">
                Fragen zu unseren{" "}
                <span className="text-brand-orange">Elektrorollern?</span>
              </h3>
              <p className="text-gray-600 text-base md:text-lg">
                Scannen Sie den Code oder klicken Sie hier:
              </p>
            </div>

            {/* QR Code */}
            <div className="flex justify-center mb-6">
              <div className="bg-white p-4 rounded-xl border-4 border-[#25D366] shadow-lg">
                <div className="w-64 h-64 relative bg-white flex items-center justify-center">
                  {/* QR Code über externe API generieren */}
                  <Image
                    src={`https://api.qrserver.com/v1/create-qr-code/?size=256x256&data=${encodeURIComponent(
                      whatsappLink
                    )}`}
                    alt="WhatsApp QR Code"
                    width={256}
                    height={256}
                    className="w-full h-full"
                    unoptimized
                  />
                </div>
              </div>
            </div>

            {/* CTA Button */}
            <button
              onClick={() => window.open(whatsappLink, "_blank")}
              className="w-full bg-[#25D366] hover:bg-[#1da851] text-white py-4 px-6 rounded-lg font-bold text-lg transition-all transform hover:scale-105 shadow-lg flex items-center justify-center gap-3 min-h-[56px]"
            >
              <WhatsAppIcon className="h-6 w-6" />
              Jetzt Chat starten
            </button>

            {/* Info Text */}
            <p className="text-center text-sm text-gray-500 mt-4">
              Sie werden zu WhatsApp weitergeleitet
            </p>
          </div>
        </div>
      )}
    </>
  );
}
