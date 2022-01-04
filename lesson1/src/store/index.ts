import { createStore } from 'vuex'
import { StatusType } from '@/constants/enumStatusType'

export default createStore({
  state: {
    images: [
      {
        id: '0',
        src: 'photo1.png'
      },
      {
        id: '1',
        src: 'photo2.png'
      },
      {
        id: '2',
        src: 'photo3.png'
      },
      {
        id: '3',
        src: 'photo4.png'
      }
    ],
    posts: [
      {
        id: '0',
        class: 'item-post',
        icon: 'check',
        name: 'Darika Samak',
        text: ' mark as done Listing on Product Hunt so that we can reach as many potential users',
        time: '8:40',
        halfDay: 'PM'
      },
      {
        id: '1',
        class: 'item-post',
        icon: 'message',
        name: 'Emilee Simchenko',
        text: ' commented on Account for teams and personal in bottom style',
        time: '7:32',
        halfDay: 'PM'
      },
      {
        id: '2',
        class: 'activity__notification',
        text: 'During a project build, it is necessary to evaluate the product design and development against project requirements and outcomes'
      },
      {
        id: '3',
        class: 'item-post',
        icon: 'download',
        name: 'Darika Samak',
        text: ' uploaded 4 files on An option to search in current projects or in all projects',
        time: '6:02',
        halfDay: 'PM'
      }
    ],
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
    ],
    notification: {},
    friends: [
      { id: 0, avatar: 'avatar.png', firstname: 'Darika', lastname: 'Samak' },
      { id: 2, avatar: 'avatar.png', firstname: 'Emilee', lastname: 'Simchenko' },
      { id: 3, avatar: 'avatar.png', firstname: 'Emilee', lastname: 'Gonzales' }
    ],
    currentUser: { avatarka: 'avatarka.jpg', firstname: 'Jean', lastname: 'Gonzales', user: 'Product Owner' }
  },
  getters: {},
  mutations: {
    loadNotification (state, imageId) {
      state.notification = imageId
    },
    changeObjectStatus (state, { id, status }) {
      const found = state.tasks.find(item => item.id === id)
      if (found) {
        found.status = status
      }
    },
    changeObjectDetails (state, { id, name, description }) {
      const found = state.tasks.find(item => item.id === id)
      if (found) {
        found.name = name
        found.description = description
      }
    }
  },
  actions: {
    loadNotification (context, notification) {
      context.commit('loadNotification', notification)
    },
    changeObjectStatus (context, { id, status }) {
      context.commit('changeObjectStatus', { id: id, status: status })
    },
    changeObjectDetails (context, { id, name, description }) {
      context.commit('changeObjectDetails', { id: id, name: name, description: description })
    }
  },
  modules: {
  }
})
