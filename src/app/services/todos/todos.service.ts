import { Injectable } from '@angular/core';
import { TodoList } from '../../models/todoList';
import { Observable } from 'rxjs/Observable';
import { TodoItem } from '../../models/todoItem';
import 'rxjs/add/observable/of';

@Injectable()
export class TodosService {

  todoLists: TodoList[] = [];

  constructor() {}

  private getTodoListById(todoListId: number): TodoList {
    return this.todoLists.find(list => list.id === todoListId);
  }

  public createTodoList(todoListTitle: string) {
    const newListItem: TodoList = {
      id: Math.random(),
      title: todoListTitle,
      todos: []
    };

    this.todoLists.push(newListItem);
  }

  public createTodoItem(todoListId: number, todoItem: TodoItem) {
    const needTodos = this.getTodoListById(todoListId);

    needTodos.todos.push(todoItem);
  }

  public getTodoLists() {
    return Observable.of(this.todoLists);
  }

  public getTodoItems(todoListId: number) {
    const todoList = this.getTodoListById(todoListId);
    return Observable.of(todoList && todoList.todos || []);
  }

  public getTodoItem(todoListId: number, todoItemId: number) {
    const needTodos = this.getTodoListById(todoListId);
    return needTodos.todos.find(item => item.id === todoItemId);
  }

  public todoListExist(todoListId: number) {
    return !!this.getTodoListById(todoListId);
  }

}
