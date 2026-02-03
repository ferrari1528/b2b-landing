# B2B Landingpage für Elektroroller Futura

Hochkonvertierende B2B-Landingpage zur Gewinnung von Sanitätshäusern als Vertriebspartner für 15 km/h & 25 km/h Elektroroller.

## Features

- **Landing Page** mit 5 Sektionen (Hero, Problem, Lösung, Vorteile, Formular)
- **Lead-Registrierung** → Google Sheets → Automatische Preisliste per E-Mail
- **DeepSeek AI Chatbot** mit editierbarem System Prompt
- **Automatisierte Follow-up Kampagne** (Tag 2 & Tag 4)
- **WhatsApp Integration** für Reminder
- **DSGVO-konform** mit Datenschutzerklärung und Impressum

## Tech Stack

- **Frontend:** Next.js 14+ (App Router), Tailwind CSS, shadcn/ui
- **Backend:** Google Sheets API, Gmail SMTP (nodemailer), DeepSeek, 2chat
- **Deployment:** Vercel (mit Cron Jobs)

## Setup

### 1. Installation

```bash
npm install
```

### 2. Google Sheets Setup

1. Erstellen Sie ein Google Cloud Projekt: [console.cloud.google.com](https://console.cloud.google.com/)
2. Aktivieren Sie die Google Sheets API
3. Erstellen Sie einen Service Account und laden Sie den JSON Key herunter
4. Erstellen Sie ein neues Google Spreadsheet mit dem Namen "B2B Elektroroller Futura"
5. Teilen Sie das Spreadsheet mit der Service Account E-Mail (Editor-Rechte)
6. Erstellen Sie 3 Sheets mit folgenden Namen und Spalten:

#### Sheet 1: "B2B_Leads"
| A | B | C | D | E | F | G | H | I | J | K | L | M |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| timestamp | lead_id | name | firma | email | telefon | sanitaetshaus | stadt | status | preisliste_am | followup_tag2_am | reminder_tag4_am | dsgvo_consent |

#### Sheet 2: "Chatbot_Conversations"
| A | B | C | D | E | F | G |
|---|---|---|---|---|---|---|
| timestamp | conversation_id | lead_id | role | message | email | whatsapp_followup |

#### Sheet 3: "System_Config"
| A | B | C |
|---|---|---|
| config_key | config_value | updated_at |

Fügen Sie in Sheet 3 diese Zeile hinzu:
- A2: `chatbot_system_prompt`
- B2: Ihr Standard-Prompt (siehe unten)
- C2: Aktuelles Datum

**Standard Chatbot Prompt:**
```
Du bist ein KI-Assistent für Elektroroller Futura.
Zielgruppe: Inhaber von Sanitätshäusern.
Produkte: 15 km/h und 25 km/h Elektroroller als Alternative zu 6 km/h Krankenkassen-Modellen.
Beantworte Fragen zu Preisen, Lieferkonditionen, Händler-Margen professionell und hilfsbereit.
```

### 3. Environment Variables

Kopieren Sie `.env.example` nach `.env.local` und füllen Sie alle Werte aus:

```bash
cp .env.example .env.local
```

Benötigte API Keys:
- **Google Sheets:** Service Account Credentials
- **DeepSeek:** [platform.deepseek.com](https://platform.deepseek.com/)
- **Gmail:** App-Passwort (über [myaccount.google.com](https://myaccount.google.com/))
- **2chat:** [2chat.io](https://www.2chat.io/) (optional für WhatsApp)

### 4. Development

```bash
npm run dev
```

Öffnen Sie [http://localhost:3000](http://localhost:3000)

## Deployment

### Vercel Deployment

1. Pushen Sie den Code zu GitHub
2. Importieren Sie das Projekt in Vercel
3. Fügen Sie alle Environment Variables im Vercel Dashboard hinzu
4. Deploy!

**Wichtig:** Die Cron Jobs werden automatisch von Vercel aktiviert (täglich 10:00 Uhr).

### Manuelles Testen der Cron Jobs

```bash
curl https://ihre-domain.de/api/cron/day2-followup \
  -H "Authorization: Bearer YOUR_CRON_SECRET"

curl https://ihre-domain.de/api/cron/day4-reminder \
  -H "Authorization: Bearer YOUR_CRON_SECRET"
```

## Workflow

```
Tag 0: Lead registriert sich
  → Daten in Google Sheets
  → Preisliste per E-Mail
  → Status: "Preisliste versendet"

Tag 2: Automatischer Follow-up
  → DeepSeek generiert personalisierte Nachricht
  → E-Mail + WhatsApp (optional)
  → Status: "Tag 2 Follow-up"

Tag 4: Finaler Reminder
  → E-Mail mit Calendly-Link
  → WhatsApp Reminder (optional)
  → Status: "Tag 4 Reminder"
```

## Admin Interface

Bearbeiten Sie den Chatbot System Prompt unter:
```
https://ihre-domain.de/admin/chatbot-config
```

**Login:** Basic Auth mit `ADMIN_PASSWORD` aus `.env.local`

## API Routes

- `POST /api/leads` - Lead-Registrierung
- `POST /api/chatbot` - Chatbot Nachricht senden
- `GET /api/chatbot/config` - System Prompt abrufen (Admin)
- `PUT /api/chatbot/config` - System Prompt aktualisieren (Admin)
- `GET /api/cron/day2-followup` - Day 2 Follow-up Job (Cron)
- `GET /api/cron/day4-reminder` - Day 4 Reminder Job (Cron)

## Projektstruktur

```
app/
├── api/              # API Routes
├── datenschutz/      # DSGVO Seite
├── impressum/        # Impressum
├── admin/            # Admin Interface
└── page.tsx          # Landing Page

components/
├── atoms/            # Button, Input, Spinner
├── organisms/        # Hero, Problem, Solution, Benefits, Form
└── ui/               # shadcn/ui Components

lib/
├── services/         # Google Sheets, DeepSeek, Gmail (nodemailer), WhatsApp
├── validations/      # Zod Schemas
└── utils/            # Retry, Formatters

types/                # TypeScript Typen
```

## Wichtige Dateien

1. **`app/api/leads/route.ts`** - Lead-Registrierung (KRITISCH)
2. **`lib/services/googleSheets.ts`** - Datenschicht
3. **`components/organisms/RegistrationForm.tsx`** - Hauptformular
4. **`app/api/cron/day2-followup/route.ts`** - Follow-up Logik
5. **`app/page.tsx`** - Landing Page Template

## Testing Checklist

- [ ] Formular ausfüllen → E-Mail erhalten
- [ ] Lead in Google Sheets vorhanden
- [ ] Chatbot funktioniert
- [ ] Admin Interface: Prompt bearbeiten
- [ ] Cron Jobs manuell triggern
- [ ] Mobile Responsiveness
- [ ] DSGVO-Links funktionieren

## Kosten (monatlich)

- Vercel Pro: ~20€
- Gmail SMTP: 0€ (kostenlos, max ~500 E-Mails/Tag)
- DeepSeek API: ~5-10€
- 2chat WhatsApp: ~10-20€
- **Gesamt: 35-50€/Monat**

## Support

Bei Fragen oder Problemen:
- E-Mail: kontakt@ihre-domain.de
- GitHub Issues: [Link zum Repository]

## Lizenz

Proprietär - Alle Rechte vorbehalten
