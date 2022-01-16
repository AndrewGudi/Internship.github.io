import { StatusType } from '@/constants/enumStatusType'
import { TaskInterface } from '@/types/task.interface'

export default {
  // eslint-disable-next-line
  state: () => ({
    tasks: [
      { status: StatusType.ToDo, id: '0', avatar: 'avatar.png', firstname: 'Darika', lastname: 'Samak', name: 'noname', description: 'Who would you be in the film of your life?', postDate: { date: '1/1/2022', time: '6:02', halfDay: 'PM' }, executeBefore: { date: '1/3/2022', time: '6:02', halfDay: 'PM' } },
      { status: StatusType.Done, id: '1', avatar: 'avatar.png', firstname: 'Emilee', lastname: 'Simchenko', name: 'noname', description: 'Whats your favorite dinosaur?', time: '6:00', postDate: { date: '1/1/2022', time: '6:02', halfDay: 'PM' }, executeBefore: { date: '1/4/2022', time: '6:02', halfDay: 'PM' } },
      { status: StatusType.InProgress, id: '2', avatar: 'avatar.png', firstname: 'Emilee', lastname: 'Simchenko', name: 'noname', description: 'Which of your bad habits are you willing to admit?', postDate: { date: '1/1/2022', time: '6:02', halfDay: 'PM' }, executeBefore: { date: '1/13/2022', time: '6:02', halfDay: 'PM' } }
    ]
  }),
  mutations: {
    // eslint-disable-next-line
    changeObjectStatus (state: any, { id, status }: TaskInterface): void {
      const found = state.tasks.find((item:TaskInterface) => item.id === id)
      if (found) {
        found.status = status
      }
    },
    // eslint-disable-next-line
    changeObjectDetails (state: any, { id, name, description }: TaskInterface): void {
      const found = state.tasks.find((item:TaskInterface) => item.id === id)
      if (found) {
        found.name = name
        found.description = description
      }
    },
    // eslint-disable-next-line
    addClassColorTimeTask (state: any, { id, colors }: TaskInterface): void {
      const found = state.tasks.find((item:TaskInterface) => item.id === id)
      if (found) {
        found.colors = colors
      }
    },
    // eslint-disable-next-line
    addItem (state: any, item:any): void {
      const lastItem = state.tasks[state.tasks.length - 1].id
      const addId = item
      addId.id = String(Number(lastItem) + 1)
      state.tasks.push(addId)
    },
    // eslint-disable-next-line
    removeItem (state: any, { id }: TaskInterface): void {
      const index = state.tasks.findIndex((item:TaskInterface) => item.id === id)
      state.tasks.splice(index, 1)
    }
  },
  actions: {
    // eslint-disable-next-line
    changeObjectStatus (context: any, { id, status }: TaskInterface): void {
      context.commit('changeObjectStatus', { id: id, status: status })
    },
    // eslint-disable-next-line
    changeObjectDetails (context: any, { id, name, description }: TaskInterface): void {
      context.commit('changeObjectDetails', { id: id, name: name, description: description })
    },
    // eslint-disable-next-line
    addClassColorTimeTask (context: any, { id, colors }: TaskInterface): void {
      context.commit('addClassColorTimeTask', { id: id, colors: colors })
    },
    // eslint-disable-next-line
    addItem (context: any, item: any): void {
      context.commit('addItem', item)
    },
    // eslint-disable-next-line
    removeItem (context: any, { id }: TaskInterface): void {
      context.commit('removeItem', { id: id })
    }
  },
  getters: {
    // eslint-disable-next-line
    getTasks: (state: any) => state.tasks
  }
}
