import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'

import { TodosRoutingModule } from './todos-routing.module'
import { TodosComponent } from './todos/todos.component'
import { TodoComponent } from './todos/todo/todo.component'
import { FormsModule } from '@angular/forms';
import { TasksComponent } from './todos/todo/tasks/tasks.component';
import { TaskComponent } from './todos/todo/tasks/task/task.component';
import { TodoFiltersComponent } from './todos/todo/todo-filters/todo-filters.component';
import { TodoFooterComponent } from './todos/todo/todo-footer/todo-footer.component'

@NgModule({
  declarations: [TodosComponent, TodoComponent, TasksComponent, TaskComponent, TodoFiltersComponent, TodoFooterComponent],
  imports: [CommonModule, TodosRoutingModule, FormsModule],
})
export class TodosModule {}
