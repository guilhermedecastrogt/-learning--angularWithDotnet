import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Todo, CreateTodo, UpdateTodo } from '../models/todo.model';

@Injectable({ providedIn: 'root' })
export class TodoService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = 'http://localhost:5000/api/todo';

  getAll(): Observable<Todo[]> {
    return this.http.get<Todo[]>(this.baseUrl);
  }

  create(dto: CreateTodo): Observable<Todo> {
    return this.http.post<Todo>(this.baseUrl, dto);
  }

  update(id: string, dto: UpdateTodo): Observable<Todo> {
    return this.http.put<Todo>(`${this.baseUrl}/${id}`, dto);
  }

  toggle(id: string): Observable<Todo> {
    return this.http.patch<Todo>(`${this.baseUrl}/${id}/toggle`, {});
  }

  delete(id: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
