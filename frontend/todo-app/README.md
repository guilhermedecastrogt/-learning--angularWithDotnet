# Todo App — Estudo Full Stack (.NET + Angular)

Projeto de estudo para explorar a integração entre **ASP.NET Core Web API** e **Angular**, aplicando os conceitos de **Domain-Driven Design (DDD)** em um CRUD simples de lista de tarefas.

## Objetivo

Entender na prática como o .NET e o Angular se comunicam via HTTP, como organizar um backend com DDD em camadas, e como consumir uma API REST no Angular usando `HttpClient`.

## Stack

- **Backend:** ASP.NET Core 8 Web API + Entity Framework Core (InMemory)
- **Frontend:** Angular 19 (standalone components, signals)
- **Arquitetura:** Domain-Driven Design (Domain / Application / Infrastructure / API)

## Estrutura do Projeto

```
backend/
  TodoApp.Domain/         # Entidades e interfaces de repositório
  TodoApp.Application/    # DTOs e serviços de aplicação
  TodoApp.Infrastructure/ # EF Core + implementação do repositório
  TodoApp.API/            # Controllers e configuração da API

frontend/todo-app/
  src/app/
    models/               # Interfaces TypeScript
    services/             # TodoService com HttpClient
    components/
      todo-form/          # Formulário de criação e edição
      todo-list/          # Lista com todas as operações
```

## Como rodar

### Backend (porta 5000)

```bash
cd backend
dotnet run --project TodoApp.API/TodoApp.API.csproj --urls http://localhost:5000
```

### Frontend (porta 4200)

```bash
cd frontend/todo-app
npm install
npx ng serve
```

Acesse: [http://localhost:4200](http://localhost:4200)

## Endpoints da API

| Método | Rota | Ação |
|--------|------|------|
| GET | `/api/todo` | Listar todas as tarefas |
| GET | `/api/todo/{id}` | Buscar por ID |
| POST | `/api/todo` | Criar tarefa |
| PUT | `/api/todo/{id}` | Atualizar tarefa |
| PATCH | `/api/todo/{id}/toggle` | Marcar/desmarcar como concluída |
| DELETE | `/api/todo/{id}` | Excluir tarefa |

## Conceitos estudados

- Separação de responsabilidades em camadas (DDD)
- Entidade rica com comportamentos encapsulados
- Inversão de dependência com interfaces e injeção de dependência
- Comunicação HTTP entre Angular e .NET com CORS configurado
- Signals e standalone components no Angular 19
