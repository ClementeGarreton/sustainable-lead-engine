"""
Mi Auto Sustentable — Flask preview (HTML5 estatico).

Cada template en /templates es un archivo HTML5 autocontenido (sin Jinja blocks).
El CSS monolitico vive en /static/styles.css y las imagenes en /static/img/.
Esta app simplemente sirve cada plantilla por su URL — no usa render_template
para inyectar datos. Si despues necesitas datos dinamicos, reemplaza send_from_directory
por render_template y agrega los context dicts.
"""
from flask import Flask, send_from_directory, abort
from pathlib import Path

app = Flask(__name__, static_folder="static", template_folder="templates")
TPL = Path(app.template_folder)


def serve(name: str):
    path = TPL / name
    if not path.exists():
        abort(404)
    return path.read_text(encoding="utf-8")


# ---------- Paginas publicas ----------
@app.route("/")
def home(): return serve("index.html")

@app.route("/oferta")
def oferta(): return serve("oferta.html")

@app.route("/oferta/<slug>")
def oferta_detalle(slug): return serve("oferta_detalle.html")

@app.route("/categorias")
def categorias(): return serve("categorias.html")

@app.route("/categorias/<slug>")
def categoria_detalle(slug): return serve("categoria_detalle.html")

@app.route("/buscar")
def buscar(): return serve("buscar.html")

@app.route("/herramientas")
def herramientas(): return serve("herramientas.html")

@app.route("/precios")
def precios(): return serve("precios.html")

@app.route("/checkout")
def checkout(): return serve("checkout.html")

@app.route("/ingresar")
def ingresar(): return serve("ingresar.html")

@app.route("/registro")
def registro(): return serve("registro.html")

@app.route("/recuperar")
def recuperar(): return serve("recuperar.html")

@app.route("/restablecer")
def restablecer(): return serve("restablecer.html")

@app.route("/verificar-correo")
def verificar_correo(): return serve("verificar_correo.html")

@app.route("/onboarding")
def onboarding(): return serve("onboarding.html")

@app.route("/gracias")
def gracias(): return serve("gracias.html")

@app.route("/contacto")
def contacto(): return serve("contacto.html")

@app.route("/soporte")
def soporte(): return serve("soporte.html")

@app.route("/faq")
def faq(): return serve("faq.html")

@app.route("/sobre-nosotros")
def sobre_nosotros(): return serve("sobre_nosotros.html")

@app.route("/terminos")
def terminos(): return serve("terminos.html")

@app.route("/privacidad")
def privacidad(): return serve("privacidad.html")

@app.route("/cookies")
def cookies(): return serve("cookies.html")

@app.route("/mantenimiento")
def mantenimiento(): return serve("mantenimiento.html")

@app.route("/comprador")
def comprador(): return serve("comprador.html")

@app.route("/vendedores/<slug>")
def vendedor(slug): return serve("vendedor.html")

@app.route("/admin")
def admin(): return serve("admin.html")


# ---------- Panel vendedor ----------
@app.route("/panel")
def panel_index(): return serve("panel/index.html")

@app.route("/panel/leads")
def panel_leads(): return serve("panel/leads.html")

@app.route("/panel/oferta")
def panel_oferta(): return serve("panel/oferta.html")

@app.route("/panel/publicar")
def panel_publicar(): return serve("panel/publicar.html")

@app.route("/panel/perfil")
def panel_perfil(): return serve("panel/perfil.html")

@app.route("/panel/facturacion")
def panel_facturacion(): return serve("panel/facturacion.html")

@app.route("/panel/notificaciones")
def panel_notificaciones(): return serve("panel/notificaciones.html")

@app.route("/panel/ajustes")
def panel_ajustes(): return serve("panel/ajustes.html")


@app.errorhandler(404)
def not_found(_): return serve("404.html"), 404


if __name__ == "__main__":
    app.run(host="127.0.0.1", port=5000, debug=True)
