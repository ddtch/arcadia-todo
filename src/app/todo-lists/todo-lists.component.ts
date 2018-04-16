import { Component, OnInit } from '@angular/core';
import {TodoList} from '../models/todoList';
import {TodosService} from '../services/todos/todos.service';
import {Observable} from 'rxjs/Observable';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-todo-lists',
  templateUrl: './todo-lists.component.html',
  styleUrls: ['./todo-lists.component.scss']
})
export class TodoListsComponent implements OnInit {

  todoListsForm: FormGroup;
  todoLists: Observable<TodoList[]>;

  constructor(private todosService: TodosService,
              private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.todoLists = this.todosService.getTodoLists();

    this.initForm();
  }

  initForm() {
    this.todoListsForm = this.formBuilder.group({
      listTitle: ['', [Validators.required]]
    });
  }

  addNewList(e) {
    e.preventDefault();

    if (!this.todoListsForm.valid) {
      return alert('Enter new list title');
    }

    const controls = this.todoListsForm.controls;

    const newListItem: TodoList = {
      id: Math.random(),
      title: controls.listTitle.value,
      todos: []
    };

    this.todosService.createTodoList(newListItem);
    controls.listTitle.setValue('');
  }

  getUndoneCount = (list: TodoList) => list.todos.filter(todo => !todo.done).length;

}
