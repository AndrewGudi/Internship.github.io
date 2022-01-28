import api from './api'
import { TaskInterface } from '@/types/task.interface'
import axios from 'axios'
import { MethodsType } from '@/constants/enumMethodsType'
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export default function tasksApi () {
  const resourceUrl = 'https://patient-haze-3407.getsandbox.com'
  const stateArrayName = '/tasks'
  const itemAttribute = ''
  // eslint-disable-next-line
  const getFunction = (stateArrayName: any, method: any, commit:any, nameMutation: any) => {
    axios(resourceUrl + stateArrayName, {
      method: method
    })
      .then((response) => {
        commit(nameMutation, response.data)
      })
      .catch((error) => {
        console.log(error)
      })
  }
  // eslint-disable-next-line
  const defaultFunctionForMethods = (stateArrayName: any, itemAttribute: any, method: any, item: any) => {
    axios(resourceUrl + stateArrayName + itemAttribute, {
      method: method,
      data: item
    })
      .catch((error) => {
        console.log(error)
      })
  }
  // eslint-disable-next-line
  const getTasks = (commit: any) => {
    const nameMutation = 'SET_TASKS_TO_VUEX'
    const method = MethodsType.GET
    /* (stateArrayName: any, itemAttribute: any, method: any, object: any, commit:any, nameMutation: any) */
    getFunction(stateArrayName, method, commit, nameMutation)
  }
  // eslint-disable-next-line
  const postTask = (commit: any, item: TaskInterface) => {
    const method = MethodsType.POST
    /* (stateArrayName: any, itemAttribute: any, method: any, object: any, commit:any, nameMutation: any) */
    defaultFunctionForMethods(stateArrayName, itemAttribute, method, item)
  }
  // eslint-disable-next-line
  const deleteTask = (commit: any, item: TaskInterface) => {
    const method = MethodsType.Delete
    /* (stateArrayName: any, itemAttribute: any, method: any, object: any, commit:any, nameMutation: any) */
    defaultFunctionForMethods(stateArrayName, `/${item.id}`, method, item)
  }
  return {
    getTasks,
    postTask,
    deleteTask
  }
}
