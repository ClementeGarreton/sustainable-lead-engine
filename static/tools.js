/* Mi Auto Sustentable — Tools (TCO, Autonomy, Diagnosis) */

// ---- TCO Calculator ----
(function() {
  var km = document.getElementById("tcoKm");
  var bencina = document.getElementById("tcoBencina");
  var kwh = document.getElementById("tcoKwh");
  var gas = document.getElementById("tcoGas");
  if (!km) return;

  var consumoEV = 16; // kWh/100km

  function fmt(n) {
    return "$" + Math.round(n).toLocaleString("es-CL").replace(/,/g, ".");
  }

  function calc() {
    var kmVal = parseInt(km.value) || 0;
    var benVal = parseInt(bencina.value) || 0;
    var kwhVal = parseInt(kwh.value) || 0;
    var gasVal = parseFloat(gas.value) || 0;

    document.getElementById("tcoKmVal").textContent = kmVal.toLocaleString("es-CL") + " km";
    document.getElementById("tcoGasVal").textContent = gasVal + " L/100km";

    var months = 60;
    var litrosMes = (kmVal * gasVal) / 100;
    var kwhMes = (kmVal * consumoEV) / 100;
    var gastoGasMes = litrosMes * benVal;
    var gastoEvMes = kwhMes * kwhVal;
    var ahorroCombustible = Math.max(0, (gastoGasMes - gastoEvMes) * months);
    var ahorroMantencion = months * 18000;
    var total = ahorroCombustible + ahorroMantencion;

    document.getElementById("tcoFuel").textContent = fmt(ahorroCombustible);
    document.getElementById("tcoMaint").textContent = fmt(ahorroMantencion);
    document.getElementById("tcoTotal").textContent = fmt(total);
  }

  [km, bencina, kwh, gas].forEach(function(el) {
    el.addEventListener("input", calc);
  });
  calc();
})();

// ---- Autonomy Simulator ----
(function() {
  var city = document.getElementById("autoCity");
  var daily = document.getElementById("autoDaily");
  if (!city) return;

  var MODELS = [
    { name: "Dongfeng Box", range: 310 },
    { name: "BYD Dolphin", range: 405 },
    { name: "MG4", range: 425 },
    { name: "BYD Atto 3", range: 510 },
    { name: "Tesla Model 3", range: 580 },
    { name: "Volvo EX30", range: 480 },
  ];

  function render() {
    var dailyVal = parseInt(daily.value) || 0;
    document.getElementById("autoDailyVal").textContent = dailyVal + " km";
    document.getElementById("autoTitle").textContent = "Modelos que cubren tu uso en " + city.value;
    var list = document.getElementById("autoList");
    list.innerHTML = "";
    MODELS.forEach(function(m) {
      var ok = m.range >= dailyVal * 3;
      var li = document.createElement("li");
      li.style.cssText = "display:flex;align-items:center;justify-content:space-between;border-radius:0.5rem;border:1px solid var(--border);background:oklch(0.16 0.05 250 / 0.4);padding:0.5rem 0.75rem";
      li.innerHTML = '<span class="font-medium">' + m.name + '</span><span style="display:flex;align-items:center;gap:0.75rem;font-size:0.75rem">' +
        '<span class="font-mono text-muted-foreground">' + m.range + ' km</span>' +
        (ok
          ? '<span class="badge badge-primary">✓ Cubre sin problema</span>'
          : '<span class="badge" style="background:oklch(0.79 0.18 75 / 0.15);color:oklch(0.79 0.18 75)">⚠ Carga intermedia</span>') +
        '</span>';
      list.appendChild(li);
    });
  }

  city.addEventListener("change", render);
  daily.addEventListener("input", render);
  render();
})();

// ---- EV Diagnosis Quiz ----
(function() {
  var quiz = document.getElementById("diagQuiz");
  var result = document.getElementById("diagResult");
  if (!quiz) return;

  var QUESTIONS = [
    { q: "¿Tienes estacionamiento propio en tu casa o edificio?", opts: [["si", "Sí"], ["talvez", "Compartido"], ["no", "No"]] },
    { q: "¿Cuántos km recorres habitualmente por día?", opts: [["si", "Menos de 60"], ["talvez", "60–120"], ["no", "Más de 120"]] },
    { q: "¿Cuál es tu presupuesto aproximado?", opts: [["no", "Menos de $15M"], ["talvez", "$15M – $25M"], ["si", "Más de $25M"]] },
    { q: "¿Usas el auto principalmente en…?", opts: [["si", "Ciudad"], ["talvez", "Mixto"], ["no", "Carretera larga"]] },
    { q: "¿Estarías dispuesto a instalar un cargador en casa?", opts: [["si", "Sí"], ["talvez", "Quizás"], ["no", "No"]] },
  ];

  var step = 0;
  var answers = [];

  function render() {
    if (step >= QUESTIONS.length) {
      showResult();
      return;
    }
    var cur = QUESTIONS[step];
    document.getElementById("diagStep").textContent = "Pregunta " + (step + 1) + " de " + QUESTIONS.length;
    document.getElementById("diagPct").textContent = Math.round((step / QUESTIONS.length) * 100) + "%";
    document.getElementById("diagBar").style.width = (step / QUESTIONS.length) * 100 + "%";
    document.getElementById("diagQuestion").textContent = cur.q;
    var opts = document.getElementById("diagOptions");
    opts.innerHTML = "";
    cur.opts.forEach(function(opt) {
      var btn = document.createElement("button");
      btn.style.cssText = "border-radius:0.75rem;border:1px solid var(--border);background:oklch(0.16 0.05 250 / 0.4);padding:0.75rem 1rem;text-align:left;font-size:0.875rem;cursor:pointer;transition:all 0.2s";
      btn.textContent = opt[1];
      btn.onmouseenter = function() { this.style.borderColor = "var(--primary)"; this.style.background = "oklch(0.82 0.22 145 / 0.05)"; };
      btn.onmouseleave = function() { this.style.borderColor = "var(--border)"; this.style.background = "oklch(0.16 0.05 250 / 0.4)"; };
      btn.onclick = function() {
        answers.push(opt[0]);
        step++;
        render();
      };
      opts.appendChild(btn);
    });
  }

  function showResult() {
    var score = answers.reduce(function(a, x) { return a + (x === "si" ? 2 : x === "talvez" ? 1 : 0); }, 0);
    var title, body, to, cta;
    if (score >= 8) { title = "Listo para eléctrico puro"; body = "Tu perfil encaja muy bien con un BEV. Te conviene revisar los modelos eléctricos disponibles."; to = "/categorias/autos-electricos"; cta = "Ver autos eléctricos"; }
    else if (score >= 5) { title = "Eléctrico + cargador domiciliario"; body = "Recomendamos un eléctrico, pero conviene instalar un wallbox en casa primero."; to = "/categorias/instalacion-domiciliaria"; cta = "Cotizar instalación"; }
    else if (score >= 3) { title = "Híbrido enchufable (PHEV) es tu mejor opción ahora"; body = "Mientras la infraestructura crece, un PHEV te da lo mejor de ambos mundos."; to = "/categorias/autos-hibridos"; cta = "Ver híbridos"; }
    else { title = "Mejor esperar 12 meses y reevaluar"; body = "Hoy, un eléctrico podría no calzarte. Aprovecha para entender la tecnología y vuelve a hacer el test el próximo año."; to = "/herramientas"; cta = "Volver a herramientas"; }

    quiz.style.display = "none";
    result.style.display = "block";
    result.innerHTML =
      '<div class="rounded-2xl border border-primary/30 bg-primary/5 p-8 text-center" style="max-width:42rem;margin:0 auto">' +
        '<p class="text-xs font-semibold tracking-widest text-primary uppercase">Resultado honesto</p>' +
        '<h2 class="font-display text-2xl font-bold mt-2">' + title + '</h2>' +
        '<p class="mx-auto mt-3 text-muted-foreground" style="max-width:36rem">' + body + '</p>' +
        '<div class="flex flex-wrap justify-center gap-3 mt-6">' +
          '<a href="' + to + '" class="btn btn-hero btn-lg">' + cta + ' →</a>' +
          '<button class="btn btn-outline btn-lg" onclick="resetDiag()">Volver a hacerlo</button>' +
        '</div>' +
      '</div>';
  }

  window.resetDiag = function() {
    step = 0;
    answers = [];
    quiz.style.display = "block";
    result.style.display = "none";
    render();
  };

  render();
})();
