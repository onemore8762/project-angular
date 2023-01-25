import { Component, Input, OnInit } from '@angular/core'
import { TasksService } from '../../../services/tasks.service'
import { map, Observable } from 'rxjs'
import { Task, UpdateTaskModel } from '../../../models/task.models'

@Component({
  selector: 'tl-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss'],
})
export class TasksComponent implements OnInit {
  @Input() todoId!: string

  tasks$?: Observable<Task[]>

  taskTitle = ''

  constructor(private tasksService: TasksService) {}

  ngOnInit(): void {
    this.tasks$ = this.tasksService.tasks$.pipe(map(tasks => tasks[this.todoId]))
    this.tasksService.getTasks(this.todoId)
  }

  addTaskHandler() {
    this.tasksService.addTask({ title: this.taskTitle, todoId: this.todoId })
    this.taskTitle = ''
  }

  removeTask(data: { taskId: string; todoId: string }) {
    this.tasksService.removeTask(data)
  }
  changeTask(data: { taskId: string; todoId: string; model: UpdateTaskModel }) {
    this.tasksService.updateTask(data)
  }
}
