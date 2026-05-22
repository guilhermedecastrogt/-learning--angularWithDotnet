import { Component, inject, signal, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { TodoService } from '../../services/todo.service';
import { Todo } from '../../models/todo.model';
import { TodoFormComponent } from '../todo-form/todo-form';

@Component({
  selector: 'app-todo-list',
  standalone: true,
  imports: [DatePipe, TodoFormComponent],
  templateUrl: './todo-list.html',
})
export class TodoListComponent implements OnInit {
  private readonly todoService = inject(TodoService);

  todos = signal<Todo[]>([]);
  editingTodo = signal<Todo | null>(null);
  loading = signal(false);
  error = signal<string | null>(null);

  ngOnInit() {
    this.load();
  }

  load() {
    this.loading.set(true);
    this.error.set(null);
    this.todoService.getAll().subscribe({
      next: (items) => {
        this.todos.set(items);
        this.loading.set(false);
      },
      error: () => {
        this.error.set('Erro ao carregar tarefas. Verifique se a API está rodando.');
        this.loading.set(false);
      },
    });
  }

  onCreate(data: { title: string; description: string | null }) {
    this.todoService.create(data).subscribe({
      next: (item) => this.todos.update((list) => [item, ...list]),
      error: () => this.error.set('Erro ao criar tarefa.'),
    });
  }

  onUpdate(data: { title: string; description: string | null }) {
    const todo = this.editingTodo();
    if (!todo) return;

    this.todoService.update(todo.id, data).subscribe({
      next: (updated) => {
        this.todos.update((list) => list.map((t) => (t.id === updated.id ? updated : t)));
        this.editingTodo.set(null);
      },
      error: () => this.error.set('Erro ao atualizar tarefa.'),
    });
  }

  onToggle(id: string) {
    this.todoService.toggle(id).subscribe({
      next: (updated) =>
        this.todos.update((list) => list.map((t) => (t.id === updated.id ? updated : t))),
      error: () => this.error.set('Erro ao atualizar status.'),
    });
  }

  onDelete(id: string) {
    this.todoService.delete(id).subscribe({
      next: () => this.todos.update((list) => list.filter((t) => t.id !== id)),
      error: () => this.error.set('Erro ao deletar tarefa.'),
    });
  }

  startEdit(todo: Todo) {
    this.editingTodo.set(todo);
  }

  cancelEdit() {
    this.editingTodo.set(null);
  }

  get pending() {
    return this.todos().filter((t) => !t.isCompleted).length;
  }
}
