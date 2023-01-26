import { Component, Input, OnInit } from '@angular/core'
import { TasksService } from '../../../services/tasks.service'
import { combineLatest, map, Observable } from 'rxjs'
import { Task, UpdateTaskModel } from '../../../models/task.models'
import { TodosService } from '../../../services/todos.service'
import { TaskStatusEnum } from '../../../../core/enums/taskStatus.enum'

@Component({
  selector: 'tl-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss'],
})
export class TasksComponent implements OnInit {
  @Input() todoId!: string

  tasks$?: Observable<Task[]>

  taskTitle = ''

  constructor(private tasksService: TasksService, private todosService: TodosService) {}

  ngOnInit(): void {
    // this.tasks$ = this.tasksService.tasks$.pipe(map(tasks => tasks[this.todoId]))

    this.tasks$ = combineLatest([this.tasksService.tasks$, this.todosService.todos$]).pipe(
      map(res => {
        const tasks = res[0]
        const todos = res[1]
        let taskForTodo = tasks[this.todoId]
        const activeTodo = todos.find(tl => tl.id === this.todoId)
        if (activeTodo?.filter === 'completed') {
          taskForTodo = taskForTodo.filter(t => t.status === TaskStatusEnum.completed)
        }
        if (activeTodo?.filter === 'active') {
          taskForTodo = taskForTodo.filter(t => t.status === TaskStatusEnum.active)
        }
        return taskForTodo
      })
    )
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
