export interface Todo {
  id: string;
  title: string;
  description: string | null;
  isCompleted: boolean;
  createdAt: string;
  completedAt: string | null;
}

export interface CreateTodo {
  title: string;
  description: string | null;
}

export interface UpdateTodo {
  title: string;
  description: string | null;
}
