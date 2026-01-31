# 🚀 Komplette Setup-Anleitung - B2B Elektroroller Landingpage

## Zeitaufwand: ca. 45-60 Minuten

Diese Anleitung führt dich Schritt für Schritt durch das komplette Setup der B2B-Landingpage.

---

## 📋 Voraussetzungen

- ✅ Node.js 18+ installiert
- ✅ Google Account (für Google Sheets)
- ✅ 2chat Account (bereits vorhanden)
- ✅ Kreditkarte für API-Dienste (DeepSeek, Resend)

---

# TEIL 1: Google Sheets einrichten (15 Min)

## Schritt 1: Google Cloud Projekt erstellen

1. **Öffne**: [Google Cloud Console](https://console.cloud.google.com/)
2. **Klicke**: "Projekt auswählen" (oben links) → "NEUES PROJEKT"
3. **Projektname**: `B2B Elektroroller Futura`
4. **Klicke**: "Erstellen"
5. **Warte**: 30 Sekunden

## Schritt 2: Google Sheets API aktivieren

1. **Stelle sicher**: Neues Projekt ist ausgewählt (oben links)
2. **Suche**: "Google Sheets API" in der Suchleiste
3. **Klicke**: "Google Sheets API" → "Aktivieren"

## Schritt 3: Service Account erstellen

1. **Menü**: "APIs & Dienste" → "Anmeldedaten"
2. **Klicke**: "+ ANMELDEDATEN ERSTELLEN" → "Dienstkonto"
3. **Name**: `elektroroller-sheets-service`
4. **Klicke**: "ERSTELLEN UND FORTFAHREN"
5. **Rolle**: "Einfach" → "Editor"
6. **Klicke**: "WEITER" → "FERTIG"

## Schritt 4: JSON-Schlüssel herunterladen

1. **Klicke**: Auf das Dienstkonto `elektroroller-sheets-service@...`
2. **Tab**: "SCHLÜSSEL"
3. **Klicke**: "SCHLÜSSEL HINZUFÜGEN" → "Neuen Schlüssel erstellen"
4. **Format**: JSON
5. **Klicke**: "ERSTELLEN"
6. **Speichere**: Die JSON-Datei **sicher** (NIEMALS ins Git hochladen!)

## Schritt 5: Google Spreadsheet erstellen

1. **Öffne**: [Google Sheets](https://sheets.google.com/)
2. **Neue Tabelle**: Leere Tabelle erstellen
3. **Name**: `B2B Elektroroller Futura` (oben links)
4. **Kopiere Spreadsheet-ID** aus der URL:
   ```
   https://docs.google.com/spreadsheets/d/[DIESE_ID_KOPIEREN]/edit
   ```

## Schritt 6: Spreadsheet freigeben

1. **Öffne**: Die JSON-Datei von Schritt 4
2. **Kopiere**: Die `client_email` (z.B. `elektroroller-...@....gserviceaccount.com`)
3. **Zurück zu Sheets**: Klicke "Freigeben" (oben rechts)
4. **Füge ein**: Die Service Account E-Mail
5. **Rolle**: "Bearbeiter"
6. **Klicke**: "Senden" (Benachrichtigung überspringen)

## Schritt 7: Sheets mit Spalten erstellen

### Sheet 1: "B2B_Leads"
1. **Umbenennen**: Erstes Sheet → "B2B_Leads" (Doppelklick auf Tab)
2. **Zeile 1 (Spaltenüberschriften)**:
   - A1: `timestamp`
   - B1: `lead_id`
   - C1: `name`
   - D1: `firma`
   - E1: `email`
   - F1: `telefon`
   - G1: `sanitaetshaus`
   - H1: `stadt`
   - I1: `status`
   - J1: `preisliste_am`
   - K1: `followup_tag2_am`
   - L1: `reminder_tag4_am`
   - M1: `dsgvo_consent`

### Sheet 2: "Chatbot_Conversations"
1. **Neues Sheet**: Klicke "+" unten links
2. **Name**: `Chatbot_Conversations`
3. **Zeile 1**:
   - A1: `timestamp`
   - B1: `conversation_id`
   - C1: `lead_id`
   - D1: `role`
   - E1: `message`
   - F1: `email`
   - G1: `whatsapp_followup`

### Sheet 3: "System_Config"
1. **Neues Sheet**: Klicke "+" unten links
2. **Name**: `System_Config`
3. **Zeile 1**:
   - A1: `config_key`
   - B1: `config_value`
   - C1: `updated_at`
4. **Zeile 2** (Standard Chatbot Prompt):
   - A2: `chatbot_system_prompt`
   - B2:
     ```
     Du bist ein KI-Assistent für Elektroroller Futura.
     Zielgruppe: Inhaber von Sanitätshäusern.
     Produkte: 15 km/h und 25 km/h Elektroroller als Alternative zu 6 km/h Krankenkassen-Modellen.
     Beantworte Fragen zu Preisen, Lieferkonditionen, Händler-Margen professionell und hilfsbereit.
     ```
   - C2: `31.01.2026` (heutiges Datum)

✅ **Google Sheets Setup komplett!**

---

# TEIL 2: API Keys besorgen (10 Min)

## 2.1 DeepSeek AI

1. **Öffne**: [platform.deepseek.com](https://platform.deepseek.com/)
2. **Registriere** dich (E-Mail + Passwort)
3. **E-Mail verifizieren**
4. **Dashboard**: "API Keys" → "Create API Key"
5. **Name**: `Elektroroller Landingpage`
6. **Kopiere**: API Key (beginnt mit `sk-...`)
   - ⚠️ Wird nur EINMAL angezeigt!
7. **Guthaben**: "Billing" → Mindestens 5-10€ aufladen

## 2.2 Resend (E-Mail Service)

1. **Öffne**: [resend.com](https://resend.com/)
2. **Registriere** dich
3. **E-Mail verifizieren**

### Option A: Mit eigener Domain (Empfohlen für Production)
1. **Dashboard**: "Domains" → "Add Domain"
2. **Domain**: `deine-domain.de` eingeben
3. **DNS-Einträge**: Bei deinem Domain-Provider eintragen:
   - TXT Record
   - MX Records
   - DKIM Records
4. **Warten**: Bis Verifizierung abgeschlossen (ca. 5-10 Min)
5. **API Key**: "API Keys" → "Create API Key"
   - Name: `Elektroroller Production`
   - Permission: "Full Access"
6. **Kopiere**: API Key (beginnt mit `re_...`)

### Option B: Für Testing (schnell, aber nur 100 E-Mails/Tag)
1. **API Key**: Erstellen wie oben
2. **From-Email**: `onboarding@resend.dev` verwenden
3. **Later**: Eigene Domain hinzufügen

## 2.3 2chat (WhatsApp)

Du hast bereits einen Account, also:

1. **Login**: [app.2chat.io](https://app.2chat.io/)
2. **API Key**:
   - Menü → "Settings" → "API"
   - **Kopiere**: API Key
3. **Channel ID**:
   - Menü → "Channels"
   - **Klicke**: Auf deinen WhatsApp Kanal
   - **Kopiere**: Channel ID (in der URL oder oben im Dashboard)

**Kein WhatsApp-Kanal?**
- "Add Channel" → "WhatsApp" → "WhatsApp Web"
- QR-Code mit WhatsApp scannen
- Fertig!

✅ **Alle API Keys vorhanden!**

---

# TEIL 3: Environment Variables konfigurieren (5 Min)

## Schritt 1: .env.local Datei bearbeiten

Die Datei `.env.local` existiert bereits im Projekt-Root. **Öffne** sie mit einem Texteditor (Notepad++, VS Code).

## Schritt 2: Werte eintragen

```bash
# App Configuration
NEXT_PUBLIC_SITE_URL=http://localhost:3000

# Google Sheets API
GOOGLE_SHEETS_SPREADSHEET_ID=DEINE_SPREADSHEET_ID_VON_TEIL_1
GOOGLE_SHEETS_CREDENTIALS_EMAIL=elektroroller-sheets-service@DEIN_PROJEKT.iam.gserviceaccount.com
GOOGLE_SHEETS_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nKOPIERE_HIER_DEN_PRIVATE_KEY_AUS_JSON\n-----END PRIVATE KEY-----\n"

# DeepSeek API
DEEPSEEK_API_KEY=sk-DEIN_DEEPSEEK_API_KEY
DEEPSEEK_MODEL=deepseek-chat

# Resend Email Service
RESEND_API_KEY=re_DEIN_RESEND_API_KEY
RESEND_FROM_EMAIL=onboarding@resend.dev

# WhatsApp (2chat)
TWOCHAT_API_KEY=DEIN_2CHAT_API_KEY
TWOCHAT_CHANNEL_ID=DEINE_2CHAT_CHANNEL_ID

# Cron Jobs Secret (generiere einen zufälligen String)
CRON_SECRET=GeneriereMirEinenZufaelligenString123!

# Admin Password (für /admin/chatbot-config)
ADMIN_PASSWORD=MeinSicheresAdminPasswort2026!
```

## Schritt 3: Private Key richtig kopieren

1. **Öffne**: Die JSON-Datei von Google Cloud (Schritt 1.4)
2. **Suche**: `"private_key": "-----BEGIN PRIVATE KEY-----\n..."`
3. **Kopiere**: Den KOMPLETTEN Text zwischen den äußeren Anführungszeichen
4. **Wichtig**: Die `\n` müssen erhalten bleiben!
5. **Füge ein**: In `.env.local` bei `GOOGLE_SHEETS_PRIVATE_KEY`

**Beispiel:**
```bash
GOOGLE_SHEETS_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQC7VJT...\n...viele Zeilen...\n-----END PRIVATE KEY-----\n"
```

## Schritt 4: CRON_SECRET generieren

**Option A - PowerShell:**
```powershell
openssl rand -base64 32
```

**Option B - Online:**
- [randomkeygen.com](https://randomkeygen.com/)
- Wähle "Fort Knox Passwords"

## Schritt 5: Speichern

**Speichere** die Datei als `.env.local` im Projekt-Root.

✅ **Environment Variables konfiguriert!**

---

# TEIL 4: PDF Preisliste (Optional, 2 Min)

## Schritt 1: Ordner existiert bereits

Der Ordner `public/pricelist` wurde bereits erstellt.

## Schritt 2: PDF-Datei hinzufügen

1. **Hast du eine Preisliste als PDF?**
   - **JA**: Kopiere sie nach:
     ```
     C:\Users\ferra\b2b-elektroroller-landing\public\pricelist\haendler-preisliste.pdf
     ```
   - **NEIN**: Überspringe diesen Teil (E-Mail wird ohne PDF versendet)

2. **Dateiname muss exakt sein**: `haendler-preisliste.pdf`

---

# TEIL 5: Lokales Testen (5 Min)

## Schritt 1: Dependencies (bereits installiert)

```bash
cd C:\Users\ferra\b2b-elektroroller-landing
npm install
```

## Schritt 2: Development Server starten

```bash
npm run dev
```

**Warte** bis du siehst:
```
✓ Ready in 2.5s
○ Local:   http://localhost:3000
```

## Schritt 3: Browser öffnen

**Öffne**: [http://localhost:3000](http://localhost:3000)

**Du solltest sehen:**
- ✅ Hero Section (schwarzer Hintergrund, orange)
- ✅ Problem Section (3 rote Cards)
- ✅ Solution Section (2 Produkt-Cards)
- ✅ Benefits Section (dunkler Gradient)
- ✅ Registrierungsformular

## Schritt 4: Formular testen

1. **Scrolle** zum Formular
2. **Fülle aus** mit **echten Daten** (für Test):
   - Name: Dein Name
   - Firma: Test GmbH
   - E-Mail: **Deine echte E-Mail**
   - Telefon: **Deine WhatsApp-Nummer** (mit +49)
   - Sanitätshaus: Test Sanitätshaus
   - Stadt: Deine Stadt
   - ✅ DSGVO Checkbox
3. **Klicke**: "Jetzt kostenlos Preisliste anfordern"

## Schritt 5: Prüfen

**✅ Formular:**
- Grüner Haken erscheint
- "Vielen Dank für Ihre Anfrage!"

**✅ Google Sheets:**
- Öffne dein Spreadsheet
- Sheet "B2B_Leads"
- Neue Zeile mit deinen Daten

**✅ E-Mail:**
- Prüfe dein Postfach
- E-Mail mit Betreff: "Ihre Händler-Preisliste..."
- (Optional) PDF Anhang

**✅ Admin Interface:**
1. Öffne: [http://localhost:3000/admin/chatbot-config](http://localhost:3000/admin/chatbot-config)
2. Login mit `ADMIN_PASSWORD` aus .env.local
3. System Prompt bearbeiten & speichern
4. Prüfe Google Sheets → Sheet "System_Config"

---

# TEIL 6: Deployment auf Vercel (15 Min)

## Schritt 1: Git Repository initialisieren

```bash
cd C:\Users\ferra\b2b-elektroroller-landing

# Git initialisieren
git init

# Ersten Commit
git add .
git commit -m "Initial commit: B2B Elektroroller Landingpage"
```

## Schritt 2: GitHub Repository erstellen

1. **Öffne**: [github.com/new](https://github.com/new)
2. **Repository Name**: `b2b-elektroroller-landing`
3. **Visibility**: Private
4. **Klicke**: "Create repository"
5. **Kopiere**: Die Git-URL (z.B. `https://github.com/USERNAME/b2b-elektroroller-landing.git`)

## Schritt 3: Code zu GitHub pushen

```bash
# Remote hinzufügen (ersetze USERNAME)
git remote add origin https://github.com/DEIN_USERNAME/b2b-elektroroller-landing.git

# Push
git branch -M main
git push -u origin main
```

## Schritt 4: Vercel Account

1. **Öffne**: [vercel.com/signup](https://vercel.com/signup)
2. **Klicke**: "Continue with GitHub"
3. **Authorisiere**: Vercel

## Schritt 5: Projekt importieren

1. **Dashboard**: "Add New..." → "Project"
2. **Wähle**: Dein Repository `b2b-elektroroller-landing`
3. **Klicke**: "Import"

## Schritt 6: Environment Variables setzen

**Scrolle** zu "Environment Variables"

**Füge ALLE Variablen ein** (eine nach der anderen):

```
Name: NEXT_PUBLIC_SITE_URL
Value: https://deine-vercel-domain.vercel.app
[Add]

Name: GOOGLE_SHEETS_SPREADSHEET_ID
Value: [DEINE_ID]
[Add]

Name: GOOGLE_SHEETS_CREDENTIALS_EMAIL
Value: [SERVICE_ACCOUNT_EMAIL]
[Add]

Name: GOOGLE_SHEETS_PRIVATE_KEY
Value: [PRIVATE_KEY_MIT_\n]
[Add]

... (alle weiteren Variablen)
```

**Wichtig**: Private Key MIT den `\n` Zeichen einfügen!

## Schritt 7: Deploy

1. **Klicke**: "Deploy"
2. **Warte**: 2-3 Minuten
3. **Bei Erfolg**: "Congratulations! 🎉"
4. **Klicke**: "Visit" → Live-Seite öffnet sich

## Schritt 8: Custom Domain (Optional)

1. **Vercel Dashboard**: Settings → Domains
2. **Add**: `deine-domain.de`
3. **DNS-Einträge** bei Domain-Provider:
   - A Record: `76.76.21.21`
   - CNAME: `cname.vercel-dns.com`
4. **Warten**: 5-10 Min (DNS-Propagation)

## Schritt 9: Cron Jobs (Automatisch aktiv)

- Vercel liest `vercel.json`
- Cron Jobs laufen **täglich um 10:00 Uhr**
- Day 2 Follow-up: Automatisch
- Day 4 Reminder: Automatisch

---

# ✅ Fertig! Checkliste

## Google Sheets
- [ ] Cloud Projekt erstellt
- [ ] API aktiviert
- [ ] Service Account + JSON Key
- [ ] Spreadsheet erstellt & freigegeben
- [ ] 3 Sheets mit Spalten

## API Keys
- [ ] DeepSeek Key + Guthaben
- [ ] Resend Key (+ Domain verifiziert)
- [ ] 2chat Key + Channel ID

## Lokal
- [ ] .env.local ausgefüllt
- [ ] Dependencies installiert
- [ ] Dev Server läuft
- [ ] Test-Lead erfolgreich
- [ ] E-Mail erhalten
- [ ] Admin Interface funktioniert

## Production
- [ ] GitHub Repo erstellt
- [ ] Code gepusht
- [ ] Vercel Projekt erstellt
- [ ] Env Vars gesetzt
- [ ] Deployment erfolgreich
- [ ] (Optional) Custom Domain

---

# 🆘 Troubleshooting

## "Google Sheets API error"
- Service Account hat Bearbeiter-Rechte?
- Spreadsheet ID korrekt?
- Private Key mit `\n` kopiert?

## "DeepSeek API error"
- Guthaben vorhanden?
- API Key korrekt?

## "Resend error"
- Domain verifiziert?
- Für Tests: `onboarding@resend.dev` verwenden

## "WhatsApp nicht gesendet"
- Kein Error = normal, WhatsApp ist optional
- 2chat Channel aktiv?
- Telefonnummer im Format +49...?

## Build Error (Vercel)
- Alle Env Vars gesetzt?
- Lokal `npm run build` testen

---

# 📞 Support

Bei Fragen:
- **Dokumentation**: Siehe `README.md`
- **Status**: Siehe `IMPLEMENTATION-STATUS.md`
- **Code-Struktur**: Siehe Kommentare in den Dateien

**Viel Erfolg! 🚀**
