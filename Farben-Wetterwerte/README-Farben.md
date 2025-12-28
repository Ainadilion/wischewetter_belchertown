# WeeWX Belchertown – Farbige Wetterwerte 🎨

Dieses Paket färbt Wetterwerte auf der Belchertown-Startseite dynamisch ein (clientseitig per JavaScript).
Ziel ist eine **bessere Lesbarkeit** und eine **einheitliche Farblogik** für typische Parameter.

---

## ✅ Umgesetzte Werte (Selectors)

Diese Elemente werden eingefärbt (Belchertown-Standardklassen):

- **Außentemperatur**: `span.outtemp` (+ Einheit `sup.outtempunitlabelsuper`)
- **Max/Min Temperatur**: `td.high`, `td.low`
- **Taupunkt**: `span.dewpoint`
- **Luftdruck**: `span.barometer`
- **Außenfeuchte**: `span.outHumidity`
- **Regen (Tag)**: `span.dayRain`
- **Regenrate**: `span.rainRate`
- **Wind**: `span.curwindspeed`
- **Böen**: `span.curwindgust`
- **UV-Index**: `span.UV`
- **Solarstrahlung**: `span.radiation`
- **Evapotranspiration (Tag)**: `span.dayET`

---

## 📁 Dateien

```
js/
└── belchertown-colors.js
```

---

## 🔧 Installation

### 1) Datei kopieren
Kopiere `js/belchertown-colors.js` nach:

```
/etc/weewx/skins/Belchertown/js/
```

### 2) CopyGenerator (wichtig)
Damit die Datei ins Webverzeichnis kopiert wird, in `skin.conf` unter `[CopyGenerator]` ergänzen:

```ini
copy_once = js/belchertown-colors.js
```

Während der Entwicklung besser:

```ini
copy_always = js/belchertown-colors.js
```

### 3) Script einbinden
In z. B. `index_hook_after_station_info.inc` (oder passender Hook) einfügen:

```html
## Farbige Wetterwerte
<script src="$relative_url/js/belchertown-colors.js"></script>
```

### 4) WeeWX neu starten
```bash
sudo systemctl restart weewx
```

Danach Browser **hart neu laden** (Cache).

---

## ⚙️ Anpassung

Die Farbskalen sind im Script als „Stops“ definiert.
Du kannst sie im JS anpassen (Temperatur / Druck / Feuchte / Regen / Wind / UV / Strahlung / ET).

---

## 📄 Lizenz
MIT (wenn du willst, lege eine LICENSE-Datei im Repo ab).
