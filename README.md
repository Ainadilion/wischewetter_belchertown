# wischewetter_belchertown
die Belchertown-Oberfläche von wischewetter

# WeeWX Belchertown – Frost- & Schwüle-Anzeige ❄️💧

Diese Erweiterung für den **Belchertown-Skin von WeeWX** zeigt auf der Startseite
eine kombinierte **Frost- und Schwüle-Bewertung** an.

Die Anzeige erscheint automatisch:

➡️ **unterhalb** „Aktuelles Wetter in …“  
➡️ **oberhalb** „Zuletzt aktualisiert“

Sie aktualisiert sich dynamisch zusammen mit den WeeWX-AJAX-Daten.

---

## 🔹 Funktionen

### ❄️ Frostklassifikation (nach Temperatur)

| Außentemperatur | Anzeige |
|-----------------|---------|
| ≥ 0 °C | kein Frost |
| < 0 °C bis –5 °C | ❄ leichter Frost |
| < –5 °C bis –10 °C | ❄❄ mäßiger Frost |
| < –10 °C bis –15 °C | ❄❄❄ strenger Frost |
| < –15 °C | ❄❄❄❄ sehr strenger Frost |

---

### 💧 Schwüleklassifikation (nach Taupunkt)

| Taupunkt | Anzeige |
|---------|---------|
| ≤ 15,9 °C | keine Schwüle (grün) |
| ≥ 16,0 °C | Schwüle (gelb) |

---

### 🧾 Kombinierte Anzeige (Beispiele)

- `❄❄ mäßiger Frost · keine Schwüle`
- `kein Frost · Schwüle`

---

## 🔹 Voraussetzungen

- WeeWX **4 oder 5**
- Belchertown-Skin
- Anzeigeelemente:
  - `span.outtemp` (Außentemperatur)
  - `span.dewpoint` (Taupunkt)

---

## 🔹 Dateien & Struktur

```
skins/
└── Belchertown/
    ├── js/
    │   └── belchertown-frost-indicator.js
    ├── index_hook_after_station_info.inc
    └── skin.conf
```

---

## 🔹 Installation

### 1️⃣ JavaScript-Datei kopieren

Die Datei

```
belchertown-frost-indicator.js
```

nach folgendes Verzeichnis kopieren:

```
/etc/weewx/skins/Belchertown/js/
```

---

### 2️⃣ Script in die Seite einbinden

In der Datei:

```
index_hook_after_station_info.inc
```

folgende Zeile ergänzen:

```html
## Frost- & Schwüle-Anzeige
<script src="$relative_url/js/belchertown-frost-indicator.js"></script>
```

---

### 3️⃣ CopyGenerator konfigurieren

In der Datei:

```
/etc/weewx/skins/Belchertown/skin.conf
```

unter `[CopyGenerator]`:

```ini
copy_once = js/belchertown-frost-indicator.js
```

---

### 4️⃣ WeeWX neu starten

```bash
sudo systemctl restart weewx
```

---

## 🔹 Lizenz

MIT License
