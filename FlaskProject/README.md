# Mi Auto Sustentable — FlaskProject

Estructura minima Flask con templates HTML5 autocontenidos y un CSS monolitico.

## Estructura
```
FlaskProject/
  app.py
  requirements.txt
  templates/         # 1 archivo HTML5 por pagina (sin Jinja blocks)
    index.html
    oferta.html
    oferta_detalle.html
    ...
    panel/
      index.html
      leads.html
      ...
    404.html
  static/
    styles.css       # CSS monolitico (Tailwind expandido + tokens semanticos)
    scripts.js
    tools.js
    img/             # imagenes (hero, ofertas, etc.)
```

## Correr
```
pip install -r requirements.txt
python app.py
# http://127.0.0.1:5000
```

Cada ruta en `app.py` simplemente lee y devuelve el HTML correspondiente.
Cuando agregues datos dinamicos, reemplaza `serve("x.html")` por
`render_template("x.html", **context)` y conviertelo a plantilla Jinja.
