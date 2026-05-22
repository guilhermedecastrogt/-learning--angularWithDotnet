import { Component } from '@angular/core';
import { TodoListComponent } from './components/todo-list/todo-list';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [TodoListComponent],
  template: '<app-todo-list />',
})
export class App {}
