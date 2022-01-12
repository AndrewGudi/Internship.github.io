import { StatusType } from '@/constants/enumStatusType'
import { TaskInterface } from '@/types/task.interface'

export default {
  state: () => ({
    tasks: [
      { status: StatusType.ToDo, id: '0', avatar: 'avatar.png', firstname: 'Darika', lastname: 'Samak', name: 'noname', description: 'Who would you be in the film of your life?', postDate: { date: '1/1/2022', time: '6:02', halfDay: 'PM' }, executeBefore: { date: '1/3/2022', time: '6:02', halfDay: 'PM' } },
      { status: StatusType.Done, id: '1', avatar: 'avatar.png', firstname: 'Emilee', lastname: 'Simchenko', name: 'noname', description: 'Whats your favorite dinosaur?', time: '6:00', postDate: { date: '1/1/2022', time: '6:02', halfDay: 'PM' }, executeBefore: { date: '1/4/2022', time: '6:02', halfDay: 'PM' } },
      { status: StatusType.InProgress, id: '2', avatar: 'avatar.png', firstname: 'Emilee', lastname: 'Simchenko', name: 'noname', description: 'Which of your bad habits are you willing to admit?', postDate: { date: '1/1/2022', time: '6:02', halfDay: 'PM' }, executeBefore: { date: '1/13/2022', time: '6:02', halfDay: 'PM' } },
      { status: StatusType.InProgress, id: '3', avatar: 'avatar.png', firstname: 'Darika', lastname: 'Samak', name: 'noname', description: 'If you could only eat one food for the rest of your life, what would it be?', postDate: { date: '1/1/2022', time: '6:02', halfDay: 'PM' }, executeBefore: { date: '1/14/2022', time: '6:02', halfDay: 'PM' } },
      { status: StatusType.ToDo, id: '4', avatar: 'avatar.png', firstname: 'Darika', lastname: 'Samak', name: 'noname', description: 'Would you rather own a dragon or be a dragon?', postDate: { date: '1/1/2022', time: '6:02', halfDay: 'PM' }, executeBefore: { date: '1/15/2022', time: '6:02', halfDay: 'PM' } },
      { status: StatusType.Done, id: '5', avatar: 'avatar.png', firstname: 'Emilee', lastname: 'Simchenko', name: 'noname', description: 'Whats your WiFi password?', postDate: { date: '1/1/2022', time: '6:02', halfDay: 'PM' }, executeBefore: { date: '1/21/2022', time: '6:02', halfDay: 'PM' } },
      { status: StatusType.ToDo, id: '6', avatar: 'avatar.png', firstname: 'Darika', lastname: 'Samak', name: 'noname', description: 'If you could do anything in the world in terms of your career, what would you choose?', postDate: { date: '1/1/2022', time: '6:02', halfDay: 'PM' }, executeBefore: { date: '1/16/2022', time: '6:02', halfDay: 'PM' } },
      { status: StatusType.InProgress, id: '7', avatar: 'avatar.png', firstname: 'Darika', lastname: 'Samak', name: 'noname', description: 'Which Pokemon would you choose: Bulbasaur, Squirtle or Charmander?', postDate: { date: '1/1/2022', time: '6:02', halfDay: 'PM' }, executeBefore: { date: '1/17/2022', time: '6:02', halfDay: 'PM' } },
      { status: StatusType.InProgress, id: '8', avatar: 'avatar.png', firstname: 'Emilee', lastname: 'Simchenko', name: 'noname', description: 'What is your favorite animal in the world?', time: '6:01', postDate: { date: '1/1/2022', time: '6:02', halfDay: 'PM' }, executeBefore: { date: '1/18/2022', time: '6:02', halfDay: 'PM' } },
      { status: StatusType.ToDo, id: '9', avatar: 'avatar.png', firstname: 'Emilee', lastname: 'Simchenko', name: 'noname', description: 'If you could have some kind of superpower, what would it be and why?', postDate: { date: '1/1/2022', time: '6:02', halfDay: 'PM' }, executeBefore: { date: '1/19/2022', time: '6:02', halfDay: 'PM' } },
      { status: StatusType.ToDo, id: '10', avatar: 'avatar.png', firstname: 'Emilee', lastname: 'Simchenko', name: 'noname', description: 'Whats your WiFi password?', postDate: { timeInSeconds: '', date: '1/1/2022', time: '6:02', halfDay: 'PM' }, executeBefore: { date: '1/20/2022', time: '6:02', halfDay: 'PM' } }
    ]
  }),
  mutations: {
    changeObjectStatus (state: any, { id, status }: TaskInterface) {
      const found = state.tasks.find((item:TaskInterface) => item.id === id)
      if (found) {
        found.status = status
      }
    },
    changeObjectDetails (state: any, { id, name, description }: TaskInterface) {
      const found = state.tasks.find((item:TaskInterface) => item.id === id)
      if (found) {
        found.name = name
        found.description = description
      }
    }
  },
  actions: {
    async changeObjectStatus (context: any, { id, status }: TaskInterface) {
      context.commit('changeObjectStatus', { id: id, status: status })
    },
    async changeObjectDetails (context: any, { id, name, description }: TaskInterface) {
      context.commit('changeObjectDetails', { id: id, name: name, description: description })
    }
  },
  getters: {
    getTasks: (state: any) => state.tasks
  }
}
