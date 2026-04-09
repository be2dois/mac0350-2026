from fastapi import FastAPI, Request, Form, HTTPException
from fastapi.responses import HTMLResponse
from fastapi.templating import Jinja2Templates
from fastapi.staticfiles import StaticFiles
from Models import Materia, Avaliacao, Saldo
from contextlib import asynccontextmanager
from sqlmodel import SQLModel, create_engine, Session, select, col


arquivo_sqlite = "betnotas.db"
url_sqlite = f"sqlite:///{arquivo_sqlite}"
engine = create_engine(url_sqlite)

def create_db_and_tables():
    SQLModel.metadata.create_all(engine)
    with Session(engine) as session:
        if not session.get(Saldo, 1):
            session.add(Saldo(id=1, saldo=1000))
            session.commit()

@asynccontextmanager
async def lifespan(app: FastAPI):
    create_db_and_tables()
    yield

app = FastAPI(lifespan=lifespan)
templates = Jinja2Templates(directory="Templates")





@app.get("/", response_class=HTMLResponse)
def index(request: Request):
    with Session(engine) as session:
        estado = session.get(Saldo, 1)
        return templates.TemplateResponse(request, "index.html", {"request": request, "saldo": estado.saldo})

@app.get("/editar", response_class=HTMLResponse)
def editar(request: Request):
    return templates.TemplateResponse(request, "options.html")

@app.get("/listaMaterias", response_class=HTMLResponse)
def lista_materias(request: Request, busca: str = "", pagina: int = 1):
    pular = (pagina - 1) * 10
    
    with Session(engine) as session:
        query = select(Materia).where(col(Materia.nome).contains(busca)).order_by(Materia.codigo).offset(pular).limit(11)
        resultados = session.exec(query).all()
        proxima = (len(resultados) > 10)
        materias = resultados[:10]
        return templates.TemplateResponse(request, "listaMaterias.html", {
            "materias": materias, "busca": busca, "pagina": pagina, "proxima": proxima
        })

@app.get("/listaApostas", response_class=HTMLResponse)
def lista_apostas(request: Request, codigo: str, busca: str = "", pagina: int = 1):
    pular = (pagina - 1) * 10
    
    with Session(engine) as session:
        query = (
            select(Avaliacao)
            .where(Avaliacao.codigo == codigo)
            .where(col(Avaliacao.nome).contains(busca))
            .order_by(Avaliacao.nome)
            .offset(pular)
            .limit(11)
        )
        resultados = session.exec(query).all()
        proxima = (len(resultados) > 10)
        apostas = resultados[:10]
        
        return templates.TemplateResponse(request, "listaApostas.html", {
            "apostas": apostas, "codigo": codigo, "busca": busca, "pagina": pagina, "proxima": proxima
        })




@app.post("/novaMateria", response_class=HTMLResponse)
def nova_materia(codigo: str = Form(...), nome: str = Form(...)):
    with Session(engine) as session:
        if session.get(Materia, codigo):
            return f"<p style='color:red;'> Erro: A matéria de codigo {codigo} já está cadastrada!</p>"
            
        nova = Materia(codigo=codigo, nome=nome)
        session.add(nova)
        session.commit()
        return f"<p> Matéria '{nome}' (Código: {codigo}) cadastrada com sucesso!</p>"

@app.post("/apostar", response_class=HTMLResponse)
def apostar(nome: str = Form(...), codigo: str = Form(...), previa: int = Form(...), aposta: int = Form(...)):
    with Session(engine) as session:
        if not session.get(Materia, codigo):
            return f"<p style='color:red;'> Erro: Matéria de codigo '{codigo}' não existe.</p>"
        
        estado = session.get(Saldo, 1)
        if estado.saldo < 0:
            estado.saldo = int(estado.saldo * 1.1)
        estado.saldo -= aposta
        
        nova_aposta = Avaliacao(nome=nome, previa=previa, aposta=aposta, codigo=codigo)
        session.add(nova_aposta)
        session.commit()
        session.refresh(nova_aposta)
        return f"""
            <p>Aposta (ID: {nova_aposta.id}) criada. Você apostou {aposta} que tira {previa} na avaliação {nome}.</p>
            
            <span id="valor-saldo" hx-swap-oob="true">
                {estado.saldo}
            </span>
        """

@app.put("/resolver", response_class=HTMLResponse)
def resolver(id: int = Form(...), final: int = Form(...)):
    with Session(engine) as session:
        avaliacao = session.get(Avaliacao, id)
        if not avaliacao:
            return f"<p style='color:red;'> Erro: Aposta ID {id} não encontrada.</p>"
        
        if avaliacao.final is not None:
            return f"<p style='color:orange;'> A aposta ID {id} já foi resolvida antes.</p>"
            
        estado = session.get(Saldo, 1)

        avaliacao.final = final

        if abs(avaliacao.previa - avaliacao.final) <= 3:
            estado.saldo += 2 * avaliacao.aposta
            
        if estado.saldo < 0:
            estado.saldo = int(estado.saldo * 1.1)
            
        session.add(avaliacao)
        session.add(estado)
        session.commit()
        
        return f"""
            <span id="valor-saldo" hx-swap-oob="true">
                {estado.saldo}
            </span>
        """

@app.delete("/deletarAposta", response_class=HTMLResponse)
def deletar_aposta(id: int = Form(...)):
    with Session(engine) as session:
        avaliacao = session.get(Avaliacao, id)
        if not avaliacao:
            return f"<p style='color:red;'> Erro: Aposta com ID {id} não encontrada.</p>"
            
        session.delete(avaliacao)
        session.commit()
        return "Aposta deletada."

