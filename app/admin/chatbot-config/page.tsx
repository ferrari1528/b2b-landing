"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { Spinner } from "@/components/atoms/Spinner";
import Link from "next/link";

export default function ChatbotConfigPage() {
  const [password, setPassword] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [systemPrompt, setSystemPrompt] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const handleLogin = async () => {
    setIsLoading(true);

    try {
      const response = await fetch("/api/chatbot/config", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${password}`,
        },
      });

      if (!response.ok) {
        throw new Error("Falsches Passwort");
      }

      const result = await response.json();
      setSystemPrompt(result.data.systemPrompt);
      setIsAuthenticated(true);
      toast.success("Erfolgreich angemeldet");
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Authentifizierung fehlgeschlagen"
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleSave = async () => {
    setIsSaving(true);

    try {
      const response = await fetch("/api/chatbot/config", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${password}`,
        },
        body: JSON.stringify({ systemPrompt }),
      });

      if (!response.ok) {
        const result = await response.json();
        throw new Error(result.error || "Fehler beim Speichern");
      }

      toast.success("System Prompt erfolgreich aktualisiert!");
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Fehler beim Speichern"
      );
    } finally {
      setIsSaving(false);
    }
  };

  if (!isAuthenticated) {
    return (
      <main className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-brand-black mb-2">
              Chatbot Konfiguration
            </h1>
            <p className="text-gray-600">
              Bitte authentifizieren Sie sich mit dem Admin-Passwort
            </p>
          </div>

          <div className="space-y-4">
            <div>
              <Label htmlFor="password">Admin Passwort</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleLogin()}
                placeholder="Passwort eingeben..."
                className="mt-2"
              />
            </div>

            <Button
              onClick={handleLogin}
              disabled={isLoading || !password}
              className="w-full bg-brand-orange hover:bg-brand-orange/90"
            >
              {isLoading ? (
                <span className="flex items-center justify-center gap-2">
                  <Spinner size="sm" className="text-white" />
                  Anmelden...
                </span>
              ) : (
                "Anmelden"
              )}
            </Button>

            <Link
              href="/"
              className="block text-center text-sm text-brand-orange hover:underline mt-4"
            >
              ← Zurück zur Startseite
            </Link>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold text-brand-black mb-2">
              Chatbot System Prompt bearbeiten
            </h1>
            <p className="text-gray-600">
              Passen Sie das Verhalten des AI-Chatbots an
            </p>
          </div>
          <Link
            href="/"
            className="text-brand-orange hover:text-brand-red underline"
          >
            ← Zurück
          </Link>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="mb-6">
            <Label htmlFor="systemPrompt" className="text-lg font-semibold">
              System Prompt
            </Label>
            <p className="text-sm text-gray-600 mt-1 mb-4">
              Definieren Sie, wie der Chatbot auf Kundenanfragen reagieren soll.
              Änderungen werden sofort wirksam.
            </p>
            <Textarea
              id="systemPrompt"
              value={systemPrompt}
              onChange={(e) => setSystemPrompt(e.target.value)}
              rows={15}
              className="font-mono text-sm"
              placeholder="Du bist ein KI-Assistent für..."
            />
            <p className="text-xs text-gray-500 mt-2">
              {systemPrompt.length} / 4000 Zeichen
            </p>
          </div>

          <div className="flex gap-4">
            <Button
              onClick={handleSave}
              disabled={isSaving || systemPrompt.length < 10}
              className="bg-brand-orange hover:bg-brand-orange/90 px-8"
            >
              {isSaving ? (
                <span className="flex items-center gap-2">
                  <Spinner size="sm" className="text-white" />
                  Speichern...
                </span>
              ) : (
                "Änderungen speichern"
              )}
            </Button>

            <Button
              variant="outline"
              onClick={() => {
                setIsAuthenticated(false);
                setPassword("");
                setSystemPrompt("");
              }}
            >
              Abmelden
            </Button>
          </div>

          <div className="mt-8 p-4 bg-blue-50 rounded-lg border border-blue-200">
            <h3 className="font-semibold text-blue-900 mb-2">
              💡 Tipps für einen guten Prompt:
            </h3>
            <ul className="text-sm text-blue-800 space-y-1">
              <li>• Definieren Sie die Rolle und Zielgruppe klar</li>
              <li>• Geben Sie konkrete Beispiele für gewünschte Antworten</li>
              <li>• Legen Sie den Tonfall fest (professionell, freundlich, etc.)</li>
              <li>• Erwähnen Sie wichtige Produktdetails und USPs</li>
              <li>• Testen Sie den Prompt regelmäßig mit echten Fragen</li>
            </ul>
          </div>
        </div>
      </div>
    </main>
  );
}
