import { Quote, Users } from "lucide-react";

export function SocialProofBar() {
  return (
    <section className="py-8 md:py-12 bg-gray-50 border-y border-gray-200">
      <div className="container mx-auto px-5 md:px-4">
        <div className="max-w-6xl mx-auto">
          {/* Main Statement */}
          <div className="text-center mb-6 md:mb-8">
            <div className="inline-flex items-center gap-2 mb-3">
              <Users className="h-5 w-5 md:h-6 md:w-6 text-brand-orange" />
              <p className="text-xl md:text-2xl lg:text-3xl font-bold text-gray-800">
                Vertrauen von über{" "}
                <span className="text-brand-orange">50 Sanitätshäusern</span>{" "}
                deutschlandweit
              </p>
            </div>
          </div>

          {/* Testimonial */}
          <div className="bg-white rounded-xl md:rounded-2xl p-6 md:p-8 shadow-md border-l-4 border-brand-orange max-w-4xl mx-auto">
            <div className="flex flex-col md:flex-row gap-4 md:gap-6 items-start md:items-center">
              {/* Quote Icon */}
              <div className="shrink-0">
                <div className="w-12 h-12 md:w-16 md:h-16 rounded-full bg-brand-orange/10 flex items-center justify-center">
                  <Quote className="h-6 w-6 md:h-8 md:w-8 text-brand-orange" />
                </div>
              </div>

              {/* Testimonial Content */}
              <div className="flex-1">
                <p className="text-base md:text-lg lg:text-xl text-gray-700 leading-relaxed italic mb-3 md:mb-4">
                  "Die Margen stimmen und der Service ist top. Eine echte
                  Bereicherung für unser Sortiment."
                </p>
                <div className="flex items-center gap-3">
                  <div className="h-px flex-1 bg-gray-300"></div>
                  <p className="text-sm md:text-base font-semibold text-gray-600">
                    M. Müller, Sanitätshaus Müller
                  </p>
                  <div className="h-px flex-1 bg-gray-300"></div>
                </div>
              </div>
            </div>
          </div>

          {/* Trust Indicators */}
          <div className="mt-6 md:mt-8 flex flex-wrap justify-center gap-4 md:gap-8 text-sm md:text-base text-gray-600">
            <div className="flex items-center gap-2">
              <span className="text-green-600 text-lg">✓</span>
              <span>Seit 2020 am Markt</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-green-600 text-lg">✓</span>
              <span>Made in Germany</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-green-600 text-lg">✓</span>
              <span>TÜV-geprüft</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
