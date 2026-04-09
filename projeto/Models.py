from typing import Optional, List
from sqlmodel import Field, SQLModel, Relationship

class Saldo(SQLModel, table=True):
    id: int | None = Field(default=None, primary_key=True)
    saldo: int = Field(default=1000)

class Materia(SQLModel, table=True):
    codigo: Optional[str] = Field(default=None, primary_key=True)
    nome: str
    avaliacoes : List["Avaliacao"] = Relationship(back_populates="materia")

class Avaliacao(SQLModel, table=True):
    id: int | None = Field(default=None, primary_key=True)
    nome : str
    previa : int
    final : int | None = None
    aposta : int
    materia : Optional[Materia] = Relationship(back_populates="avaliacoes")
    codigo: str | None = Field(default=None, foreign_key="materia.codigo")
