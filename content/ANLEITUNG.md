# 📝 Content bearbeiten - Einfache Anleitung

## So änderst du Texte und Bilder auf der Landing Page

### 1️⃣ Texte ändern

**Datei öffnen:**
```
b2b-elektroroller-landing/content/landingpage.json
```

**Mit jedem Text-Editor bearbeitbar:**
- Windows: Notepad, Notepad++, VS Code
- Mac: TextEdit, VS Code
- Online: https://jsoneditoronline.org/

---

## 📋 Was kannst du ändern?

### Hero Section (Startbereich)
```json
"hero": {
  "badge": "Exklusive B2B-Partnerschaft",           ← Badge-Text
  "headline": "Steigern Sie Ihren Umsatz...",       ← Hauptüberschrift
  "subheadline": "Die Alternative zum...",          ← Unterüberschrift
  "ctaButton": "Jetzt Händler-Preisliste anfordern" ← Button-Text
}
```

### Problem Section
```json
"problem": {
  "headline": "Das Problem: 6 km/h sind zu langsam", ← Überschrift
  "cards": [
    {
      "title": "Unzufriedene Kunden",               ← Karten-Titel
      "description": "6 km/h Elektromobile..."      ← Karten-Text
    }
  ]
}
```

### Produkte
```json
"products": [
  {
    "name": "15 km/h Elektroroller",                ← Produktname
    "badge": "Bestseller",                          ← Badge
    "description": "Führerscheinfrei...",           ← Beschreibung
    "features": [
      "Bis zu 15 km/h Höchstgeschwindigkeit"        ← Feature-Liste
    ],
    "image": "/images/15kmh-roller.jpg"             ← Bild-Pfad
  }
]
```

### Vorteile (Benefits)
```json
"benefits": {
  "cards": [
    {
      "title": "Hohe Händlermargen",                ← Vorteil-Titel
      "description": "Attraktive Einkaufspreise..." ← Beschreibung
    }
  ]
}
```

### Formular-Texte
```json
"registration": {
  "headline": "Jetzt Händler-Preisliste anfordern", ← Formular-Überschrift
  "form": {
    "fields": {
      "name": "Ihr Name",                           ← Feld-Labels
      "firma": "Firma / Sanitätshaus"
    },
    "submitButton": "Jetzt kostenlos Preisliste anfordern"
  }
}
```

---

## 🖼️ Bilder hinzufügen

### Schritt 1: Bilder vorbereiten
- **Format:** JPG oder PNG
- **Größe:** Maximal 2 MB pro Bild
- **Auflösung:**
  - Hero: 1920x1080px
  - Produkte: 800x600px
  - Icons: 500x500px

### Schritt 2: Bilder hochladen
1. Öffne den Ordner: `b2b-elektroroller-landing/public/images/`
2. Kopiere deine Bilder rein
3. Benenne sie sinnvoll (z.B. `15kmh-roller.jpg`)

### Schritt 3: Pfad in JSON eintragen
```json
"image": "/images/15kmh-roller.jpg"
```

**Wichtig:** Pfad beginnt IMMER mit `/images/`

---

## 📁 Bilder-Struktur

```
public/images/
├── hero-background.jpg      ← Hintergrundbild Hero Section
├── 15kmh-roller.jpg         ← Produktbild 15 km/h
├── 25kmh-roller.jpg         ← Produktbild 25 km/h
├── logo.png                 ← Logo (wenn gewünscht)
└── ...weitere Bilder
```

---

## 🎨 Beispiel: Text ändern

**Vorher:**
```json
"headline": "Steigern Sie Ihren Umsatz mit 15 km/h & 25 km/h Elektrorollern"
```

**Nachher:**
```json
"headline": "Verdoppeln Sie Ihren Umsatz mit schnellen Elektrorollern"
```

**Speichern** → Seite im Browser neu laden → **Fertig!**

---

## 🚨 WICHTIG: JSON-Syntax

**Regeln:**
1. ✅ Text immer in "Anführungszeichen"
2. ✅ Komma nach jeder Zeile (außer der letzten)
3. ✅ { } für Objekte, [ ] für Listen
4. ❌ KEIN Komma nach der letzten Zeile

**Falsch:**
```json
{
  "headline": "Test",  ← Komma hier FALSCH (letzte Zeile)
}
```

**Richtig:**
```json
{
  "headline": "Test"   ← Kein Komma (letzte Zeile)
}
```

**Tipp:** Nutze https://jsonlint.com/ zum Prüfen!

---

## 🔄 Änderungen sehen

1. Datei bearbeiten & **speichern**
2. Browser neu laden (F5)
3. Änderungen sind sofort sichtbar!

---

## 💡 Tipps

**Backup erstellen:**
- Kopiere `landingpage.json` → `landingpage-backup.json`
- Bei Fehlern: Einfach zurückkopieren

**Online-Editor nutzen:**
- Öffne: https://jsoneditoronline.org/
- Datei hochladen → bearbeiten → downloaden
- Kein Syntax-Fehler möglich!

**Mehrere Sprachen:**
- Erstelle `landingpage-en.json` für Englisch
- Erstelle `landingpage-fr.json` für Französisch
- (Benötigt Code-Anpassung)

---

## 🆘 Hilfe bei Problemen

**Seite lädt nicht:**
- Prüfe JSON-Syntax auf https://jsonlint.com/
- Fehler in der Browser-Konsole prüfen (F12)

**Bild wird nicht angezeigt:**
- Prüfe Pfad: `/images/dein-bild.jpg`
- Prüfe Dateiname: Groß-/Kleinschreibung beachten!
- Prüfe ob Datei in `public/images/` liegt

**Text wird nicht aktualisiert:**
- Browser-Cache löschen (Strg + F5)
- Server neu starten: `npm run dev`

---

## 📞 Support

Bei Fragen einfach melden! 😊
