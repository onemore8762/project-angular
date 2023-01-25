import { Component, EventEmitter, Input, Output } from '@angular/core'
import { FilterType } from '../../../models/todos.models'

@Component({
  selector: 'tl-todo-filters',
  templateUrl: './todo-filters.component.html',
  styleUrls: ['./todo-filters.component.scss'],
})
export class TodoFiltersComponent {
  @Output() changeFilterEvent = new EventEmitter<FilterType>()
  @Input() filter!: FilterType
  changeFilterHandler(active: FilterType) {
    this.changeFilterEvent.emit(active)
  }
}
