/* Mi Auto Sustentable — Main scripts */

// ---- Mobile menu ----
(function() {
  var btn = document.getElementById("mobileMenuBtn");
  var menu = document.getElementById("mobileMenu");
  if (btn && menu) {
    btn.addEventListener("click", function() {
      menu.classList.toggle("open");
    });
  }
})();

// ---- Cookie banner ----
(function() {
  var banner = document.getElementById("cookieBanner");
  if (!banner) return;
  try {
    if (!localStorage.getItem("mas:cookies")) banner.style.display = "block";
  } catch(e) { banner.style.display = "block"; }
  var accept = document.getElementById("cookieAccept");
  var reject = document.getElementById("cookieReject");
  if (accept) accept.addEventListener("click", function() {
    try { localStorage.setItem("mas:cookies", "yes"); } catch(e) {}
    banner.style.display = "none";
  });
  if (reject) reject.addEventListener("click", function() {
    try { localStorage.setItem("mas:cookies", "no"); } catch(e) {}
    banner.style.display = "none";
  });
})();

// ---- Toast ----
function showToast(msg) {
  var container = document.getElementById("toastContainer");
  if (!container) { alert(msg); return; }
  var toast = document.createElement("div");
  toast.style.cssText = "background:var(--card);border:1px solid var(--border);border-radius:calc(var(--radius) + 4px);padding:0.75rem 1.25rem;box-shadow:var(--shadow-card);color:var(--foreground);font-size:0.875rem;max-width:20rem;animation:fadeUp 0.3s ease both";
  toast.textContent = msg;
  container.appendChild(toast);
  setTimeout(function() {
    toast.style.opacity = "0";
    toast.style.transition = "opacity 0.3s";
    setTimeout(function() { toast.remove(); }, 300);
  }, 3000);
}
window.showToast = showToast;

// ---- Offer list filtering (oferta.html) ----
(function() {
  var search = document.getElementById("offerSearch");
  var typeFilter = document.getElementById("filterType");
  var catFilter = document.getElementById("filterCat");
  var grid = document.getElementById("offerGrid");
  if (!search || !grid) return;

  function filter() {
    var q = search.value.toLowerCase();
    var type = typeFilter ? typeFilter.value : "todos";
    var cat = catFilter ? catFilter.value : "todos";
    var cards = grid.querySelectorAll(".offer-card");
    cards.forEach(function(card) {
      var title = card.querySelector("h3") ? card.querySelector("h3").textContent.toLowerCase() : "";
      var hook = card.querySelector("p") ? card.querySelector("p").textContent.toLowerCase() : "";
      var badges = card.querySelectorAll(".badge");
      var sellerType = "";
      var category = "";
      badges.forEach(function(b) {
        var text = b.textContent.trim();
        // Check if it matches a seller type
        for (var k in window.SELLER_LABELS || {}) {
          if (text === window.SELLER_LABELS[k]) sellerType = k;
        }
        for (var k2 in window.CATEGORY_LABELS || {}) {
          if (text === window.CATEGORY_LABELS[k2]) category = k2;
        }
      });
      var matchQ = !q || title.includes(q) || hook.includes(q);
      var matchType = type === "todos" || sellerType === type;
      var matchCat = cat === "todos" || category === cat;
      card.style.display = (matchQ && matchType && matchCat) ? "block" : "none";
    });
  }

  search.addEventListener("input", filter);
  if (typeFilter) typeFilter.addEventListener("change", filter);
  if (catFilter) catFilter.addEventListener("change", filter);
})();

// ---- Tabs (herramientas.html) ----
(function() {
  var triggers = document.querySelectorAll(".tab-trigger[data-tab]");
  triggers.forEach(function(trigger) {
    trigger.addEventListener("click", function() {
      var tab = trigger.getAttribute("data-tab");
      triggers.forEach(function(t) { t.classList.toggle("active", t === trigger); });
      document.querySelectorAll(".tab-content").forEach(function(c) {
        c.classList.toggle("active", c.id === "tab-" + tab);
      });
    });
  });
})();

// ---- Sliders visual update ----
(function() {
  document.querySelectorAll('input[type="range"]').forEach(function(slider) {
    function update() {
      var min = parseFloat(slider.min) || 0;
      var max = parseFloat(slider.max) || 100;
      var val = parseFloat(slider.value);
      var pct = ((val - min) / (max - min)) * 100;
      slider.style.setProperty("--val", pct + "%");
    }
    slider.addEventListener("input", update);
    update();
  });
})();
