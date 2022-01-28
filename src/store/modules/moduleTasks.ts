import { TaskInterface } from '@/types/task.interface'
import tasksApi from '@/service/tasksApi'
import axios from 'axios'
// eslint-disable-next-line
const arraySearch = (state: any, id: any) => {
  // eslint-disable-next-line
  const found: any = state.tasks.find((item:TaskInterface) => item.id === id)
  return found
}
const { getTasks, postTask, deleteTask } = tasksApi()
export default {
  // eslint-disable-next-line
  state: () => ({
    tasks: []
  }),
  mutations: {
    // eslint-disable-next-line
    SET_TASKS_TO_VUEX: (state: any, tasks: any): void => {
      state.tasks = tasks
    },
    // eslint-disable-next-line
    changeObjectStatus (state: any, { id, status }: TaskInterface): void {
      const found = arraySearch(state, id)
      if (found) {
        found.status = status
      }
    },
    // eslint-disable-next-line
    changeObjectDetails (state: any, { id, name, description }: TaskInterface): void {
      const found = arraySearch(state, id)
      if (found) {
        found.name = name
        found.description = description
      }
    },
    // eslint-disable-next-line
    addClassColorTimeTask (state: any, { id, colors }: TaskInterface): void {
      const found = arraySearch(state, id)
      if (found) {
        found.colors = colors
      }
    },
    // eslint-disable-next-line
    addItem (state: any, item:any): void {
      const lastItem = state.tasks.length
      const addId = item
      addId.id = Number(lastItem) + 1
      state.tasks.push(addId)
    },
    // eslint-disable-next-line
    removeItem (state: any,  task: TaskInterface): void {
      // eslint-disable-next-line
      state.tasks = state.tasks.filter((t: any) => task.id !== t.id)
    }
  },
  actions: {
    // eslint-disable-next-line
    async GET_TASKS_FROM_API ({ commit }: any) {
      getTasks(commit)
    },
    // eslint-disable-next-line
    async changeObjectStatus (context: any, { id, status }: TaskInterface) {
      context.commit('changeObjectStatus', { id: id, status: status })
    },
    // eslint-disable-next-line
    async changeObjectDetails (context: any, { id, name, description }: TaskInterface) {
      context.commit('changeObjectDetails', { id: id, name: name, description: description })
    },
    // eslint-disable-next-line
    async addClassColorTimeTask (context: any, { id, colors }: TaskInterface) {
      context.commit('addClassColorTimeTask', { id: id, colors: colors })
    },
    // eslint-disable-next-line
    async addItem ({commit}: any, item: any) {
      commit('addItem', item)
      postTask(commit, item)
    },
    // eslint-disable-next-line
    async removeItem  ({commit}: any, task: any) {
      commit('removeItem', task)
      deleteTask(commit, task)
    }
  },
  getters: {
    // eslint-disable-next-line
    getTasks: (state: any) => state.tasks
  }
}
