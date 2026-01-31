"use client";

import { useState } from "react";
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
  } = useForm<LeadRegistrationInput>({
    resolver: zodResolver(leadRegistrationSchema),
  });

  const onSubmit = async (data: LeadRegistrationInput) => {
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/leads", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Ein Fehler ist aufgetreten");
      }

      // Success
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
    <section id="registration-form" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-brand-black mb-4">
              Jetzt{" "}
              <span className="text-brand-orange">Händler-Preisliste</span>{" "}
              anfordern
            </h2>
            <p className="text-lg text-gray-600">
              Kostenlos und unverbindlich – Erhalten Sie sofort Zugang zu unseren
              exklusiven B2B-Konditionen
            </p>
          </div>

          {/* Form */}
          <div className="bg-white rounded-2xl shadow-xl p-8 md:p-10">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              {/* Name */}
              <div>
                <Label htmlFor="name" className="text-brand-black font-medium">
                  Ihr Name <span className="text-brand-red">*</span>
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

              {/* Firma */}
              <div>
                <Label htmlFor="firma" className="text-brand-black font-medium">
                  Firma / Sanitätshaus <span className="text-brand-red">*</span>
                </Label>
                <Input
                  id="firma"
                  type="text"
                  placeholder="Mustermann GmbH"
                  {...register("firma")}
                  className="mt-2"
                />
                {errors.firma && (
                  <p className="text-sm text-brand-red mt-1">
                    {errors.firma.message}
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

              {/* Sanitätshaus */}
              <div>
                <Label
                  htmlFor="sanitaetshaus"
                  className="text-brand-black font-medium"
                >
                  Name des Sanitätshauses{" "}
                  <span className="text-brand-red">*</span>
                </Label>
                <Input
                  id="sanitaetshaus"
                  type="text"
                  placeholder="Sanitätshaus Mustermann"
                  {...register("sanitaetshaus")}
                  className="mt-2"
                />
                {errors.sanitaetshaus && (
                  <p className="text-sm text-brand-red mt-1">
                    {errors.sanitaetshaus.message}
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
                className="w-full bg-brand-orange hover:bg-brand-orange/90 text-white py-6 text-lg font-semibold"
              >
                {isSubmitting ? (
                  <span className="flex items-center justify-center gap-2">
                    <Spinner size="sm" className="text-white" />
                    Wird gesendet...
                  </span>
                ) : (
                  "Jetzt kostenlos Preisliste anfordern"
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
