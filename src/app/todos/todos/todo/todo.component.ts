import { Component, EventEmitter, Input, Output } from '@angular/core'
import { Todo } from '../../models/todos.models'

@Component({
  selector: 'tl-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss'],
})
export class TodoComponent {
  isEditMode = false
  newTitle = ''

  @Input() todo!: Todo
  @Output() removeTodoEvent = new EventEmitter<string>()
  @Output() editTodoEvent = new EventEmitter<{ todoId: string; title: string }>()
  removeTodoHandler() {
    this.removeTodoEvent.emit(this.todo.id)
  }
  activateEditModeHandler() {
    this.newTitle = this.todo.title
    this.isEditMode = true
  }

  editTitleHandler() {
    this.isEditMode = false
    console.log(this.newTitle)
    this.editTodoEvent.emit({ todoId: this.todo.id, title: this.newTitle })
  }
}
