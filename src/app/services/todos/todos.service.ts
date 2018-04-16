import { Injectable } from '@angular/core';
import { TodoList } from '../../models/todoList';
import { Observable } from 'rxjs/Observable';
import { TodoItem } from '../../models/todoItem';
import 'rxjs/add/observable/of';

@Injectable()
export class TodosService {

  todoLists: TodoList[] = [];

  constructor() {}

  public createTodoList(todoList: TodoList) {
    this.todoLists.push(todoList);
  }

  public createTodoItem(todoListId: number, todoItem: TodoItem) {
    const needTodos = this.todoLists.find(list => list.id === todoListId).todos;
    needTodos.push(todoItem);
  }

  public getTodoLists() {
    return Observable.of(this.todoLists);
  }

  public getTodoItems(todoListId: number) {
    return Observable.of(
      this.todoLists.find(list => list.id === todoListId).todos
    );
  }

  public getTodoItem(todoListId: number, todoItemId: number) {
    const needTodos = this.todoLists.find(list => list.id === todoListId).todos;
    return needTodos.find(item => item.id === todoItemId);
  }

}
