<template lang="pug">
clean-page
  .tasks__column
    .tasks__row
      .tasks__open-tasks Open Tasks
      .tasks__buttons
        button.tasks__input-button-add(@click="scrollToTop" v-if="tasks.length > 4" ) UP
        button.tasks__input-button-add(:class="{'active': showWindow}" @click="showWindow = !showWindow") ADD
    .tasks__completed(v-if="tasks.length===0") Sorry, but all tasks have already been completed.
    .tasks__new-tasks#container
      transition-group(name="list")
          task(
            v-for="(task, index) in reversedTasks"
            class="list-item"
            v-bind:task="task"
            v-bind:index="index"
            :key="task.id"
            v-bind:currentUser="currentUser"
            @deleteEvent="deleteEvent"
            )
    form.tasks__input(@submit="checkForm" v-if="showWindow" autocomplete="on")
      .task__avatar
        img.avatar(:src="`/images/${currentUser.avatarka}`", alt="Фото профиля")
      .task__user
        p {{currentUser.firstname}} {{currentUser.lastname}}
      .tasks__input-block
        textarea#name.tasks__task-name(v-model="name" type="text" name="name" placeholder="Task name" maxlength = "100")
        .error {{errorName}}
        textarea#description.tasks__task-description(v-model="description" type="text" name="description" placeholder="Task description" maxlength = "100")
        .error {{errorDescription}}
      button.tasks__input-button-send(@click="scrollToTop") SEND
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import Task from '@/components/Layout/Content/Tasks/Task.vue'
import { mapState } from 'vuex'
import CleanPage from '@/components/Layout/Content/CleanPage.vue'
import 'animate.css'

export default defineComponent({
  components: {
    CleanPage,
    Task
  },
  mounted () {
    const lineItem = document.querySelectorAll('.list-item')
    lineItem.forEach((item, index: number) => {
      setTimeout(() => {
        item.classList.add('animate-grow')
        function handleAnimationEnd (event: Event) {
          event.stopPropagation()
          item.classList.remove('animate-grow')
        }
        item.addEventListener('animationend', handleAnimationEnd, { once: true })
      }, 1000 * (index + 1))
    })
  },
  computed: {
    ...mapState(['tasks', 'currentUser']),
    reversedTasks (): string {
      return this.tasks.slice().reverse()
    }
  },
  data () {
    return {
      errorName: '',
      errorDescription: '',
      name: '',
      id: Number,
      description: '',
      showWindow: false
    }
  },
  methods: {
    checkForm: function (e: Event) {
      this.errorName = ''
      this.errorDescription = ''
      if (!this.name) {
        this.errorName = 'Task name required.'
      }
      if (!this.description) {
        this.errorDescription = 'Task description required.'
      }
      if (this.errorName && this.errorDescription) {
        return
      }
      if (this.name && this.description) {
        const Data = new Date()
        let Hour = Data.getHours()
        const Hours = Data.getHours()
        const HalfDay = Hours >= 12 ? 'PM' : 'AM'
        let Minutes: string|number = Data.getMinutes()
        Hour = Hour % 12
        Minutes = Minutes < 10 ? '0' + Minutes : Minutes
        this.tasks.push({
          id: this.id = this.tasks.length,
          avatar: this.currentUser.avatarka,
          firstname: this.currentUser.firstname,
          lastname: this.currentUser.lastname,
          name: this.name,
          description: this.description,
          time: (Hour + ':' + Minutes),
          halfDay: HalfDay
        })
        this.name = ''
        this.description = ''
      }
      e.preventDefault()
    },
    scrollToTop: function () {
      const container = this.$el.querySelector('#container')
      container.scrollTop = !container.scrollHeight
    },
    deleteEvent: function (index: number) {
      if (index > -1) {
        this.tasks.splice(this.tasks.length - 1 - index, 1)
      }
    }
  }
})
</script>
<style src="../assets/scss/tasks.scss" lang="scss">
</style>
