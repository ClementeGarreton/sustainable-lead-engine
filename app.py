"""
Mi Auto Sustentable — Flask preview app.
Simple HTML5 templates + static assets. For preview/debug only.
"""
from flask import Flask, render_template, abort, request, redirect, url_for, jsonify

app = Flask(__name__)

# ---- Mock data (mirrors src/lib/mock-data.ts) ----

SELLERS = [
    {"id": "s1", "slug": "evplus-santiago", "name": "EV+ Santiago", "type": "concesionario", "city": "Santiago", "rating": 4.8, "about": "Concesionario multimarca con stock de autos 100% eléctricos importados directos."},
    {"id": "s2", "slug": "carla-vendedora", "name": "Carla Soto", "type": "vendedor", "city": "Viña del Mar", "rating": 4.6, "about": "Vendedora afiliada con stock de SUV eléctricos seminuevos verificados."},
    {"id": "s3", "slug": "taller-voltio", "name": "Taller Voltio", "type": "mecanico", "city": "Providencia", "rating": 4.9, "about": "Mecánica especializada en baterías de litio y diagnóstico eléctrico."},
    {"id": "s4", "slug": "hibridate-cl", "name": "Hibrídate Chile", "type": "conversion", "city": "Concepción", "rating": 4.7, "about": "Conversión de autos a tracción híbrida con kits homologados."},
]

OFFERS = [
    {"id": "o1", "slug": "suv-electrico-2024-autonomia-larga", "title": "SUV eléctrico 2024 con autonomía extendida", "hook": "Hasta 510 km de autonomía real, listo para entrega esta semana.", "hidden": "Modelo BYD Atto 3 Extended Range 2024, 0 km, color blanco perla. Garantía oficial 8 años de batería. Financiamiento 0% a 24 meses disponible. Precio de cierre con bono de chatarrización incluido.", "price": 28990000, "image": "/static/img/offer-suv.jpg", "category": "autos-electricos", "sellerId": "s1", "city": "Santiago", "createdAt": "2025-06-12", "views": 1240, "unlocks": 88, "featured": True, "seals": ["concesionario", "garantia", "historial"]},
    {"id": "o2", "slug": "sedan-deportivo-electrico-rojo", "title": "Sedán deportivo eléctrico rojo, único disponible", "hook": "0 a 100 en 3,9 s. Última unidad en showroom.", "hidden": "Tesla Model 3 Performance 2023, 12.000 km, Full Self-Driving incluido. Traspaso y revisión técnica al día. Aceptamos parte de pago.", "price": 41500000, "image": "/static/img/offer-sedan.jpg", "category": "autos-electricos", "sellerId": "s2", "city": "Viña del Mar", "createdAt": "2025-06-18", "views": 980, "unlocks": 64, "seals": ["bateria-certificada", "historial"]},
    {"id": "o3", "slug": "revision-bateria-litio-completa", "title": "Revisión completa de batería de litio", "hook": "Diagnóstico de 120 puntos con informe firmado.", "hidden": "Servicio realizado por ingeniero certificado SEC. Incluye prueba de capacidad, BMS, balanceo y reporte PDF. Atención a Tesla, BYD, MG, Volvo y Renault.", "price": 149000, "image": "/static/img/offer-mechanic.jpg", "category": "mantenimiento", "sellerId": "s3", "city": "Providencia", "createdAt": "2025-06-20", "views": 612, "unlocks": 41},
    {"id": "o4", "slug": "conversion-hibrido-citadino", "title": "Convierte tu auto en híbrido citadino", "hook": "Ahorra hasta 45% en combustible. Kit homologado.", "hidden": "Conversión con kit eléctrico auxiliar para uso urbano, instalación en 5 días hábiles. Garantía 24 meses. Aplicable a la mayoría de autos 1.6 a 2.0L.", "price": 3200000, "image": "/static/img/offer-conversion.jpg", "category": "conversion", "sellerId": "s4", "city": "Concepción", "createdAt": "2025-06-08", "views": 1810, "unlocks": 120},
    {"id": "o5", "slug": "cargador-domiciliario-7kw", "title": "Cargador domiciliario 7 kW con instalación", "hook": "Instalación profesional incluida en Región Metropolitana.", "hidden": "Wallbox Pulsar Plus 7 kW, conector tipo 2, control desde app, certificación SEC. Mantención gratis primer año.", "price": 890000, "image": "/static/img/offer-mechanic.jpg", "category": "accesorios", "sellerId": "s3", "city": "Santiago", "createdAt": "2025-06-15", "views": 410, "unlocks": 22},
    {"id": "o6", "slug": "suv-hibrido-familiar", "title": "SUV híbrido familiar, máxima eficiencia", "hook": "22 km/L mixtos. 7 pasajeros.", "hidden": "Toyota Highlander Hybrid 2024, traccion AWD, sistema THS-II. Stock para entrega inmediata. Financiamiento bancario preaprobado.", "price": 35900000, "image": "/static/img/offer-suv.jpg", "category": "autos-hibridos", "sellerId": "s1", "city": "Santiago", "createdAt": "2025-06-19", "views": 720, "unlocks": 53, "featured": True, "seals": ["concesionario", "garantia"]},
    {"id": "o7", "slug": "diagnostico-soh-bateria-usado", "title": "Médico de batería: diagnóstico SoH para auto usado", "hook": "Antes de comprar, sabe cuánta vida útil le queda a la batería.", "hidden": "Informe SoH con prueba de capacidad, lectura BMS, balanceo y peritaje firmado por ingeniero certificado SEC. Recomendaciones de compra/no compra con respaldo técnico.", "price": 89000, "image": "/static/img/offer-mechanic.jpg", "category": "medico-bateria", "sellerId": "s3", "city": "Providencia", "createdAt": "2025-06-22", "views": 530, "unlocks": 38, "seals": ["bateria-certificada"]},
    {"id": "o8", "slug": "instalacion-wallbox-domiciliario", "title": "Instalación domiciliaria de cargador wallbox (SEC)", "hook": "Cargador 7 kW + instalación certificada en Región Metropolitana.", "hidden": "Visita técnica, materiales, conexión al tablero y declaración TE-1 incluidos. Garantía 24 meses. Coordinación con tu administradora si vives en edificio.", "price": 1190000, "image": "/static/img/offer-conversion.jpg", "category": "instalacion-domiciliaria", "sellerId": "s3", "city": "Santiago", "createdAt": "2025-06-21", "views": 470, "unlocks": 31, "seals": ["garantia"]},
]

SELLER_LABEL = {
    "concesionario": "Concesionario",
    "vendedor": "Vendedor independiente",
    "mecanico": "Mecánico EV",
    "conversion": "Conversión a híbrido",
}

CATEGORY_LABEL = {
    "autos-electricos": "Autos eléctricos",
    "autos-hibridos": "Autos híbridos",
    "mantenimiento": "Mantenimiento EV",
    "conversion": "Conversión a híbrido",
    "accesorios": "Cargadores y accesorios",
    "medico-bateria": "Médico de batería",
    "instalacion-domiciliaria": "Instalación domiciliaria",
}

SEAL_LABEL = {
    "bateria-certificada": "Batería certificada",
    "garantia": "Con garantía",
    "historial": "Historial disponible",
    "concesionario": "Concesionario",
}

PLANS = [
    {"id": "starter", "name": "Despegue", "monthly": 39000, "leads": 15, "extra": 3500, "reach": "Alcance local en Instagram", "features": ["Publicaciones ilimitadas", "15 leads incluidos / mes", "$3.500 por lead extra", "Panel de bandeja con datos completos"]},
    {"id": "pro", "name": "Acelera", "monthly": 89000, "leads": 50, "extra": 2500, "reach": "Alcance nacional en Instagram + TikTok", "features": ["Todo Despegue", "50 leads incluidos / mes", "$2.500 por lead extra", "Perfil destacado en categorías", "Notificación instantánea por correo"], "popular": True},
    {"id": "premium", "name": "Tracción Total", "monthly": 189000, "leads": 150, "extra": 1800, "reach": "Alcance nacional + Google Ads", "features": ["Todo Acelera", "150 leads incluidos / mes", "$1.800 por lead extra", "Asesoría 1:1 mensual", "API de integración a CRM"]},
]

LEADS = [
    {"id": "l1", "name": "Camila Pérez", "email": "camila@correo.cl", "phone": "+56 9 8765 4321", "offer": "SUV eléctrico 2024", "at": "Hace 2h", "status": "Nuevo"},
    {"id": "l2", "name": "Diego Soto", "email": "diego.soto@gmail.com", "phone": "+56 9 1234 5678", "offer": "Sedán deportivo eléctrico", "at": "Hace 6h", "status": "Contactado"},
    {"id": "l3", "name": "Florencia Bravo", "email": "flor.bravo@uc.cl", "phone": "+56 9 5566 7788", "offer": "SUV híbrido familiar", "at": "Ayer", "status": "Nuevo"},
]

NOTIFS = [
    {"id": 1, "t": "Nuevo lead recibido", "d": "Camila Pérez desbloqueó SUV eléctrico 2024.", "at": "Hace 2h", "read": False, "icon": "bell", "c": "text-primary"},
    {"id": 2, "t": "Pago confirmado", "d": "Tu plan Acelera de junio está activo.", "at": "Hace 3 días", "read": True, "icon": "check", "c": "text-primary"},
    {"id": 3, "t": "Recordatorio: completa tu perfil público", "d": "Aumenta hasta 30% tu tasa de desbloqueo.", "at": "Hace 5 días", "read": True, "icon": "alert", "c": "text-accent"},
]

INVOICES = [
    {"id": "f-202506", "date": "01-06-2026", "concept": "Plan Acelera · junio", "amount": 89000, "status": "Pagado"},
    {"id": "f-202505", "date": "01-05-2026", "concept": "Plan Acelera · mayo", "amount": 89000, "status": "Pagado"},
    {"id": "f-202504", "date": "01-04-2026", "concept": "Plan Despegue · abril", "amount": 39000, "status": "Pagado"},
]

FAQ = [
    ["¿Cómo veo el precio y contacto de una oferta?", "Toca la oferta, deja tu nombre, correo y WhatsApp. Desbloqueas precio y datos al instante. Una vez desbloqueado, no tienes que volver a ingresarlos durante la sesión."],
    ["¿A quién se le entrega mi contacto?", "Tu contacto se ofrece al vendedor de la oferta que desbloqueaste. Vendedores con plan compatible podrán contactarte por correo, SMS, WhatsApp o redes sociales."],
    ["¿Es gratis para los compradores?", "Sí, 100%. Solo te pedimos un correo válido para asegurar contactos reales y proteger a los vendedores de bots."],
    ["¿Cómo cobran a los vendedores?", "Plan mensual con cupo de leads incluidos y, si necesitan más, pagan por lead adicional. Mira planes en /precios."],
    ["¿Tienen autos a la venta o son intermediarios?", "Somos un portal: agrupamos la oferta de concesionarios, vendedores, mecánicos y conversiones. La compra se cierra directo con el vendedor."],
    ["¿Operan en todo Chile?", "Sí. Tenemos vendedores en Santiago, Viña, Concepción y se suman ciudades cada mes."],
    ["¿Qué pasa si me ofrecen algo distinto a lo publicado?", "Reporta el caso a soporte. Moderamos la oferta y podemos suspender al vendedor."],
]

# ---- Helpers ----

def format_clp(n):
    return "${:,.0f}".format(n).replace(",", ".")

def get_seller(sid):
    for s in SELLERS:
        if s["id"] == sid:
            return s
    return None

def get_offer(slug):
    for o in OFFERS:
        if o["slug"] == slug:
            return o
    return None

def get_seller_by_slug(slug):
    for s in SELLERS:
        if s["slug"] == slug:
            return s
    return None

def offers_by_seller(sid):
    return [o for o in OFFERS if o["sellerId"] == sid]

def offers_by_category(cat):
    return [o for o in OFFERS if o["category"] == cat]

def seal_label(s):
    return SEAL_LABEL.get(s, s)

def enrich_offer(o):
    seller = get_seller(o["sellerId"])
    return {
        **o,
        "seller": seller,
        "seller_type_label": SELLER_LABEL.get(seller["type"], "") if seller else "",
        "category_label": CATEGORY_LABEL.get(o["category"], ""),
        "price_fmt": format_clp(o["price"]),
        "seal_labels": [SEAL_LABEL.get(s, s) for s in o.get("seals", [])],
    }

# ---- Context processor: make helpers available in all templates ----

@app.context_processor
def inject_globals():
    return {
        "format_clp": format_clp,
        "SELLER_LABEL": SELLER_LABEL,
        "CATEGORY_LABEL": CATEGORY_LABEL,
        "SEAL_LABEL": SEAL_LABEL,
        "SITE": {
            "name": "Mi Auto Sustentable",
            "domain": "miautosustentable.com",
            "tagline": "Tu próximo auto, con energía propia.",
            "hint": "El portal que une concesionarios, vendedores, mecánicos y especialistas de electromovilidad en Chile.",
            "country": "Chile",
            "currency": "CLP",
            "phonePrefix": "+56",
            "email": "hola@miautosustentable.com",
            "ig": "https://instagram.com/miautosustentable",
            "tk": "https://tiktok.com/@miautosustentable",
            "yr": 2025,
        },
    }

# ---- Routes ----

@app.route("/")
def index():
    featured = [enrich_offer(o) for o in OFFERS[:6]]
    return render_template("index.html", featured=featured, active="inicio")

@app.route("/oferta")
def oferta():
    enriched = [enrich_offer(o) for o in OFFERS]
    return render_template("oferta.html", offers=enriched, active="oferta")

@app.route("/oferta/<slug>")
def oferta_detalle(slug):
    offer = get_offer(slug)
    if not offer:
        abort(404)
    enriched = enrich_offer(offer)
    related = [enrich_offer(o) for o in OFFERS if o["id"] != offer["id"] and o["category"] == offer["category"]][:3]
    return render_template("oferta_detalle.html", offer=enriched, related=related)

@app.route("/categorias")
def categorias():
    cats = [{"key": k, "label": v, "count": len(offers_by_category(k))} for k, v in CATEGORY_LABEL.items()]
    return render_template("categorias.html", cats=cats, active="categorias")

@app.route("/categorias/<slug>")
def categoria_detalle(slug):
    if slug not in CATEGORY_LABEL:
        abort(404)
    list_ = [enrich_offer(o) for o in offers_by_category(slug)]
    return render_template("categoria_detalle.html", slug=slug, label=CATEGORY_LABEL[slug], offers=list_)

@app.route("/buscar")
def buscar():
    q = request.args.get("q", "")
    sort = request.args.get("sort", "recientes")
    results = OFFERS
    if q:
        ql = q.lower()
        results = [o for o in results if ql in (o["title"] + " " + o["hook"] + " " + o["city"]).lower()]
    if sort == "baratos":
        results = sorted(results, key=lambda x: x["price"])
    elif sort == "caros":
        results = sorted(results, key=lambda x: x["price"], reverse=True)
    enriched = [enrich_offer(o) for o in results]
    return render_template("buscar.html", offers=enriched, q=q, sort=sort)

@app.route("/herramientas")
def herramientas():
    return render_template("herramientas.html", active="herramientas")

@app.route("/precios")
def precios():
    plans = [{**p, "monthly_fmt": format_clp(p["monthly"]), "extra_fmt": format_clp(p["extra"])} for p in PLANS]
    return render_template("precios.html", plans=plans, active="precios")

@app.route("/checkout")
def checkout():
    plan_id = request.args.get("plan", "pro")
    selected = next((p for p in PLANS if p["id"] == plan_id), PLANS[1])
    selected = {**selected, "monthly_fmt": format_clp(selected["monthly"]), "extra_fmt": format_clp(selected["extra"])}
    return render_template("checkout.html", plan=selected)

@app.route("/ingresar")
def ingresar():
    return render_template("ingresar.html")

@app.route("/registro")
def registro():
    return render_template("registro.html")

@app.route("/recuperar")
def recuperar():
    return render_template("recuperar.html")

@app.route("/restablecer")
def restablecer():
    return render_template("restablecer.html")

@app.route("/verificar-correo")
def verificar_correo():
    return render_template("verificar_correo.html")

@app.route("/onboarding")
def onboarding():
    return render_template("onboarding.html")

@app.route("/gracias")
def gracias():
    return render_template("gracias.html")

@app.route("/contacto")
def contacto():
    return render_template("contacto.html")

@app.route("/soporte")
def soporte():
    return render_template("soporte.html")

@app.route("/faq")
def faq():
    return render_template("faq.html", faq=FAQ, active="faq")

@app.route("/sobre-nosotros")
def sobre_nosotros():
    return render_template("sobre_nosotros.html")

@app.route("/terminos")
def terminos():
    return render_template("terminos.html")

@app.route("/privacidad")
def privacidad():
    return render_template("privacidad.html")

@app.route("/cookies")
def cookies():
    return render_template("cookies.html")

@app.route("/mantenimiento")
def mantenimiento():
    return render_template("mantenimiento.html")

@app.route("/comprador")
def comprador():
    return render_template("comprador.html")

@app.route("/vendedores/<slug>")
def vendedor(slug):
    seller = get_seller_by_slug(slug)
    if not seller:
        abort(404)
    offers = [enrich_offer(o) for o in offers_by_seller(seller["id"])]
    return render_template("vendedor.html", seller=seller, offers=offers, seller_type_label=SELLER_LABEL.get(seller["type"], ""))

@app.route("/admin")
def admin():
    stats = [
        {"icon": "users", "label": "Vendedores", "value": len(SELLERS), "c": "text-primary"},
        {"icon": "bag", "label": "Ofertas vivas", "value": len(OFFERS), "c": "text-accent"},
        {"icon": "chart", "label": "Leads del mes", "value": 312, "c": "text-chart-2"},
        {"icon": "card", "label": "Ingresos del mes", "value": "$ 4.870.000", "c": "text-primary"},
    ]
    mod_offers = [enrich_offer(o) for o in OFFERS[:4]]
    return render_template("admin.html", stats=stats, mod_offers=mod_offers, sellers=SELLERS)

# ---- Panel routes ----

@app.route("/panel")
def panel_index():
    my_offers = [enrich_offer(o) for o in OFFERS[:3]]
    stats = [
        {"icon": "inbox", "label": "Leads del mes", "value": "27", "trend": "+12%"},
        {"icon": "trending", "label": "Tasa de desbloqueo", "value": "7.1%", "trend": "+0.4 pp"},
        {"icon": "eye", "label": "Vistas totales", "value": "1.840", "trend": "+18%"},
        {"icon": "sparkles", "label": "Plan activo", "value": "Acelera", "trend": "23/50 leads"},
    ]
    return render_template("panel/index.html", my_offers=my_offers, stats=stats, active_panel="resumen")

@app.route("/panel/leads")
def panel_leads():
    return render_template("panel/leads.html", leads=LEADS, active_panel="leads")

@app.route("/panel/oferta")
def panel_oferta():
    enriched = [enrich_offer(o) for o in OFFERS]
    return render_template("panel/oferta.html", offers=enriched, active_panel="oferta")

@app.route("/panel/publicar")
def panel_publicar():
    return render_template("panel/publicar.html", active_panel="publicar")

@app.route("/panel/perfil")
def panel_perfil():
    return render_template("panel/perfil.html", active_panel="perfil")

@app.route("/panel/facturacion")
def panel_facturacion():
    invoices = [{**i, "amount_fmt": format_clp(i["amount"])} for i in INVOICES]
    return render_template("panel/facturacion.html", invoices=invoices, active_panel="facturacion")

@app.route("/panel/notificaciones")
def panel_notificaciones():
    return render_template("panel/notificaciones.html", notifs=NOTIFS, active_panel="notificaciones")

@app.route("/panel/ajustes")
def panel_ajustes():
    return render_template("panel/ajustes.html", active_panel="ajustes")

# ---- API stubs (for JS fetch calls) ----

@app.route("/api/unlocked-offers", methods=["POST"])
def api_unlocked_offers():
    data = request.get_json(force=True, silent=True) or {}
    ids = data.get("ids", [])
    result = []
    for o in OFFERS:
        if o["id"] in ids:
            result.append(enrich_offer(o))
    return jsonify({"offers": result})

@app.route("/api/unlock", methods=["POST"])
def api_unlock():
    return jsonify({"ok": True, "message": "Oferta desbloqueada"})

@app.route("/api/contact", methods=["POST"])
def api_contact():
    return jsonify({"ok": True, "message": "Mensaje enviado"})

@app.route("/api/login", methods=["POST"])
def api_login():
    return jsonify({"ok": True, "redirect": "/panel"})

@app.route("/api/register", methods=["POST"])
def api_register():
    return jsonify({"ok": True, "redirect": "/verificar-correo"})

@app.route("/api/checkout", methods=["POST"])
def api_checkout():
    return jsonify({"ok": True, "redirect": "/gracias"})

@app.route("/api/support", methods=["POST"])
def api_support():
    return jsonify({"ok": True, "message": "Recibido. Te respondemos pronto."})

@app.route("/api/recover", methods=["POST"])
def api_recover():
    return jsonify({"ok": True, "message": "Enlace enviado, revisa tu correo."})

@app.route("/api/reset", methods=["POST"])
def api_reset():
    return jsonify({"ok": True, "redirect": "/ingresar"})

@app.route("/api/publish", methods=["POST"])
def api_publish():
    return jsonify({"ok": True, "redirect": "/panel/oferta"})

@app.route("/api/save-profile", methods=["POST"])
def api_save_profile():
    return jsonify({"ok": True, "message": "Perfil actualizado"})

@app.route("/api/save-settings", methods=["POST"])
def api_save_settings():
    return jsonify({"ok": True, "message": "Ajustes guardados"})

@app.errorhandler(404)
def not_found(e):
    return render_template("404.html"), 404

if __name__ == "__main__":
    app.run(debug=True, port=5000)
