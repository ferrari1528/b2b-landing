"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { leadRegistrationSchema, LeadRegistrationInput } from "@/lib/validations/schemas";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Spinner } from "@/components/atoms/Spinner";
import { CheckCircle2 } from "lucide-react";

export function RegistrationForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
    watch,
  } = useForm<LeadRegistrationInput>({
    resolver: zodResolver(leadRegistrationSchema),
  });

  // Watch sanitaetshaus field and auto-populate firma
  const sanitaetshaus = watch("sanitaetshaus");

  // Auto-sync firma with sanitaetshaus using useEffect to prevent infinite loop
  useEffect(() => {
    if (sanitaetshaus) {
      setValue("firma", sanitaetshaus, { shouldValidate: false });
    }
  }, [sanitaetshaus, setValue]);

  // Debug: Log validation errors
  if (Object.keys(errors).length > 0) {
    console.log("⚠️ Validation errors:", errors);
    // Show which fields have errors
    Object.keys(errors).forEach(key => {
      console.log(`  ❌ ${key}:`, errors[key as keyof typeof errors]?.message);
    });
  }

  const onSubmit = async (data: LeadRegistrationInput) => {

    console.log("🚀 Form submitted!", data);
    setIsSubmitting(true);

    try {
      console.log("📤 Sending request to /api/leads...");
      const response = await fetch("/api/leads", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();
      console.log("📥 Response received:", response.status, result);

      if (!response.ok) {
        console.error("❌ Request failed:", result);
        throw new Error(result.error || "Ein Fehler ist aufgetreten");
      }

      // Success
      console.log("✅ Form submission successful!");
      setIsSuccess(true);
      toast.success(result.data.message || "Preisliste erfolgreich angefordert!");
      reset();
    } catch (error) {
      console.error("Form submission error:", error);
      toast.error(
        error instanceof Error
          ? error.message
          : "Ein Fehler ist aufgetreten. Bitte versuchen Sie es erneut."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="text-center py-16 px-4">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-6">
          <CheckCircle2 className="h-8 w-8 text-green-600" />
        </div>
        <h3 className="text-2xl font-bold text-brand-black mb-4">
          Vielen Dank für Ihre Anfrage!
        </h3>
        <p className="text-lg text-gray-600 mb-6 max-w-md mx-auto">
          Ihre Händler-Preisliste wurde an Ihre E-Mail-Adresse gesendet.
          Bitte prüfen Sie auch Ihren Spam-Ordner.
        </p>
        <p className="text-sm text-gray-500">
          Wir werden uns in Kürze bei Ihnen melden.
        </p>
      </div>
    );
  }

  return (
    <section id="registration-form" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-4xl md:text-5xl font-bold text-brand-black mb-3 sm:mb-4 px-2">
              Jetzt{" "}
              <span className="text-brand-orange">Händler-Preisliste & Infomaterial</span>{" "}
              anfordern
            </h2>
            <p className="text-base sm:text-lg text-gray-600 px-4">
              Kostenlos und unverbindlich – Erhalten Sie sofort Zugang zu unseren
              exklusiven B2B-Konditionen und Produktinformationen
            </p>
          </div>

          {/* Price Convincer Box */}
          <div className="bg-gradient-to-br from-brand-orange/10 to-brand-red/10 border-l-4 border-brand-orange rounded-lg p-6 mb-8">
            <div className="flex items-start gap-4">
              <div className="text-4xl">💎</div>
              <div>
                <h3 className="text-xl font-bold text-brand-black mb-2">
                  Attraktiv für Ihre Kunden, hochprofitabel für Sie
                </h3>
                <p className="text-gray-700 leading-relaxed mb-3">
                  Unsere <strong>führerscheinfreien 25 km/h E-Mobile</strong> starten bereits bei einem Endkunden-UVP von nur <strong className="text-brand-orange text-xl">1.599 €</strong>.
                  Profitieren Sie von einer <strong>überdurchschnittlich hohen Händlermarge</strong> und erschließen Sie sich eine neue, kaufkräftige Zielgruppe.
                </p>
                <p className="text-sm text-gray-600 italic">
                  👉 Fordern Sie jetzt die vollständige Preisliste inkl. aller Margen-Details an.
                </p>
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="bg-white rounded-2xl shadow-xl p-4 sm:p-8 md:p-10">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 sm:space-y-6">
              {/* Sanitätshaus */}
              <div>
                <Label
                  htmlFor="sanitaetshaus"
                  className="text-brand-black font-medium"
                >
                  Firmenname{" "}
                  <span className="text-brand-red">*</span>
                </Label>
                <Input
                  id="sanitaetshaus"
                  type="text"
                  placeholder="Ihre Firma GmbH"
                  {...register("sanitaetshaus")}
                  className="mt-2"
                />
                {errors.sanitaetshaus && (
                  <p className="text-sm text-brand-red mt-1">
                    {errors.sanitaetshaus.message}
                  </p>
                )}
              </div>

              {/* Hidden firma field - auto-populated from sanitaetshaus */}
              <input type="hidden" {...register("firma")} />

              {/* Ansprechpartner */}
              <div>
                <Label htmlFor="name" className="text-brand-black font-medium">
                  Ansprechpartner <span className="text-brand-red">*</span>
                </Label>
                <Input
                  id="name"
                  type="text"
                  placeholder="Max Mustermann"
                  {...register("name")}
                  className="mt-2"
                />
                {errors.name && (
                  <p className="text-sm text-brand-red mt-1">
                    {errors.name.message}
                  </p>
                )}
              </div>


              {/* Email */}
              <div>
                <Label htmlFor="email" className="text-brand-black font-medium">
                  E-Mail-Adresse <span className="text-brand-red">*</span>
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="max@mustermann.de"
                  {...register("email")}
                  className="mt-2"
                />
                {errors.email && (
                  <p className="text-sm text-brand-red mt-1">
                    {errors.email.message}
                  </p>
                )}
              </div>

              {/* Telefon */}
              <div>
                <Label htmlFor="telefon" className="text-brand-black font-medium">
                  Telefonnummer <span className="text-brand-red">*</span>
                </Label>
                <Input
                  id="telefon"
                  type="tel"
                  placeholder="+49 123 456789"
                  {...register("telefon")}
                  className="mt-2"
                />
                {errors.telefon && (
                  <p className="text-sm text-brand-red mt-1">
                    {errors.telefon.message}
                  </p>
                )}
              </div>

              {/* Stadt */}
              <div>
                <Label htmlFor="stadt" className="text-brand-black font-medium">
                  Stadt <span className="text-brand-red">*</span>
                </Label>
                <Input
                  id="stadt"
                  type="text"
                  placeholder="Berlin"
                  {...register("stadt")}
                  className="mt-2"
                />
                {errors.stadt && (
                  <p className="text-sm text-brand-red mt-1">
                    {errors.stadt.message}
                  </p>
                )}
              </div>

              {/* Honeypot (hidden) */}
              <input
                type="text"
                {...register("honeypot")}
                style={{ display: "none" }}
                tabIndex={-1}
                autoComplete="off"
              />

              {/* DSGVO Consent */}
              <div className="flex items-start gap-3">
                <input
                  id="dsgvoConsent"
                  type="checkbox"
                  {...register("dsgvoConsent")}
                  className="mt-1 h-4 w-4 rounded border-gray-300 text-brand-orange focus:ring-brand-orange"
                />
                <Label
                  htmlFor="dsgvoConsent"
                  className="text-sm text-gray-600 font-normal cursor-pointer"
                >
                  Ich stimme der Verarbeitung meiner Daten gemäß der{" "}
                  <a
                    href="/datenschutz"
                    target="_blank"
                    className="text-brand-orange underline hover:text-brand-red"
                  >
                    Datenschutzerklärung
                  </a>{" "}
                  zu. <span className="text-brand-red">*</span>
                </Label>
              </div>
              {errors.dsgvoConsent && (
                <p className="text-sm text-brand-red">
                  {errors.dsgvoConsent.message}
                </p>
              )}

              {/* Submit Button */}
              <Button
                type="submit"
                disabled={isSubmitting}
                onClick={() => console.log("🔘 Button clicked!")}
                className="w-full bg-brand-orange hover:bg-brand-orange/90 text-white py-4 sm:py-6 text-sm sm:text-lg font-semibold"
              >
                {isSubmitting ? (
                  <span className="flex items-center justify-center gap-2">
                    <Spinner size="sm" className="text-white" />
                    Wird gesendet...
                  </span>
                ) : (
                  <>
                    <span className="hidden sm:inline">Jetzt Händler-Preisliste & Infomaterial anfordern</span>
                    <span className="sm:hidden">Preisliste jetzt anfordern</span>
                  </>
                )}
              </Button>

              <p className="text-xs text-gray-500 text-center">
                ✓ Kostenlos • ✓ Unverbindlich • ✓ DSGVO-konform
              </p>
            </form>
          </div>

          {/* Trust indicators */}
          <div className="mt-8 text-center text-sm text-gray-500">
            <p>
              Ihre Daten werden vertraulich behandelt und nicht an Dritte
              weitergegeben.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
