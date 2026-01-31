# ⚡ Quick Start - In 10 Minuten loslegen

## Für Entwickler die schnell das Design sehen wollen

### 1. Dependencies installieren (falls noch nicht geschehen)
```bash
npm install
```

### 2. Development Server starten
```bash
npm run dev
```

### 3. Browser öffnen
[http://localhost:3000](http://localhost:3000)

**Du siehst jetzt die komplette Landing Page!**

---

## ⚠️ Formular funktioniert NICHT ohne Setup

Um das Formular zum Laufen zu bringen, brauchst du:

### Minimales Setup (10 Min):
1. ✅ `.env.local` Datei mit API Keys ausfüllen (siehe SETUP.md TEIL 3)
2. ✅ Google Sheets einrichten (siehe SETUP.md TEIL 1)
3. ✅ DeepSeek + Resend API Keys (siehe SETUP.md TEIL 2)

### Vollständiges Setup:
📖 Siehe **SETUP.md** für die komplette Schritt-für-Schritt-Anleitung

---

## 🎨 Was du OHNE Setup sehen kannst:

✅ **Hero Section** - Schwarzer Hintergrund mit orangem Gradient
✅ **Problem Section** - 3 rote Problem-Cards
✅ **Solution Section** - 2 Produkt-Cards (15 km/h & 25 km/h)
✅ **Benefits Section** - 6 Vorteils-Cards mit Icons
✅ **Formular** - Design & Layout (funktioniert nicht ohne API Keys)
✅ **Footer** - Mit Links zu Datenschutz & Impressum
✅ **Datenschutz-Seite** - [/datenschutz](http://localhost:3000/datenschutz)
✅ **Impressum** - [/impressum](http://localhost:3000/impressum)
✅ **Admin Interface** - [/admin/chatbot-config](http://localhost:3000/admin/chatbot-config)

---

## 🚀 Production-Deployment

### Voraussetzungen:
- ✅ Google Sheets eingerichtet
- ✅ Alle API Keys vorhanden
- ✅ .env.local ausgefüllt
- ✅ Lokal getestet

### Deployment (5 Min):
1. GitHub Repo erstellen
2. Code pushen
3. Vercel importieren
4. Environment Variables setzen
5. Deploy!

📖 **Detaillierte Anleitung**: Siehe SETUP.md TEIL 6

---

## 📁 Wichtige Dateien

| Datei | Beschreibung |
|-------|--------------|
| `SETUP.md` | Komplette Setup-Anleitung (45-60 Min) |
| `README.md` | Projekt-Dokumentation |
| `IMPLEMENTATION-STATUS.md` | Was ist implementiert? |
| `.env.example` | Beispiel für Environment Variables |
| `.env.local` | Deine lokalen Environment Variables (nicht in Git!) |

---

## 🧪 Testen

### Lokaler Test:
```bash
# Formular testen (mit echten API Keys)
1. http://localhost:3000
2. Formular ausfüllen
3. Prüfen: Google Sheets, E-Mail-Postfach

# Admin Interface testen
http://localhost:3000/admin/chatbot-config
```

### Production Build testen:
```bash
npm run build
npm start
```

---

## 💡 Nächste Schritte

1. **Design ansehen**: `npm run dev` → [localhost:3000](http://localhost:3000)
2. **Setup durchführen**: Siehe `SETUP.md`
3. **Lokal testen**: Formular mit echten Daten testen
4. **Deployen**: Vercel Deployment (siehe SETUP.md TEIL 6)
5. **Live gehen**: Custom Domain verbinden

---

## 🔗 Wichtige Links

- **Dokumentation**: `README.md`
- **Setup-Anleitung**: `SETUP.md`
- **Google Sheets Setup**: `SETUP.md` TEIL 1
- **API Keys**: `SETUP.md` TEIL 2
- **Deployment**: `SETUP.md` TEIL 6

**Viel Erfolg! 🎉**
