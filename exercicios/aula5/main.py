from fastapi import Depends, HTTPException, status, Cookie, Response, FastAPI, Request
from fastapi.responses import HTMLResponse, PlainTextResponse
from pydantic import BaseModel
from fastapi.templating import Jinja2Templates
from typing import Annotated

app = FastAPI()

templates = Jinja2Templates(directory="templates")

class Usuario(BaseModel):
    nome: str
    senha: str
    bio: str | None = None 

usuarios : list[Usuario] = []

@app.get("/")
def pagina_cadastro(request: Request):
    return templates.TemplateResponse(request=request, name="index.html")

@app.post("/users")
def criar_usuario(user: Usuario):
    if not user.bio:
        raise HTTPException(status_code=422, detail="Adicione a bio!")
    usuarios.append(user.dict())
    return {"usuario": user.nome}


@app.get("/login")
def pagina_login(request: Request):
    return templates.TemplateResponse(request=request, name="login.html")

@app.post("/login")
def login(username: str, senha: str, response: Response):
    usuario_encontrado = None
    for u in usuarios:
        if u["nome"] == username and u["senha"] == senha:
            usuario_encontrado = u
            break
    
    if not usuario_encontrado:
        raise HTTPException(status_code=404, detail="Usuário não encontrado")
    
    response.set_cookie(key="session_user", value=username)
    return {"message": "Logado com sucesso"}


def get_active_user(session_user: Annotated[str | None, Cookie()] = None):
    if not session_user:
        raise HTTPException(status_code=401, detail="Acesso negado: não logado.")
    
    user = next((u for u in usuarios if u["nome"] == session_user), None)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Acesso negado: você não está logado."
        )
        user = next((u for u in users_db if u["nome"] == session_user), None)
    if not user:
        raise HTTPException(status_code=401, detail="Sessão inválida")
    
    return user

@app.get("/home")
def pagina_home(request: Request, user: dict = Depends(get_active_user)):
    return templates.TemplateResponse(
        request=request, 
        name="home.html", 
        context={"user": user}
    )