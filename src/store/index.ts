import { createStore } from 'vuex'
import moduleTasks from '@/store/modules/moduleTasks'
import VuexPersist from 'vuex-persist'

const vuexPersist = new VuexPersist({
  key: 'my-app',
  storage: window.localStorage
})

export default createStore({
  plugins: [vuexPersist.plugin],
  state: {
    images: [
      {
        id: '0',
        src: 'photo1.png',
        name: 'city'
      },
      {
        id: '1',
        src: 'photo2.png',
        name: 'sea'
      },
      {
        id: '2',
        src: 'photo3.png',
        name: 'forest'
      },
      {
        id: '3',
        src: 'photo4.png',
        name: 'sea spit'
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
    notification: { id: 3 },
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
      state.notification.id = imageId
    }
  },
  actions: {
    loadNotification (context, notification) {
      context.commit('loadNotification', notification)
    }
  },
  modules: {
    moduleTasks
  }
})
