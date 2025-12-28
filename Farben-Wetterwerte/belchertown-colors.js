/* =========================================================
   Belchertown / WeeWX – Farbige Wetterwerte
   - Clientseitige Einfärbung der Werte (Belchertown AJAX-freundlich)
   - Keine Abhängigkeit von WeeWX/Cheetah (externes JS)
   ========================================================= */

(function () {

  // ----------------------------
  // Selector-Gruppen
  // ----------------------------
  var TEMP_TARGETS = [
    "span.outtemp",
    "td.high",
    "td.low",
    "span.dewpoint"
  ];

  // Einheit der Außentemperatur mitfärben:
  var TEMP_UNIT_TARGETS = [
    "sup.outtempunitlabelsuper"
  ];

  var PRESSURE_TARGETS = ["span.barometer"];
  var HUMIDITY_TARGETS = ["span.outHumidity"];

  var WIND_TARGETS = ["span.curwindspeed"];
  var GUST_TARGETS = ["span.curwindgust"];

  var RAIN_TARGETS = ["span.dayRain"];
  var RAINRATE_TARGETS = ["span.rainRate"];

  var UV_TARGETS = ["span.UV"];
  var RAD_TARGETS = ["span.radiation"];
  var ET_TARGETS = ["span.dayET"];

  // ----------------------------
  // Skalen (Stops) – anpassbar
  // ----------------------------

  // Temperatur-Skala (°C) – wie bisher genutzt (kannst du später kalibrieren)
  var tStops = [
    {t:-36,c:"#ff00ff"},{t:-30,c:"#d100ff"},{t:-27,c:"#a600ff"},
    {t:-24,c:"#7a00ff"},{t:-21,c:"#4b00ff"},{t:-18,c:"#0040ff"},
    {t:-15,c:"#0070ff"},{t:-12,c:"#00a0ff"},{t:-9,c:"#00c8ff"},
    {t:-6,c:"#00f0ff"},{t:-3,c:"#00ffd0"},{t:0,c:"#00ff80"},
    {t:3,c:"#00ff00"},{t:6,c:"#60ff00"},{t:9,c:"#a0ff00"},
    {t:12,c:"#e0ff00"},{t:15,c:"#ffff00"},{t:18,c:"#ffd000"},
    {t:21,c:"#ffb000"},{t:24,c:"#ff9000"},{t:27,c:"#ff7000"},
    {t:30,c:"#ff5000"},{t:33,c:"#ff3000"},{t:36,c:"#ff0000"},
    {t:39,c:"#c00000"},{t:44,c:"#808080"},{t:50,c:"#404040"}
  ];

  // Luftdruck (hPa)
  var pStops = [
    {p: 910, c:"#ff00ff"},
    {p: 925, c:"#d000ff"},
    {p: 938, c:"#9000ff"},
    {p: 950, c:"#5000ff"},
    {p: 962, c:"#0040ff"},
    {p: 972, c:"#0070ff"},
    {p: 978, c:"#00a0ff"},
    {p: 984, c:"#00c8ff"},
    {p: 990, c:"#00ffd0"},
    {p: 996, c:"#00ff80"},
    {p:1002, c:"#00ff00"},
    {p:1008, c:"#60ff00"},
    {p:1014, c:"#a0ff00"},
    {p:1020, c:"#e0ff00"},
    {p:1026, c:"#ffff00"},
    {p:1032, c:"#ffb000"},
    {p:1038, c:"#ff7000"},
    {p:1044, c:"#ff3000"},
    {p:1050, c:"#ff0000"},
    {p:1056, c:"#ffc0c0"},
    {p:1062, c:"#ffffff"}
  ];

  // Relative Feuchte (%)
  var hStops = [
    {h:  1, c:"#ff8c00"},
    {h: 10, c:"#ffb000"},
    {h: 20, c:"#ffd000"},
    {h: 30, c:"#ffff00"},
    {h: 40, c:"#d8f000"},
    {h: 50, c:"#b0e000"},
    {h: 60, c:"#8ac800"},
    {h: 70, c:"#5fb000"},
    {h: 80, c:"#2f9800"},
    {h: 90, c:"#1f6f3f"},
    {h: 95, c:"#445a7a"},
    {h: 99, c:"#4b3f7f"},
    {h:100, c:"#3b2f6f"}
  ];

  // Regenrate (mm/h) – 0 soll grau bleiben
  var rrStops = [
    {r: 0.0, c:"#808080"},   // 0 -> grau
    {r: 0.2, c:"#7cb5ec"},
    {r: 1.0, c:"#00c8ff"},
    {r: 2.5, c:"#00ff80"},
    {r: 5.0, c:"#ffff00"},
    {r:10.0, c:"#ffb000"},
    {r:20.0, c:"#ff7000"},
    {r:40.0, c:"#ff0000"}
  ];

  // Wind (m/s) – einfache Skala
  var wStops = [
    {w: 0.0, c:"#ffffff"},
    {w: 2.0, c:"#00c8ff"},
    {w: 5.0, c:"#00ff80"},
    {w: 8.0, c:"#ffff00"},
    {w:11.0, c:"#ffb000"},
    {w:14.0, c:"#ff7000"},
    {w:18.0, c:"#ff0000"}
  ];

  // UV Index (0–11+)
  var uvStops = [
    {u: 0, c:"#00cc44"},
    {u: 3, c:"#ffff00"},
    {u: 6, c:"#ffb000"},
    {u: 8, c:"#ff7000"},
    {u:11, c:"#ff0000"}
  ];

  // Solarstrahlung (W/m²) – grob
  var radStops = [
    {s: 0, c:"#808080"},
    {s:100, c:"#7cb5ec"},
    {s:300, c:"#00c8ff"},
    {s:600, c:"#ffff00"},
    {s:900, c:"#ff7000"},
    {s:1200,c:"#ff0000"}
  ];

  // Evapotranspiration (mm/Tag) – grob
  var etStops = [
    {e: 0.0, c:"#808080"},
    {e: 0.5, c:"#7cb5ec"},
    {e: 2.0, c:"#00c8ff"},
    {e: 4.0, c:"#00ff80"},
    {e: 6.0, c:"#ffff00"},
    {e: 8.0, c:"#ff7000"},
    {e:10.0, c:"#ff0000"}
  ];

  // ----------------------------
  // Helfer
  // ----------------------------
  function hexToRgb(h){
    h = (h || "").replace("#","");
    return [
      parseInt(h.substring(0,2),16),
      parseInt(h.substring(2,4),16),
      parseInt(h.substring(4,6),16)
    ];
  }

  function lerp(a,b,x){ return a + (b-a)*x; }

  function clamp01(x){ return x < 0 ? 0 : (x > 1 ? 1 : x); }

  function parseNumber(txt){
    var s = (txt || "").replace(",", ".");
    var m = s.match(/-?\d+(\.\d+)?/);
    return m ? parseFloat(m[0]) : NaN;
  }

  function colorFromStops(value, stops, key){
    if(!(value === value) || !isFinite(value)) return null;
    if(value <= stops[0][key]) return stops[0].c;
    if(value >= stops[stops.length-1][key]) return stops[stops.length-1].c;

    for(var i=0;i<stops.length-1;i++){
      var a = stops[i], b = stops[i+1];
      var av = a[key], bv = b[key];
      if(value >= av && value <= bv){
        var x = clamp01((value - av) / (bv - av));
        var ra = hexToRgb(a.c), rb = hexToRgb(b.c);
        var r = Math.round(lerp(ra[0], rb[0], x));
        var g = Math.round(lerp(ra[1], rb[1], x));
        var bb = Math.round(lerp(ra[2], rb[2], x));
        return "rgb(" + r + "," + g + "," + bb + ")";
      }
    }
    return null;
  }

  function setColor(el, c){
    if(!el || !c) return;
    el.style.setProperty("color", c, "important");
  }

  function applyToSelectors(selectors, fn){
    for(var i=0;i<selectors.length;i++){
      var els = document.querySelectorAll(selectors[i]);
      for(var j=0;j<els.length;j++){
        fn(els[j]);
      }
    }
  }

  // ----------------------------
  // Anwenden
  // ----------------------------
  function apply(){
    // Temperaturwerte
    applyToSelectors(TEMP_TARGETS, function(el){
      var t = parseNumber(el.textContent);
      var c = colorFromStops(t, tStops, "t");
      setColor(el, c);

      // Außentemperatur: Einheit ebenfalls einfärben
      if (el.classList && el.classList.contains("outtemp")) {
        applyToSelectors(TEMP_UNIT_TARGETS, function(uEl){ setColor(uEl, c); });
      }
    });

    // Luftdruck
    applyToSelectors(PRESSURE_TARGETS, function(el){
      var p = parseNumber(el.textContent);
      var c = colorFromStops(p, pStops, "p");
      setColor(el, c);
    });

    // Feuchte
    applyToSelectors(HUMIDITY_TARGETS, function(el){
      var h = parseNumber(el.textContent);
      var c = colorFromStops(h, hStops, "h");
      setColor(el, c);
    });

    // Wind/Böen
    applyToSelectors(WIND_TARGETS, function(el){
      var w = parseNumber(el.textContent);
      var c = colorFromStops(w, wStops, "w");
      setColor(el, c);
    });
    applyToSelectors(GUST_TARGETS, function(el){
      var g = parseNumber(el.textContent);
      var c = colorFromStops(g, wStops, "w");
      setColor(el, c);
    });

    // Regen Tag (mm) – gleiche Skala wie Regenrate, aber Wert oft klein -> grau ok
    applyToSelectors(RAIN_TARGETS, function(el){
      var r = parseNumber(el.textContent);
      // Tagessumme: 0 grau, sonst etwas blauer/grüner
      var c = (r === 0) ? "#808080" : colorFromStops(Math.min(r, 40.0), rrStops, "r");
      setColor(el, c);
    });

    // Regenrate (mm/h)
    applyToSelectors(RAINRATE_TARGETS, function(el){
      var rr = parseNumber(el.textContent);
      var c = colorFromStops(rr, rrStops, "r");
      setColor(el, c);
    });

    // UV
    applyToSelectors(UV_TARGETS, function(el){
      var u = parseNumber(el.textContent);
      var c = colorFromStops(u, uvStops, "u");
      setColor(el, c);
    });

    // Solar
    applyToSelectors(RAD_TARGETS, function(el){
      var s = parseNumber(el.textContent);
      var c = colorFromStops(s, radStops, "s");
      setColor(el, c);
    });

    // ET
    applyToSelectors(ET_TARGETS, function(el){
      var e = parseNumber(el.textContent);
      var c = colorFromStops(e, etStops, "e");
      setColor(el, c);
    });
  }

  function start(){
    apply();
    setInterval(apply, 2000);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", start);
  } else {
    start();
  }

})();
