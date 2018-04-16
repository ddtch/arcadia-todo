import {TodoItem} from './todoItem';

export interface TodoList {
  id: number;
  title: string;
  todos: TodoItem[];
}
