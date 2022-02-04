import { TaskInterface } from '@/types/task.interface'
import { tasksApi } from '@/service/tasksApi'
// eslint-disable-next-line
const arraySearch = (state: any, id: any) => {
  // eslint-disable-next-line
  return state.tasks.find((item: TaskInterface) => item.id === id)
}
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
    changeObjectDetails (state: any, updatedTask: TaskInterface): void {
      // eslint-disable-next-line
      const index = state.tasks.findIndex((task: any) => task.id === updatedTask.id)
      if (index !== -1) {
        state.tasks.splice(index, 1, updatedTask)
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
    addItem (state: any, task:any): void {
      state.tasks.push(task)
    },
    // eslint-disable-next-line
    removeItem (state: any,  task: TaskInterface): void {
      // eslint-disable-next-line
      state.tasks = state.tasks.filter((t: any) => task.id !== t.id)
    }
  },
  actions: {
    // eslint-disable-next-line
   getTasks (commit: any) {
      return tasksApi.getTasks()
    },
    // eslint-disable-next-line
    createTask (commit: any, data: any) {
      return tasksApi.createTask(data)
    },
    // eslint-disable-next-line
    updateTask (commit: any, data: any) {
      return tasksApi.updateTask(data)
    },
    // eslint-disable-next-line
    deleteTask (commit:any, id: number){
      return tasksApi.deleteTask(id)
    },
    // eslint-disable-next-line
    async addClassColorTimeTask (context: any, { id, colors }: TaskInterface) {
      context.commit('addClassColorTimeTask', { id: id, colors: colors })
    }
    /*     // eslint-disable-next-line
    async GET_TASKS_FROM_API ({ commit }: any) {
      getTasks(commit)
    },
    // eslint-disable-next-line
    async changeObjectStatus (context: any, { id, status }: TaskInterface) {
      context.commit('changeObjectStatus', { id: id, status: status })
    },
    // eslint-disable-next-line
    async changeObjectDetails ({commit}: any, task: TaskInterface)  {
      putTask(commit, task)
    },
    // eslint-disable-next-line
    async addItem ({commit}: any, task: any) {
      postTask(commit, task)
    },
    // eslint-disable-next-line
    async removeItem  ({commit}: any, task: any) {
      deleteTask(commit, task)
    } */
  },
  getters: {
    // eslint-disable-next-line
    getTasks: (state: any) => state.tasks
  }
}
