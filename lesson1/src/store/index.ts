import { createStore } from 'vuex'

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
      { id: '0', avatar: 'avatar.png', firstname: 'Darika', lastname: 'Samak', name: 'noname', description: 'Who would you be in the film of your life?', time: '6:02', halfDay: 'PM' },
      { id: '1', avatar: 'avatar.png', firstname: 'Emilee', lastname: 'Simchenko', name: 'noname', description: 'Whats your favorite dinosaur?', time: '6:02', halfDay: 'PM' },
      { id: '2', avatar: 'avatar.png', firstname: 'Emilee', lastname: 'Simchenko', name: 'noname', description: 'Which of your bad habits are you willing to admit?', time: '6:02', halfDay: 'PM' },
      { id: '3', avatar: 'avatar.png', firstname: 'Darika', lastname: 'Samak', name: 'noname', description: 'If you could only eat one food for the rest of your life, what would it be?', time: '6:02', halfDay: 'PM' },
      { id: '4', avatar: 'avatar.png', firstname: 'Darika', lastname: 'Samak', name: 'noname', description: 'Would you rather own a dragon or be a dragon?', time: '6:02', halfDay: 'PM' },
      { id: '5', avatar: 'avatar.png', firstname: 'Emilee', lastname: 'Simchenko', name: 'noname', description: 'Whats your WiFi password?', time: '6:02', halfDay: 'PM' },
      { id: '6', avatar: 'avatar.png', firstname: 'Darika', lastname: 'Samak', name: 'noname', description: 'If you could do anything in the world in terms of your career, what would you choose?', time: '6:02', halfDay: 'PM' },
      { id: '7', avatar: 'avatar.png', firstname: 'Darika', lastname: 'Samak', name: 'noname', description: 'Which Pokemon would you choose: Bulbasaur, Squirtle or Charmander?', time: '6:02', halfDay: 'PM' },
      { id: '8', avatar: 'avatar.png', firstname: 'Emilee', lastname: 'Simchenko', name: 'noname', description: 'What is your favorite animal in the world?', time: '6:02', halfDay: 'PM' },
      { id: '9', avatar: 'avatar.png', firstname: 'Emilee', lastname: 'Simchenko', name: 'noname', description: 'If you could have some kind of superpower, what would it be and why?', time: '6:02', halfDay: 'PM' },
      { id: '10', avatar: 'avatar.png', firstname: 'Emilee', lastname: 'Simchenko', name: 'noname', description: 'Whats your WiFi password?', time: '6:02', halfDay: 'PM' }
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
    loadNotification (state, payload) {
      state.notification = payload
    }
  },
  actions: {
    loadNotification (context, notification) {
      context.commit('loadNotification', notification)
    }
  },
  modules: {
  }
})
