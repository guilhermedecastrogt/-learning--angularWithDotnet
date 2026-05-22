# Todo App — Full Stack Study (.NET + Angular)

A study project to explore the integration between **ASP.NET Core Web API** and **Angular**, applying **Domain-Driven Design (DDD)** concepts in a simple to-do list CRUD application.

## Goal

Understand in practice how .NET and Angular communicate over HTTP, how to organize a backend using DDD layers, and how to consume a REST API in Angular with `HttpClient`.

## Stack

- **Backend:** ASP.NET Core 8 Web API + Entity Framework Core (InMemory)
- **Frontend:** Angular 19 (standalone components, signals)
- **Architecture:** Domain-Driven Design (Domain / Application / Infrastructure / API)

## Project Structure

```
backend/
  TodoApp.Domain/         # Entities and repository interfaces
  TodoApp.Application/    # DTOs and application services
  TodoApp.Infrastructure/ # EF Core + repository implementation
  TodoApp.API/            # Controllers and API setup

frontend/todo-app/
  src/app/
    models/               # TypeScript interfaces
    services/             # TodoService with HttpClient
    components/
      todo-form/          # Create and edit form
      todo-list/          # List with all CRUD operations
```

## Running the Project

### Backend (port 5000)

```bash
cd backend
dotnet run --project TodoApp.API/TodoApp.API.csproj --urls http://localhost:5000
```

### Frontend (port 4200)

```bash
cd frontend/todo-app
npm install
npx ng serve
```

Open: [http://localhost:4200](http://localhost:4200)

## API Endpoints

| Method | Route | Action |
|--------|-------|--------|
| GET | `/api/todo` | List all tasks |
| GET | `/api/todo/{id}` | Get by ID |
| POST | `/api/todo` | Create task |
| PUT | `/api/todo/{id}` | Update task |
| PATCH | `/api/todo/{id}/toggle` | Toggle completed status |
| DELETE | `/api/todo/{id}` | Delete task |

## Concepts Covered

- Layer separation with DDD (Domain, Application, Infrastructure, API)
- Rich domain entity with encapsulated behavior
- Dependency inversion with interfaces and dependency injection
- HTTP communication between Angular and .NET with CORS
- Signals and standalone components in Angular 19
