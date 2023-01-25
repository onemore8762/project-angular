import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { environment } from '../../../environments/environment.development'
import { BehaviorSubject, map } from 'rxjs'
import { DomainTask, GetTaskResponse, Task, UpdateTaskModel } from '../models/task.models'
import { CommonResponse } from '../../core/models/core.models'

@Injectable({
  providedIn: 'root',
})
export class TasksService {
  constructor(private http: HttpClient) {}
  tasks$ = new BehaviorSubject<DomainTask>({})
  getTasks(todoId: string) {
    return this.http
      .get<GetTaskResponse>(`${environment.baseUrl}todo-lists/${todoId}/tasks`)
      .pipe(map(res => res.items))
      .subscribe((tasks: Task[]) => {
        const stateTasks = this.tasks$.getValue()
        stateTasks[todoId] = tasks
        this.tasks$.next(stateTasks)
      })
  }
  addTask(data: { todoId: string; title: string }) {
    return this.http
      .post<CommonResponse<{ item: Task }>>(
        `${environment.baseUrl}todo-lists/${data.todoId}/tasks`,
        { title: data.title }
      )
      .pipe(
        map(res => {
          const stateTasks = this.tasks$.getValue()
          const newTask = res.data.item
          stateTasks[data.todoId] = [newTask, ...stateTasks[data.todoId]]
          return stateTasks
        })
      )
      .subscribe((tasks: DomainTask) => this.tasks$.next(tasks))
  }

  removeTask(data: { taskId: string; todoId: string }) {
    return this.http
      .delete<CommonResponse>(
        `${environment.baseUrl}todo-lists/${data.todoId}/tasks/${data.taskId}`
      )
      .pipe(
        map(res => {
          const stateTasks = this.tasks$.getValue()
          stateTasks[data.todoId] = stateTasks[data.todoId].filter(t => t.id !== data.taskId)
          return stateTasks
        })
      )
      .subscribe((tasks: DomainTask) => this.tasks$.next(tasks))
  }

  updateTask(data: { taskId: string; todoId: string; model: UpdateTaskModel }) {
    return this.http
      .put<CommonResponse>(
        `${environment.baseUrl}todo-lists/${data.todoId}/tasks/${data.taskId}`,
        data.model
      )
      .pipe(
        map(() => {
          const stateTasks = this.tasks$.getValue()
          stateTasks[data.todoId] = stateTasks[data.todoId].map(t =>
            t.id === data.taskId ? { ...t, ...data.model } : t
          )
          return stateTasks
        })
      )
      .subscribe((tasks: DomainTask) => this.tasks$.next(tasks))
  }
}
