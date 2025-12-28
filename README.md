# weewx Belchertown Weather Enhancements

Erweiterungen für das weewx Belchertown Skin zur
farblichen Darstellung meteorologischer Werte
sowie zur Anzeige von Frost- und Schwülebedingungen.

## Module

### 🎨 Farben der Wetterwerte
Kachelmann-ähnliche Farbschemata für:

- Außentemperatur
- Max / Min Temperatur
- Taupunkt
- Luftdruck
- Luftfeuchte
- Regenrate
- Wind / Böen
- UV-Index
- Solarstrahlung
- Evapotranspiration
- Äquivalenztemperatur
- Pot. Äquivalenztemperatur

➡️ Details: [`colors/README-colors.md`](colors/README-colors.md)

---

### ❄️🔥 Frost & Schwüle Anzeige
Textuelle Anzeige unterhalb des Stationsnamens:

- kein Frost
- leichter Frost
- mäßiger Frost
- strenger Frost
- sehr strenger Frost

Zusätzlich:
- Schwüle / keine Schwüle (Taupunkt-basiert)

➡️ Details: [`frost-schwauele/README-frost-schwauele.md`](frost-schwauele/README-frost-schwauele.md)

---

## Voraussetzungen

- weewx ≥ 4.x
- Belchertown Skin
- JavaScript erlaubt
- CopyGenerator aktiv

---

## Installation (Kurzfassung)

1. JavaScript-Dateien in das Belchertown-Skin kopieren
2. `skin.conf` → CopyGenerator anpassen
3. Script per Hook (`index_hook_after_station_info.inc`) einbinden

➡️ Siehe Beispiele: [`examples/`](examples/)

---

## Screenshots

*(optional – später ergänzen)*

---

## Lizenz

MIT License
