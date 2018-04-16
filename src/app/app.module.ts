import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { TodoListsComponent } from './todo-lists/todo-lists.component';
import { TodosService } from './services/todos/todos.service';
import { RouterModule } from '@angular/router';
import { TodoListItemComponent } from './todo-list-item/todo-list-item.component';
import { ReactiveFormsModule} from '@angular/forms';

const routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: '/lists'
  },
  {
    path: 'lists',
    component: TodoListsComponent,
    children: [
      {
        path: ':id',
        component: TodoListItemComponent
      }
    ]
  },
];

@NgModule({
  declarations: [
    AppComponent,
    TodoListsComponent,
    TodoListItemComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    RouterModule.forRoot(routes)
  ],
  providers: [TodosService],
  bootstrap: [AppComponent]
})
export class AppModule { }
