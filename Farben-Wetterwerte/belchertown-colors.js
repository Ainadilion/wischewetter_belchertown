(function () {

  // ----------------------------
  // Selektoren (Belchertown Klassen)
  // ----------------------------
  var TEMP_TARGETS = [
    "span.outtemp",
    "td.high",
    "td.low",
    "span.dewpoint",
    "span.outThetaE",
    "span.outEquiTemp"
  ];

  var TEMP_UNIT_TARGET = "sup.outtempunitlabelsuper";

  var PRESSURE_TARGETS = ["span.barometer"];
  var HUMIDITY_TARGETS = ["span.outHumidity"];

  var WIND_TARGETS = ["span.curwindspeed", "span.curwindgust"];

  var RAIN_TARGETS = ["span.dayRain", "span.rainRate"];

  var UV_TARGETS = ["span.UV"];
  var SOLAR_TARGETS = ["span.radiation"];
  var ET_TARGETS = ["span.dayET"];

  // ----------------------------
  // Skalen / Stops
  // ----------------------------

  // Temperatur (°C) – NEU (deine Skala)
  var tStops = [
    {t:-36,c:"#dca1dc"},
    {t:-30,c:"#d21fcb"},
    {t:-27,c:"#a613a9"},
    {t:-24,c:"#830a90"},
    {t:-21,c:"#63007e"},
    {t:-18,c:"#3e007f"},
    {t:-15,c:"#00327f"},
    {t:-12,c:"#00528f"},
    {t:-9 ,c:"#0082ef"},
    {t:-6 ,c:"#47abff"},
    {t:-3 ,c:"#77c0ff"},
    {t:0  ,c:"#9bd1ff"},
    {t:3  ,c:"#c7e4ff"},
    {t:6  ,c:"#95dfbc"},
    {t:9  ,c:"#4a9775"},
    {t:12 ,c:"#21bb0e"},
    {t:15 ,c:"#7fd708"},
    {t:18 ,c:"#c1ec04"},
    {t:21 ,c:"#f1f507"},
    {t:24 ,c:"#f4c90b"},
    {t:27 ,c:"#f4880b"},
    {t:30 ,c:"#f4520b"},
    {t:33 ,c:"#c41a0a"},
    {t:36 ,c:"#820000"},
    {t:39 ,c:"#711c1c"},
    {t:44 ,c:"#c77e7e"},
    {t:50 ,c:"#e8baba"}
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

  // Luftfeuchte (%)
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

  // Wind/Böen (m/s)
  var wStops = [
    {w:0.0,  c:"#808080"},
    {w:1.0,  c:"#7cb5ec"},
    {w:3.0,  c:"#00c8ff"},
    {w:5.0,  c:"#00ff80"},
    {w:8.0,  c:"#00ff00"},
    {w:12.0, c:"#ffff00"},
    {w:18.0, c:"#ffb000"},
    {w:25.0, c:"#ff7000"},
    {w:32.0, c:"#ff0000"}
  ];

  // Regen (mm, mm/h) – 0 grau
  var rrStops = [
    {r:0.0,  c:"#808080"},
    {r:0.1,  c:"#7cb5ec"},
    {r:0.5,  c:"#00c8ff"},
    {r:1.0,  c:"#00ff80"},
    {r:2.0,  c:"#00ff00"},
    {r:5.0,  c:"#ffff00"},
    {r:10.0, c:"#ffb000"},
    {r:20.0, c:"#ff7000"},
    {r:40.0, c:"#ff0000"}
  ];

  // UV Index (Standard 0–11+)
  var uvStops = [
    {u:0.0, c:"#808080"},
    {u:2.0, c:"#00ff00"},
    {u:5.0, c:"#ffff00"},
    {u:7.0, c:"#ffb000"},
    {u:10.0,c:"#ff0000"},
    {u:12.0,c:"#ff00ff"}
  ];

  // Solarstrahlung (W/m²)
  var radStops = [
    {s:0.0,   c:"#808080"},
    {s:50.0,  c:"#7cb5ec"},
    {s:200.0, c:"#00c8ff"},
    {s:400.0, c:"#00ff00"},
    {s:700.0, c:"#ffff00"},
    {s:900.0, c:"#ffb000"},
    {s:1100.0,c:"#ff0000"}
  ];

  // Evapotranspiration (mm)
  var etStops = [
    {e:0.0,  c:"#808080"},
    {e:0.1,  c:"#7cb5ec"},
    {e:0.5,  c:"#00c8ff"},
    {e:1.0,  c:"#00ff00"},
    {e:2.0,  c:"#ffff00"},
    {e:3.0,  c:"#ffb000"},
    {e:5.0,  c:"#ff0000"}
  ];

  // ----------------------------
  // Helpers
  // ----------------------------
  function hexToRgb(h){
    h = h.replace("#","");
    return [
      parseInt(h.substring(0,2),16),
      parseInt(h.substring(2,4),16),
      parseInt(h.substring(4,6),16)
    ];
  }
  function lerp(a,b,x){ return a + (b-a)*x; }
  function rnd(x){ return (x + 0.5) | 0; }
  function parseNumber(txt){
    var s = (txt || "").replace(",", ".");
    var m = s.match(/-?\d+(\.\d+)?/);
    return m ? parseFloat(m[0]) : NaN;
  }

  function colorFromStops(val, stops, key){
    if(!(val === val) || !isFinite(val)) return null;
    if(val <= stops[0][key]) return stops[0].c;
    if(val >= stops[stops.length-1][key]) return stops[stops.length-1].c;

    for(var i=0;i<stops.length-1;i++){
      var a=stops[i], b=stops[i+1];
      if(val >= a[key] && val <= b[key]){
        var x=(val-a[key])/(b[key]-a[key]);
        var ra=hexToRgb(a.c), rb=hexToRgb(b.c);
        return "rgb(" +
          rnd(lerp(ra[0],rb[0],x)) + "," +
          rnd(lerp(ra[1],rb[1],x)) + "," +
          rnd(lerp(ra[2],rb[2],x)) + ")";
      }
    }
    return null;
  }

  function setColor(el, c){
    if(c) el.style.setProperty("color", c, "important");
  }

  function applySelectorList(selectors, stops, key){
    for(var k=0;k<selectors.length;k++){
      var els = document.querySelectorAll(selectors[k]);
      for(var j=0;j<els.length;j++){
        var el = els[j];
        var v = parseNumber(el.textContent);
        var c = colorFromStops(v, stops, key);
        setColor(el, c);
      }
    }
  }

  // ----------------------------
  // Äquivalenztemperaturen in Wertetabelle aufnehmen
  // ----------------------------
  function ensureEquiRows(){
    var tb = document.querySelector(".station-observations table tbody");
    if(!tb) return;

    function addRow(id, labelText, cls){
      if(document.getElementById(id)) return;

      var tr = document.createElement("tr");
      tr.id = id;

      var tdL = document.createElement("td");
      tdL.className = "station-observations-label";
      tdL.textContent = labelText;

      var tdV = document.createElement("td");
      var sp = document.createElement("span");
      sp.className = cls;
      sp.textContent = "--";

      tdV.appendChild(sp);
      tr.appendChild(tdL);
      tr.appendChild(tdV);
      tb.appendChild(tr);
    }

    addRow("row-thetae", "pot. Äquivalenztemperatur", "outThetaE");
    addRow("row-equitemp", "Äquivalenztemperatur", "outEquiTemp");
  }

  function syncEquiValues(){
    // Quelle: meist im Phaenologie-Block
    var srcThetaE = document.querySelector(".index-hook-after-forecast span.outThetaE") || document.querySelector("span.outThetaE");
    var srcEqui   = document.querySelector(".index-hook-after-forecast span.outEquiTemp") || document.querySelector("span.outEquiTemp");

    // Ziel: Wertetabelle
    var dstThetaE = document.querySelector(".station-observations span.outThetaE");
    var dstEqui   = document.querySelector(".station-observations span.outEquiTemp");

    if(srcThetaE && dstThetaE) dstThetaE.textContent = srcThetaE.textContent;
    if(srcEqui && dstEqui)     dstEqui.textContent   = srcEqui.textContent;
  }

  // Einheit °C bei outtemp angleichen
  function syncOutTempUnit(){
    var tEl = document.querySelector("span.outtemp");
    var uEl = document.querySelector(TEMP_UNIT_TARGET);
    if(!tEl || !uEl) return;
    if(tEl.style.color) uEl.style.setProperty("color", tEl.style.color, "important");
  }

  function applyAll(){
    ensureEquiRows();
    syncEquiValues();

    // Temperatur (inkl. ThetaE/EquiTemp) + Taupunkt
    applySelectorList(TEMP_TARGETS, tStops, "t");

    // Luftdruck
    applySelectorList(PRESSURE_TARGETS, pStops, "p");

    // Luftfeuchte
    applySelectorList(HUMIDITY_TARGETS, hStops, "h");

    // Wind/Böen
    applySelectorList(WIND_TARGETS, wStops, "w");

    // Regen (Summe + Rate)
    applySelectorList(RAIN_TARGETS, rrStops, "r");

    // UV
    applySelectorList(UV_TARGETS, uvStops, "u");

    // Solarstrahlung
    applySelectorList(SOLAR_TARGETS, radStops, "s");

    // Evapotranspiration
    applySelectorList(ET_TARGETS, etStops, "e");

    // °C einfärben
    syncOutTempUnit();
  }

  // Belchertown aktualisiert per AJAX → regelmäßig neu anwenden
  function start(){
    applyAll();
    setInterval(applyAll, 1500);
  }

  if(document.readyState === "loading"){
    document.addEventListener("DOMContentLoaded", start);
  } else {
    start();
  }

})();
