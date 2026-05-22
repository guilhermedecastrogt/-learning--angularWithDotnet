import { Component, input, output, signal, effect } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Todo } from '../../models/todo.model';

@Component({
  selector: 'app-todo-form',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './todo-form.html',
})
export class TodoFormComponent {
  editingTodo = input<Todo | null>(null);
  submitted = output<{ title: string; description: string | null }>();
  cancelled = output<void>();

  title = signal('');
  description = signal('');

  constructor() {
    effect(() => {
      const todo = this.editingTodo();
      this.title.set(todo?.title ?? '');
      this.description.set(todo?.description ?? '');
    });
  }

  onSubmit() {
    const title = this.title().trim();
    if (!title) return;
    this.submitted.emit({ title, description: this.description().trim() || null });
    this.title.set('');
    this.description.set('');
  }

  onCancel() {
    this.cancelled.emit();
    this.title.set('');
    this.description.set('');
  }
}
