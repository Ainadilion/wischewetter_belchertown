/* =========================================================
   Belchertown / WeeWX – Frost- & Schwüle-Indikator
   Anzeige unterhalb "Aktuelles Wetter ..."
   ========================================================= */

(function () {

  function parseValue(txt) {
    var m = (txt || "").replace(",", ".").match(/-?\d+(\.\d+)?/);
    return m ? parseFloat(m[0]) : NaN;
  }

  function ensureNode() {
    var container = document.querySelector(".wx-stn-info-container");
    if (!container) return null;

    var updatedWrapper = container.querySelector(".updated-wrapper");
    if (!updatedWrapper) return null;

    var node = document.getElementById("frost-indicator");
    if (node) return node;

    node = document.createElement("div");
    node.id = "frost-indicator";
    node.style.textAlign = "center";
    node.style.fontSize = "1.25em";
    node.style.fontWeight = "700";
    node.style.margin = "6px 0 2px 0";
    node.style.display = "block";

    container.insertBefore(node, updatedWrapper);
    return node;
  }

  function update() {
    var node = ensureNode();
    if (!node) return;

    var tEl  = document.querySelector("span.outtemp");
    var tdEl = document.querySelector("span.dewpoint");

    if (!tEl || !tdEl) { node.textContent = ""; return; }

    var t  = parseValue(tEl.textContent);
    var td = parseValue(tdEl.textContent);

    if (!isFinite(t) || !isFinite(td)) {
      node.textContent = "";
      return;
    }

    var frostText = "";
    var frostColor = "";

    if (t >= 0) {
      frostText  = "kein Frost";
      frostColor = "#00cc44";
    }
    else if (t >= -5) {
      frostText  = "❄ leichter Frost";
      frostColor = "#66ccff";
    }
    else if (t >= -10) {
      frostText  = "❄❄ mäßiger Frost";
      frostColor = "#3399ff";
    }
    else if (t >= -15) {
      frostText  = "❄❄❄ strenger Frost";
      frostColor = "#0066cc";
    }
    else {
      frostText  = "❄❄❄❄ sehr strenger Frost";
      frostColor = "#003366";
    }

    var humidText  = "";
    var humidColor = "";

    if (td >= 16.0) {
      humidText  = "Schwüle";
      humidColor = "#ffcc00";
    } else {
      humidText  = "keine Schwüle";
      humidColor = "#00cc44";
    }

    node.innerHTML =
      "<span style='color:" + frostColor + "'>" + frostText + "</span>" +
      " <span style='color:#999'>·</span> " +
      "<span style='color:" + humidColor + "'>" + humidText + "</span>";
  }

  function start() {
    update();
    setInterval(update, 2000);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", start);
  } else {
    start();
  }

})();
