import { serviceApi } from '@/service/api'
import { TaskInterface } from '@/types/task.interface'

export const tasksApi = {
  // eslint-disable-next-line
  getTasks () {
    return serviceApi.get('tasks')
  },
  // eslint-disable-next-line
  createTask (data: TaskInterface) {
    return serviceApi.post('tasks', data)
  },
  // eslint-disable-next-line
  updateTask (data: TaskInterface) {
    return serviceApi.put('tasks/' + data.id, data)
  },
  // eslint-disable-next-line
  deleteTask (id: number) {
    return serviceApi.delete('tasks/' + id)
  }
}
