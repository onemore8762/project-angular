import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core'
import { Task, UpdateTaskModel } from '../../../../models/task.models'
import { TaskStatusEnum } from '../../../../../core/enums/taskStatus.enum'

@Component({
  selector: 'tl-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss'],
})
export class TaskComponent {
  @Input() task!: Task
  @Output() removeTaskEvent = new EventEmitter<{ taskId: string; todoId: string }>()
  @Output() changeTaskEvent = new EventEmitter<{
    taskId: string
    todoId: string
    model: UpdateTaskModel
  }>()

  taskStatusEnum = TaskStatusEnum
  newTitle = ''
  editMode = false
  removeTaskHandler() {
    this.removeTaskEvent.emit({ todoId: this.task.todoListId, taskId: this.task.id })
  }
  activateEditMode() {
    this.newTitle = this.task.title
    this.editMode = true
  }

  editTitleHandler() {
    this.changeTask({ title: this.newTitle })
    this.editMode = false
  }

  changeTaskStatusHandler(event: MouseEvent) {
    const newStatus = (event.currentTarget as HTMLInputElement).checked
    this.changeTask({
      status: newStatus ? this.taskStatusEnum.completed : this.taskStatusEnum.active,
    })
  }

  changeTask(patch: Partial<UpdateTaskModel>) {
    const model: UpdateTaskModel = {
      status: this.task.status,
      title: this.task.title,
      completed: this.task.completed,
      startDate: this.task.startDate,
      priority: this.task.priority,
      description: this.task.description,
      deadline: this.task.deadline,
      ...patch,
    }
    this.changeTaskEvent.emit({ todoId: this.task.todoListId, taskId: this.task.id, model })
  }
}
