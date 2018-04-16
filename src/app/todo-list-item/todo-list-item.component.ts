import {Component, OnDestroy, OnInit} from '@angular/core';
import {TodoItem} from '../models/todoItem';
import {TodosService} from '../services/todos/todos.service';
import {ActivatedRoute} from '@angular/router';
import {Observable} from 'rxjs/Observable';
import {Subscription} from 'rxjs/Subscription';
import {map, withLatestFrom, startWith} from 'rxjs/operators';
import {Subject} from 'rxjs/Subject';
import {FormBuilder, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-todo-list-item',
  templateUrl: './todo-list-item.component.html',
  styleUrls: ['./todo-list-item.component.scss'],
})
export class TodoListItemComponent implements OnInit, OnDestroy {

  todoFiltersForm: FormGroup;
  todoListId: number;
  todoItems: Observable<TodoItem[]>;
  filteredTodoItems: Observable<TodoItem[]>;
  querySubject: Subject<string>;
  routeSubscription: Subscription;

  constructor(private todosService: TodosService,
              private route: ActivatedRoute,
              private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.initForm();

    this.routeSubscription = this.route.params.subscribe(params => {
      this.todoListId = +params.id;
      this.querySubject = new Subject<string>();
      this.todoItems = this.todosService.getTodoItems(this.todoListId);

      this.filteredTodoItems = this.todoFiltersForm.valueChanges.pipe(
        startWith({
          searchQuery: '',
          doneStatus: 1
        }),
        withLatestFrom(this.todoItems),
        map(([filters, items]) => {
          if (!filters.searchQuery && !!+filters.doneStatus) {
            return items;
          }
          return items.filter(item => !!+filters.doneStatus ?
            item.title.includes(filters.searchQuery) :
            item.title.includes(filters.searchQuery) && item.done === !!+filters.doneStatus
          );
        })
      );
    });
  }

  public toggleDone(todoItemId: number) {
    const todoItem = this.todosService.getTodoItem(this.todoListId, todoItemId);
    todoItem.done = !todoItem.done;
  }

  public addTodoItem(title: string) {
    if (!title) {
      return alert('Enter what to do!');
    }

    const newTodoItem: TodoItem = {
      id: Math.random(),
      title,
      done: false,
    };

    this.todosService.createTodoItem(
      this.todoListId,
      newTodoItem
    );
  }

  public initForm() {
    this.todoFiltersForm = this.formBuilder.group({
      searchQuery:  [''],
      doneStatus: ['']
    });
  }

  ngOnDestroy() {
    this.routeSubscription.unsubscribe();
  }

}
