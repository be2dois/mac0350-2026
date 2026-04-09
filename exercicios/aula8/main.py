from fastapi import FastAPI, Request
from fastapi.responses import HTMLResponse
from fastapi.templating import Jinja2Templates

app = FastAPI()

templates = Jinja2Templates(directory=["Templates", "Templates/Partials"])

curtidas = 0
paginas = ["pagina1", "pagina2", "curtidas"]
pagina_atual = 0

@app.get("/home",response_class=HTMLResponse)
async def root(request: Request):
    global pagina_atual
    pagina_atual = 0
    return templates.TemplateResponse(request, "index.html", {"pagina": "/home  /pagina1"})

@app.get("/home/pagina1", response_class=HTMLResponse)
async def pag1(request: Request):
    global pagina_atual
    pagina_atual = 0
    if (not "HX-Request" in request.headers):
        return templates.TemplateResponse(request, "index.html", {"pagina": "/home/pagina1"})
    return templates.TemplateResponse(request, "Pagina1.html")

@app.get("/home/pagina2", response_class=HTMLResponse)
async def pag2(request: Request):
    global pagina_atual
    pagina_atual = 1
    if (not "HX-Request" in request.headers):
        return templates.TemplateResponse(request, "index.html", {"pagina": "/home/pagina2"})
    return templates.TemplateResponse(request, "Pagina2.html")

@app.get("/home/curtidas", response_class=HTMLResponse)
async def pag3(request: Request):
    global pagina_atual
    pagina_atual = 2
    if (not "HX-Request" in request.headers):
        return templates.TemplateResponse(request, "index.html", {"pagina": "/home/curtidas"})
    return templates.TemplateResponse(request, "Curtidas.html", {"curtidas": curtidas})

@app.post("/curtir", response_class=HTMLResponse)
async def curtir():
    global curtidas
    curtidas += 1
    return str(curtidas)

@app.delete("/curtir", response_class=HTMLResponse)
async def zerar_curtidas():
    global curtidas
    curtidas = 0
    return str(curtidas)


@app.get("/home/atalho", response_class=HTMLResponse)
async def proxima_pagina(request: Request):
    global pagina_atual
    pagina_atual = (pagina_atual + 1) % 3
    
    nova_pagina = paginas[pagina_atual]
    novo_arquivo = nova_pagina.capitalize() + ".html"

    resposta = templates.TemplateResponse(request, novo_arquivo, {"curtidas": curtidas})
    
    resposta.headers["HX-Push-Url"] = f"/home/{nova_pagina}"
    return resposta
