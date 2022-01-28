import api from './api'
import { TaskInterface } from '@/types/task.interface'
import { MethodsType } from '@/constants/enumMethodsType'
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export default function tasksApi () {
  const stateArrayName = '/tasks'
  const itemAttribute = ''
  const { defaultFunctionForMethods } = api()
  // eslint-disable-next-line
  const getTasks = (commit: any) => {
    const mutations = 'SET_TASKS_TO_VUEX'
    const task = ''
    const method = MethodsType.GET
    /* (stateArrayName: any, itemAttribute: any, method: any, object: any, commit:any, nameMutation: any) */
    defaultFunctionForMethods(stateArrayName, itemAttribute, method, commit, task, mutations)
  }
  // eslint-disable-next-line
  const postTask = (commit: any, task: TaskInterface) => {
    const method = MethodsType.POST
    const mutations = 'addItem'
    /* (stateArrayName: any, itemAttribute: any, method: any, object: any, commit:any, nameMutation: any) */
    defaultFunctionForMethods(stateArrayName, itemAttribute, method, commit, task, mutations)
  }

  // eslint-disable-next-line
  const putTask = (commit: any, task: TaskInterface) => {
    const method = MethodsType.PUT
    const mutations = 'changeObjectDetails'
    /* (stateArrayName: any, itemAttribute: any, method: any, object: any, commit:any, nameMutation: any) */
    defaultFunctionForMethods(stateArrayName, `/${task.id}`, method, commit, task, mutations)
  }
  // eslint-disable-next-line
  const deleteTask = (commit: any, task: TaskInterface) => {
    const method = MethodsType.Delete
    const mutations = 'removeItem'
    /* (stateArrayName: any, itemAttribute: any, method: any, object: any, commit:any, nameMutation: any) */
    defaultFunctionForMethods(stateArrayName, `/${task.id}`, method, commit, task, mutations)
  }
  return {
    getTasks,
    postTask,
    deleteTask,
    putTask
  }
}
