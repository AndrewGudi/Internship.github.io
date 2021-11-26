<template lang="pug">
clean-page
  .tasks__body
    .tasks__column
      .tasks__row
        .tasks__open-tasks Open Tasks
        button.tasks__input-button-add(:class="{'active': showWindow}" @click="showWindow = !showWindow") ADD
      .tasks__completed(v-if="tasks.length===0") Sorry, but all tasks have already been completed.
      .tasks__new-tasks
        task(
            v-for="(task, index) in tasks"
            v-bind:task="task"
            v-bind:index="index"
            :key="index"
            v-bind:currentUser="currentUser"
            @deleteEvent="deleteEvent"
            )
  form.tasks__input(@submit='checkForm' v-if="showWindow" autocomplete="on")
    .cl-btn-7(@click="showWindow = !showWindow")
    .task__avatar
      img.avatar(:src='`/images/${currentUser.avatarka}`', alt='Фото профиля')
    .task__user
      p {{currentUser.firstname}} {{currentUser.lastname}}
    .tasks__input-block
        textarea#name.tasks__task-name(v-model='name' type='text' name='name' placeholder="Task name" maxlength = "100")
        ul.name
          li(v-for="error in errors") {{error.name}}
        textarea#description.tasks__task-description(v-model='description' type='text' name='description' placeholder="Task description" maxlength = "300")
        ul.description
          li(v-for="error in errors") {{error.description}}
        button.tasks__input-button-send SEND
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import Task from '@/components/Layout/Content/Tasks/Task.vue'
import { mapGetters } from 'vuex'
import CleanPage from '@/components/Layout/Content/CleanPage.vue'

export default defineComponent({
  components: {
    CleanPage,
    Task
  },
  computed: {
    ...mapGetters({
      tasks: 'getTasks',
      currentUser: 'getCurrentUser'
    })
  },
  data () {
    return {
      errors: [{}],
      name: '',
      id: Number,
      description: '',
      showWindow: false
    }
  },
  methods: {
    checkForm: function (e: Event) {
      const Data = new Date()
      let Hour = Data.getHours()
      const Hours = Data.getHours()
      const HalfDay = Hours >= 12 ? 'PM' : 'AM'
      let Minutes: string|number = Data.getMinutes()
      Hour = Hour % 12
      Minutes = Minutes < 10 ? '0' + Minutes : Minutes
      if (this.name && this.description) {
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
      this.errors = []
      if (!this.name) {
        this.errors.push({ name: 'Task name required.' })
      }
      if (!this.description) {
        this.errors.push({ description: 'Task description required.' })
      }
      e.preventDefault()
    },
    deleteEvent: function (index: number) {
      if (index > -1) {
        this.tasks.splice(index, 1)
      }
    }
  }
})
</script>
<style src="../assets/scss/tasks.scss" lang="scss">
</style>
